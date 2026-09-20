/**
 * Admin Dashboard Data Source
 * Reflects the exact values, categories, and metrics from the reference design.
 */
(function(window) {
  'use strict';

  const DASHBOARD_DATA = {
    hero: {
      eyebrow: 'ADMIN PORTAL',
      greeting: 'Good morning, Admin',
      emoji: '👋',
      subtitle: 'Here’s an overview of what’s happening.',
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
        sparkColor: '#E6B344'
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
        sparkColor: '#F97316'
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
        sparkColor: '#3B82F6'
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
        sparkColor: '#22C55E'
      }
    ],

    applications: [
      {
        id: 'app-1',
        name: 'Priya Sharma',
        category: 'Fashion',
        status: 'Pending',
        statusType: 'pending', // yellow/amber
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
        statusType: 'review', // soft blue
        time: '4 days ago',
        avatar: '/assets/images/creator-diya.jpg'
      },
      {
        id: 'app-4',
        name: 'Arjun Kapoor',
        category: 'Lifestyle',
        status: 'Approved',
        statusType: 'approved', // soft green
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
        icon: 'user',
        bgColor: '#FEF7E6',
        iconColor: '#D4AF37'
      },
      {
        id: 'action-campaign',
        title: 'Create Campaign',
        icon: 'megaphone',
        bgColor: '#FFF1EC',
        iconColor: '#EA580C'
      },
      {
        id: 'action-inquiries',
        title: 'View Inquiries',
        icon: 'mail',
        bgColor: '#FEF7E6',
        iconColor: '#D97706'
      },
      {
        id: 'action-content',
        title: 'Add Content',
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
      engagementsLabel: 'Engagements',
      campaigns: '12',
      campaignsLabel: 'Campaigns',
      dates: ['1 Jul', '7 Jul', '14 Jul', '21 Jul', '28 Jul'],
      points: [
        { date: '1 Jul', value: 0 },
        { date: '4 Jul', value: 20 },
        { date: '7 Jul', value: 16 },
        { date: '11 Jul', value: 28 },
        { date: '14 Jul', value: 40 },
        { date: '18 Jul', value: 33 },
        { date: '21 Jul', value: 47 },
        { date: '25 Jul', value: 58 },
        { date: '28 Jul', value: 55 }
      ]
    },

    banner: {
      titlePart1: 'Empowering Creators.',
      titlePart2: 'Building Bigger Stories.',
      subtitle: 'Together we create opportunities that make a real impact.',
      cta: 'Explore Opportunities →',
      scriptWords: ['Creators', 'Drive', 'Change'],
      tagline: ['MORE CREATORS.', 'BIGGER STORIES.', 'BRIGHTER TOMORROWS.', '✦']
    }
  };

  window.ADMIN_DASHBOARD_DATA = DASHBOARD_DATA;
})(window);
