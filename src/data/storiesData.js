export const CATEGORIES = [
  'All',
  'Business',
  'Careers',
  'Money',
  'Technology',
  'Creators',
  'Unusual Experiences'
];

export const FEATURED_STORY = {
  id: 'featured-1',
  slug: '4-day-workweek-tech-ceo',
  title: 'Inside the 4-Day Workweek Experiment: What a 50-Person Tech CEO Actually Discovered',
  hook: 'When CEO Marcus Vance cut Fridays for his software company, everyone expected revenue to drop. Instead, productivity jumped 22% — but unmasked a deeper hidden tension no management consultant warns you about.',
  category: 'Business',
  readTime: '7 min read',
  date: 'Sept 18, 2026',
  contributor: {
    name: 'Marcus Vance',
    role: 'Founder & CEO, Meridian Software',
    bio: 'Bootstrapped Meridian from $0 to $12M ARR over 6 years with 52 full-time employees.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
  },
  heroImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200',
  audioDigestUrl: '#',
  audioDuration: '4:20',
  stats: [
    { label: 'Productivity Lift', value: '+22%' },
    { label: 'Employee Turnover', value: '-65%' },
    { label: 'Weekly Hours Cut', value: '8 hrs/person' },
    { label: 'StoryLettr Experiment Length', value: '30 Days' }
  ],
  contentSections: [
    {
      id: 'sec-1',
      layer: 'contributor',
      title: 'The Breaking Point: Why We Axed Fridays',
      content: `In early 2025, our engineering sprint completion rate was at an all-time low of 61%. People were working 50-hour weeks, sending Slack messages at 11 PM, and burning out. I realized that keeping people at their desks for 40 hours was creating 'work theatre' rather than focused output. We decided to compress 40 hours of work into 32 hours across Monday through Thursday without cutting salaries.`
    },
    {
      id: 'sec-2',
      layer: 'contributor',
      title: 'What Actually Changed in Week 1',
      quote: "The biggest shock wasn't that work got done faster. It was that 80% of our daily meetings were completely useless. When you only have 32 hours, nobody wants a 45-minute sync that could have been two bullet points on Notion.",
      content: `We instituted 'Quiet Hours' from 9 AM to 12 PM every day. No meetings, no Slack pings, no calls. By Thursday afternoon of Week 3, we had completed every single sprint backlog item 24 hours earlier than under our old 5-day model.`
    },
    {
      id: 'sec-3',
      layer: 'research',
      title: 'StoryLettr Independent Analysis: Comparing the Data',
      content: `StoryLettr cross-referenced Marcus's internal metrics against the 4-Day Week Global trial results spanning 61 UK companies (2,900 employees) and Harvard Business Review's longitudinal workplace studies.`,
      dataChart: {
        type: 'comparison',
        title: '4-Day Week Impact: Meridian vs Global Benchmark Trial',
        metrics: [
          { metric: 'Burnout Reduction', Meridian: '71%', GlobalBenchmark: '71%' },
          { metric: 'Revenue Growth YoY', Meridian: '+18%', GlobalBenchmark: '+14%' },
          { metric: 'Sick Days Taken', Meridian: '-40%', GlobalBenchmark: '-65%' }
        ]
      },
      sources: [
        { name: '4-Day Week Global Foundation UK Report (2023)', url: 'https://www.4dayweek.com' },
        { name: 'Journal of Applied Psychology: Asynchronous Work & Focus', url: '#' },
        { name: 'Meridian Anonymized HR Dashboard Verification', url: '#' }
      ]
    },
    {
      id: 'sec-4',
      layer: 'interpretation',
      title: 'StoryLettr Takeaway: The Hidden Catch Most Headlines Ignore',
      content: `While headlines praise 4-day workweeks as an easy fix, our evaluation reveals a crucial tradeoff: **Intensity Compression**. When 40 hours of work are forced into 32 hours without strict asynchronous protocols, stress doesn't disappear — it concentrates. Company culture becomes transactional if social connection time is sacrificed in pursuit of high productivity.`
    },
    {
      id: 'sec-5',
      layer: 'experiment',
      title: 'Our Experiment: StoryLettr Tested Marcus’s Async Framework',
      experimentOverview: `We tested Marcus’s 'Zero-Sync Thursday' and 3-hour morning quiet blocks across our own core editorial team for 30 consecutive days.`,
      hypothesis: `Restricting internal meetings to a single 2-hour window on Tuesdays will increase editorial research output without delaying publication schedules.`,
      methodology: `Used structured daily async check-ins (100 words max per member) and muted non-urgent channels during deep writing hours.`,
      results: [
        'Editorial output increased from 3 in-depth StoryLettrs/month to 5.',
        'Average research response latency dropped from 4 hours to 45 minutes.',
        '1 team member reported initial isolation, resolved by adding an optional 30-min Friday social coffee call.'
      ],
      verdict: `PARTIAL SUCCESS: Async deep-work rules dramatically increase focus, but require explicit social buffers to prevent workplace isolation.`
    }
  ]
};

export const STORIES_LIST = [
  FEATURED_STORY,
  {
    id: 'story-2',
    slug: 'bootstrapped-agency-to-saas',
    title: 'How a 24-Year-Old Turned a $500 Freelance Gigs Portfolio into a $40k/mo Micro-SaaS',
    hook: 'Without raising VC capital or writing 10,000 lines of complex code, Elena built an automated document workflow tool by listening to client complaints.',
    category: 'Business',
    readTime: '5 min read',
    date: 'Sept 15, 2026',
    contributor: {
      name: 'Elena Rostova',
      role: 'Founder, DocuSync',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250'
    },
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    hasExperiment: true,
    hasAudio: true,
    badgeText: 'Micro-SaaS & Bootstrapping'
  },
  {
    id: 'story-3',
    slug: 'gen-z-personal-finance-portfolio',
    title: 'The Index Fund Illusion: Why 80% of Gen Z Financial Advice on TikTok misses Risk Scenarios',
    hook: 'We audited 150 top financial influencer videos with a certified financial planner. Here is what they leave out about liquidity, index overlap, and tax Drag.',
    category: 'Money',
    readTime: '6 min read',
    date: 'Sept 12, 2026',
    contributor: {
      name: 'Darius Thorne',
      role: 'Independent Quantitative Analyst',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250'
    },
    heroImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800',
    hasExperiment: true,
    hasAudio: false,
    badgeText: 'Finance & Verification'
  },
  {
    id: 'story-4',
    slug: 'ai-code-assistants-in-production',
    title: 'We Let AI Write 50% of Our Production Code for 60 Days: The Bug Report Summary',
    hook: 'A senior engineering lead at a fintech startup breaks down code velocity vs security vulnerabilities when using LLM code generation at scale.',
    category: 'Technology',
    readTime: '8 min read',
    date: 'Sept 10, 2026',
    contributor: {
      name: 'Siddharth Patel',
      role: 'Staff Engineer, PayVelocity',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250'
    },
    heroImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
    hasExperiment: true,
    hasAudio: true,
    badgeText: 'Tech & Code Analysis'
  },
  {
    id: 'story-5',
    slug: 'creator-newsletter-monetization',
    title: 'From 0 to 25,000 Paid Subscribers: The Math Behind Niche Editorial Newsletters',
    hook: 'A former investigative reporter turned solo creator shares open financial ledgers, acquisition costs, open rates, and churn statistics.',
    category: 'Creators',
    readTime: '6 min read',
    date: 'Sept 04, 2026',
    contributor: {
      name: 'Hannah Lin',
      role: 'Creator, The Signal Substack',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250'
    },
    heroImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800',
    hasExperiment: false,
    hasAudio: true,
    badgeText: 'Creator Economy'
  },
  {
    id: 'story-6',
    slug: 'living-in-co-housing-commune',
    title: 'I Spent 6 Months Living in an Autonomous Tech Co-Living Cooperative in Berlin',
    hook: 'What happens when 18 remote workers share income pools, weekly chores, and decentralised governance? An unfiltered look into modern communal living.',
    category: 'Unusual Experiences',
    readTime: '9 min read',
    date: 'Aug 28, 2026',
    contributor: {
      name: 'Lukas Meyer',
      role: 'UX Researcher & Resident',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=250'
    },
    heroImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
    hasExperiment: true,
    hasAudio: false,
    badgeText: 'Culture & Lifestyle'
  },
  {
    id: 'story-7',
    slug: 'pivoting-career-at-27',
    title: 'Quitting Corporate Law to Launch a Specialty Coffee Roastery: Year 1 Profitability Audit',
    hook: 'The unvarnished cost breakdown of leases, commercial roasters, foot traffic modeling, and survival in a hyper-competitive retail market.',
    category: 'Careers',
    readTime: '7 min read',
    date: 'Aug 20, 2026',
    contributor: {
      name: 'Claire Moreau',
      role: 'Owner, Atelier Roast',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250'
    },
    heroImage: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&q=80&w=800',
    hasExperiment: true,
    hasAudio: true,
    badgeText: 'Career Pivot & Retail'
  }
];

export const EXPERIMENTS_LIST = [
  {
    id: 'exp-1',
    title: 'The 30-Day Zero-Sync Thursday Async Trial',
    storySlug: '4-day-workweek-tech-ceo',
    category: 'Workplace Productivity',
    status: 'Completed',
    duration: '30 Days',
    hypothesis: 'Eliminating all synchronous internal meetings on Thursdays will increase deep-work time by 40% without missing deadlines.',
    outcome: 'Deep work hours increased by 38%. Article publication velocity rose by 66%. Initial social disconnect mitigated by optional Friday informal syncs.',
    date: 'Sept 2026'
  },
  {
    id: 'exp-2',
    title: 'Cold Email vs Handwritten Mailers for Expert Interviews',
    storySlug: 'bootstrapped-agency-to-saas',
    category: 'Outreach & Media',
    status: 'Completed',
    duration: '14 Days',
    hypothesis: 'Sending 50 physically signed letter notes to executive founders will yield a 3x higher response rate than 50 personalized cold emails.',
    outcome: 'Email response rate: 8% (4/50). Physical letter response rate: 32% (16/50). Cost per response was $3.80 vs $0.',
    date: 'Aug 2026'
  },
  {
    id: 'exp-3',
    title: 'Automated AI Content Summaries vs Human Editorial Synthesis',
    storySlug: 'ai-code-assistants-in-production',
    category: 'Journalism & AI',
    status: 'Active',
    duration: '60 Days',
    hypothesis: 'Readers retained 55% more factual details when reading human-curated 4-layer StoryLettrs compared to AI-generated bullet summaries.',
    outcome: 'Testing in progress with 1,200 reader panel members.',
    date: 'In Progress'
  }
];

export const CORE_PROCESS_STEPS = [
  { step: '01', title: 'Connect', desc: 'Identify practitioners, creators, & experts with direct real-world experience.', icon: 'UserCheck' },
  { step: '02', title: 'Talk', desc: 'Conduct raw, unfiltered deep interviews focusing on practical data & failures.', icon: 'MessageSquare' },
  { step: '03', title: 'Extract', desc: 'Isolate core insights, actionable mental models, and key metric changes.', icon: 'Filter' },
  { step: '04', title: 'Verify', desc: 'Cross-check claims against external market data, research, & source records.', icon: 'ShieldCheck' },
  { step: '05', title: 'Structure', desc: 'Organize into 4 distinct evidence layers: Contributor, Research, Interpretation, & Experiment.', icon: 'Layers' },
  { step: '06', title: 'Present', desc: 'Format dynamically with custom text, audio digests, charts, and interactive widgets.', icon: 'Layout' },
  { step: '07', title: 'Apply', desc: 'Provide actionable frameworks readers can test immediately in their own lives.', icon: 'Zap' },
  { step: '08', title: 'Experiment', desc: 'StoryLettr conducts internal real-world trials to test claims empirically.', icon: 'FlaskConical' },
  { step: '09', title: 'Learn', desc: 'Document actual outcomes, edge cases, failures, and unexpected trade-offs.', icon: 'BookOpen' },
  { step: '10', title: 'Share', desc: 'Publish open transparent findings with verified sources for the community.', icon: 'Share2' }
];
