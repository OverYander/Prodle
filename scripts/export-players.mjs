// The browser can't read SQLite, so this dumps players.db into a JSON file the game imports.
// Only players from the current events (scripts/current-event.mjs) are included, so the game and
// the daily player never come from older splits.
// Run from the repo root after scraping: npm run export-players
import { mkdirSync, writeFileSync } from 'fs';
import { getAllPlayers } from 'vlr-stats-scraper';
import { CURRENT_EVENT, eventName } from './current-event.mjs';

const currentNames = new Set(CURRENT_EVENT.EVENTS.map(e => eventName(e.label).toLowerCase()));
const isCurrent = p => p.event_year === CURRENT_EVENT.YEAR && currentNames.has(p.event_name.toLowerCase());

// Career assists per round, weighted by rounds played across the agents vlr.gg lists (their top 3).
function assistsPerRound(stats = []) {
  const rounds = stats.reduce((sum, s) => sum + (s.rounds ?? 0), 0);
  const assists = stats.reduce((sum, s) => sum + (s.assists ?? 0), 0);
  return rounds ? Math.round((assists / rounds) * 100) / 100 : null;
}

// Career average combat score, weighted by rounds played on each of their top 3 agents.
function careerAcs(stats = []) {
  const played = stats.filter(s => s.rounds && s.acs != null);
  const rounds = played.reduce((sum, s) => sum + s.rounds, 0);
  return rounds ? Math.round(played.reduce((sum, s) => sum + s.acs * s.rounds, 0) / rounds) : null;
}

// vlr.gg lists inactivity periods and stand-in spells alongside real teams.
const isRealTeam = t => t && !/^inactive from/i.test(t) && t.toLowerCase() !== 'stand-in';

const all = getAllPlayers();
const byName = new Map();
for (const p of all.filter(isCurrent)) {
  // A player in two current events (e.g. a mid-split transfer) keeps the later entry.
  byName.set(p.name.toLowerCase(), {
    name: p.name,
    team: p.team,
    past_teams: [...new Set((p.past_teams ?? []).filter(isRealTeam))],
    winnings: p.winnings,
    most_played_agents: p.most_played_agents,
    avg_kda: Math.round(p.avg_kda * 100) / 100,
    assists_per_round: assistsPerRound(p.stats),
    acs: careerAcs(p.stats),
    nationality: p.nationality,
    region: p.region,
  });
}

const players = [...byName.values()].sort((a, b) => a.name.localeCompare(b.name));
if (!players.length) {
  console.error(`No players found for ${CURRENT_EVENT.NAME} ${CURRENT_EVENT.YEAR}. Run \`npm run scrape\` first.`);
  process.exit(1);
}

mkdirSync('src/data', { recursive: true });
writeFileSync('src/data/players.json', JSON.stringify(players, null, 2) + '\n');

const perRegion = Object.entries(Object.groupBy(players, p => p.region ?? 'none'))
  .map(([r, ps]) => `${r} ${ps.length}`).join(', ');
console.log(`Wrote ${players.length} ${CURRENT_EVENT.NAME} ${CURRENT_EVENT.YEAR} players to src/data/players.json (${perRegion})`);
if (all.length > players.length) console.log(`Skipped ${all.length - players.length} entries from older events`);
