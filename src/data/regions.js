// URL slug -> region code stored on each player in players.db
export const REGION_CODES = {
  amer: 'AMER',
  emea: 'EMEA',
  pac: 'PAC',
}

export const AVAILABLE_REGIONS = Object.keys(REGION_CODES)

// Turns the selected setup checkboxes into the /valorant/<regions> slug.
export function regionsToSlug(selected) {
  if (AVAILABLE_REGIONS.every(r => selected.includes(r))) return 'global'
  return AVAILABLE_REGIONS.filter(r => selected.includes(r)).join('-')
}

// Every slug a game can be played on: amer, emea, pac, amer-emea, amer-pac, emea-pac, global.
export function allRegionSlugs() {
  const slugs = []
  for (let mask = 1; mask < 1 << AVAILABLE_REGIONS.length; mask++) {
    slugs.push(regionsToSlug(AVAILABLE_REGIONS.filter((_, i) => mask & (1 << i))))
  }
  return slugs
}

// The current calendar date in Eastern time (handles EST/EDT), e.g. "2026-11-13".
// The daily player rolls over when this changes, at 12am ET.
export function easternDate(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(now)
}

// Parses the slug back into region slugs. Unknown regions are dropped.
export function slugToRegions(slug = '') {
  if (slug === 'global') return AVAILABLE_REGIONS
  return slug.split('-').filter(r => AVAILABLE_REGIONS.includes(r))
}
