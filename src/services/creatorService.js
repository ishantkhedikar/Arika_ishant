/**
 * Arika Collabs - Creator Portal Service
 * Handles Creator Dashboard metrics, profile details, and collaborations.
 */

export const MOCK_CREATOR = {
  id: 'creator-001',
  firstName: 'Priya',
  lastName: 'Sharma',
  fullName: 'Priya Sharma',
  email: 'priya@example.com',
  phone: '+91 98765 43210',
  location: 'Mumbai, India',
  instagramHandle: '@priyasharma',
  bio: 'Fashion & lifestyle creator sharing everyday style inspiration and honest product reviews.',
  avatarUrl: '/assets/images/creator-priya.jpg',
  categories: ['Fashion', 'Lifestyle'],
  accountStatus: 'approved',
  availability: 'available',
  availableFrom: null,
  collaborationInterests: ['brand-collaborations', 'instagram-paid-promotions', 'product-reviews'],
  contentPreferences: ['Fashion', 'Beauty', 'Lifestyle'],
  followerRange: '50k–100k',
  engagementRange: '3–5%',
  portfolioLinks: ['https://instagram.com/priyasharma'],
  profileCompletion: 75
};

export const MOCK_COLLABORATIONS = [
  {
    id: 'collab-001',
    brandName: 'Velvet Luxe',
    campaignName: 'Velvet Luxe Beauty',
    contentType: 'Instagram Reel',
    deliverable: 'Content Creation',
    platform: 'Instagram',
    deadline: '2025-09-18',
    status: 'in-progress',
    thumbnailUrl: '/assets/images/brand-velvetluxe.svg'
  },
  {
    id: 'collab-002',
    brandName: 'Glow Haus',
    campaignName: 'Glow Haus',
    contentType: 'Instagram Story',
    deliverable: 'Product Feature',
    platform: 'Instagram',
    deadline: '2025-09-25',
    status: 'under-review',
    thumbnailUrl: '/assets/images/brand-glowhaus.svg'
  },
  {
    id: 'collab-003',
    brandName: 'Lumè Clothing',
    campaignName: 'Lumè',
    contentType: 'Instagram Post',
    deliverable: 'Brand Showcase',
    platform: 'Instagram',
    deadline: '2025-10-02',
    status: 'upcoming',
    thumbnailUrl: '/assets/images/campaign-fashion.svg'
  },
  {
    id: 'collab-004',
    brandName: 'Brew & Co.',
    campaignName: 'Brew & Co.',
    contentType: 'Instagram Reel',
    deliverable: 'Food & Lifestyle',
    platform: 'Instagram',
    deadline: '2025-10-10',
    status: 'upcoming',
    thumbnailUrl: '/assets/images/campaign-lifestyle.svg'
  },
  {
    id: 'collab-005',
    brandName: 'Solara Jewels',
    campaignName: 'Solara',
    contentType: 'Instagram Post',
    deliverable: 'Product Feature',
    platform: 'Instagram',
    deadline: '2025-08-12',
    status: 'completed',
    thumbnailUrl: '/assets/images/campaign-beauty.svg'
  },
  {
    id: 'collab-006',
    brandName: 'Wanderly',
    campaignName: 'Wanderly Travel',
    contentType: 'Instagram Story',
    deliverable: 'Travel Experience',
    platform: 'Instagram',
    deadline: '2025-07-28',
    status: 'completed',
    thumbnailUrl: '/assets/images/campaign-lifestyle.svg'
  }
];

export const MOCK_FAQS = [
  {
    q: 'How do I get selected for campaigns?',
    a: 'Arika reviews creator profiles and matches them with brand campaigns based on niche, audience, and engagement. Keep your profile complete and availability up to date.'
  },
  {
    q: 'What type of creators does Arika work with?',
    a: 'We work with creators across fashion, beauty, lifestyle, travel, food, fitness, and technology niches — primarily on Instagram.'
  },
  {
    q: 'How are collaborations managed?',
    a: 'All collaborations are managed through the Arika platform. You\'ll receive details, deadlines, and deliverables directly from the Arika team.'
  },
  {
    q: 'When will I receive payment?',
    a: 'Payment timelines are agreed upon before each collaboration begins. The Arika team will communicate the schedule clearly.'
  },
  {
    q: 'Can I suggest a brand for collaboration?',
    a: 'Yes! Use the Opportunity Inquiry form on this page to share your ideas and we\'ll explore the possibility.'
  }
];

export const creatorService = {
  getDashboardData() {
    const active = MOCK_COLLABORATIONS.filter((c) => c.status === 'in-progress').length;
    const upcoming = MOCK_COLLABORATIONS.filter((c) => c.status === 'upcoming').length;
    const completed = MOCK_COLLABORATIONS.filter((c) => c.status === 'completed').length;
    return {
      creator: { firstName: MOCK_CREATOR.firstName, avatarUrl: MOCK_CREATOR.avatarUrl },
      stats: {
        activeCollaborations: active,
        upcomingCollaborations: upcoming,
        completedCollaborations: completed
      },
      recentCollaborations: MOCK_COLLABORATIONS.slice(0, 4)
    };
  },

  getCollaborations({ status = 'all', search = '', platform = 'all', sort = 'deadline' } = {}) {
    let items = [...MOCK_COLLABORATIONS];
    if (status !== 'all') items = items.filter((c) => c.status === status);
    if (platform !== 'all') items = items.filter((c) => c.platform.toLowerCase() === platform.toLowerCase());
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(
        (c) =>
          c.brandName.toLowerCase().includes(q) ||
          c.campaignName.toLowerCase().includes(q) ||
          c.contentType.toLowerCase().includes(q)
      );
    }
    return items;
  },

  getProfile() {
    return { ...MOCK_CREATOR };
  },

  saveProfile(updated) {
    Object.assign(MOCK_CREATOR, updated);
    return { success: true, profile: MOCK_CREATOR };
  }
};
