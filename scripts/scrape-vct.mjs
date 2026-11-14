// Scrapes the VCT 2026 Stage 2 group stages into players.db.
// Run from the repo root:  npm run scrape   then   npm run export-players
//
// Rosters (display name + the team each player played for at the event) come from the event
// page; everything else (winnings, agents, stats, nationality, past teams) comes from each
// player's profile via vlr-stats-scraper.
//
// Events run one at a time because Hyperbrowser rate-limits job creation (HTTP 429).
// Players already saved for an event are skipped, so re-running only fills in failures.
import 'dotenv/config';
import * as cheerio from 'cheerio';
import { Hyperbrowser } from '@hyperbrowser/sdk';
import {
  scrapePlayer,
  savePlayer,
  saveEvent,
  addPlayerToEvent,
  getPlayersByEvent,
} from 'vlr-stats-scraper';

const EVENTS = [
  { name: 'VCT 2026 Americas Stage 2', region: 'AMER', url: 'https://www.vlr.gg/event/2977/vct-2026-americas-stage-2/group-stage' },
  { name: 'VCT 2026 Pacific Stage 2', region: 'PAC', url: 'https://www.vlr.gg/event/2776/vct-2026-pacific-stage-2/group-stage' },
  { name: 'VCT 2026 EMEA Stage 2', region: 'EMEA', url: 'https://www.vlr.gg/event/2976/vct-2026-emea-stage-2/group-stage' },
];

const MAX_ATTEMPTS = 5;
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const client = new Hyperbrowser({ apiKey: process.env.HYPERBROWSER_API_KEY });

// vlr.gg lists these status notes alongside team names; they aren't teams.
const TEAM_NOTE = /^(inactive from .+|stand-?in|loan|substitute)$/i;

async function retry(fn) {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const result = await fn();
      if (result) return result;
    } catch (err) {
      if (attempt === MAX_ATTEMPTS) console.error(err.message);
    }
    await sleep(2000 * attempt);
  }
  return undefined;
}

// Returns [{ link, displayName, team }] for every player on the event's "Participating Teams" list.
async function fetchRoster(url) {
  const res = await client.scrape.startAndWait({ url, scrapeOptions: { formats: ['html'] } });
  if (!res?.data?.html) return undefined;

  const $ = cheerio.load(res.data.html);
  const roster = [];
  $('.event-team').each((_, teamEl) => {
    const team = $(teamEl).find('.event-team-name').first().text().trim();
    $(teamEl).find('a.event-team-players-item').each((_, playerEl) => {
      roster.push({
        link: `${$(playerEl).attr('href')}/?timespan=all`,
        displayName: $(playerEl).text().trim(),
        team,
      });
    });
  });
  return roster.length ? roster : undefined;
}

function cleanPlayer(player, { displayName, team }) {
  const pastTeams = player.past_teams
    .filter(t => !TEAM_NOTE.test(t))
    .filter(t => t.toLowerCase() !== team.toLowerCase());

  return {
    ...player,
    name: displayName,
    team,
    past_teams: [...new Set(pastTeams)],
  };
}

async function scrapeEvent({ name, region, url }, usedNames) {
  const eventId = saveEvent({ name, url, region, year: 2026, stage: 2 });
  const done = new Set(getPlayersByEvent(name).map(p => p.name));
  done.forEach(n => usedNames.add(n));

  const roster = await retry(() => fetchRoster(url));
  if (!roster) {
    console.error(`[${region}] couldn't read the roster at ${url}`);
    return { saved: done.size, total: 0, failed: [] };
  }

  const todo = roster.filter(p => !done.has(p.displayName));
  console.log(`[${region}] ${roster.length} players, ${roster.length - todo.length} already saved, scraping ${todo.length}`);

  const failed = [];
  for (const entry of todo) {
    // The package logs each player's slug as it scrapes; that's expected noise.
    const scraped = await retry(() => scrapePlayer(entry.link, region));
    if (!scraped) {
      failed.push(entry.link);
      console.error(`[${region}] gave up on ${entry.link}`);
      continue;
    }

    const player = cleanPlayer(scraped, entry);
    // Display names are the primary key; fall back to the URL slug on a clash.
    if (usedNames.has(player.name)) {
      console.warn(`[${region}] duplicate name "${player.name}", saving as "${scraped.name}"`);
      player.name = scraped.name;
    }
    usedNames.add(player.name);

    savePlayer(player);
    addPlayerToEvent(eventId, player.name);
    done.add(player.name);
    console.log(`[${region}] ${done.size}/${roster.length} ${player.name} (${player.team})`);
    await sleep(500);
  }
  return { saved: done.size, total: roster.length, failed };
}

const usedNames = new Set();
for (const event of EVENTS) {
  const { saved, total, failed } = await scrapeEvent(event, usedNames);
  console.log(`${event.name}: ${saved}/${total} players saved${failed.length ? `, ${failed.length} failed` : ''}`);
}
