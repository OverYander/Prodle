// Picks a random daily player for every region combination and writes public/daily/valorant.json.
//
//   npm run daily          pick today's players once (skips if today's are already picked)
//   npm run daily -- --force   re-roll today's players
//   npm run daily:watch    keep running and re-roll automatically at 12am Eastern every day
//
// Players come from src/data/players.json, so run `npm run export-players` after scraping.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { REGION_CODES, allRegionSlugs, slugToRegions, easternDate } from '../src/data/regions.js';

const PLAYERS_FILE = 'src/data/players.json';
const DAILY_FILE = 'public/daily/valorant.json';
const CHECK_EVERY_MS = 30_000;

const args = process.argv.slice(2);
const watch = args.includes('--watch');
const force = args.includes('--force');

function readJson(file, fallback) {
  try {
    return JSON.parse(readFileSync(file, 'utf8'));
  } catch {
    return fallback;
  }
}

function pickDaily({ forceReroll = false } = {}) {
  const date = easternDate();
  const previous = readJson(DAILY_FILE, null);

  if (previous?.date === date && !forceReroll) {
    console.log(`${date}: daily players already picked`);
    return;
  }

  const players = readJson(PLAYERS_FILE, []);
  if (!players.length) {
    console.error(`No players in ${PLAYERS_FILE}. Run \`npm run export-players\` first.`);
    return;
  }

  const answers = {};
  for (const slug of allRegionSlugs()) {
    const codes = slugToRegions(slug).map(r => REGION_CODES[r]);
    const pool = players.filter(p => codes.includes(p.region));
    if (!pool.length) {
      console.warn(`${slug}: no players, skipping`);
      continue;
    }
    // Avoid giving the same answer two days in a row when there's another option.
    const yesterday = previous?.answers?.[slug];
    const choices = pool.length > 1 ? pool.filter(p => p.name !== yesterday) : pool;
    answers[slug] = choices[Math.floor(Math.random() * choices.length)].name;
  }

  mkdirSync('public/daily', { recursive: true });
  writeFileSync(DAILY_FILE, JSON.stringify({ date, answers }, null, 2) + '\n');
  console.log(`${date}: picked daily players`, answers);
}

pickDaily({ forceReroll: force });

if (watch) {
  console.log('Watching for 12am Eastern. Leave this running (Ctrl+C to stop).');
  // Polling the Eastern date (instead of one long timer) survives DST changes and the PC sleeping.
  setInterval(() => {
    if (!existsSync(DAILY_FILE) || readJson(DAILY_FILE, null)?.date !== easternDate()) pickDaily();
  }, CHECK_EVERY_MS);
}
