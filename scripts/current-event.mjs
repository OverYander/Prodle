// The events the game currently pulls players from. Update this by hand when a new split starts:
// change NAME/YEAR and swap in the new vlr.gg group-stage (Overview) links, then
//   npm run scrape  ->  npm run export-players  ->  commit and push (Vercel redeploys)
//
// Each event is saved in players.db as "<label> <NAME>" (e.g. "China Stage 2") with year YEAR.
// Older events stay in players.db, but export-players only includes players from these.
export const CURRENT_EVENT = {
  NAME: 'Stage 2',
  YEAR: 2026,
  EVENTS: [
    { label: 'Americas', region: 'AMER', url: 'https://www.vlr.gg/event/2977/vct-2026-americas-stage-2/group-stage' },
    { label: 'Pacific', region: 'PAC', url: 'https://www.vlr.gg/event/2776/vct-2026-pacific-stage-2/group-stage' },
    { label: 'EMEA', region: 'EMEA', url: 'https://www.vlr.gg/event/2976/vct-2026-emea-stage-2/group-stage' },
    { label: 'China', region: 'CN', url: 'https://www.vlr.gg/event/2978/vct-2026-china-stage-2/group-stage' },
  ],
};

export const eventName = label => `${label} ${CURRENT_EVENT.NAME}`;
