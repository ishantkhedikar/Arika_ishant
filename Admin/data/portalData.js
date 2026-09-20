/**
 * Arika Collabs - Admin Portal Central Data Repository
 * Houses rich dataset models for Influencers, Campaigns, Collaborations, Inquiries, Content, and Analytics.
 */
(function(window) {
  'use strict';

  const PORTAL_DATA = {
    // -------------------------------------------------------------
    // 1. INFLUENCERS DATA
    // -------------------------------------------------------------
    influencers: {
      stats: [
        {
          id: 'inf-total',
          title: 'Total Influencers',
          value: '103',
          change: '↑ +12%',
          period: 'vs last month',
          type: 'gold',
          iconBg: '#FEF3C7',
          iconColor: '#D97706',
          sparkColor: '#E6B344'
        },
        {
          id: 'inf-pending',
          title: 'Pending Approvals',
          value: '14',
          change: '↑ +5%',
          period: 'vs last week',
          type: 'peach',
          iconBg: '#FFEDD5',
          iconColor: '#EA580C',
          sparkColor: '#F97316'
        },
        {
          id: 'inf-top',
          title: 'Top Tier (250K+)',
          value: '28',
          change: '↑ +18%',
          period: 'vs last month',
          type: 'blue',
          iconBg: '#DBEAFE',
          iconColor: '#2563EB',
          sparkColor: '#3B82F6'
        },
        {
          id: 'inf-engagement',
          title: 'Avg. Engagement',
          value: '4.8%',
          change: '↑ +0.4%',
          period: 'vs platform avg',
          type: 'green',
          iconBg: '#DCFCE7',
          iconColor: '#16A34A',
          sparkColor: '#22C55E'
        }
      ],
      items: [
        {
          id: 'inf-1',
          name: 'Priya Sharma',
          handle: '@priyasharma',
          avatar: '/assets/images/creator-priya.jpg',
          category: 'Fashion',
          categoryClass: 'fashion',
          followers: '245K',
          engagement: '4.8%',
          location: 'Mumbai',
          status: 'Approved',
          statusClass: 'approved',
          joined: '12 Aug 2024'
        },
        {
          id: 'inf-2',
          name: 'Rohan Mehta',
          handle: '@rohanmehta_fit',
          avatar: '/assets/images/creator-rahul.jpg',
          category: 'Fitness',
          categoryClass: 'fitness',
          followers: '180K',
          engagement: '5.2%',
          location: 'Delhi',
          status: 'Approved',
          statusClass: 'approved',
          joined: '10 Aug 2024'
        },
        {
          id: 'inf-3',
          name: 'Kavya Nair',
          handle: '@kavyanair_glow',
          avatar: '/assets/images/creator-diya.jpg',
          category: 'Beauty',
          categoryClass: 'beauty',
          followers: '320K',
          engagement: '6.1%',
          location: 'Bangalore',
          status: 'Under Review',
          statusClass: 'review',
          joined: '08 Aug 2024'
        },
        {
          id: 'inf-4',
          name: 'Arjun Kapoor',
          handle: '@arjun_travels',
          avatar: '/assets/images/creator-aman.jpg',
          category: 'Lifestyle',
          categoryClass: 'lifestyle',
          followers: '95K',
          engagement: '3.9%',
          location: 'Goa',
          status: 'Approved',
          statusClass: 'approved',
          joined: '05 Aug 2024'
        },
        {
          id: 'inf-5',
          name: 'Ananya Roy',
          handle: '@ananya_eats',
          avatar: '/assets/images/creator-neha.jpg',
          category: 'Food',
          categoryClass: 'food',
          followers: '140K',
          engagement: '5.7%',
          location: 'Kolkata',
          status: 'Under Review',
          statusClass: 'review',
          joined: '01 Aug 2024'
        },
        {
          id: 'inf-6',
          name: 'Sameer Joshi',
          handle: '@sameer_tech',
          avatar: '/assets/images/virat kohli.jpg',
          category: 'Tech',
          categoryClass: 'tech',
          followers: '410K',
          engagement: '4.2%',
          location: 'Pune',
          status: 'Approved',
          statusClass: 'approved',
          joined: '28 Jul 2024'
        },
        {
          id: 'inf-7',
          name: 'Diya Patel',
          handle: '@diyapatel_life',
          avatar: '/assets/images/creator-riya.jpg',
          category: 'Travel',
          categoryClass: 'travel',
          followers: '78K',
          engagement: '3.4%',
          location: 'Ahmedabad',
          status: 'Pending',
          statusClass: 'pending',
          joined: '24 Jul 2024'
        },
        {
          id: 'inf-8',
          name: 'Vikram Singh',
          handle: '@vikram_wellness',
          avatar: '/assets/images/MS Dhoni.jpg',
          category: 'Wellness',
          categoryClass: 'wellness',
          followers: '115K',
          engagement: '7.3%',
          location: 'Rishikesh',
          status: 'Approved',
          statusClass: 'approved',
          joined: '20 Jul 2024'
        }
      ]
    },

    // -------------------------------------------------------------
    // 2. CAMPAIGNS DATA
    // -------------------------------------------------------------
    campaigns: {
      stats: [
        {
          id: 'cmp-total',
          title: 'Total Campaigns',
          value: '24',
          change: '↑ +8%',
          period: 'vs last month',
          type: 'gold',
          iconBg: '#FEF3C7',
          iconColor: '#D97706',
          sparkColor: '#E6B344'
        },
        {
          id: 'cmp-active',
          title: 'Active Campaigns',
          value: '7',
          change: '↑ +40%',
          period: 'vs last month',
          type: 'peach',
          iconBg: '#FFEDD5',
          iconColor: '#EA580C',
          sparkColor: '#F97316'
        },
        {
          id: 'cmp-budget',
          title: 'Total Budget Managed',
          value: '₹24.9L',
          change: '↑ +15%',
          period: 'vs Q2 FY24',
          type: 'blue',
          iconBg: '#DBEAFE',
          iconColor: '#2563EB',
          sparkColor: '#3B82F6'
        },
        {
          id: 'cmp-roi',
          title: 'Avg. Campaign ROI',
          value: '3.4x',
          change: '↑ +0.6x',
          period: 'above industry benchmarks',
          type: 'green',
          iconBg: '#DCFCE7',
          iconColor: '#16A34A',
          sparkColor: '#22C55E'
        }
      ],
      items: [
        {
          id: 'cmp-1',
          name: 'Summer Glow 2024',
          brand: 'Glowhaus Cosmetics',
          brandLogo: '/assets/images/brand-glowhaus.svg',
          category: 'Beauty',
          categoryClass: 'beauty',
          budget: '₹4,50,000',
          creators: '12 Creators',
          timeline: '01 Aug – 31 Aug',
          status: 'Active',
          statusClass: 'active'
        },
        {
          id: 'cmp-2',
          name: 'Monsoon Fit Series',
          brand: 'FlexFit India',
          brandLogo: '/assets/images/brand-placeholder.svg',
          category: 'Fitness',
          categoryClass: 'fitness',
          budget: '₹2,80,000',
          creators: '8 Creators',
          timeline: '05 Aug – 10 Sep',
          status: 'Active',
          statusClass: 'active'
        },
        {
          id: 'cmp-3',
          name: 'Luxury Silk Edit',
          brand: 'Aura Haute Couture',
          brandLogo: '/assets/images/brand-velvetluxe.svg',
          category: 'Fashion',
          categoryClass: 'fashion',
          budget: '₹7,20,000',
          creators: '6 Creators',
          timeline: '01 Sep – 30 Sep',
          status: 'Scheduled',
          statusClass: 'scheduled'
        },
        {
          id: 'cmp-4',
          name: 'Urban Nomad Gear',
          brand: 'Roam Outfitters',
          brandLogo: '/assets/images/brand-aurea.svg',
          category: 'Travel',
          categoryClass: 'travel',
          budget: '₹3,50,000',
          creators: '10 Creators',
          timeline: '15 Jul – 25 Aug',
          status: 'Active',
          statusClass: 'active'
        },
        {
          id: 'cmp-5',
          name: 'Smart Living Expo',
          brand: 'Zephyr Home Tech',
          brandLogo: '/assets/images/brand-placeholder.svg',
          category: 'Tech',
          categoryClass: 'tech',
          budget: '₹5,00,000',
          creators: '15 Creators',
          timeline: '01 Jul – 31 Jul',
          status: 'Completed',
          statusClass: 'completed'
        },
        {
          id: 'cmp-6',
          name: 'Organic Pantry Launch',
          brand: 'PureRoot Botanicals',
          brandLogo: '/assets/images/brand-placeholder.svg',
          category: 'Food',
          categoryClass: 'food',
          budget: '₹1,90,000',
          creators: '5 Creators',
          timeline: '15 Aug – 15 Sep',
          status: 'In Review',
          statusClass: 'review'
        }
      ]
    },

    // -------------------------------------------------------------
    // 3. COLLABORATIONS DATA
    // -------------------------------------------------------------
    collaborations: {
      stats: [
        {
          id: 'col-ongoing',
          title: 'Ongoing Collaborations',
          value: '12',
          change: '↑ +20%',
          period: 'vs last month',
          type: 'gold',
          iconBg: '#FEF3C7',
          iconColor: '#D97706',
          sparkColor: '#E6B344'
        },
        {
          id: 'col-review',
          title: 'Content in Review',
          value: '9',
          change: '↑ +14%',
          period: 'awaiting sign-off',
          type: 'peach',
          iconBg: '#FFEDD5',
          iconColor: '#EA580C',
          sparkColor: '#F97316'
        },
        {
          id: 'col-completed',
          title: 'Completed Deliverables',
          value: '86',
          change: '↑ +25%',
          period: 'this quarter',
          type: 'blue',
          iconBg: '#DBEAFE',
          iconColor: '#2563EB',
          sparkColor: '#3B82F6'
        },
        {
          id: 'col-payouts',
          title: 'Disbursed Payouts',
          value: '₹8.4L',
          change: '↑ +12%',
          period: '100% on-time milestone release',
          type: 'green',
          iconBg: '#DCFCE7',
          iconColor: '#16A34A',
          sparkColor: '#22C55E'
        }
      ],
      items: [
        {
          id: 'col-1',
          title: 'Summer Glow Reel #1',
          creator: 'Priya Sharma',
          creatorAvatar: '/assets/images/creator-priya.jpg',
          brand: 'Glowhaus',
          type: 'Reel',
          typeClass: 'reel',
          deliverable: '1× 60s High-Res Reel',
          compensation: '₹35,000',
          dueDate: '22 Aug 2024',
          status: 'Active',
          statusClass: 'active'
        },
        {
          id: 'col-2',
          title: 'Monsoon Fitness Routine',
          creator: 'Rohan Mehta',
          creatorAvatar: '/assets/images/creator-rahul.jpg',
          brand: 'FlexFit',
          type: 'Video',
          typeClass: 'image',
          deliverable: '2× Dedicated Reels + Story',
          compensation: '₹28,000',
          dueDate: '25 Aug 2024',
          status: 'In Progress',
          statusClass: 'inprogress'
        },
        {
          id: 'col-3',
          title: 'Silk Saree Draping Edit',
          creator: 'Kavya Nair',
          creatorAvatar: '/assets/images/creator-diya.jpg',
          brand: 'Aura Haute',
          type: 'Story',
          typeClass: 'story',
          deliverable: '1× Carousel + 3× Stories',
          compensation: '₹45,000',
          dueDate: '05 Sep 2024',
          status: 'Scheduled',
          statusClass: 'scheduled'
        },
        {
          id: 'col-4',
          title: 'Travel V-Log: Hidden Goa',
          creator: 'Arjun Kapoor',
          creatorAvatar: '/assets/images/creator-aman.jpg',
          brand: 'Roam Gear',
          type: 'Reel',
          typeClass: 'reel',
          deliverable: '1× Vlog + Reel integration',
          compensation: '₹50,000',
          dueDate: '28 Aug 2024',
          status: 'Active',
          statusClass: 'active'
        },
        {
          id: 'col-5',
          title: 'Organic Tea Unboxing',
          creator: 'Vikram Singh',
          creatorAvatar: '/assets/images/MS Dhoni.jpg',
          brand: 'PureRoot',
          type: 'Post',
          typeClass: 'post',
          deliverable: '2× Instagram Posts',
          compensation: '₹22,000',
          dueDate: '30 Aug 2024',
          status: 'Active',
          statusClass: 'active'
        },
        {
          id: 'col-6',
          title: 'Wireless Pods Review',
          creator: 'Sameer Joshi',
          creatorAvatar: '/assets/images/virat kohli.jpg',
          brand: 'Zephyr Tech',
          type: 'Reel',
          typeClass: 'reel',
          deliverable: 'Tech teardown & reel',
          compensation: '₹42,000',
          dueDate: '14 Aug 2024',
          status: 'Completed',
          statusClass: 'completed'
        }
      ]
    },

    // -------------------------------------------------------------
    // 4. INQUIRIES DATA
    // -------------------------------------------------------------
    inquiries: {
      stats: [
        {
          id: 'inq-new',
          title: 'New Inquiries',
          value: '5',
          change: '↑ +66%',
          period: 'vs last week',
          type: 'gold',
          iconBg: '#FEF3C7',
          iconColor: '#D97706',
          sparkColor: '#E6B344'
        },
        {
          id: 'inq-unread',
          title: 'Unread Messages',
          value: '3',
          change: '↓ -25%',
          period: 'cleared in 24h',
          type: 'peach',
          iconBg: '#FFEDD5',
          iconColor: '#EA580C',
          sparkColor: '#F97316'
        },
        {
          id: 'inq-brands',
          title: 'Brand Inquiries',
          value: '18',
          change: '↑ +30%',
          period: 'high-intent briefs',
          type: 'blue',
          iconBg: '#DBEAFE',
          iconColor: '#2563EB',
          sparkColor: '#3B82F6'
        },
        {
          id: 'inq-sla',
          title: 'Response SLA',
          value: '98.2%',
          change: '↑ +1.4%',
          period: 'average reply in 2.1 hours',
          type: 'green',
          iconBg: '#DCFCE7',
          iconColor: '#16A34A',
          sparkColor: '#22C55E'
        }
      ],
      items: [
        {
          id: 'inq-1',
          sender: 'Rhea Singhania',
          organization: 'Zoya Lifestyle Brands',
          subject: 'Brand Partnership: Festive Diwali 2024',
          type: 'Brand',
          typeClass: 'brand',
          message: 'We are planning our nationwide festive apparel campaign and wish to shortlist 8 luxury fashion creators through Arika Collabs...',
          date: '14 Aug 2024',
          status: 'Unread',
          statusClass: 'unread'
        },
        {
          id: 'inq-2',
          sender: 'Manish Varma',
          organization: '@manish_fit (Fitness Athlete)',
          subject: 'Creator Application & Onboarding Portfolio',
          type: 'Creator',
          typeClass: 'creator',
          message: 'Hi team, I have 110K Instagram followers with 6.2% engagement and would love to join the exclusive Arika verified roster...',
          date: '13 Aug 2024',
          status: 'In Review',
          statusClass: 'review'
        },
        {
          id: 'inq-3',
          sender: 'Tarun Chawla',
          organization: 'Nykaa Luxe Marketing',
          subject: 'Custom Campaign Quote: Tier-1 Beauty Roster',
          type: 'Brand',
          typeClass: 'brand',
          message: 'Requesting rate cards and availability for top 5 beauty influencers for our upcoming flagship product launch in September...',
          date: '12 Aug 2024',
          status: 'Replied',
          statusClass: 'replied'
        },
        {
          id: 'inq-4',
          sender: 'Sunita Deshmukh',
          organization: 'Vogue India Editorial',
          subject: 'Press Feature: Rising Digital Creators of India',
          type: 'Brand',
          typeClass: 'brand',
          message: 'We are profiling top creative talent managers and agency leaders for our annual digital arts spotlight...',
          date: '10 Aug 2024',
          status: 'Resolved',
          statusClass: 'resolved'
        },
        {
          id: 'inq-5',
          sender: 'Karan Malhotra',
          organization: 'Lakme Fashion Week Producer',
          subject: 'VIP Creator Passes & Backstage Access',
          type: 'Brand',
          typeClass: 'brand',
          message: 'Invitations for select Arika luxury and high-fashion talent to cover backstage styling at LFW next month...',
          date: '09 Aug 2024',
          status: 'In Review',
          statusClass: 'review'
        }
      ]
    },

    // -------------------------------------------------------------
    // 5. CONTENT DATA
    // -------------------------------------------------------------
    content: {
      stats: [
        {
          id: 'cnt-total',
          title: 'Total Media Assets',
          value: '342',
          change: '↑ +18%',
          period: 'in verified library',
          type: 'gold',
          iconBg: '#FEF3C7',
          iconColor: '#D97706',
          sparkColor: '#E6B344'
        },
        {
          id: 'cnt-moderation',
          title: 'Pending Moderation',
          value: '11',
          change: '↓ -10%',
          period: 'under compliance review',
          type: 'peach',
          iconBg: '#FFEDD5',
          iconColor: '#EA580C',
          sparkColor: '#F97316'
        },
        {
          id: 'cnt-published',
          title: 'Published Pieces',
          value: '286',
          change: '↑ +24%',
          period: 'live across social handles',
          type: 'blue',
          iconBg: '#DBEAFE',
          iconColor: '#2563EB',
          sparkColor: '#3B82F6'
        },
        {
          id: 'cnt-views',
          title: 'Total Impressions',
          value: '8.9M',
          change: '↑ +32%',
          period: 'generated for partner brands',
          type: 'green',
          iconBg: '#DCFCE7',
          iconColor: '#16A34A',
          sparkColor: '#22C55E'
        }
      ],
      items: [
        {
          id: 'cnt-1',
          title: 'Summer Glow Campaign Teaser',
          thumbnail: '/assets/images/Bentley\'s Latest Fragrances Is Its Best Yet.jpg',
          creator: 'Priya Sharma',
          campaign: 'Summer Glow 2024',
          format: 'Reel',
          formatClass: 'reel',
          reach: '1.2M Views',
          status: 'Approved',
          statusClass: 'approved',
          date: '12 Aug 2024'
        },
        {
          id: 'cnt-2',
          title: 'Silk Heritage Lookbook',
          thumbnail: '/assets/images/Sunlit Style_ Outdoor Fashion Editorial Vibes.jpg',
          creator: 'Kavya Nair',
          campaign: 'Luxury Silk Edit',
          format: 'Carousel',
          formatClass: 'image',
          reach: '480K Reach',
          status: 'Approved',
          statusClass: 'approved',
          date: '10 Aug 2024'
        },
        {
          id: 'cnt-3',
          title: 'High-Intensity Workout Demo',
          thumbnail: '/assets/images/MS Dhoni.jpg',
          creator: 'Rohan Mehta',
          campaign: 'Monsoon Fit Series',
          format: 'Reel',
          formatClass: 'reel',
          reach: 'Queued',
          status: 'Scheduled',
          statusClass: 'scheduled',
          date: '22 Aug 2024'
        },
        {
          id: 'cnt-4',
          title: 'Smart Watch Battery Breakdown',
          thumbnail: '/assets/images/virat kohli.jpg',
          creator: 'Sameer Joshi',
          campaign: 'Smart Living Expo',
          format: 'Tech Video',
          formatClass: 'story',
          reach: 'Reviewing',
          status: 'Under Review',
          statusClass: 'review',
          date: '14 Aug 2024'
        },
        {
          id: 'cnt-5',
          title: 'Pure Tea Brewing Ritual',
          thumbnail: '/assets/images/Fashion Photography _ AI Style Series.jpg',
          creator: 'Vikram Singh',
          campaign: 'Organic Pantry Launch',
          format: 'Story Post',
          formatClass: 'post',
          reach: '210K Impressions',
          status: 'Approved',
          statusClass: 'approved',
          date: '08 Aug 2024'
        },
        {
          id: 'cnt-6',
          title: 'Monsoon Travel Guide: Western Ghats',
          thumbnail: '/assets/images/The Paradise Poster.jpg',
          creator: 'Arjun Kapoor',
          campaign: 'Urban Nomad Gear',
          format: 'Vlog',
          formatClass: 'image',
          reach: 'Draft Asset',
          status: 'Draft',
          statusClass: 'draft',
          date: '13 Aug 2024'
        }
      ]
    },

    // -------------------------------------------------------------
    // 6. ANALYTICS DATA
    // -------------------------------------------------------------
    analytics: {
      stats: [
        {
          id: 'an-imp',
          title: 'Total Impressions',
          value: '14.2M',
          change: '↑ +28%',
          period: 'vs last 60 days',
          type: 'gold',
          iconBg: '#FEF3C7',
          iconColor: '#D97706',
          sparkColor: '#E6B344'
        },
        {
          id: 'an-eng',
          title: 'Avg. Engagement',
          value: '5.4%',
          change: '↑ +0.8%',
          period: 'network-wide rate',
          type: 'peach',
          iconBg: '#FFEDD5',
          iconColor: '#EA580C',
          sparkColor: '#F97316'
        },
        {
          id: 'an-reach',
          title: 'Active Audience Reach',
          value: '3.8M',
          change: '↑ +19%',
          period: 'unique monthly consumers',
          type: 'blue',
          iconBg: '#DBEAFE',
          iconColor: '#2563EB',
          sparkColor: '#3B82F6'
        },
        {
          id: 'an-cmp',
          title: 'Campaigns Run',
          value: '24',
          change: '↑ +8%',
          period: 'across 8 categories',
          type: 'green',
          iconBg: '#DCFCE7',
          iconColor: '#16A34A',
          sparkColor: '#22C55E'
        },
        {
          id: 'an-net',
          title: 'Verified Roster',
          value: '103',
          change: '↑ +12%',
          period: 'vetted creators',
          type: 'purple',
          iconBg: '#F3E8FF',
          iconColor: '#9333EA',
          sparkColor: '#A855F7'
        }
      ],
      categories: [
        { name: 'Beauty & Skincare', icon: '💄', percent: 28, color: '#E11D48' },
        { name: 'Fashion & Luxury', icon: '👗', percent: 22, color: '#BE185D' },
        { name: 'Lifestyle & Decor', icon: '🌿', percent: 18, color: '#15803D' },
        { name: 'Food & Dining', icon: '🍲', percent: 12, color: '#B45309' },
        { name: 'Travel & Explore', icon: '✈️', percent: 10, color: '#0284C7' },
        { name: 'Fitness & Health', icon: '⚡', percent: 8, color: '#0369A1' },
        { name: 'Tech & Gadgets', icon: '📱', percent: 5, color: '#6D28D9' },
        { name: 'Wellness & Yoga', icon: '🧘', percent: 5, color: '#4D7C0F' }
      ],
      campaignDonut: {
        total: 24,
        segments: [
          { label: 'Active', count: 12, percent: '50%', color: '#10B981' },
          { label: 'Completed', count: 8, percent: '33%', color: '#3B82F6' },
          { label: 'Draft', count: 4, percent: '17%', color: '#D4AF37' }
        ]
      },
      collabDonut: {
        total: 86,
        segments: [
          { label: 'Active', count: 59, percent: '69%', color: '#10B981' },
          { label: 'In Progress', count: 14, percent: '16%', color: '#3B82F6' },
          { label: 'Completed', count: 13, percent: '15%', color: '#D4AF37' }
        ]
      }
    }
  };

  window.PORTAL_DATA = PORTAL_DATA;
})(window);
