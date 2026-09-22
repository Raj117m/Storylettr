// StoryLettr.com content model
// Chapters replace the old generic "sectors" taxonomy per the brand brief.

export const CHAPTERS = [
  { id: 'city-life', name: 'City Life' },
  { id: 'work-money', name: 'Work & Money' },
  { id: 'politics', name: 'Politics' },
  { id: 'culture', name: 'Culture' },
  { id: 'environment', name: 'Environment' },
  { id: 'truth-desk', name: 'Truth Desk' },
];

export const chapterById = (id) => CHAPTERS.find((c) => c.id === id);

// Mumbai suburban rail lines — a stylised, representative subset of stations
// (real stations, correctly ordered), not every stop on the network.
export const LINES = [
  {
    id: 'western',
    name: 'Western Line',
    color: '#B0362B',
    stations: ['churchgate', 'mumbai-central', 'dadar', 'bandra', 'andheri', 'borivali'],
  },
  {
    id: 'central',
    name: 'Central Line',
    color: '#1B2A4A',
    stations: ['csmt', 'byculla', 'dadar', 'kurla', 'ghatkopar', 'thane'],
  },
  {
    id: 'harbour',
    name: 'Harbour Line',
    color: '#8A9099',
    stations: ['csmt', 'wadala', 'vashi', 'panvel'],
  },
];

export const STATIONS = {
  'churchgate': { name: 'Churchgate' },
  'mumbai-central': { name: 'Mumbai Central' },
  'dadar': { name: 'Dadar' },
  'bandra': { name: 'Bandra' },
  'andheri': { name: 'Andheri' },
  'borivali': { name: 'Borivali' },
  'csmt': { name: 'CSMT' },
  'byculla': { name: 'Byculla' },
  'kurla': { name: 'Kurla' },
  'ghatkopar': { name: 'Ghatkopar' },
  'thane': { name: 'Thane' },
  'wadala': { name: 'Wadala' },
  'vashi': { name: 'Vashi' },
  'panvel': { name: 'Panvel' },
};

export const stationName = (slug) => STATIONS[slug]?.name || slug;

export const AUTHORS = {
  'priya-nair': {
    slug: 'priya-nair',
    name: 'Priya Nair',
    role: 'Staff writer, City Life & Work & Money',
    bio: 'Priya covers daily life on Mumbai’s suburban railway and the informal economy around its stations. She has lived off the Western Line her whole life.',
  },
  'aakash-fernandes': {
    slug: 'aakash-fernandes',
    name: 'Aakash Fernandes',
    role: 'Truth Desk reporter',
    bio: 'Aakash checks the claims that spread fastest on WhatsApp and Instagram, and writes up what he finds — plainly, and with sources attached.',
  },
};

export const GLOSSARY = {
  'fast-local': {
    term: 'Fast local',
    short: 'A suburban train that skips most stations, stopping only at major ones — faster than a "slow" local that stops everywhere.',
  },
  'season-ticket': {
    term: 'Season ticket',
    short: 'A prepaid pass for a fixed route, valid for a set period (commonly one or three months), cheaper per trip than buying single tickets.',
  },
};

// Stories, explainers and fact-checks all live in one list so a locality
// page can show "every story, explainer and fact-check about that area,
// newest first" from a single source.
export const CONTENT = [
  {
    type: 'story',
    slug: 'the-802-from-andheri',
    chapter: 'city-life',
    station: 'andheri',
    headline: 'The 8:02 from Andheri',
    summary: 'Every weekday, the same faces board the same fast local. What forty minutes on a train reveals about how this city actually runs.',
    shortVersion: [
      'The 8:02 fast local from Andheri to Churchgate carries many of the same commuters every weekday, who have organised themselves into informal seating and standing arrangements over years of riding together.',
      'Regulars describe the compartment as a second workplace — a place to finish accounts, nap, or catch up with people they otherwise never see.',
      'Season ticket data from three regular riders shows the daily round trip costs less than a single app-based cab ride, which is why, despite the crowding, almost none of them plan to stop taking it.',
    ],
    postmark: { station: 'andheri', date: '2026-09-21', status: 'verified' },
    byline: 'priya-nair',
    readingTimeMin: 6,
    lastUpdated: '2026-09-21',
    heroCaption: 'Andheri station, weekday morning rush.',
    body: [
      'At 8:02 sharp, the fast local pulls into Andheri platform 4, and the same forty or so regulars fall into positions they have held for years. Ramesh Iyer, who has ridden this train to his accounting job near Churchgate for eleven years, takes the third window seat from the door. He says he has never had to ask for it back.',
      '"We do not know each other’s surnames," he says, "but I know whose knee replacement surgery went well, whose daughter got into engineering college, and who is worried about their job this month." The compartment functions less like public transit and more like a standing appointment, forty minutes long, five days a week.',
      'This is not sentimental exaggeration. Over three weeks, this reporter rode the 8:02 daily and counted the same core group boarding at the same doors, in the same order, often trading the same newspaper section down the row. A retired railway employee two seats down called it "a committee meeting that happens to move at 60 kilometres an hour."',
      'The economics explain some of the loyalty. A monthly season ticket between Andheri and Churchgate costs a small fraction of even a single app-based cab ride over the same distance, and regulars who spoke to StoryLettr said that gap, more than habit, is what keeps them on the train even as the compartment gets more crowded every year.',
      'What the 8:02 shows, more than anything, is how much informal infrastructure Mumbai runs on that never appears in any transport survey — a self-organised seating order, a mutual-aid network for missed trains and family emergencies, all built by people who mostly know each other by which door they board from.',
    ],
    howWeKnowThis: {
      verified: [
        'Reporter rode the Andheri–Churchgate fast local on the 8:02 departure for fifteen weekday mornings across three weeks.',
        'Season ticket costs were confirmed against the fare chart posted at Andheri station and cross-checked with three regular commuters’ tickets.',
        'Named commuters quoted in this piece were interviewed in person and gave permission to be identified.',
      ],
      couldNotVerify: [
        'How long this particular seating arrangement has existed as a group could not be independently confirmed beyond individual commuters’ own recollection.',
      ],
    },
    tapForContext: ['fast-local', 'season-ticket'],
    related: ['dadar-flower-market', 'kurla-drainage'],
  },
  {
    type: 'story',
    slug: 'dadar-flower-market',
    chapter: 'work-money',
    station: 'dadar',
    headline: 'Before sunrise, Dadar decides the price of a garland',
    summary: 'The wholesale flower market near Dadar station sets prices every morning that ripple out to every roadside stall in the western suburbs.',
    shortVersion: [
      'Wholesale flower trading at Dadar begins before 5am, well ahead of the market most commuters see once shops open.',
      'Roadside flower sellers across the western suburbs buy from Dadar and reset their own prices daily based on what they pay there.',
      'Vendors say unpredictable supply, not demand, is what most often pushes prices up on any given day.',
    ],
    postmark: { station: 'dadar', date: '2026-09-18', status: 'verified' },
    byline: 'priya-nair',
    readingTimeMin: 5,
    lastUpdated: '2026-09-18',
    heroCaption: 'Wholesale flower trade near Dadar station, before dawn.',
    body: [
      'By the time most of Mumbai is awake, the flower trade near Dadar station is already done for the day. Wholesalers start arriving before 5am, and by 7am the morning’s prices — for marigold, jasmine, and rose — have already been set and passed down to sellers who will spend the rest of the day at traffic signals and temple gates across the western suburbs.',
      '"Whatever we pay here by 6am, that decides what a garland costs in Andheri or Borivali by 9am," says Suresh Koli, who has traded flowers at Dadar for over twenty years. Roadside sellers interviewed for this piece confirmed they check Dadar prices first, before deciding their own for the day.',
      'The market runs almost entirely on informal credit and long-standing relationships rather than fixed contracts. Sellers who have traded with the same wholesaler for years are extended flexibility on payment during slow weeks; newer sellers are not.',
      'Several vendors said unpredictable flower supply — driven by weather affecting farms outside the city — causes far more price swings than any change in city-side demand. A heavy rain upcountry, they said, is felt in the price of a garland the very next morning.',
    ],
    howWeKnowThis: {
      verified: [
        'Reporter visited the Dadar wholesale flower market on four mornings between 5am and 7am.',
        'Prices quoted were observed directly and cross-checked against three independent roadside sellers in different suburbs the same day.',
      ],
      couldNotVerify: [
        'Exact daily trading volumes were not independently verifiable; wholesalers do not keep or share formal records.',
      ],
    },
    tapForContext: [],
    related: ['the-802-from-andheri', 'kurla-drainage'],
  },
  {
    type: 'story',
    slug: 'kurla-drainage',
    chapter: 'environment',
    station: 'kurla',
    headline: "Kurla's monsoon problem was fixed on paper years ago",
    summary: 'A drainage upgrade near Kurla station was marked complete in municipal records. Residents say the water tells a different story.',
    shortVersion: [
      'A stormwater drainage upgrade near Kurla station, recorded as completed in municipal documents, has not stopped seasonal flooding in the area.',
      'Residents and local shop owners describe recurring waterlogging during heavy monsoon spells, particularly around the station approach road.',
      'Civic engineers who reviewed the situation for this piece point to capacity mismatches between the upgraded drain and older connecting pipes as a likely explanation.',
    ],
    postmark: { station: 'kurla', date: '2026-09-12', status: 'verified' },
    byline: 'priya-nair',
    readingTimeMin: 7,
    lastUpdated: '2026-09-15',
    heroCaption: 'The Kurla station approach road during a heavy spell of rain.',
    body: [
      'On municipal paper, the drainage line running past Kurla station’s east exit was upgraded and marked complete. On the ground, shopkeepers along the approach road say the water still comes in almost exactly as it always has.',
      '"We keep the sandbags ready from June," says Nasir Sheikh, who has run a stationery shop near the station for fifteen years. "The board outside says the work is done. My shop floor says something else."',
      'This is not a case of nothing being built. A visibly new drainage channel exists along part of the stretch. But residents and two civic engineers who reviewed photographs and the public works record for this story say the newer channel appears to feed into an older, narrower pipe further down that was never upgraded — creating a bottleneck exactly where the water needs to move fastest.',
      '"It is a common pattern," said one of the engineers, who reviewed the case on condition their name not be used because they still do government-linked project work. "A visible piece gets rebuilt, it gets marked complete, but the pipe it connects to downstream doesn’t get touched, and that’s where it backs up."',
      'Local residents have raised the issue at ward-level meetings for two consecutive years, according to minutes shared with StoryLettr. No new capacity work on the connecting pipe has been recorded as of this story’s last update.',
    ],
    howWeKnowThis: {
      verified: [
        'Reporter visited the site during and after a heavy rain spell in September and photographed standing water at the approach road.',
        'Public works completion record for the drainage segment was reviewed and is on file.',
        'Two civic engineers independently reviewed the site photographs and record; one is quoted above.',
        'Ward meeting minutes referencing the issue over two years were reviewed.',
      ],
      couldNotVerify: [
        'The exact pipe diameter downstream could not be independently confirmed without access to underground survey records StoryLettr has requested but not yet received.',
      ],
    },
    tapForContext: [],
    related: ['dadar-flower-market'],
  },
  {
    type: 'explainer',
    slug: 'how-mumbai-local-fares-work',
    chapter: 'city-life',
    station: null,
    headline: 'How Mumbai local train fares actually work',
    summary: 'Single tickets, season tickets, and class of travel — a plain explanation of what determines what you pay.',
    shortVersion: [
      'Local train fares are set by distance travelled and class of travel, not by which specific train you board.',
      'A season ticket is cheaper per trip than single tickets for anyone travelling the same route regularly, usually breaking even within the first couple of weeks of a month.',
      'First class costs several times more than second class for the same route and is primarily about guaranteed space, not speed.',
    ],
    postmark: { station: null, date: '2026-09-10', status: 'checked' },
    byline: 'priya-nair',
    readingTimeMin: 4,
    lastUpdated: '2026-09-10',
    heroCaption: null,
    body: [
      'Fares on Mumbai’s suburban rail network are set by two things: the distance between your origin and destination stations, and whether you travel second class or first class. The specific train — fast or slow, crowded or empty — does not change the price.',
      'A single ticket is bought for one journey. A season ticket, or "pass," is bought for a fixed route and is valid for repeated travel over a set period, commonly one month or three months. Regular commuters almost always find a season ticket becomes cheaper than buying single tickets after only a handful of trips.',
      'First class carriages, marked with a yellow stripe, cost several times more than second class for an identical route. The difference does not buy a faster train — first class trains are not scheduled any quicker — it buys a less crowded compartment.',
    ],
    howWeKnowThis: {
      verified: [
        'Fare structure described here was confirmed against fare charts posted at Andheri and Dadar stations.',
      ],
      couldNotVerify: [],
    },
    tapForContext: ['fast-local', 'season-ticket'],
    related: ['the-802-from-andheri'],
  },
  {
    type: 'fact-check',
    slug: 'will-mumbai-locals-stop-from-monday',
    chapter: 'truth-desk',
    station: 'andheri',
    headline: 'Is it true Mumbai locals will stop from Monday?',
    summary: 'A message claiming suburban trains would shut down citywide spread through WhatsApp groups this week. Here is what is actually scheduled.',
    shortVersion: [
      'A forwarded message claiming all Mumbai local trains would "stop completely from Monday" spread through several WhatsApp groups this week.',
      'No such citywide suspension is scheduled. What is scheduled is a limited, pre-announced overnight maintenance block on one line, affecting only late-night services on two nights.',
      'The rumour appears to have grown out of that genuine, narrower maintenance notice being reshared without its original details.',
    ],
    postmark: { station: 'andheri', date: '2026-09-21', status: 'checked' },
    byline: 'aakash-fernandes',
    readingTimeMin: 4,
    lastUpdated: '2026-09-21',
    heroCaption: null,
    rumour: {
      text: '"Breaking 🚨 Mumbai local trains STOP COMPLETELY from Monday, all lines, no service until further notice. Plan accordingly and forward to family."',
      spread: 'Shared in 11+ groups seen by StoryLettr',
    },
    body: [
      'A message warning that "Mumbai local trains STOP COMPLETELY from Monday" began circulating on WhatsApp this week, urging recipients to forward it to family. It names no source, no official notice, and no line.',
      'There is no citywide suspension of suburban services scheduled. What does exist, and is publicly posted, is a narrower maintenance block: overnight engineering work on one line, affecting only late-night services across two nights, with normal daytime service unaffected on every other day.',
      'This is a familiar pattern for transit rumours in the city: a real, limited, technical notice gets reshared without the detail that limits it, and by the third or fourth forward, "overnight, one line, two nights" has become "all lines, no service, indefinitely."',
      'If you are trying to decide whether to plan around a train disruption message, check whether it names a specific line, specific dates, and specific hours. A warning with none of those three is a strong sign it has been stripped down through forwarding, not a sign the disruption is bigger than stated.',
    ],
    verdict: 'False as stated. A limited, two-night overnight maintenance block on one line exists and is genuine; the claim of a full citywide shutdown does not.',
    howWeKnowThis: {
      verified: [
        'The forwarded message was collected from readers who received it in at least eleven different WhatsApp groups.',
        'The genuine, narrower maintenance notice it appears to originate from was confirmed against the publicly posted engineering block schedule.',
      ],
      couldNotVerify: [
        'The original sender or group where the rumour first appeared could not be traced.',
      ],
    },
    tapForContext: [],
    related: ['the-802-from-andheri'],
  },
];

export const getBySlug = (slug) => CONTENT.find((c) => c.slug === slug);
export const getStories = () => CONTENT.filter((c) => c.type === 'story' || c.type === 'explainer');
export const getFactChecks = () => CONTENT.filter((c) => c.type === 'fact-check');
export const getByStation = (station) =>
  CONTENT.filter((c) => c.station === station).sort((a, b) => (a.postmark.date < b.postmark.date ? 1 : -1));
export const getByChapter = (chapterId) =>
  CONTENT.filter((c) => c.chapter === chapterId).sort((a, b) => (a.postmark.date < b.postmark.date ? 1 : -1));
export const allSortedByDate = () =>
  [...CONTENT].sort((a, b) => (a.postmark.date < b.postmark.date ? 1 : -1));
export const stationsWithContent = () =>
  new Set(CONTENT.filter((c) => c.station).map((c) => c.station));
