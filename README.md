# Prodle

A Wordle-style guessing game for esports pros. Valorant is playable; League and Apex are placeholders.

Pick regions on `/valorant/setup` (or hit **All** for every region), then guess the day's pro player
at `/prodle/valorant/<regions>`. Each guess is compared on team, winnings, top agents, K/D and region.

## Running it

```bash
npm install
npm run dev
```

## Player data

Player data is scraped from [vlr.gg](https://www.vlr.gg) with
[vlr-stats-scraper](https://www.npmjs.com/package/vlr-stats-scraper) into `players.db` (SQLite).
The browser can't read SQLite, so it's exported to `src/data/players.json` for the game.

Scraping needs a [Hyperbrowser](https://hyperbrowser.ai) key in `.env` at the repo root:

```
HYPERBROWSER_API_KEY=your_key_here
```

| Command | What it does |
| --- | --- |
| `npm run scrape` | Scrapes the VCT 2026 Stage 2 group stages (Americas, Pacific, EMEA) into `players.db`. Re-running only fills in players that failed. |
| `npm run export-players` | Writes `players.db` to `src/data/players.json`. Run after every scrape. |
| `npm run daily` | Picks today's player for every region combination into `public/daily/valorant.json`. Add `-- --force` to re-roll. |
| `npm run daily:watch` | Stays running and re-picks at 12am Eastern every day. |

Events to scrape are listed at the top of `scripts/scrape-vct.mjs`.

Each player's **team** is the team they played for at the event, and their **name** is the display
name from the event roster.

## Layout

- `src/pages/` – game select, Valorant setup, and the game itself
- `src/data/` – exported players, region helpers, guess comparison
- `scripts/` – scrape, export and daily-pick scripts (Node only, not bundled)
- `public/daily/` – the daily answers the game loads at runtime
