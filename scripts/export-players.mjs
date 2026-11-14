// The browser can't read SQLite, so this dumps players.db into a JSON file the game imports.
// Run from the repo root after scraping: npm run export-players
import { mkdirSync, writeFileSync } from 'fs';
import { getAllPlayers } from 'vlr-stats-scraper';

const players = getAllPlayers()
  .map(({ name, team, winnings, most_played_agents, avg_kda, nationality, region }) => ({
    name,
    team,
    winnings,
    most_played_agents,
    avg_kda: Math.round(avg_kda * 100) / 100,
    nationality,
    region,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

mkdirSync('src/data', { recursive: true });
writeFileSync('src/data/players.json', JSON.stringify(players, null, 2) + '\n');
console.log(`Wrote ${players.length} players to src/data/players.json`);
