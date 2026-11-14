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
| `npm run scrape` | Scrapes the current VCT events (Americas, Pacific, EMEA, China) into `players.db`. Add event names, e.g. `-- "China Stage 2"`, to scrape only those. |
| `npm run export-players` | Writes the current events' players from `players.db` to `src/data/players.json`. Run after every scrape. |

The current events (split name, year and vlr.gg links) are set in `scripts/current-event.mjs`. Update it by hand each split.

The daily player is picked in the browser from the date (`src/data/daily.js`), so there's nothing to run each day. It changes at 12am Eastern.

Each player's **team** is the team they played for at the event, and their **name** is the display
name from the event roster.

## Layout

- `src/pages/` – game select, Valorant setup, and the game itself
- `src/data/` – exported players, region helpers, guess comparison
- `scripts/` – scrape and export scripts (Node only, not bundled)
- `vercel.json` – sends every URL to `index.html` so page refreshes work on Vercel
