// Storage and management for Reader Community Dispatches & Opinions
import { STATIONS_GEO } from './stationsGeo';

export const INITIAL_DISPATCHES = [
  {
    id: 'disp-atlas-bkc',
    isAnonymous: false,
    authorName: 'Rohan Verma',
    authorRole: 'SYBBA Student · Atlas SkillTech Univ',
    localitySlug: 'bkc',
    localityName: 'BKC',
    coordinates: [72.8688, 19.0657],
    category: 'Campus & Ground Truth',
    opinion: 'Everyone tells college founders to build AI wrappers and pitch for seed rounds. In reality, the best student business on our floor is two guys manually matching wholesale cafe snack orders for corporate offices in BKC. Zero AI, 65% gross margins, day-one cashflow.',
    createdAt: '2026-10-22',
    upvotes: 38,
    isModVerified: true,
  },
  {
    id: 'disp-thane-commute',
    isAnonymous: true,
    authorName: 'Anonymous Contributor',
    authorRole: 'Suburban Commuter · Fast Line',
    localitySlug: 'thane',
    localityName: 'Thane',
    coordinates: [72.9781, 19.1860],
    category: 'Ground Reality',
    opinion: 'The metro construction on the Eastern Express Highway shifted more than 30% of car commuters back to the 8:14 AM fast local from Thane. Peak platform crush is at a 5-year high, yet official transit reports claimed private car usage rose. Talk to anyone on Platform 5 to see the real numbers.',
    createdAt: '2026-10-21',
    upvotes: 27,
    isModVerified: true,
  },
  {
    id: 'disp-bandra-creative',
    isAnonymous: false,
    authorName: 'Meera Sen',
    authorRole: 'Independent Visual Designer',
    localitySlug: 'bandra',
    localityName: 'Bandra',
    coordinates: [72.8402, 19.0596],
    category: 'Work & Culture',
    opinion: 'Design agencies across Pali Hill are quietly letting go of junior retainers and hiring freelancers on strict 2-week milestone contracts. If you are entering the creative market, stop pitching hourly rates. Clients only approve outcomes with measurable deliverables.',
    createdAt: '2026-10-20',
    upvotes: 42,
    isModVerified: true,
  },
  {
    id: 'disp-dadar-flower',
    isAnonymous: true,
    authorName: 'Anonymous Contributor',
    authorRole: 'Merchant Observer · Phool Galli',
    localitySlug: 'dadar',
    localityName: 'Dadar',
    coordinates: [72.8437, 19.0178],
    category: 'City Pulse',
    opinion: 'At 4:30 AM in the Dadar flower market, UPI QR codes completely replaced cash for 90% of crate transactions this festive season. Even 60-year-old growers from Nashik refuse physical notes because digital settlement saves two hours of coin-counting at bank counters.',
    createdAt: '2026-10-19',
    upvotes: 31,
    isModVerified: true,
  },
  {
    id: 'disp-andheri-tech',
    isAnonymous: false,
    authorName: 'Kunal Parikh',
    authorRole: 'Frontend Lead · Mid-stage Startup',
    localitySlug: 'andheri',
    localityName: 'Andheri',
    coordinates: [72.8468, 19.1197],
    category: 'Work & Culture',
    opinion: 'The 3-day mandatory office rule in Andheri East tech hubs is backfiring. Two of our best backend engineers took 15% salary cuts just to switch to fully remote firms based out of Pune. Companies enforcing arbitrary swipe-in times are quietly losing their top 10% talent.',
    createdAt: '2026-10-18',
    upvotes: 54,
    isModVerified: true,
  },
  {
    id: 'disp-vashi-logistics',
    isAnonymous: true,
    authorName: 'Anonymous Contributor',
    authorRole: 'Logistics Supervisor · APMC Market',
    localitySlug: 'vashi',
    localityName: 'Vashi',
    coordinates: [72.9986, 19.0771],
    category: 'Ground Reality',
    opinion: 'Refrigerated container truck delays on the Palm Beach link road jumped 40% due to uncoordinated nighttime resurfacing. Small cold-storage operators bear the spoilage costs, not the construction contractors. That is why vegetable prices in your local neighbourhood spiked this week.',
    createdAt: '2026-10-17',
    upvotes: 19,
    isModVerified: true,
  },
];

const STORAGE_KEY = 'storylettr-community-dispatches-v1';
const MOD_STORAGE_KEY = 'storylettr-mod-mode-active';

// Helper to get dispatches safely (SSR friendly)
export function getCommunityDispatches() {
  if (typeof window === 'undefined') return INITIAL_DISPATCHES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn('[CommunityDispatches] Error reading localStorage', e);
  }
  return INITIAL_DISPATCHES;
}

// Save dispatches and notify other components
export function saveCommunityDispatches(list) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('storylettr:dispatches-updated', { detail: list }));
  } catch (e) {
    console.warn('[CommunityDispatches] Error writing localStorage', e);
  }
}

// Add a new community dispatch
export function addCommunityDispatch({
  isAnonymous = true,
  authorName = '',
  authorRole = '',
  localitySlug = 'bkc',
  opinion = '',
  category = 'Ground Reality',
  isModVerified = false,
}) {
  const current = getCommunityDispatches();
  const stationInfo = STATIONS_GEO[localitySlug] || STATIONS_GEO.bkc || {
    name: localitySlug,
    coordinates: [72.8688, 19.0657],
  };

  const newDispatch = {
    id: `disp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    isAnonymous: Boolean(isAnonymous),
    authorName: isAnonymous ? 'Anonymous Contributor' : (authorName.trim() || 'Reader Contributor'),
    authorRole: isAnonymous
      ? (authorRole.trim() || `Verified Resident · ${stationInfo.name}`)
      : (authorRole.trim() || `Community Contributor`),
    localitySlug,
    localityName: stationInfo.name,
    coordinates: stationInfo.coordinates || [72.8688, 19.0657],
    category: category || 'Ground Reality',
    opinion: opinion.trim(),
    createdAt: new Date().toISOString().split('T')[0],
    upvotes: 1,
    isModVerified: Boolean(isModVerified),
  };

  const updated = [newDispatch, ...current];
  saveCommunityDispatches(updated);
  return newDispatch;
}

// Delete a dispatch by ID (Moderator action)
export function deleteCommunityDispatch(id) {
  const current = getCommunityDispatches();
  const updated = current.filter((d) => d.id !== id);
  saveCommunityDispatches(updated);
  return updated;
}

// Upvote a dispatch
export function upvoteCommunityDispatch(id) {
  const current = getCommunityDispatches();
  const updated = current.map((d) => (d.id === id ? { ...d, upvotes: d.upvotes + 1 } : d));
  saveCommunityDispatches(updated);
  return updated;
}

// Reset to initial seed (Mod tool)
export function resetCommunityDispatches() {
  saveCommunityDispatches(INITIAL_DISPATCHES);
  return INITIAL_DISPATCHES;
}

// Moderator mode state helpers
export function isModModeActive() {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(MOD_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setModModeActive(active) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(MOD_STORAGE_KEY, active ? 'true' : 'false');
    window.dispatchEvent(new CustomEvent('storylettr:mod-mode-changed', { detail: active }));
  } catch {
    // ignore
  }
}
