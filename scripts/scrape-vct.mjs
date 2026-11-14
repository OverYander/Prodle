// Scrapes the current VCT events into players.db using vlr-stats-scraper's `valstats` CLI.
// Run from the repo root:  npm run scrape   then   npm run export-players
// The event list lives in current-event.mjs.
//
// valstats sets each player's region from the event title (Americas -> AMER, EMEA, Pacific -> PAC,
// China -> CN) and pulls rosters, event stats and career stats. Re-running an event replaces its roster.
//
// Some overview pages (e.g. China Stage 2) show empty roster placeholders with no player links.
// For those, players are taken from the event's stats page instead and added one at a time.
//
// Events run one at a time because Hyperbrowser rate-limits job creation (HTTP 429).
// Needs HYPERBROWSER_API_KEY in .env.
import 'dotenv/config';
import { spawnSync } from 'child_process';
import { createRequire } from 'module';
import * as cheerio from 'cheerio';
import { Hyperbrowser } from '@hyperbrowser/sdk';
import { eventStatsUrl, getAllPlayers } from 'vlr-stats-scraper';
import { CURRENT_EVENT, eventName } from './current-event.mjs';

// Run the CLI with node directly (no shell) so names with spaces stay one argument.
const VALSTATS = createRequire(import.meta.url).resolve('vlr-stats-scraper').replace(/index\.mjs$/, 'main.mjs');
const YEAR = String(CURRENT_EVENT.YEAR);
const EVENTS = CURRENT_EVENT.EVENTS.map(e => ({ ...e, name: eventName(e.label) }));
const MAX_ATTEMPTS = 3;
const sleep = ms => new Promise(r => setTimeout(r, ms));

function valstats(args) {
  const { status, stdout } = spawnSync(process.execPath, [VALSTATS, ...args], {
    stdio: ['inherit', 'pipe', 'inherit'],
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });
  process.stdout.write(stdout ?? '');
  return { ok: status === 0, stdout: stdout ?? '' };
}

// Profile links of everyone in the event's stats table.
async function statsPagePlayers(url) {
  const client = new Hyperbrowser({ apiKey: process.env.HYPERBROWSER_API_KEY });
  const res = await client.scrape.startAndWait({ url: eventStatsUrl(url), scrapeOptions: { formats: ['html'] } });
  const $ = cheerio.load(res?.data?.html ?? '');
  return [...new Set($('a[href*="/player/"]').map((_, el) => new URL($(el).attr('href'), 'https://www.vlr.gg').href).get())];
}

// Adds each player from the stats page to an already-saved event. Skips players already in it.
async function addFromStatsPage({ name, url, region }) {
  const links = await statsPagePlayers(url);
  if (!links.length) return false;

  const saved = new Set(getAllPlayers()
    .filter(p => p.event_name === name && p.event_year === CURRENT_EVENT.YEAR)
    .map(p => String(p.vlr_id)));
  const todo = links.filter(l => !saved.has(l.match(/\/player\/(\d+)/)?.[1]));
  console.log(`[${name}] overview has no rosters, using the stats page: ${links.length} players, ${todo.length} to add`);

  let missing = 0;
  for (const link of todo) {
    let ok = false;
    for (let attempt = 1; attempt <= MAX_ATTEMPTS && !ok; attempt++) {
      ok = valstats(['--player', link, name, YEAR, region]).ok;
      if (!ok) await sleep(2000 * attempt);
    }
    if (!ok) {
      missing++;
      console.error(`[${name}] gave up on ${link}`);
    }
  }
  return missing === 0;
}

// Pass event names (e.g. `npm run scrape -- "China Stage 2"`) to scrape only those.
const only = process.argv.slice(2);
const events = only.length ? EVENTS.filter(e => only.includes(e.name)) : EVENTS;

const failed = [];
for (const event of events) {
  console.log(`\n=== ${event.name} ===`);
  const { ok, stdout } = valstats([event.url, YEAR, event.name]);
  // valstats exits 0 even when the overview page lists nobody.
  const empty = /Found 0 players/.test(stdout);
  if (!ok || (empty && !(await addFromStatsPage(event)))) failed.push(event.name);
}

if (failed.length) {
  console.error(`\nFailed: ${failed.join(', ')}. Re-run with: npm run scrape -- ${failed.map(n => `"${n}"`).join(' ')}`);
  process.exit(1);
}
console.log('\nAll events scraped. Next: npm run export-players');
