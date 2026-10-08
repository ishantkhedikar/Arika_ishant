/**
 * Arika Collabs - Admin Portal Central Dataset
 */

export const DASHBOARD_DATA = {
  hero: {
    eyebrow: 'ADMIN PORTAL',
    greeting: 'Good morning, Admin',
    emoji: '👋',
    subtitle: "Here's an overview of what's happening.",
    motto: {
      col1: ['INSIGHTS', 'PEOPLE', 'OPPORTUNITIES', '✦'],
      col2: ['A BRIGHTER', 'TOMORROW', 'TOGETHER.']
    }
  },
  stats: [
    {
      id: 'influencers',
      title: 'Total Influencers',
      value: '103',
      change: '↑ +12%',
      period: 'vs last month',
      type: 'gold',
      iconBg: '#FEF3C7',
      iconColor: '#D97706',
      sparkColor: '#E6B344',
      link: '/admin/influencers'
    },
    {
      id: 'campaigns',
      title: 'Active Campaigns',
      value: '7',
      change: '↑ +40%',
      period: 'vs last month',
      type: 'peach',
      iconBg: '#FFEDD5',
      iconColor: '#EA580C',
      sparkColor: '#F97316',
      link: '/admin/campaigns'
    },
    {
      id: 'collaborations',
      title: 'Ongoing Collaborations',
      value: '12',
      change: '↑ +20%',
      period: 'vs last month',
      type: 'blue',
      iconBg: '#DBEAFE',
      iconColor: '#2563EB',
      sparkColor: '#3B82F6',
      link: '/admin/collaborations'
    },
    {
      id: 'inquiries',
      title: 'New Inquiries',
      value: '5',
      change: '↑ +66%',
      period: 'vs last month',
      type: 'green',
      iconBg: '#DCFCE7',
      iconColor: '#16A34A',
      sparkColor: '#22C55E',
      link: '/admin/inquiries'
    }
  ],
  applications: [
    {
      id: 'app-1',
      name: 'Priya Sharma',
      category: 'Fashion',
      status: 'Pending',
      statusType: 'pending',
      time: '2 days ago',
      avatar: '/assets/images/creator-priya.jpg'
    },
    {
      id: 'app-2',
      name: 'Rohan Mehta',
      category: 'Fitness',
      status: 'Pending',
      statusType: 'pending',
      time: '3 days ago',
      avatar: '/assets/images/creator-rahul.jpg'
    },
    {
      id: 'app-3',
      name: 'Kavya Nair',
      category: 'Beauty',
      status: 'Under Review',
      statusType: 'review',
      time: '4 days ago',
      avatar: '/assets/images/creator-diya.jpg'
    },
    {
      id: 'app-4',
      name: 'Arjun Kapoor',
      category: 'Lifestyle',
      status: 'Approved',
      statusType: 'approved',
      time: '5 days ago',
      avatar: '/assets/images/creator-aman.jpg'
    },
    {
      id: 'app-5',
      name: 'Isha Verma',
      category: 'Travel',
      status: 'Pending',
      statusType: 'pending',
      time: '6 days ago',
      avatar: '/assets/images/creator-siya.jpg'
    }
  ],
  quickActions: [
    {
      id: 'action-influencers',
      title: 'Manage Influencers',
      link: '/admin/influencers',
      icon: 'user',
      bgColor: '#FEF7E6',
      iconColor: '#D4AF37'
    },
    {
      id: 'action-campaign',
      title: 'Create Campaign',
      link: '/admin/campaigns',
      icon: 'megaphone',
      bgColor: '#FFF1EC',
      iconColor: '#EA580C'
    },
    {
      id: 'action-inquiries',
      title: 'View Inquiries',
      link: '/admin/inquiries',
      icon: 'mail',
      bgColor: '#FEF7E6',
      iconColor: '#D97706'
    },
    {
      id: 'action-content',
      title: 'Add Content',
      link: '/admin/content',
      icon: 'document',
      bgColor: '#FEF7E6',
      iconColor: '#C27803'
    }
  ],
  performance: {
    timeframe: 'Last 30 Days',
    reach: '1.2M',
    reachLabel: 'Total Reach',
    engagements: '48.5K',
    engagementLabel: 'Total Engagements',
    growth: '+18.4%',
    growthLabel: 'Quarterly Growth'
  }
};

export const PORTAL_DATA = {
  influencers: {
    stats: [
      { id: 'inf-total', title: 'Total Influencers', value: '103', change: '↑ +12%', period: 'vs last month', iconBg: '#FEF3C7', iconColor: '#D97706', sparkColor: '#E6B344' },
      { id: 'inf-pending', title: 'Pending Approvals', value: '14', change: '↑ +5%', period: 'vs last week', iconBg: '#FFEDD5', iconColor: '#EA580C', sparkColor: '#F97316' },
      { id: 'inf-top', title: 'Top Tier (250K+)', value: '28', change: '↑ +18%', period: 'vs last month', iconBg: '#DBEAFE', iconColor: '#2563EB', sparkColor: '#3B82F6' },
      { id: 'inf-engagement', title: 'Avg. Engagement', value: '4.8%', change: '↑ +0.4%', period: 'vs platform avg', iconBg: '#DCFCE7', iconColor: '#16A34A', sparkColor: '#22C55E' }
    ],
    items: [
      { id: 'inf-1', name: 'Priya Sharma', handle: '@priyasharma', avatar: '/assets/images/creator-priya.jpg', category: 'Fashion', categoryClass: 'fashion', followers: '245K', engagement: '4.8%', location: 'Mumbai', status: 'Approved', statusClass: 'approved', joined: '12 Aug 2024' },
      { id: 'inf-2', name: 'Rohan Mehta', handle: '@rohanmehta_fit', avatar: '/assets/images/creator-rahul.jpg', category: 'Fitness', categoryClass: 'fitness', followers: '180K', engagement: '5.2%', location: 'Delhi', status: 'Approved', statusClass: 'approved', joined: '10 Aug 2024' },
      { id: 'inf-3', name: 'Kavya Nair', handle: '@kavyanair_glow', avatar: '/assets/images/creator-diya.jpg', category: 'Beauty', categoryClass: 'beauty', followers: '320K', engagement: '6.1%', location: 'Bangalore', status: 'Under Review', statusClass: 'review', joined: '08 Aug 2024' },
      { id: 'inf-4', name: 'Arjun Kapoor', handle: '@arjun_travels', avatar: '/assets/images/creator-aman.jpg', category: 'Lifestyle', categoryClass: 'lifestyle', followers: '95K', engagement: '3.9%', location: 'Goa', status: 'Approved', statusClass: 'approved', joined: '05 Aug 2024' },
      { id: 'inf-5', name: 'Ananya Roy', handle: '@ananya_eats', avatar: '/assets/images/creator-neha.jpg', category: 'Food', categoryClass: 'food', followers: '140K', engagement: '5.7%', location: 'Kolkata', status: 'Under Review', statusClass: 'review', joined: '01 Aug 2024' },
      { id: 'inf-6', name: 'Sameer Joshi', handle: '@sameer_tech', avatar: '/assets/images/virat kohli.jpg', category: 'Tech', categoryClass: 'tech', followers: '410K', engagement: '4.2%', location: 'Pune', status: 'Approved', statusClass: 'approved', joined: '28 Jul 2024' },
      { id: 'inf-7', name: 'Diya Patel', handle: '@diyapatel_life', avatar: '/assets/images/creator-riya.jpg', category: 'Travel', categoryClass: 'travel', followers: '78K', engagement: '3.4%', location: 'Ahmedabad', status: 'Pending', statusClass: 'pending', joined: '24 Jul 2024' },
      { id: 'inf-8', name: 'Vikram Singh', handle: '@vikram_wellness', avatar: '/assets/images/MS Dhoni.jpg', category: 'Wellness', categoryClass: 'wellness', followers: '115K', engagement: '7.3%', location: 'Rishikesh', status: 'Approved', statusClass: 'approved', joined: '20 Jul 2024' }
    ]
  },
  campaigns: {
    stats: [
      { id: 'cmp-total', title: 'Total Campaigns', value: '24', change: '↑ +8%', period: 'vs last month', iconBg: '#FEF3C7', iconColor: '#D97706', sparkColor: '#E6B344' },
      { id: 'cmp-active', title: 'Active Campaigns', value: '7', change: '↑ +40%', period: 'vs last month', iconBg: '#FFEDD5', iconColor: '#EA580C', sparkColor: '#F97316' },
      { id: 'cmp-budget', title: 'Total Budget Managed', value: '₹24.9L', change: '↑ +15%', period: 'vs Q2 FY24', iconBg: '#DBEAFE', iconColor: '#2563EB', sparkColor: '#3B82F6' },
      { id: 'cmp-roi', title: 'Avg. Campaign ROI', value: '3.4x', change: '↑ +0.6x', period: 'above industry benchmarks', iconBg: '#DCFCE7', iconColor: '#16A34A', sparkColor: '#22C55E' }
    ],
    items: [
      { id: 'cmp-1', name: 'Summer Glow 2024', brand: 'Glowhaus Cosmetics', brandLogo: '/assets/images/brand-glowhaus.svg', category: 'Beauty', categoryClass: 'beauty', budget: '₹4,50,000', creators: '12 Creators', timeline: '01 Aug – 31 Aug', status: 'Active', statusClass: 'active' },
      { id: 'cmp-2', name: 'Monsoon Fit Series', brand: 'FlexFit India', brandLogo: '/assets/images/brand-placeholder.svg', category: 'Fitness', categoryClass: 'fitness', budget: '₹2,80,000', creators: '8 Creators', timeline: '05 Aug – 10 Sep', status: 'Active', statusClass: 'active' },
      { id: 'cmp-3', name: 'Luxury Silk Edit', brand: 'Aura Haute Couture', brandLogo: '/assets/images/brand-velvetluxe.svg', category: 'Fashion', categoryClass: 'fashion', budget: '₹7,20,000', creators: '6 Creators', timeline: '01 Sep – 30 Sep', status: 'Scheduled', statusClass: 'scheduled' },
      { id: 'cmp-4', name: 'Urban Nomad Gear', brand: 'Roam Outfitters', brandLogo: '/assets/images/brand-aurea.svg', category: 'Travel', categoryClass: 'travel', budget: '₹3,50,000', creators: '10 Creators', timeline: '15 Jul – 25 Aug', status: 'Active', statusClass: 'active' },
      { id: 'cmp-5', name: 'Smart Living Expo', brand: 'Zephyr Home Tech', brandLogo: '/assets/images/brand-placeholder.svg', category: 'Tech', categoryClass: 'tech', budget: '₹5,00,000', creators: '15 Creators', timeline: '01 Jul – 31 Jul', status: 'Completed', statusClass: 'completed' },
      { id: 'cmp-6', name: 'Organic Pantry Launch', brand: 'PureRoot Botanicals', brandLogo: '/assets/images/brand-placeholder.svg', category: 'Food', categoryClass: 'food', budget: '₹1,90,000', creators: '5 Creators', timeline: '15 Aug – 15 Sep', status: 'In Review', statusClass: 'review' }
    ]
  },
  collaborations: {
    stats: [
      { id: 'col-ongoing', title: 'Ongoing Collaborations', value: '12', change: '↑ +20%', period: 'vs last month', iconBg: '#FEF3C7', iconColor: '#D97706', sparkColor: '#E6B344' },
      { id: 'col-review', title: 'Content in Review', value: '9', change: '↑ +14%', period: 'awaiting sign-off', iconBg: '#FFEDD5', iconColor: '#EA580C', sparkColor: '#F97316' },
      { id: 'col-completed', title: 'Completed Deliverables', value: '86', change: '↑ +25%', period: 'this quarter', iconBg: '#DBEAFE', iconColor: '#2563EB', sparkColor: '#3B82F6' },
      { id: 'col-payouts', title: 'Disbursed Payouts', value: '₹8.4L', change: '↑ +12%', period: '100% on-time milestone release', iconBg: '#DCFCE7', iconColor: '#16A34A', sparkColor: '#22C55E' }
    ],
    items: [
      { id: 'col-1', campaign: 'Summer Glow 2024', brand: 'Glowhaus', creator: 'Priya Sharma', handle: '@priyasharma', avatar: '/assets/images/creator-priya.jpg', deliverable: '2 Reels + 3 Stories', deadline: '25 Aug 2024', status: 'In Progress', statusClass: 'active' },
      { id: 'col-2', campaign: 'Monsoon Fit Series', brand: 'FlexFit', creator: 'Rohan Mehta', handle: '@rohanmehta_fit', avatar: '/assets/images/creator-rahul.jpg', deliverable: '1 Reel + 1 Static Post', deadline: '28 Aug 2024', status: 'Content Review', statusClass: 'review' },
      { id: 'col-3', campaign: 'Luxury Silk Edit', brand: 'Aura', creator: 'Kavya Nair', handle: '@kavyanair_glow', avatar: '/assets/images/creator-diya.jpg', deliverable: '3 Reels + Lookbook', deadline: '05 Sep 2024', status: 'Awaiting Contract', statusClass: 'pending' },
      { id: 'col-4', campaign: 'Urban Nomad Gear', brand: 'Roam', creator: 'Arjun Kapoor', handle: '@arjun_travels', avatar: '/assets/images/creator-aman.jpg', deliverable: '2 Vlogs + 4 Stories', deadline: '20 Aug 2024', status: 'Completed', statusClass: 'completed' },
      { id: 'col-5', campaign: 'Smart Living Expo', brand: 'Zephyr', creator: 'Sameer Joshi', handle: '@sameer_tech', avatar: '/assets/images/virat kohli.jpg', deliverable: '1 In-Depth Review Reel', deadline: '15 Jul 2024', status: 'Completed', statusClass: 'completed' },
      { id: 'col-6', campaign: 'Organic Pantry Launch', brand: 'PureRoot', creator: 'Ananya Roy', handle: '@ananya_eats', avatar: '/assets/images/creator-neha.jpg', deliverable: '2 Recipe Reels', deadline: '02 Sep 2024', status: 'In Progress', statusClass: 'active' }
    ]
  },
  inquiries: {
    stats: [
      { id: 'inq-new', title: 'New Inquiries', value: '5', change: '↑ +66%', period: 'vs last week', iconBg: '#FEF3C7', iconColor: '#D97706', sparkColor: '#E6B344' },
      { id: 'inq-unassigned', title: 'Pending Response', value: '2', change: '↓ -20%', period: 'under 24h SLA', iconBg: '#FFEDD5', iconColor: '#EA580C', sparkColor: '#F97316' },
      { id: 'inq-creators', title: 'Creator Applications', value: '18', change: '↑ +12%', period: 'this month', iconBg: '#DBEAFE', iconColor: '#2563EB', sparkColor: '#3B82F6' },
      { id: 'inq-brands', title: 'Brand Proposals', value: '7', change: '↑ +40%', period: 'this month', iconBg: '#DCFCE7', iconColor: '#16A34A', sparkColor: '#22C55E' }
    ],
    items: [
      { id: 'inq-1', sender: 'Siddharth Rao', org: 'Nykaa E-Commerce', email: 'siddharth.r@nykaa.com', type: 'Brand Proposal', typeClass: 'brand', message: 'Looking for 15 fashion influencers for upcoming Autumn Festive campaign.', date: '14 Aug 2024', status: 'Unread', statusClass: 'unread' },
      { id: 'inq-2', sender: 'Meera Deshmukh', org: 'Independent Creator', email: 'meera.creates@gmail.com', type: 'Creator Application', typeClass: 'creator', message: 'Interested in joining Arika roster. Micro-influencer in sustainable beauty with 45K followers.', date: '13 Aug 2024', status: 'In Review', statusClass: 'review' },
      { id: 'inq-3', sender: 'Rahul Varma', org: 'Boat Lifestyle', email: 'rahul.varma@boat-lifestyle.com', type: 'Brand Proposal', typeClass: 'brand', message: 'Reaching out for Q3 Audio Campaign extension with tech and fitness creators.', date: '12 Aug 2024', status: 'Replied', statusClass: 'replied' },
      { id: 'inq-4', sender: 'Tanya Sen', org: 'Independent Creator', email: 'tanyasen_vlogs@yahoo.in', type: 'Creator Application', typeClass: 'creator', message: 'Application for travel and hospitality brand collaborations across South India.', date: '10 Aug 2024', status: 'Replied', statusClass: 'replied' },
      { id: 'inq-5', sender: 'Akash Goel', org: 'Myntra Fashion', email: 'akash.goel@myntra.com', type: 'Partnership Inquiry', typeClass: 'brand', message: 'Inquiry regarding agency retainer contract for festive end-of-season influencer outreach.', date: '08 Aug 2024', status: 'Closed', statusClass: 'closed' }
    ]
  },
  content: {
    stats: [
      { id: 'cnt-live', title: 'Live Assets', value: '42', change: '↑ +14%', period: 'active on Instagram', iconBg: '#FEF3C7', iconColor: '#D97706', sparkColor: '#E6B344' },
      { id: 'cnt-pending', title: 'Pending Approval', value: '6', change: '↑ +2', period: 'awaiting brand review', iconBg: '#FFEDD5', iconColor: '#EA580C', sparkColor: '#F97316' },
      { id: 'cnt-views', title: 'Total Impressions', value: '3.8M', change: '↑ +32%', period: 'across campaigns', iconBg: '#DBEAFE', iconColor: '#2563EB', sparkColor: '#3B82F6' },
      { id: 'cnt-engagement', title: 'Top Post Engagement', value: '9.4%', change: '↑ +1.2%', period: 'Priya x Glowhaus Reel', iconBg: '#DCFCE7', iconColor: '#16A34A', sparkColor: '#22C55E' }
    ],
    items: [
      { id: 'cnt-1', title: 'Summer Glow Morning Routine', creator: 'Priya Sharma', campaign: 'Summer Glow 2024', format: 'Instagram Reel', formatClass: 'reel', views: '280K', likes: '24.5K', shares: '1.8K', status: 'Live', statusClass: 'active', thumb: '/assets/images/creator-priya.jpg' },
      { id: 'cnt-2', title: 'HIIT Workout in Monsoon Rain', creator: 'Rohan Mehta', campaign: 'Monsoon Fit Series', format: 'Instagram Reel', formatClass: 'reel', views: '195K', likes: '18.2K', shares: '920', status: 'Live', statusClass: 'active', thumb: '/assets/images/creator-rahul.jpg' },
      { id: 'cnt-3', title: 'Banarasi Silk Elegance Lookbook', creator: 'Kavya Nair', campaign: 'Luxury Silk Edit', format: 'Carousel Post', formatClass: 'carousel', views: '98K', likes: '12.4K', shares: '1.4K', status: 'Under Review', statusClass: 'review', thumb: '/assets/images/creator-diya.jpg' },
      { id: 'cnt-4', title: 'Exploring Goa Backwaters with Roam', creator: 'Arjun Kapoor', campaign: 'Urban Nomad Gear', format: 'Story Highlights', formatClass: 'story', views: '64K', likes: '6.1K', shares: '430', status: 'Live', statusClass: 'active', thumb: '/assets/images/creator-aman.jpg' },
      { id: 'cnt-5', title: 'Zephyr Smart Hub 4K Hands-On', creator: 'Sameer Joshi', campaign: 'Smart Living Expo', format: 'Instagram Reel', formatClass: 'reel', views: '340K', likes: '31.2K', shares: '4.2K', status: 'Archived', statusClass: 'archived', thumb: '/assets/images/virat kohli.jpg' },
      { id: 'cnt-6', title: 'Healthy Millet Bowl Recipe', creator: 'Ananya Roy', campaign: 'Organic Pantry Launch', format: 'Instagram Reel', formatClass: 'reel', views: '112K', likes: '14.8K', shares: '2.1K', status: 'Under Review', statusClass: 'review', thumb: '/assets/images/creator-neha.jpg' }
    ]
  },
  analytics: {
    stats: [
      { id: 'ana-reach', title: 'Total Reach', value: '4.2M', change: '↑ +24%', period: 'vs previous quarter', iconBg: '#FEF3C7', iconColor: '#D97706', sparkColor: '#E6B344' },
      { id: 'ana-eng', title: 'Engagement Rate', value: '5.4%', change: '↑ +0.8%', period: 'industry avg 3.8%', iconBg: '#FFEDD5', iconColor: '#EA580C', sparkColor: '#F97316' },
      { id: 'ana-roi', title: 'Aggregate ROI', value: '3.6x', change: '↑ +0.4x', period: 'delivered to brands', iconBg: '#DBEAFE', iconColor: '#2563EB', sparkColor: '#3B82F6' },
      { id: 'ana-emv', title: 'Earned Media Value', value: '₹48.2L', change: '↑ +36%', period: 'estimated EMV', iconBg: '#DCFCE7', iconColor: '#16A34A', sparkColor: '#22C55E' }
    ],
    nicheBreakdown: [
      { niche: 'Fashion & Apparel', percentage: 34, color: '#D4AF37' },
      { niche: 'Beauty & Skincare', percentage: 26, color: '#EA580C' },
      { niche: 'Health & Fitness', percentage: 16, color: '#2563EB' },
      { niche: 'Tech & Gadgets', percentage: 14, color: '#16A34A' },
      { niche: 'Travel & Lifestyle', percentage: 10, color: '#9333EA' }
    ],
    monthlyGrowth: [
      { month: 'Apr', reach: '2.1M', roi: '3.1x', collabs: 8 },
      { month: 'May', reach: '2.7M', roi: '3.2x', collabs: 10 },
      { month: 'Jun', reach: '3.1M', roi: '3.4x', collabs: 11 },
      { month: 'Jul', reach: '3.6M', roi: '3.5x', collabs: 14 },
      { month: 'Aug', reach: '4.2M', roi: '3.6x', collabs: 16 }
    ]
  }
};
