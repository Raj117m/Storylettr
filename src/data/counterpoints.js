// StoryLettr Counterpoint Architecture
// Decoupled comment/counterargument data layer for easy Supabase/Firebase integration later.

export const INITIAL_COUNTERPOINTS = {
  'stopped-running-ads-growth': [
    {
      id: 'cp-ads-1',
      author: 'Rahul Mehta',
      role: 'Growth Strategist, B2B SaaS',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120',
      timestamp: 'Yesterday',
      content:
        'Referral customers may have converted better simply because they already had secondary trust through existing users. That doesn’t necessarily prove the physical artifact itself caused the lift, rather than the preexisting relationship with the referring operator.',
      upvotes: 18,
      replies: [
        {
          id: 'cp-ads-1-r1',
          author: 'Suresh Patil',
          role: 'Founder, CloudFlow Logistics',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120',
          timestamp: '18 hours ago',
          content:
            'Fair critique Rahul. We isolated this in cohort 3 by sending artifacts to accounts where the referrer explicitly did NOT make an introduction. The physical presence on the desk still yielded a 34% inbound conversion, suggesting the artifact acted as an ambient reminder.',
          upvotes: 12,
        },
      ],
    },
    {
      id: 'cp-ads-2',
      author: 'Ananya Shah',
      role: 'Product Lead, Commerce Systems',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120',
      timestamp: '2 days ago',
      content:
        'What happens once the existing dense network is exhausted? Referral loops work brilliantly in tight professional communities like logistics managers, but once you expand into adjacent unnetworked categories, paid acquisition may still be the only viable origination engine.',
      upvotes: 11,
      replies: [],
    },
    {
      id: 'cp-ads-3',
      author: 'Vikram Joshi',
      role: 'Hardware Operator',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
      timestamp: '3 days ago',
      content:
        'Unit economics were lightly addressed. High-precision brass stamping and secure courier across tier-2 hubs cost ~₹850 per piece. If an ACV is below ₹1,50,000, that margin gets eroded quickly unless retention is near 100%.',
      upvotes: 9,
      replies: [],
    },
  ],

  'cafe-owner-price-change': [
    {
      id: 'cp-cafe-1',
      author: 'Devika Raman',
      role: 'Hospitality Consultant, Bandra',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120',
      timestamp: '3 days ago',
      content:
        'The ₹20 default adjustment worked largely because Vashi has high repeat corporate footfall where guests don’t scrutinize small increments. In discretionary leisure neighborhoods like Bandra or Colaba, customers push back strongly against perceived default inflation.',
      upvotes: 21,
      replies: [
        {
          id: 'cp-cafe-1-r1',
          author: 'Vikram Rao',
          role: 'Café Operator',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120',
          timestamp: '2 days ago',
          content:
            'Spot on Devika. We tried the same menu structure in our weekend-heavy outpost and had to pair the default with explicit value perception (single-origin bean origin notes) to prevent friction.',
          upvotes: 14,
        },
      ],
    },
    {
      id: 'cp-cafe-2',
      author: 'Sameer Kulkarni',
      role: 'Pricing Economist',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=120',
      timestamp: '4 days ago',
      content:
        'Removing low-margin menu choices creates immediate margin relief, but over a 12-month horizon it can degrade visit frequency if the group ordering veto-power customer (e.g. someone wanting decaf or herbal) can’t find their niche item.',
      upvotes: 15,
      replies: [],
    },
  ],

  'recruiter-cv-mistake': [
    {
      id: 'cp-cv-1',
      author: 'Tanvi Deshmukh',
      role: 'Engineering Director',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
      timestamp: '2 days ago',
      content:
        'The 4-second screening rule penalizes non-linear, cross-disciplinary candidates the most. Someone who built an unusual hardware business before pivoting to product management won’t fit the 4-second keyword match, causing hiring managers to miss high-conviction outliers.',
      upvotes: 27,
      replies: [],
    },
    {
      id: 'cp-cv-2',
      author: 'Arjun Singhania',
      role: 'Technical Recruiter',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=120',
      timestamp: '5 days ago',
      content:
        'Automated ATS parsers now pre-screen before any human does a 4-second scan. Structuring your CV exclusively for human visual flow without semantic keyword alignment means the human never even sees the page.',
      upvotes: 19,
      replies: [],
    },
  ],

  '4-day-workweek-tech-ceo': [
    {
      id: 'cp-work-1',
      author: 'Karthik Balan',
      role: 'Operations Lead, High-Growth FinTech',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120',
      timestamp: '3 days ago',
      content:
        'Intensity compression is not a bug; it is the fundamental failure mode of 4-day weeks in client-facing businesses. If engineering doesn’t work Friday, but production incidents happen on Friday afternoon, on-call developers burn out twice as fast over weekends.',
      upvotes: 22,
      replies: [],
    },
  ],

  'manufacturer-unsung-salesperson': [
    {
      id: 'cp-mfg-1',
      author: 'Naveen Chhabra',
      role: 'Industrial Distribution Head',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=120',
      timestamp: '4 days ago',
      content:
        'Relying on independent technicians as your defacto sales channel works until a well-funded competitor offers them direct upfront kickbacks or warranty replacement exclusivity. Channel loyalty without legal exclusivity is precarious.',
      upvotes: 16,
      replies: [],
    },
  ],

  'niche-creator-monetization': [
    {
      id: 'cp-creator-1',
      author: 'Rhea Sen',
      role: 'Digital Media Strategist',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=120',
      timestamp: '5 days ago',
      content:
        'High-ticket micro-consulting caps operational scale. Once the creator runs out of personal calendar hours, revenue plateaus unless they transition into software or productized courses, which reintroduces the broad-audience challenge they tried to avoid.',
      upvotes: 14,
      replies: [],
    },
  ],

  default: [
    {
      id: 'cp-def-1',
      author: 'Kunal Shrestha',
      role: 'Growth Practitioner, Bandra',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
      timestamp: '3 days ago',
      content:
        'The conclusion assumes operational conditions remain stationary. When platform algorithms or consumer macro-spending changes, the counterintuitive advantages of this model diminish significantly.',
      upvotes: 14,
      replies: [],
    },
    {
      id: 'cp-def-2',
      author: 'Priyanka D’Souza',
      role: 'Product Strategy Consultant',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
      timestamp: '5 days ago',
      content:
        'Survivor bias is the elephant in the room. We hear from the 1 out of 20 practitioners whose counter-intuitive experiment succeeded, while the 19 who tested the exact same hypothesis and failed are never documented.',
      upvotes: 19,
      replies: [],
    },
  ],
};
