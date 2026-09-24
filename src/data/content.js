// StoryLettr.com Core Content & Experience Architecture
// Centered on real people with genuine experience, progressive revelation,
// empirical experiments, and the Story Atlas.

export const CHAPTERS = [
  { id: 'all', name: 'All Stories' },
  { id: 'work-careers', name: 'Work & Careers' },
  { id: 'money-business', name: 'Money & Business' },
  { id: 'technology', name: 'Technology' },
  { id: 'systems', name: 'Systems' },
  { id: 'creators', name: 'Creators' },
  { id: 'unusual-experiences', name: 'Unusual Experiences' },
  { id: 'experiments', name: 'Experiments' },
  { id: 'truth-desk', name: 'Truth Desk' },
];

export const chapterById = (id) => CHAPTERS.find((c) => c.id === id) || { id, name: id.replace(/-/g, ' ') };

export const STATIONS = {
  'colaba': { name: 'Colaba', dateline: 'COLABA' },
  'churchgate': { name: 'Churchgate', dateline: 'CHURCHGATE' },
  'mumbai-central': { name: 'Mumbai Central', dateline: 'MUMBAI CENTRAL' },
  'dadar': { name: 'Dadar', dateline: 'DADAR' },
  'bandra': { name: 'Bandra', dateline: 'BANDRA W' },
  'andheri': { name: 'Andheri', dateline: 'ANDHERI W' },
  'borivali': { name: 'Borivali', dateline: 'BORIVALI W' },
  'csmt': { name: 'CSMT', dateline: 'CSMT' },
  'byculla': { name: 'Byculla', dateline: 'BYCULLA' },
  'kurla': { name: 'Kurla', dateline: 'KURLA' },
  'ghatkopar': { name: 'Ghatkopar', dateline: 'GHATKOPAR' },
  'thane': { name: 'Thane', dateline: 'THANE W' },
  'wadala': { name: 'Wadala', dateline: 'WADALA' },
  'vashi': { name: 'Vashi', dateline: 'VASHI' },
  'panvel': { name: 'Panvel', dateline: 'PANVEL' },
};

export const stationName = (slug) => STATIONS[slug]?.name || slug;

export const datelineName = (slug) =>
  slug ? (STATIONS[slug]?.dateline || stationName(slug).toUpperCase()) : 'STORYLETTR DESK';

export const sealStatus = (item) => (item.type === 'fact-check' ? 'checked' : 'verified');

// People as First-Class Citizens
export const CONTRIBUTORS = {
  'arjun-mehta': {
    slug: 'arjun-mehta',
    name: 'Arjun Mehta',
    isDemo: true,
    role: 'Independent Retail Business Owner',
    location: 'Thane',
    station: 'thane',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    bio: 'Built and operates a 3-location specialty consumer electronics distribution business without venture funding.',
    knowsAbout: ['Retail operations', 'Customer retention', 'Distribution economics', 'B2B incentives'],
    storylettrCount: 1,
    featuredInsight: 'His repeat customers behave completely differently from his first-time customers, but most software treats them as identical.',
    storySlug: 'manufacturer-unsung-salesperson',
  },
  'vikram-rao': {
    slug: 'vikram-rao',
    name: 'Vikram Rao',
    isDemo: true,
    role: 'Independent Café & Restaurant Operator',
    location: 'Vashi',
    station: 'vashi',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    bio: 'Operates 2 neighborhood cafés with sustained 18% operating margins in a high-churn hospitality market.',
    knowsAbout: ['Menu psychology', 'Supply-chain shrinkage', 'Labor scheduling', 'Default choice architecture'],
    storylettrCount: 1,
    featuredInsight: 'Removing options from a menu increased average order value because choice reduction altered what customers treated as default.',
    storySlug: 'cafe-owner-price-change',
  },
  'maya-sen': {
    slug: 'maya-sen',
    name: 'Maya Sen',
    isDemo: true,
    role: 'Talent Acquisition Lead',
    location: 'Andheri',
    station: 'andheri',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    bio: 'Screened over 14,000 engineering and product resumes across tech scale-ups and consulting firms.',
    knowsAbout: ['Resume screening patterns', 'Hiring velocity', 'Signal-to-noise in interviews', 'Portfolio evaluation'],
    storylettrCount: 1,
    featuredInsight: 'The most frequent CV mistake happens in the first 4 seconds before the reviewer ever reads past the first 2 bullet points.',
    storySlug: 'recruiter-cv-mistake',
  },
  'marcus-vance': {
    slug: 'marcus-vance',
    name: 'Marcus Vance',
    isDemo: true,
    role: 'Founder & CEO, Meridian Software',
    location: 'Bandra',
    station: 'bandra',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    bio: 'Bootstrapped Meridian Software to $12M ARR with 52 full-time employees, testing asynchronous operational models.',
    knowsAbout: ['Asynchronous work', 'Sprint velocity', 'Executive time allocation', 'Intensity compression'],
    storylettrCount: 1,
    featuredInsight: 'Axing Fridays increased sprint completion by 22%, but exposed a hidden risk of intensity compression.',
    storySlug: '4-day-workweek-tech-ceo',
  },
  'elena-rostova': {
    slug: 'elena-rostova',
    name: 'Elena Rostova',
    isDemo: true,
    role: 'Independent Creator & Bootstrapped Founder',
    location: 'Colaba',
    station: 'colaba',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250',
    bio: 'Grew a niche 6,500-member community generating $35k/month without producing high-volume viral social content.',
    knowsAbout: ['Audience monetisation', 'Niche pricing power', 'Substack & newsletter economics', 'Anti-viral positioning'],
    storylettrCount: 1,
    featuredInsight: 'Follower count had a near-zero correlation with purchasing power once audience specificity surpassed a critical threshold.',
    storySlug: 'niche-creator-monetization',
  },
  'suresh-patil': {
    slug: 'suresh-patil',
    name: 'Suresh Patil',
    isDemo: true,
    role: 'Growth Strategist & Founder',
    location: 'Dadar',
    station: 'dadar',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=250',
    bio: 'Former performance marketing lead who transitioned his B2B SaaS from Google Ads to customer referral loops.',
    knowsAbout: ['Referral engineering', 'Paid acquisition traps', 'Customer lifetime value', 'Unit economics'],
    storylettrCount: 1,
    featuredInsight: 'Customers referred by other customers closed 3x faster and churned 50% less than leads acquired through paid advertising.',
    storySlug: 'stopped-running-ads-growth',
  },
  'aakash-fernandes': {
    slug: 'aakash-fernandes',
    name: 'Aakash Fernandes',
    isDemo: false,
    role: 'Truth Desk Investigator',
    location: 'Mumbai Central',
    station: 'mumbai-central',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=250',
    bio: 'Investigates viral claims, rumors, and misinformation spreading across WhatsApp and social platforms.',
    knowsAbout: ['Source verification', 'Public transit records', 'Claim analysis', 'Regulatory notifications'],
    storylettrCount: 3,
    featuredInsight: 'The vast majority of viral panic messages originate from real, narrow announcements stripped of their limiting context.',
    storySlug: 'will-mumbai-locals-stop-from-monday',
  },
};

// Aliased for backwards compatibility with authors
export const AUTHORS = CONTRIBUTORS;

export const GLOSSARY = {
  'intensity-compression': {
    term: 'Intensity compression',
    short: 'The psychological and cultural stress created when 40 hours of workplace demands are forced into 32 hours without removing lower-priority obligations.',
  },
  'default-effect': {
    term: 'Default effect',
    short: 'The cognitive bias where consumers disproportionately choose pre-selected or middle-tier offerings because making a custom comparison requires cognitive effort.',
  },
  'referral-loop': {
    term: 'Referral loop',
    short: 'A deliberate mechanism where using a product naturally introduces it to new potential users without paying for external ads.',
  },
};

// Stories, Explainers, and Fact-Checks
export const CONTENT = [
  // 1. Featured Curiosity Story: Today's Letter
  {
    type: 'story',
    slug: 'stopped-running-ads-growth',
    isDemo: true,
    chapter: 'money-business',
    station: 'dadar',
    headline: 'Everyone told him to increase his advertising budget. He stopped running ads instead.',
    hook: 'When performance marketing costs doubled, Suresh did the unthinkable: he zeroed out his ad spend and focused on engineering one specific referral trigger.',
    tinyPayoff: 'Three months later, customer referrals accounted for 74% of all new revenue.',
    curiosityPrompt: 'Why did it work, and what was the mechanism?',
    summary: 'A B2B founder cut his $8,000/month digital advertising budget to zero. Here is the operational loop he engineered that replaced it.',
    tenSecondTakeaway: [
      'Paid ads were masking weak product retention and high customer churn.',
      'He replaced ad spend with a post-onboarding milestone gift delivered directly to the client team.',
      'That single physical touchpoint triggered organic peer recommendations in 7 out of 10 accounts.',
    ],
    stages: [
      { id: 'intro', label: '1. The Ad Trap' },
      { id: 'insight', label: '2. The Trigger' },
      { id: 'evidence', label: '3. Data' },
      { id: 'experiment', label: '4. StoryLettr Test' },
      { id: 'outcome', label: '5. What It Means' },
    ],
    postmark: { station: 'dadar', date: '2026-09-24', status: 'verified' },
    byline: 'suresh-patil',
    readingTimeMin: 5,
    lastUpdated: '2026-09-24',
    body: [
      'In early 2025, Suresh Patil was spending ₹6.5 lakh each month on Google and LinkedIn ads to acquire clients for his cloud inventory tool. Every marketing agency told him the same thing: double down, bid higher, and test more creative variants.',
      'Instead, he looked at his unit economics. The customers arriving through ads churned within 90 days at an alarming rate of 42%. They were buying on a discount hook, not because they had an urgent workflow problem.',
      'He made a radical decision: he cut paid advertising entirely to zero. For the first three weeks, new inbound signups dropped by 60%. But then his team redirected the saved capital into solving one single friction point in client onboarding.',
      'Whenever a client completed their first 50 automated inventory audits, a personalized physical verification dispatch arrived at their warehouse office addressed to the shift lead. It wasn’t branded swag — it was a practical laminated operations guide customized with their warehouse floor plan.',
      'Within two months, shift leads were photographing the guides and posting them in regional logistics WhatsApp groups. Referrals didn’t happen through automated affiliate links; they happened because a physical artifact proved competence on the job.',
    ],
    revealCard: {
      prompt: 'What was the exact trigger that converted customers into advocates?',
      buttonText: 'Reveal the Trigger',
      revealedText: 'A personalized, physical warehouse floor guide sent automatically upon completing their 50th audit.',
      explanation: 'Digital referral links get ignored. Physical tools that solve a real operational headache create permanent desk presence and trigger word-of-mouth.',
    },
    predictionCard: {
      question: 'When advertising stopped, what happened to customer acquisition cost (CAC)?',
      options: [
        'CAC increased because fewer leads entered the top of the funnel.',
        'CAC dropped by 68% because referral leads had a 3x higher conversion rate.',
        'CAC remained identical because organic sales required more human sales reps.',
      ],
      correctIndex: 1,
      explanation: 'Referral leads entered conversations pre-sold on trust. The sales cycle compressed from 44 days to 14 days, cutting overall acquisition costs dramatically.',
      actualOutcome: 'Demo result: Blended CAC dropped from ₹18,400 to ₹5,800 within 90 days.',
    },
    beforeAfterBlock: {
      title: 'Performance Comparison: Paid Ads vs Referral Architecture',
      beforeLabel: 'Paid Ad Regime',
      beforeValue: '42% 90-Day Churn | ₹18,400 CAC | 44-Day Sales Cycle',
      afterLabel: 'Referral Loop Regime',
      afterValue: '11% 90-Day Churn | ₹5,800 CAC | 14-Day Sales Cycle',
      explanation: 'Prototype demo metrics illustrative of B2B referral conversion gains.',
    },
    experiment: {
      title: 'StoryLettr Experiment: Physical Artifacts vs Email Referral Requests',
      contributorClaim: 'Sending a tangible, useful artifact upon milestone completion generates 3x more referrals than a standard automated email.',
      testSetup: 'We tested Suresh’s milestone trigger across 40 new subscribers to our editorial dispatches. Group A (20 members) received a digital referral email after reading 4 stories. Group B (20 members) received a physically stamped wax-sealed postal dispatch note.',
      sampleResults: [
        { metric: 'Group A (Email Request)', value: '5% referral rate (1/20)' },
        { metric: 'Group B (Physical Note)', value: '30% referral rate (6/20)' },
        { metric: 'Cost per acquired referral', value: '₹42 for Note vs ₹0 for Email' },
      ],
      whatWeLearned: 'Physical objects command tactile attention that emails cannot replicate in crowded digital inboxes.',
      whatThisDoesNotProve: 'This was a small pilot test (40 participants) and does not prove physical mail will always outperform email across mass-market consumer apps.',
      limitations: 'Physical delivery involves postage logistics, printing latency, and unit shipping costs that scale with volume.',
    },
    howWeKnowThis: {
      contributorSaid: 'Suresh Patil provided anonymized Stripe dashboard receipts and CRM referral source tags spanning a 6-month period.',
      verified: 'Confirmed ad spend was reduced to zero via Google Ads invoice records; verified referral attribution tags in customer onboarding records.',
      independentlyFound: 'Industry benchmarks from OpenView show referral-led B2B software companies enjoy 2.5x higher Net Retention Rates than pure ad-driven competitors.',
      ourInterpretation: 'Ad spend often functions as an expensive band-aid masking poor product satisfaction. Removing ads forces organizations to fix retention.',
      remainsUncertain: 'Whether this strategy works as cleanly in saturated B2C consumer categories with lower individual customer lifetime values.',
      sources: ['Stripe billing export (anonymized)', 'OpenView SaaS Metrics Report 2024'],
    },
    tapForContext: ['referral-loop'],
    related: ['cafe-owner-price-change', 'manufacturer-unsung-salesperson'],
  },

  // 2. Café Owner Price Change
  {
    type: 'story',
    slug: 'cafe-owner-price-change',
    isDemo: true,
    chapter: 'money-business',
    station: 'vashi',
    headline: 'A café owner stopped offering discounts. Sales went up.',
    hook: 'Convinced that price wars were eroding his brand, Vikram eliminated all combo coupons. What happened next baffled his accountant.',
    tinyPayoff: 'He discovered that one ₹20 change altered what customers ordered as default.',
    curiosityPrompt: 'What single item change flipped customer psychology?',
    summary: 'A restaurant operator reduced menu choices, eliminated discount coupons, and increased his average ticket size by 28%.',
    tenSecondTakeaway: [
      'Discounts attracted bargain-hunters who occupied tables during rush hours without ordering extras.',
      'He removed the lowest-priced single espresso from the board, establishing a curated flat white as standard.',
      'Removing bottom options altered customer perception of default value.',
    ],
    stages: [
      { id: 'intro', label: '1. Discount Trap' },
      { id: 'insight', label: '2. The Default Shift' },
      { id: 'evidence', label: '3. Ticket Data' },
      { id: 'experiment', label: '4. Menu Test' },
      { id: 'outcome', label: '5. Takeaway' },
    ],
    postmark: { station: 'vashi', date: '2026-09-22', status: 'verified' },
    byline: 'vikram-rao',
    readingTimeMin: 4,
    lastUpdated: '2026-09-22',
    body: [
      'When third-party delivery apps began demanding 30% commissions and aggressive discount promotions, Vikram Rao felt his Vashi café was bleeding money just to keep seats warm.',
      '“We were running 20% off flat discounts on student IDs. Our tables were packed from 3 PM to 7 PM, but our daily register was barely breaking even on milk and roast costs,” Vikram explains.',
      'Instead of adding more discount tiers, Vikram did the opposite: he killed all coupons overnight and simplified his 34-item beverage menu down to 9 signature drinks.',
      'Crucially, he removed the basic ₹80 single espresso that anchors low pricing. By setting the starting tier at a high-quality ₹140 house blend flat white, the psychological "middle anchor" shifted.',
      'Customers no longer felt like they were buying an upscale drink — they felt they were ordering the baseline standard.',
    ],
    revealCard: {
      prompt: 'What happened to overall foot traffic after removing discounts?',
      buttonText: 'Reveal the Outcome',
      revealedText: 'Foot traffic dropped by 12%, but net weekly profit increased by 31%.',
      explanation: 'Fewer low-margin table campers allowed high-ticket orders to be processed faster during peak morning and evening rushes.',
    },
    predictionCard: {
      question: 'When menu choices were reduced from 34 to 9, how did order times change?',
      options: [
        'Customers took longer to decide because they missed their favorites.',
        'Order queue decision time dropped from 85 seconds to 22 seconds per customer.',
        'No measurable difference in counter transaction speed.',
      ],
      correctIndex: 1,
      explanation: 'Choice paralysis delays queues. Fewer items enabled faster barista preparation and quicker counter throughput.',
      actualOutcome: 'Average queue wait time decreased by over 60 seconds.',
    },
    beforeAfterBlock: {
      title: 'Café Financial Comparison: Discounts vs Curated Menu',
      beforeLabel: 'Heavy Discounting',
      beforeValue: '₹142 Average Order Value | 34 Menu Items | 7% Net Margin',
      afterLabel: 'Curated 9-Item Menu',
      afterValue: '₹210 Average Order Value | 9 Menu Items | 22% Net Margin',
      explanation: 'Prototype demo metrics illustrative of restaurant menu consolidation.',
    },
    experiment: {
      title: 'StoryLettr Experiment: Menu Length & Decision Velocity',
      contributorClaim: 'Reducing options makes customers choose higher-margin items faster.',
      testSetup: 'We created two digital coffee menu interfaces for 60 volunteer readers: Version A (28 items) vs Version B (8 items).',
      sampleResults: [
        { metric: 'Version A (28 choices)', value: 'Avg decision time: 74 seconds' },
        { metric: 'Version B (8 choices)', value: 'Avg decision time: 26 seconds' },
        { metric: 'Middle-tier selection', value: '44% higher on Version B' },
      ],
      whatWeLearned: 'Restricting choice reduces cognitive friction and shifts preference toward the highlighted middle option.',
      whatThisDoesNotProve: 'Does not prove that removing options works for fine-dining or specialty retail where novelty is the primary attraction.',
      limitations: 'Conducted on digital prototypes; physical sensory cues in a live cafe may alter consumer patience.',
    },
    howWeKnowThis: {
      contributorSaid: 'Vikram Rao shared POS sales records before and after the menu restructuring in Vashi.',
      verified: 'Verified menu items and average ticket price changes against point-of-sale exports.',
      independentlyFound: 'Behavioral economics literature (Iyengar & Lepper) shows that choice overload consistently depresses conversion.',
      ourInterpretation: 'Discounting conditions customers to view your product as a commodity. Menu curation restores perceived value.',
      remainsUncertain: 'Whether customer loyalty persists over years if competitive discount cafes open nearby.',
      sources: ['POS Terminal Export 2025', 'Journal of Personality and Social Psychology: Choice Overload Study'],
    },
    tapForContext: ['default-effect'],
    related: ['stopped-running-ads-growth', 'manufacturer-unsung-salesperson'],
  },

  // 3. Recruiter CV Screening Mistake
  {
    type: 'story',
    slug: 'recruiter-cv-mistake',
    isDemo: true,
    chapter: 'work-careers',
    station: 'andheri',
    headline: 'A recruiter rejected hundreds of CVs. One mistake appeared again and again.',
    hook: 'Maya Sen screened 14,000 tech and management applications. The fatal error that disqualifies applicants has almost nothing to do with qualifications.',
    tinyPayoff: 'The issue appears in the first 4 seconds before the reviewer even reads the experience section.',
    curiosityPrompt: 'What is the overlooked screening flaw?',
    summary: 'A veteran recruiter reveals why qualified candidates get rejected instantly, and the 2-line adjustment that reverses it.',
    tenSecondTakeaway: [
      'Recruiters scan for cognitive coherence, not comprehensive lists of responsibilities.',
      'The #1 mistake: Listing daily duties rather than measurable delta outcomes.',
      'A CV stating "managed team" loses to "shortened release cycle from 3 weeks to 4 days."',
    ],
    stages: [
      { id: 'intro', label: '1. The 4-Second Scan' },
      { id: 'insight', label: '2. The Fatal Flaw' },
      { id: 'evidence', label: '3. Applicant Audit' },
      { id: 'experiment', label: '4. Testing Two CVs' },
      { id: 'outcome', label: '5. The Rewrite Framework' },
    ],
    postmark: { station: 'andheri', date: '2026-09-20', status: 'verified' },
    byline: 'maya-sen',
    readingTimeMin: 5,
    lastUpdated: '2026-09-20',
    body: [
      '“Most job seekers believe hiring managers sit down with a cup of coffee and read their cover letter from start to finish,” says Maya Sen, who leads talent acquisition in Andheri.',
      '“In reality, we open a batch of 120 resumes between meetings. We spend an average of 4 to 6 seconds per resume before deciding whether it goes to the shortlist or the archive.”',
      'The mistake that sinks 80% of rejected candidates isn’t lack of pedigree or missing skills. It’s what Maya calls the "Duty Trap."',
      'Candidates write resumes that look like job descriptions: "Responsible for managing sprint backlogs. Coordinated with cross-functional stakeholders. Attended daily standups."',
      'A recruiter already knows what a product manager does. What they need to know in 4 seconds is: what changed because you were in that seat?',
    ],
    revealCard: {
      prompt: 'What exact formula should replace responsibility bullet points?',
      buttonText: 'Reveal the Formula',
      revealedText: '[Action Verb] + [Specific Problem] + [Measurable Delta Outcome].',
      explanation: 'Example: Instead of "Handled customer tickets", write: "Resolved 45 escalations/day and cut first-response latency by 35%."',
    },
    predictionCard: {
      question: 'When a candidate puts their skill tags at the very top vs integrated into accomplishments, what happens?',
      options: [
        'Skills at top gets 50% more interviews because ATS keyword scanners read top-down.',
        'Skills at top gets skipped because recruiters scan for context, not keyword laundry lists.',
        'No difference in interview callback rates.',
      ],
      correctIndex: 1,
      explanation: 'Recruiters know anyone can copy-paste a list of 20 buzzwords. Proof of skill embedded in a concrete accomplishment establishes credibility.',
      actualOutcome: 'Resumes with evidence-linked skills outperformed detached keyword boxes by 42%.',
    },
    beforeAfterBlock: {
      title: 'CV Bullet Point Rewrite Test',
      beforeLabel: 'Duty-Based Bullet',
      beforeValue: '"Responsible for digital marketing campaigns and managing budget."',
      afterLabel: 'Delta-Outcome Bullet',
      afterValue: '"Restructured paid acquisition channels, reducing cost-per-lead from ₹320 to ₹140."',
      explanation: 'Direct comparison from candidate review audit.',
    },
    experiment: {
      title: 'StoryLettr Experiment: The 6-Second Recruiter Eye-Tracking Test',
      contributorClaim: 'Recruiters glance at titles and the first 3 words of bullet points before reading sentences.',
      testSetup: 'We simulated screening across 5 hiring managers reviewing 30 anonymized resumes with identical qualifications formatted either with Duty Bullets or Outcome Bullets.',
      sampleResults: [
        { metric: 'Duty Bullets Shortlist Rate', value: '18% callback rate' },
        { metric: 'Outcome Bullets Shortlist Rate', value: '62% callback rate' },
        { metric: 'Average Time Spent Reviewing', value: '11 seconds for Outcome vs 4 seconds for Duty' },
      ],
      whatWeLearned: 'Front-loading measurable numbers arrests recruiter eye movement and triggers deeper reading.',
      whatThisDoesNotProve: 'Does not guarantee hiring in executive or highly specialized scientific roles where peer network references dominate.',
      limitations: 'Conducted in tech and marketing domain samples; academic or civil service resumes follow different standard formats.',
    },
    howWeKnowThis: {
      contributorSaid: 'Maya Sen provided anonymized screening notes from 400 candidate reviews across 4 hiring pipelines.',
      verified: 'Cross-referenced screening criteria with hiring standards at 3 tech startups.',
      independentlyFound: 'Ladders 2023 Eye-Tracking Study confirmed recruiters spend 7.4 seconds on initial resume review.',
      ourInterpretation: 'Resumes are persuasive marketing documents, not legal transcripts of past activity.',
      remainsUncertain: 'How automated AI resume parsers will alter human screening biases over the next 24 months.',
      sources: ['Internal candidate review logs', 'Ladders Eye-Tracking Study Report'],
    },
    tapForContext: [],
    related: ['4-day-workweek-tech-ceo', 'niche-creator-monetization'],
  },

  // 4. Small Manufacturer Unsung Salesperson
  {
    type: 'story',
    slug: 'manufacturer-unsung-salesperson',
    isDemo: true,
    chapter: 'systems',
    station: 'thane',
    headline: 'A small manufacturer says his best salesperson isn’t a salesperson.',
    hook: 'Arjun Mehta runs a precision components plant in Thane. His business doubled without hiring a single business development representative.',
    tinyPayoff: 'Most new orders arrive through an overlooked part of his distribution network: independent repair technicians.',
    curiosityPrompt: 'How did he turn mechanics into his primary channel?',
    summary: 'A manufacturing owner bypassed trade shows and cold outreach to build a multi-crore order engine powered by field mechanics.',
    tenSecondTakeaway: [
      'Factory owners don’t trust sales reps; they trust the technicians fixing their broken machines at 2 AM.',
      'He created free technical diagnostic teardown guides distributed directly to field mechanics.',
      'When machines broke down, the technicians specifically recommended his parts as the only reliable replacement.',
    ],
    stages: [
      { id: 'intro', label: '1. The Cold Outreach Failure' },
      { id: 'insight', label: '2. The Mechanic Network' },
      { id: 'evidence', label: '3. Order Flow' },
      { id: 'experiment', label: '4. StoryLettr Channel Test' },
      { id: 'outcome', label: '5. The Principle' },
    ],
    postmark: { station: 'thane', date: '2026-09-18', status: 'verified' },
    byline: 'arjun-mehta',
    readingTimeMin: 6,
    lastUpdated: '2026-09-18',
    body: [
      'For five years, Arjun Mehta did what every industrial manufacturer does: he paid ₹4 lakh each year for booths at industrial expos and hired young sales reps to cold-call procurement heads.',
      '“Procurement officers are trained to negotiate price down to the millimeter,” Arjun notes. “They don’t care about durability until an entire conveyor belt shuts down.”',
      'The epiphany arrived when an emergency call came in on a Sunday night from an automotive plant in Pune. The plant didn’t call because of an expo flyer. A third-party technician fixing their motor had specified Arjun’s bearing part by name.',
      'Arjun pivoted his entire marketing budget into supporting independent repair mechanics across Maharashtra. He didn’t offer commission kickbacks. He offered free calibration tools and accurate replacement wiring schematics.',
      'Today, over 80% of his factory’s high-margin repeat orders originate from mechanic recommendations.',
    ],
    revealCard: {
      prompt: 'Why did technicians prefer his parts without financial kickbacks?',
      buttonText: 'Reveal the Reason',
      revealedText: 'His components included pre-measured alignment pins that saved mechanics 45 minutes on emergency callouts.',
      explanation: 'Solving the installer’s physical workflow problem creates intense brand loyalty that sales commissions cannot buy.',
    },
    predictionCard: {
      question: 'What happened when Arjun stopped attending industrial trade shows?',
      options: [
        'New customer inquiries dropped by half.',
        'Customer inquiries increased because technician recommendations had 5x higher close rates.',
        'Competitors stole his top industrial accounts.',
      ],
      correctIndex: 1,
      explanation: 'Expo leads were passive shoppers comparing prices. Mechanic leads were urgent operational emergencies ready to buy immediately.',
      actualOutcome: 'Inbound revenue grew by 34% in the first 12 months after reallocating expo budgets.',
    },
    beforeAfterBlock: {
      title: 'Customer Acquisition Channel Audit',
      beforeLabel: 'Expo & Cold Sales Reps',
      beforeValue: '₹3.8L Cost/Year | 6% Lead Conversion | 18% Price Discount Needed',
      afterLabel: 'Technician Tool Program',
      afterValue: '₹90k Cost/Year | 58% Lead Conversion | Zero Discount Demanded',
      explanation: 'Real operational data from precision engineering plant.',
    },
    experiment: {
      title: 'StoryLettr Experiment: The Influencer vs Practitioner Referral Test',
      contributorClaim: 'Recommendations from ground-level fixers carry more trust than official sales reps.',
      testSetup: 'We tested B2B software tool recommendations across two cohorts of 30 engineering leads: Cohort A received outreach from a company sales director; Cohort B received an organic review from a peer freelance developer.',
      sampleResults: [
        { metric: 'Cohort A (Sales Rep)', value: '7% demo request rate' },
        { metric: 'Cohort B (Peer Developer)', value: '38% demo request rate' },
      ],
      whatWeLearned: 'Trust is transferred through shared operational pain, not titles or sales polish.',
      whatThisDoesNotProve: 'Does not apply to enterprise software purchases requiring formal RFP legal compliance and multi-stakeholder boards.',
      limitations: 'Relies on finding accessible grassroots practitioners with influence over decision makers.',
    },
    howWeKnowThis: {
      contributorSaid: 'Arjun Mehta shared supplier ledgers and order attribution history from 2022 to 2025.',
      verified: 'Confirmed order referral tags and interviewed two independent Pune technicians who regularly specify his parts.',
      independentlyFound: 'Harvard Business Review research shows B2B buyers complete 57% of purchase decisions before ever contacting a supplier sales rep.',
      ourInterpretation: 'Find the person whose reputation is at stake when something breaks — they are your true distribution channel.',
      remainsUncertain: 'Whether scaling to pan-India distribution dilutes the personal relationship with local technician unions.',
      sources: ['Internal order dispatch records', 'HBR: The End of Solution Sales'],
    },
    tapForContext: [],
    related: ['stopped-running-ads-growth', 'cafe-owner-price-change'],
  },

  // 5. Creator Audience vs Revenue
  {
    type: 'story',
    slug: 'niche-creator-monetization',
    isDemo: true,
    chapter: 'creators',
    station: 'colaba',
    headline: 'A creator with a small audience earns more than creators ten times larger.',
    hook: 'Elena Rostova has only 6,500 followers. Yet her editorial research boutique generates $35,000/month. The math behind micro-scale monetization.',
    tinyPayoff: 'Follower count was not the metric driving revenue; buyer density was.',
    curiosityPrompt: 'How does high buyer density beat viral audience size?',
    summary: 'An unfiltered look into the economics of niche B2B newsletters vs mass-market influencer sponsorships.',
    tenSecondTakeaway: [
      'Mass social platforms reward generic content that broad audiences click on but never pay for.',
      'She wrote exclusively about regulatory compliance in cross-border trade, read by 400 trade lawyers.',
      'Law firms gladly pay $1,200/year for data that saves them 5 billable research hours.',
    ],
    stages: [
      { id: 'intro', label: '1. The Follower Myth' },
      { id: 'insight', label: '2. Buyer Density' },
      { id: 'evidence', label: '3. Financial Ledger' },
      { id: 'experiment', label: '4. Survey Test' },
      { id: 'outcome', label: '5. What Creators Miss' },
    ],
    postmark: { station: 'colaba', date: '2026-09-15', status: 'verified' },
    byline: 'elena-rostova',
    readingTimeMin: 5,
    lastUpdated: '2026-09-15',
    body: [
      'If you scroll Instagram or LinkedIn, creator advice is almost universally focused on audience growth: "How to get your first 100k followers," "How to go viral on Reels."',
      'Elena Rostova tried that for six months in 2023. She gained 25,000 followers posting generic career inspiration quotes. Her monthly earnings? Less than $400 in low-tier affiliate commissions.',
      '“I realized that broad audiences are filled with passive spectators. They will like your post while waiting in line for a cab, but they will never enter a credit card number,” Elena says.',
      'She deleted her broad accounts and started over with a hyper-specific topic: maritime customs tariff changes between South Asia and Europe. Her audience shrank from 25,000 to 1,200 in the first quarter.',
      'But those 1,200 readers were trade attorneys, freight forwarders, and logistics directors. When she launched an annual research report for $1,200, 240 organizations subscribed in 30 days.',
    ],
    revealCard: {
      prompt: 'What was her average revenue per follower (ARPF)?',
      buttonText: 'Reveal the Financial Math',
      revealedText: 'Elena earns $64 per follower/year. Typical lifestyle influencers average under $0.15 per follower.',
      explanation: 'Enterprise B2B publications are expensed to company budgets, making price resistance virtually nonexistent.',
    },
    predictionCard: {
      question: 'What happens to subscriber churn when content becomes ultra-technical?',
      options: [
        'Churn increases because readers get bored of technical jargon.',
        'Churn drops to near zero (<2%) because no alternative source exists.',
        'Churn stays the same as consumer newsletters.',
      ],
      correctIndex: 1,
      explanation: 'Commodity news has 8% monthly churn. Niche regulatory coverage becomes an indispensable workplace utility with >95% annual renewal.',
      actualOutcome: 'Elena’s annual subscription renewal rate is 94.2%.',
    },
    beforeAfterBlock: {
      title: 'Creator Model Comparison',
      beforeLabel: 'Broad Viral Account',
      beforeValue: '25,000 Followers | $380/month | $0.015/follower',
      afterLabel: 'Niche B2B Dispatch',
      afterValue: '6,500 Followers | $35,000/month | $64.60/follower',
      explanation: 'Verified financial ledger audit.',
    },
    experiment: {
      title: 'StoryLettr Experiment: Broad Content vs Niche Problem Willingness to Pay',
      contributorClaim: 'Specific problem solving commands 20x higher willingness to pay than general industry news.',
      testSetup: 'We polled 200 readers with two hypothetical subscriptions: (A) Daily Tech News Digest for ₹299/mo vs (B) Specific API Security Audit Cheat-sheet for ₹4,999/mo.',
      sampleResults: [
        { metric: 'Tech News Digest (₹299)', value: '14% stated intent to buy (low actual conversion)' },
        { metric: 'Security Cheat-sheet (₹4,999)', value: '29% enterprise intent to buy with corporate expense card' },
      ],
      whatWeLearned: 'Corporate expense capability fundamentally changes creator revenue ceilings.',
      whatThisDoesNotProve: 'Does not apply to pure entertainment or pop culture creators whose business model relies on mass brand sponsorship.',
      limitations: 'Requires deep subject-matter expertise that cannot be outsourced to cheap generic copywriters.',
    },
    howWeKnowThis: {
      contributorSaid: 'Elena Rostova shared verified Stripe dashboard revenue summaries from 2024 to 2026.',
      verified: 'Cross-checked subscriber accounts with corporate domain registrations.',
      independentlyFound: 'Substack creator analytics confirm top 10% paid publications are overwhelmingly specialized business publications.',
      ourInterpretation: 'Stop optimizing for audience size; optimize for audience purchasing power and problem urgency.',
      remainsUncertain: 'Whether AI automated scrapers will commoditize regulatory updates over the next 3 years.',
      sources: ['Stripe billing export', 'Substack State of Paid Newsletters Report'],
    },
    tapForContext: [],
    related: ['recruiter-cv-mistake', 'stopped-running-ads-growth'],
  },

  // 6. Tech CEO 4-Day Workweek
  {
    type: 'story',
    slug: '4-day-workweek-tech-ceo',
    isDemo: true,
    chapter: 'work-careers',
    station: 'bandra',
    headline: 'Inside the 4-day workweek experiment: what a 50-person tech CEO actually discovered.',
    hook: 'When Marcus cut Fridays for his software company, everyone expected revenue to drop. Productivity jumped 22% — but unmasked a deeper hidden tension.',
    tinyPayoff: 'Productivity rose, but unmasked "Intensity Compression": stress concentrated into 32 hours.',
    curiosityPrompt: 'What hidden operational trap did the 4-day week expose?',
    summary: 'Marcus Vance compressed 40 hours into 32 hours across 52 employees. The full unfiltered data on sprint output, turnover, and cultural tradeoffs.',
    tenSecondTakeaway: [
      'Sprint completion increased 22% because 80% of daily meetings were eliminated.',
      'Sick days and employee turnover dropped by over 60%.',
      'The hidden trap: Without strict async rules, 32-hour weeks concentrate stress and eliminate casual social buffers.',
    ],
    stages: [
      { id: 'intro', label: '1. Why Axe Fridays?' },
      { id: 'insight', label: '2. The Meeting Purge' },
      { id: 'evidence', label: '3. The Data' },
      { id: 'experiment', label: '4. StoryLettr 30-Day Trial' },
      { id: 'outcome', label: '5. The Tradeoff' },
    ],
    postmark: { station: 'bandra', date: '2026-09-12', status: 'verified' },
    byline: 'marcus-vance',
    readingTimeMin: 6,
    lastUpdated: '2026-09-12',
    body: [
      'In early 2025, engineering sprint completion at Meridian Software was at an all-time low of 61%. Engineers were answering Slack messages at midnight and sending frantic pull requests on Sunday afternoons.',
      'CEO Marcus Vance made a bold announcement: Friday was eliminated. Salaries remained 100% intact, but weekly office expectations shifted from 40 hours to 32 hours.',
      'The initial shock was immediate: to protect 32 hours, the company banned all meetings before 1 PM. “We discovered that 80% of our internal meetings were simply theatrical check-ins to make managers feel in control,” Marcus says.',
      'Sprint completion jumped to 83% within three weeks. But by Month 4, Marcus observed an unexpected symptom: Intensity Compression.',
      'Because every hour on Monday through Thursday was intensely optimized for output, casual water-cooler conversations evaporated. Team members reported feeling exhausted by Thursday evening, even as their measured productivity hit records.',
    ],
    revealCard: {
      prompt: 'What was the single rule that saved the experiment from failing?',
      buttonText: 'Reveal the Rule',
      revealedText: 'The "Zero-Notification Morning": All Slack pings and emails were auto-muted from 9 AM to 12 PM.',
      explanation: 'Deep work blocks allowed complex coding without the context-switching tax that creates burnout.',
    },
    predictionCard: {
      question: 'What happened to client customer support response times when Friday was closed?',
      options: [
        'Support tickets piled up and client satisfaction crashed.',
        'Support response improved because team was split into Mon-Thu and Tue-Fri coverage shifts.',
        'Clients left for competitors offering 24/7 coverage.',
      ],
      correctIndex: 1,
      explanation: 'Customer-facing teams staggered their 4-day schedules, keeping 5-day continuous coverage while employees worked 4 days.',
      actualOutcome: 'Client satisfaction score rose from 4.1 to 4.7 out of 5.',
    },
    beforeAfterBlock: {
      title: 'Company Metrics: 5-Day vs 4-Day Model',
      beforeLabel: '5-Day Standard Week',
      beforeValue: '61% Sprint Completion | 28 Sick Days/Quarter | 18% Annual Churn',
      afterLabel: '4-Day Compact Week',
      afterValue: '83% Sprint Completion | 11 Sick Days/Quarter | 6% Annual Churn',
      explanation: 'Audited internal HR and Jira dashboard data.',
    },
    experiment: {
      title: 'StoryLettr Experiment: 30-Day Zero-Sync Thursday Trial',
      contributorClaim: 'Eliminating synchronous internal meetings increases deep research output without delaying publication.',
      testSetup: 'StoryLettr tested Marcus’s async framework across our core editorial team for 30 consecutive days, banning all sync meetings on Thursdays.',
      sampleResults: [
        { metric: 'Deep Writing Hours', value: '+38% uninterrupted focus time' },
        { metric: 'Publication Velocity', value: 'Rose from 3 to 5 dispatches/month' },
        { metric: 'Team Isolation Report', value: '1 member felt disconnected; resolved via optional social coffee' },
      ],
      whatWeLearned: 'Deep work rules dramatically increase velocity, but require explicit social buffers to prevent transactional workplace isolation.',
      whatThisDoesNotProve: 'Does not prove 4-day models succeed in physical retail, assembly manufacturing, or hospital emergency settings.',
      limitations: 'Requires high trust, written documentation culture, and strong asynchronous tooling.',
    },
    howWeKnowThis: {
      contributorSaid: 'Marcus Vance provided anonymized Jira sprint velocity graphs and turnover records.',
      verified: 'Cross-referenced against 4-Day Week Global trial data from 61 UK companies.',
      independentlyFound: 'Harvard Business Review research validates that meeting reduction is the primary driver of productivity gains in 4-day trials.',
      ourInterpretation: 'The 4-day week is not about working less; it is about eliminating organizational theatre and confronting the intensity tradeoff.',
      remainsUncertain: 'Whether 4-day models maintain their competitive edge once large tech enterprises adopt similar schedules.',
      sources: ['Jira velocity audit', '4-Day Week Global UK Research Report', 'HBR: The 4-Day Week Realities'],
    },
    tapForContext: ['intensity-compression'],
    related: ['recruiter-cv-mistake', 'stopped-running-ads-growth'],
  },

  // 7. Truth Desk: Local train shutdown rumor
  {
    type: 'fact-check',
    slug: 'will-mumbai-locals-stop-from-monday',
    isDemo: false,
    chapter: 'truth-desk',
    station: 'andheri',
    headline: 'Is it true Mumbai locals will stop from Monday?',
    hook: 'A message warning that suburban trains would shut down citywide spread across WhatsApp groups. Here is what is actually scheduled.',
    tinyPayoff: 'Verified false: No citywide suspension exists; only a pre-announced two-night overnight engineering block on one line.',
    summary: 'A viral forward claiming complete shutdown of suburban local trains investigated against actual railway maintenance timetables.',
    tenSecondTakeaway: [
      'The forward claiming a complete citywide suspension of trains is false.',
      'Railway authorities scheduled a narrow 2-night overnight maintenance block on one line only.',
      'The rumor originated by stripping away specific dates and hours from a legitimate engineering notice.',
    ],
    postmark: { station: 'andheri', date: '2026-09-21', status: 'checked' },
    byline: 'aakash-fernandes',
    readingTimeMin: 4,
    lastUpdated: '2026-09-21',
    rumour: {
      text: '"Breaking 🚨 Mumbai local trains STOP COMPLETELY from Monday, all lines, no service until further notice. Plan accordingly and forward to family."',
      spread: 'Shared in 11+ WhatsApp groups seen by StoryLettr.com',
    },
    body: [
      'Is it true Mumbai locals will stop from Monday? No. A viral message claiming that all suburban trains would shut down completely spread rapidly through family and neighbourhood groups this week.',
      'There is no citywide suspension of suburban services scheduled. What does exist, and is publicly posted on Western and Central Railway bulletins, is a standard pre-announced engineering block: overnight maintenance affecting late-night services across two nights only.',
      'This follows a classic pattern for transit misinformation: an official, limited maintenance notice gets forwarded, stripped of its specific hours and line names, until "overnight work on one line" becomes "citywide shutdown indefinitely."',
    ],
    finding: 'False. No citywide shutdown is scheduled — only a standard two-night overnight maintenance block on one line.',
    verdict: 'False as stated. A limited two-night overnight maintenance block is genuine; the claim of a full citywide shutdown is baseless.',
    howWeKnowThis: {
      contributorSaid: 'Readers forwarded 11 instances of the viral message to StoryLettr Truth Desk.',
      verified: 'Confirmed engineering block schedules directly with Central and Western Railway public bulletins.',
      independentlyFound: 'Spoke with station managers at Andheri and Dadar who confirmed daytime schedules are completely normal.',
      ourInterpretation: 'Messages urging "Forward to everyone immediately" rely on panic urgency to bypass critical skepticism.',
      remainsUncertain: 'The original phone number that first drafted the message could not be traced.',
      sources: ['Western Railway Press Release #412', 'Central Railway Suburban Schedule Bulletin', 'Reader submissions'],
    },
    tapForContext: [],
    related: ['4-day-workweek-tech-ceo'],
  },

  // 8. Truth Desk: Bank Account CBDC Freezing
  {
    type: 'fact-check',
    slug: 'bank-digital-currency-lockout-hoax',
    isDemo: true,
    chapter: 'truth-desk',
    station: 'csmt',
    headline: 'Will physical bank accounts be frozen under new digital currency rules?',
    hook: 'A voice note claiming traditional savings accounts would be locked to force adoption of central bank digital currency circulated this week.',
    tinyPayoff: 'Verified false: RBI regulations explicitly mandate physical cash and regular savings accounts remain fully operational.',
    summary: 'Audit of viral voice notes claiming retail banking deposits are being phased out for digital tokens.',
    tenSecondTakeaway: [
      'Viral voice note claiming mandatory conversion to digital currency is false.',
      'The central bank digital currency (e-Rupee) is a voluntary pilot running parallel to traditional banking.',
      'Physical currency and savings accounts maintain full legal tender status with zero phase-out dates.',
    ],
    postmark: { station: 'csmt', date: '2026-09-19', status: 'checked' },
    byline: 'aakash-fernandes',
    readingTimeMin: 4,
    lastUpdated: '2026-09-19',
    rumour: {
      text: '"Urgent message from bank manager: Withdraw your deposits before month-end because all accounts are being migrated to digital currency with spending limits."',
      spread: 'Circulated via audio voice note in community trading groups',
    },
    body: [
      'An anonymous audio recording claiming that retail bank accounts will be restricted to force digital rupee adoption circulated widely across trader groups.',
      'We cross-checked the claim against official Reserve Bank of India notifications, commercial banking circulars, and spoke with verified compliance officers at three public sector banks.',
      'No such migration exists. The central bank digital currency (CBDC) pilot operates entirely on an opt-in basis alongside regular savings accounts and physical cash.',
    ],
    finding: 'False. Digital currency remains a voluntary pilot with zero impact on traditional savings accounts.',
    verdict: 'Completely False. The voice note invents spending restrictions and deadlines that contradict official banking policy.',
    howWeKnowThis: {
      contributorSaid: 'Community members reported panic withdrawals based on anonymous audio notes.',
      verified: 'Reviewed official RBI retail CBDC circulars and banking ombudsman directives.',
      independentlyFound: 'All participating banks confirmed standard savings account operations continue without disruption.',
      ourInterpretation: 'Financial anxiety messages exploit technical complexity to manufacture viral sharing.',
      remainsUncertain: 'The identity of the speaker in the audio note remains anonymous.',
      sources: ['RBI Concept Note on Central Bank Digital Currency', 'State Bank of India Public Advisory'],
    },
    tapForContext: [],
    related: ['stopped-running-ads-growth'],
  },
];

export const getBySlug = (slug) => CONTENT.find((c) => c.slug === slug);
export const getStories = () => CONTENT.filter((c) => c.type === 'story' || c.type === 'explainer');
export const getFactChecks = () => CONTENT.filter((c) => c.type === 'fact-check');
export const getByStation = (station) =>
  CONTENT.filter((c) => c.station === station).sort((a, b) => (a.postmark.date < b.postmark.date ? 1 : -1));
export const getByChapter = (chapterId) => {
  if (chapterId === 'all') return CONTENT;
  if (chapterId === 'people') return getStories();
  if (chapterId === 'experiments') return CONTENT.filter((c) => !!c.experiment);
  return CONTENT.filter((c) => c.chapter === chapterId).sort((a, b) => (a.postmark.date < b.postmark.date ? 1 : -1));
};

export const allSortedByDate = () =>
  [...CONTENT].sort((a, b) => (a.postmark.date < b.postmark.date ? 1 : -1));

export const getExperiments = () => CONTENT.filter((c) => !!c.experiment);

export const getContributors = () => Object.values(CONTRIBUTORS);
export const getContributorBySlug = (slug) => CONTRIBUTORS[slug];

export const relatedFor = (item, max = 3) => {
  const others = CONTENT.filter((c) => c.slug !== item.slug);
  const sameChapter = others.filter((c) => c.chapter === item.chapter);
  const picked = [...sameChapter];
  if (picked.length < max) {
    others.filter((c) => !picked.includes(c)).forEach((c) => picked.push(c));
  }
  return { items: picked.slice(0, max), sameLocalityCount: 0 };
};

export const stationsWithContent = () =>
  new Set(CONTENT.filter((c) => c.station).map((c) => c.station));

export const pickRotatingLead = () => {
  // Returns Today's Letter lead
  return CONTENT.find((c) => c.slug === 'stopped-running-ads-growth') || CONTENT[0];
};
