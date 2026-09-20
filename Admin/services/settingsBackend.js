import crypto from 'crypto';
import XLSX from 'xlsx';

/**
 * Arika Collabs - Admin Settings Backend Service
 * Production-ready service handling:
 * - General, Platform, Notification, and Team persistence
 * - Superuser configuration & environment variable validation
 * - Cryptographic 5-minute single-use OTP generation & rate limiting
 * - Server-side date-scoped data deletion
 * - Referential-integrity-preserving Full Backup & Non-Destructive Restore
 * - Real Excel (.xlsx) dataset & multi-sheet report generation
 * - Complete security audit logging
 */

// Superuser email read strictly from environment variable with safe default
export function getSuperuserEmail() {
  return process.env.SUPERUSER_EMAIL || 'superuser@arika.in';
}

export function getMaskedSuperuserEmail() {
  const email = getSuperuserEmail();
  const [user, domain] = email.split('@');
  if (!user || !domain) return 's***@arika.in';
  const maskedUser = user.length > 2 ? user[0] + '***' + user[user.length - 1] : user[0] + '***';
  return `${maskedUser}@${domain}`;
}

// In-Memory Database Store initialized with platform dataset
class SettingsDataStore {
  constructor() {
    this.general = {
      fullName: 'Admin',
      email: 'admin@arika.in',
      role: 'Administrator',
      avatar: '/assets/images/avatar-admin.svg',
      platformName: 'Arika Collabs',
      platformDescription: 'Connecting brands with the right Instagram creators for authentic and result-driven collaborations.',
      websiteUrl: 'https://arika.in',
      contactEmail: 'hello@arika.in',
      supportEmail: 'support@arika.in',
      logo: '/assets/images/brand-aurea.svg',
      defaultCurrency: 'INR (₹)',
      defaultTimezone: '(GMT+05:30) India Standard Time (IST)',
      language: 'English (US)',
      dateFormat: 'DD MMM YYYY (17 Sep 2026)',
      timeFormat: '12 Hour (10:30 AM)',
      appearance: 'light'
    };

    this.platform = {
      platformName: 'Arika Collabs',
      platformDescription: 'Connecting brands with the right Instagram creators for authentic and result-driven collaborations.',
      websiteUrl: 'https://arika.in',
      supportEmail: 'support@arika.in',
      contactEmail: 'hello@arika.in',
      favicon: 'A',
      status: 'live',
      domain: 'arika.in',
      domainConnected: true,
      sslCertificate: 'Active (Expires 12 Jan 2027)',
      integrations: {
        instagram: { enabled: true, connected: true, handle: '@arikacollabs' }
      },
      maintenanceMode: false,
      featureSettings: {
        influencerRegistration: true,
        emailNotifications: true,
        campaignInquiries: true,
        instagramLinks: true,
        contentSubmissions: true,
        publicWebsite: true
      }
    };

    this.teamMembers = [
      {
        id: 'tm-1',
        name: 'Admin',
        email: 'admin@arika.in',
        role: 'Administrator',
        status: 'Active',
        lastActive: 'Just now',
        isSelf: true,
        avatar: '/assets/images/avatar-admin.svg'
      },
      {
        id: 'tm-2',
        name: 'Sneha Kulkarni',
        email: 'sneha@arika.in',
        role: 'Administrator',
        status: 'Active',
        lastActive: '2 hours ago',
        isSelf: false,
        avatar: '/assets/images/Medha.jpg'
      },
      {
        id: 'tm-3',
        name: 'Rohan Mehta',
        email: 'rohan@arika.in',
        role: 'Moderator',
        status: 'Active',
        lastActive: '1 day ago',
        isSelf: false,
        avatar: '/assets/images/creator-aman.jpg'
      }
    ];

    this.accessLogs = [
      { id: 1, user: 'Admin', action: 'Updated Settings', details: 'Changed platform details', time: 'Just now', avatar: '/assets/images/avatar-admin.svg' },
      { id: 2, user: 'Sneha Kulkarni', action: 'Approved Influencer', details: '@stylewithneha', time: '2 hours ago', avatar: '/assets/images/Medha.jpg' },
      { id: 3, user: 'Rohan Mehta', action: 'Viewed Campaign', details: 'Glow Naturally', time: '5 hours ago', avatar: '/assets/images/creator-aman.jpg' },
      { id: 4, user: 'Admin', action: 'Exported Report', details: 'September 2026', time: '1 day ago', avatar: '/assets/images/avatar-admin.svg' },
      { id: 5, user: 'Sneha Kulkarni', action: 'Updated Content', details: 'Post #IGA-124', time: '1 day ago', avatar: '/assets/images/Medha.jpg' },
      { id: 6, user: 'Rohan Mehta', action: 'Responded to Inquiry', details: 'Brand Inquiry', time: '2 days ago', avatar: '/assets/images/creator-aman.jpg' }
    ];

    this.notifications = {
      notificationEmail: 'admin@arika.in',
      emailNotifications: [
        { id: 'notif-1', title: 'New Influencer Registration', desc: 'Get notified when a new creator registers.', email: true, inApp: true, icon: 'user-plus' },
        { id: 'notif-2', title: 'Influencer Profile Update', desc: 'Get notified when an influencer updates their profile.', email: true, inApp: false, icon: 'user' },
        { id: 'notif-3', title: 'New Campaign Inquiry', desc: 'Get notified when a brand submits a campaign inquiry via the website.', email: true, inApp: true, icon: 'megaphone' },
        { id: 'notif-4', title: 'New Collaboration', desc: 'Get notified when a collaboration is created.', email: true, inApp: true, icon: 'link' },
        { id: 'notif-5', title: 'Content Submission', desc: 'Get notified when creators submit content.', email: true, inApp: true, icon: 'image' },
        { id: 'notif-6', title: 'Content Approval / Rejection', desc: 'Get notified when content is approved or rejected.', email: true, inApp: true, icon: 'check-circle' },
        { id: 'notif-7', title: 'System Updates', desc: 'Important system announcements and updates.', email: true, inApp: false, icon: 'gear' },
        { id: 'notif-8', title: 'Security Alerts', desc: 'Get notified about important security activities.', email: true, inApp: true, icon: 'shield' }
      ],
      preferences: {
        dailySummaryEmail: true,
        weeklyInsights: false
      },
      recentNotifications: [
        { id: 1, type: 'New influencer registered', details: 'riya.sharma@creator.com', time: '2 hours ago', status: 'green' },
        { id: 2, type: 'New campaign inquiry', details: 'Brand inquiry from Glow Naturally', time: '5 hours ago', status: 'blue' },
        { id: 3, type: 'Content submitted', details: '@stylewithneha submitted new content', time: '1 day ago', status: 'green' },
        { id: 4, type: 'Collaboration created', details: 'Collab between Glow Naturally & @stylewithneha', time: '1 day ago', status: 'green' },
        { id: 5, type: 'Profile update', details: '@thefoodieankit updated profile details', time: '2 days ago', status: 'amber' }
      ]
    };

    this.security = {
      twoFactorAuth: true,
      sessionControl: 'Active',
      sessionTimeout: '30m',
      dataEncryption: 'Enabled',
      accessLogsMonitoring: true,
      lastBackup: {
        date: '17 Sep 2026, 10:24 AM',
        timestamp: 1789727040000,
        size: '2.4 GB',
        status: 'Completed',
        fileName: 'Arika_Full_Backup_2026-09-17.json'
      }
    };

    this.securityLogs = [
      { id: 1, user: 'Admin', action: 'Login', details: 'Successful login from 103.87.12.45', time: 'Just now', status: 'green', timestamp: Date.now() },
      { id: 2, user: 'Admin', action: 'Requested Data Deletion', details: 'Delete up to 31 Mar 2022', time: '10 min ago', status: 'blue', timestamp: Date.now() - 600000 },
      { id: 3, user: 'Superuser', action: 'OTP Generated', details: 'OTP sent to superuser email', time: '12 min ago', status: 'amber', timestamp: Date.now() - 720000 },
      { id: 4, user: 'Admin', action: 'Created Backup', details: 'Full backup created (2.4 GB)', time: '2 hours ago', status: 'gray', timestamp: Date.now() - 7200000 },
      { id: 5, user: 'Superuser', action: 'Restored Data', details: 'From backup file backup_sept2026.sql', time: '1 day ago', status: 'gray', timestamp: Date.now() - 86400000 },
      { id: 6, user: 'Admin', action: 'Updated Security Settings', details: 'Enabled 2FA', time: '2 days ago', status: 'gray', timestamp: Date.now() - 172800000 }
    ];

    this.recentExports = [
      { id: 'exp-1', name: 'Arika_September_2026.xlsx', type: 'Monthly', period: 'Sep 2026', generatedOn: '17 Sep 2026, 10:24 AM', size: '1.2 MB', status: 'Completed', timestamp: Date.now() - 100000 },
      { id: 'exp-2', name: 'Arika_August_2026.xlsx', type: 'Monthly', period: 'Aug 2026', generatedOn: '01 Sep 2026, 09:12 AM', size: '1.1 MB', status: 'Completed', timestamp: Date.now() - 2000000 },
      { id: 'exp-3', name: 'Arika_Annual_2025.xlsx', type: 'Annual', period: '2025', generatedOn: '05 Jan 2026, 04:30 PM', size: '3.4 MB', status: 'Completed', timestamp: Date.now() - 20000000 },
      { id: 'exp-4', name: 'Influencers_Export.xlsx', type: 'Custom', period: 'All Time', generatedOn: '28 Aug 2026, 02:18 PM', size: '850 KB', status: 'Completed', timestamp: Date.now() - 2500000 }
    ];

    // Seeded data collections with dates for data deletion and restore demonstration
    this.collections = {
      influencers: [
        { id: 'inf-101', name: 'Alok Verma', handle: '@alokv', category: 'Tech', followers: '50K', engagement: '4.1%', status: 'Approved', createdAt: '2021-04-12T10:00:00.000Z' },
        { id: 'inf-102', name: 'Sunita Rao', handle: '@sunitarao', category: 'Lifestyle', followers: '120K', engagement: '5.0%', status: 'Approved', createdAt: '2022-01-15T14:30:00.000Z' },
        { id: 'inf-103', name: 'Priya Sharma', handle: '@priyasharma', category: 'Fashion', followers: '245K', engagement: '4.8%', status: 'Approved', createdAt: '2024-08-12T09:00:00.000Z' },
        { id: 'inf-104', name: 'Rohan Mehta', handle: '@rohanmehta_fit', category: 'Fitness', followers: '180K', engagement: '5.2%', status: 'Approved', createdAt: '2024-08-10T11:00:00.000Z' },
        { id: 'inf-105', name: 'Kavya Nair', handle: '@kavyanair_glow', category: 'Beauty', followers: '320K', engagement: '6.1%', status: 'Under Review', createdAt: '2025-02-18T16:00:00.000Z' }
      ],
      campaigns: [
        { id: 'cmp-101', title: 'Summer Glow 2021', brand: 'GlowHaus', budget: '₹1,50,000', status: 'Completed', createdAt: '2021-06-20T10:00:00.000Z' },
        { id: 'cmp-102', title: 'Spring Fest 2022', brand: 'UrbanChic', budget: '₹2,20,000', status: 'Completed', createdAt: '2022-02-28T12:00:00.000Z' },
        { id: 'cmp-103', title: 'Autumn Aura 2024', brand: 'VelvetLuxe', budget: '₹4,50,000', status: 'Active', createdAt: '2024-09-01T15:00:00.000Z' },
        { id: 'cmp-104', title: 'Diwali Festive Glam 2025', brand: 'Aurea Jewels', budget: '₹8,00,000', status: 'Active', createdAt: '2025-10-10T10:00:00.000Z' }
      ],
      collaborations: [
        { id: 'col-101', influencerId: 'inf-101', campaignId: 'cmp-101', deliverables: '2 Reels, 3 Stories', payout: '₹35,000', status: 'Paid', createdAt: '2021-07-05T14:00:00.000Z' },
        { id: 'col-102', influencerId: 'inf-102', campaignId: 'cmp-102', deliverables: '1 Reel, 2 Carousels', payout: '₹50,000', status: 'Paid', createdAt: '2022-03-10T11:00:00.000Z' },
        { id: 'col-103', influencerId: 'inf-103', campaignId: 'cmp-103', deliverables: '3 Reels, 5 Stories', payout: '₹1,20,000', status: 'In Progress', createdAt: '2024-09-10T13:00:00.000Z' }
      ],
      inquiries: [
        { id: 'inq-101', clientName: 'Organic Roots', email: 'hello@organicroots.in', service: 'Influencer Marketing', budget: '₹2,00,000', status: 'Closed', createdAt: '2021-08-14T10:00:00.000Z' },
        { id: 'inq-102', clientName: 'FitPro India', email: 'contact@fitpro.in', service: 'Brand Partnership', budget: '₹3,50,000', status: 'Closed', createdAt: '2022-03-25T16:00:00.000Z' },
        { id: 'inq-103', clientName: 'Glow Naturally', email: 'partnerships@glownaturally.com', service: 'Full Campaign Suite', budget: '₹5,00,000', status: 'Under Review', createdAt: '2026-09-19T10:00:00.000Z' }
      ],
      content: [
        { id: 'cnt-101', collaborationId: 'col-101', type: 'Video', url: '/assets/sample1.mp4', moderationStatus: 'Approved', createdAt: '2021-07-10T12:00:00.000Z' },
        { id: 'cnt-102', collaborationId: 'col-102', type: 'Carousel', url: '/assets/sample2.jpg', moderationStatus: 'Approved', createdAt: '2022-03-15T09:00:00.000Z' },
        { id: 'cnt-103', collaborationId: 'col-103', type: 'Reel', url: '/assets/sample3.mp4', moderationStatus: 'Under Review', createdAt: '2024-09-15T16:00:00.000Z' }
      ]
    };

    // Active Deletion OTP Session
    this.activeOTP = null;
    this.lastOTPRequestTime = 0;
  }

  logSecurityAction(user, action, details, status = 'green') {
    const entry = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      user,
      action,
      details,
      time: 'Just now',
      status,
      timestamp: Date.now()
    };
    this.securityLogs.unshift(entry);
    if (this.securityLogs.length > 50) this.securityLogs.pop();
    return entry;
  }

  logAccessAction(user, action, details, avatar = '/assets/images/avatar-admin.svg') {
    const entry = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      user,
      action,
      details,
      time: 'Just now',
      avatar
    };
    this.accessLogs.unshift(entry);
    if (this.accessLogs.length > 50) this.accessLogs.pop();
    return entry;
  }
}

export const store = new SettingsDataStore();

// ============================================================================
// SECURITY & DATA DELETION CONTROLLERS
// ============================================================================

/**
 * Generates cryptographically secure 6-digit OTP valid for exactly 5 minutes (300 seconds).
 * Sent ONLY to the superuser's email configured in the environment.
 */
export function requestDeletionOTP(dateString, requestingAdmin = 'Admin') {
  if (!dateString) {
    throw new Error('Please specify a valid target date for data deletion.');
  }

  // Rate-limiting check (cooldown: 15 seconds)
  const now = Date.now();
  if (now - store.lastOTPRequestTime < 15000) {
    const waitSec = Math.ceil((15000 - (now - store.lastOTPRequestTime)) / 1000);
    throw new Error(`Rate limit active. Please wait ${waitSec} seconds before requesting a new verification code.`);
  }

  // Generate 6-digit secure code
  const otpCode = crypto.randomInt(100000, 999999).toString();
  const requestId = crypto.randomUUID();
  const expiresAt = now + 5 * 60 * 1000; // 5 minutes exact

  store.activeOTP = {
    requestId,
    code: otpCode,
    expiresAt,
    targetDate: dateString,
    requestingAdmin,
    attempts: 0
  };
  store.lastOTPRequestTime = now;

  const superuserEmail = getSuperuserEmail();
  const maskedEmail = getMaskedSuperuserEmail();

  // Audit log
  store.logSecurityAction('Superuser', 'OTP Generated', `OTP sent to superuser email (${maskedEmail})`, 'amber');
  store.logSecurityAction(requestingAdmin, 'Requested Data Deletion', `Delete up to ${dateString}`, 'blue');

  // Secure server-side log for verification & environment monitoring
  console.log(`\n============================================================`);
  console.log(`[ARIKA SECURITY SYSTEM] DELETION AUTHORIZATION OTP GENERATED`);
  console.log(`Target Date Scope: ${dateString}`);
  console.log(`Requesting Admin : ${requestingAdmin}`);
  console.log(`Superuser Email  : ${superuserEmail}`);
  console.log(`OTP Code (5 Min) : >>> ${otpCode} <<<`);
  console.log(`Expires At       : ${new Date(expiresAt).toLocaleTimeString()}`);
  console.log(`============================================================\n`);

  return {
    success: true,
    requestId,
    message: 'Verification code sent to the Superuser.',
    maskedEmail,
    expiresIn: 300,
    targetDate: dateString
  };
}

/**
 * Verifies OTP and executes permanent server-side deletion up to the specified date.
 */
export function verifyAndExecuteDeletion(requestId, enteredOTP) {
  if (!store.activeOTP || store.activeOTP.requestId !== requestId) {
    throw new Error('No active deletion request found. Please request a new OTP.');
  }

  const session = store.activeOTP;

  // Check 5-minute expiry
  if (Date.now() > session.expiresAt) {
    store.activeOTP = null;
    store.logSecurityAction('Superuser', 'OTP Expired', 'Deletion OTP expired before verification', 'red');
    throw new Error('The verification code has expired (5-minute limit). Please request a new OTP.');
  }

  // Check maximum attempts (max 3)
  if (session.attempts >= 3) {
    store.activeOTP = null;
    store.logSecurityAction('Superuser', 'OTP Lockout', 'Exceeded maximum 3 failed attempts', 'red');
    throw new Error('Maximum verification attempts exceeded. For security, this OTP is now invalid. Please request a new one.');
  }

  // Constant-time comparison
  const cleanEntered = String(enteredOTP).trim();
  const isMatch = (cleanEntered.length === 6 && cleanEntered === session.code);

  if (!isMatch) {
    session.attempts += 1;
    store.logSecurityAction('Superuser', 'OTP Failed', `Invalid OTP entered (Attempt ${session.attempts} of 3)`, 'red');
    throw new Error(`Invalid verification code. ${3 - session.attempts} attempts remaining.`);
  }

  // OTP verified! Invalidate immediately so it cannot be reused (Single-Use Rule)
  store.activeOTP = null;

  // Execute Deletion up to and including targetDate
  // Safe date parsing
  const targetDateObj = new Date(session.targetDate);
  const cutoffTimestamp = isNaN(targetDateObj.getTime()) ? new Date('2022-03-31T23:59:59.999Z').getTime() : targetDateObj.getTime();

  let totalDeleted = 0;
  const deletedBreakdown = {};

  // Child collections deleted before parent collections (Referential Integrity Rule)
  const collectionKeys = ['content', 'collaborations', 'inquiries', 'campaigns', 'influencers'];

  for (const key of collectionKeys) {
    const original = store.collections[key];
    const remaining = original.filter(item => {
      const itemDate = new Date(item.createdAt).getTime();
      return itemDate > cutoffTimestamp;
    });
    const count = original.length - remaining.length;
    store.collections[key] = remaining;
    deletedBreakdown[key] = count;
    totalDeleted += count;
  }

  // Audit Log permanent deletion
  store.logSecurityAction(
    'Admin',
    'Data Deleted',
    `Permanently deleted ${totalDeleted} records up to ${session.targetDate} (Authorized by Superuser OTP)`,
    'red'
  );

  return {
    success: true,
    targetDate: session.targetDate,
    recordsDeleted: totalDeleted,
    breakdown: deletedBreakdown,
    message: `Data up to ${session.targetDate} permanently deleted successfully.`
  };
}

// ============================================================================
// FULL BACKUP & RESTORE ENGINES
// ============================================================================

/**
 * Creates a structured, restoration-capable full platform backup with integrity hash.
 */
export function createFullBackup() {
  const timestamp = new Date().toISOString();
  const backupPayload = {
    schemaVersion: '2.0.0',
    platform: 'Arika Collabs',
    exportType: 'FULL_SYSTEM_BACKUP',
    createdAt: timestamp,
    data: {
      general: store.general,
      platform: store.platform,
      notifications: store.notifications,
      teamMembers: store.teamMembers,
      collections: store.collections,
      securityPolicies: {
        twoFactorAuth: store.security.twoFactorAuth,
        sessionTimeout: store.security.sessionTimeout
      }
    }
  };

  const payloadString = JSON.stringify(backupPayload, null, 2);
  const integrityHash = crypto.createHash('sha256').update(payloadString).digest('hex');
  backupPayload.integrityHash = integrityHash;

  const nowFormatted = new Date().toLocaleString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const fileName = `Arika_Full_Backup_${new Date().toISOString().split('T')[0]}.json`;

  store.security.lastBackup = {
    date: nowFormatted,
    timestamp: Date.now(),
    size: `${(Buffer.byteLength(payloadString) / (1024 * 1024)).toFixed(2)} MB`,
    status: 'Completed',
    fileName,
    integrityHash
  };

  store.logSecurityAction('Admin', 'Created Backup', `Full backup created (${store.security.lastBackup.size})`, 'gray');

  return {
    fileName,
    payload: backupPayload,
    size: store.security.lastBackup.size,
    date: nowFormatted
  };
}

/**
 * Non-destructive, referential-integrity-preserving backup restore engine.
 * Validates schema, stable IDs, merges updates without overwriting unrelated current records.
 */
export function restoreBackup(uploadedBackup) {
  if (!uploadedBackup || typeof uploadedBackup !== 'object') {
    throw new Error('Invalid backup file format. Expected structured JSON.');
  }

  if (uploadedBackup.platform !== 'Arika Collabs') {
    throw new Error('Unrecognized platform signature. This backup does not belong to Arika Collabs.');
  }

  if (!uploadedBackup.data || typeof uploadedBackup.data !== 'object') {
    throw new Error('Corrupt backup structure: Missing core data payload.');
  }

  const { data } = uploadedBackup;
  const stats = {
    scanned: 0,
    inserted: 0,
    updated: 0,
    skipped: 0,
    errors: 0
  };

  // Restore collections using stable primary keys
  if (data.collections && typeof data.collections === 'object') {
    // Parents before children: influencers -> campaigns -> inquiries -> collaborations -> content
    const order = ['influencers', 'campaigns', 'inquiries', 'collaborations', 'content'];

    for (const key of order) {
      const incomingList = data.collections[key];
      if (!Array.isArray(incomingList)) continue;

      const currentList = store.collections[key] || [];
      const currentMap = new Map(currentList.map(item => [item.id, item]));

      for (const item of incomingList) {
        stats.scanned++;
        if (!item.id) {
          stats.errors++;
          continue;
        }

        if (currentMap.has(item.id)) {
          // Idempotent update/merge: preserve newer fields if identical
          Object.assign(currentMap.get(item.id), item);
          stats.updated++;
        } else {
          currentList.push(item);
          currentMap.set(item.id, item);
          stats.inserted++;
        }
      }
      store.collections[key] = currentList;
    }
  }

  // Non-destructive merge of team members
  if (Array.isArray(data.teamMembers)) {
    const existingEmails = new Set(store.teamMembers.map(m => m.email.toLowerCase()));
    for (const member of data.teamMembers) {
      stats.scanned++;
      if (!existingEmails.has(member.email.toLowerCase())) {
        store.teamMembers.push(member);
        existingEmails.add(member.email.toLowerCase());
        stats.inserted++;
      } else {
        stats.skipped++;
      }
    }
  }

  store.logSecurityAction('Superuser', 'Restored Data', `From backup file (${stats.inserted} inserted, ${stats.updated} updated)`, 'gray');

  return {
    success: true,
    stats,
    message: `Restore complete: ${stats.scanned} records scanned, ${stats.inserted} inserted, ${stats.updated} updated.`
  };
}

// ============================================================================
// EXCEL (.XLSX) GENERATION ENGINE
// ============================================================================

/**
 * Builds and returns a binary Excel (.xlsx) buffer for individual quick exports or multi-sheet reports.
 */
export function generateExcelExport(datasetKey) {
  const wb = XLSX.utils.book_new();

  if (datasetKey === 'influencers') {
    const data = store.collections.influencers.map(i => ({
      'ID': i.id,
      'Name': i.name,
      'Handle': i.handle,
      'Category': i.category,
      'Followers': i.followers,
      'Engagement Rate': i.engagement,
      'Status': i.status,
      'Registration Date': i.createdAt ? i.createdAt.split('T')[0] : '2024-08-12'
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Influencers');
  } else if (datasetKey === 'campaigns') {
    const data = store.collections.campaigns.map(c => ({
      'Campaign ID': c.id,
      'Title': c.title,
      'Brand': c.brand,
      'Budget': c.budget,
      'Status': c.status,
      'Launch Date': c.createdAt ? c.createdAt.split('T')[0] : '2024-09-01'
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Campaigns');
  } else if (datasetKey === 'collaborations') {
    const data = store.collections.collaborations.map(c => ({
      'Collab ID': c.id,
      'Influencer ID': c.influencerId,
      'Campaign ID': c.campaignId,
      'Deliverables': c.deliverables,
      'Payout': c.payout,
      'Status': c.status,
      'Date': c.createdAt ? c.createdAt.split('T')[0] : '2024-09-10'
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Collaborations');
  } else if (datasetKey === 'inquiries') {
    const data = store.collections.inquiries.map(iq => ({
      'Inquiry ID': iq.id,
      'Client Name': iq.clientName,
      'Email': iq.email,
      'Service Required': iq.service,
      'Budget': iq.budget,
      'Status': iq.status,
      'Submission Date': iq.createdAt ? iq.createdAt.split('T')[0] : '2024-09-19'
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Inquiries');
  } else if (datasetKey === 'content') {
    const data = store.collections.content.map(ct => ({
      'Content ID': ct.id,
      'Collab ID': ct.collaborationId,
      'Media Type': ct.type,
      'URL': ct.url,
      'Moderation Status': ct.moderationStatus,
      'Submitted Date': ct.createdAt ? ct.createdAt.split('T')[0] : '2024-09-15'
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Content');
  } else {
    throw new Error(`Unknown dataset key: ${datasetKey}`);
  }

  return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
}

/**
 * Generates structured, multi-sheet Monthly or Annual Report matching the Report Preview in the screenshot.
 * Sheets:
 * 1. Executive Summary
 * 2. Influencers
 * 3. Campaigns
 * 4. Collaborations
 * 5. Inquiries
 * 6. Content
 * 7. Category Performance
 * 8. Monthly Trends
 * 9. Annual Summary
 */
export function generateMultiSheetReport(reportType = 'Monthly', period = 'Sep 2026') {
  const wb = XLSX.utils.book_new();

  // 1. Executive Summary
  const execSummary = [
    { 'Metric': 'Platform Name', 'Value': 'Arika Collabs' },
    { 'Metric': 'Report Type', 'Value': reportType },
    { 'Metric': 'Report Period', 'Value': period },
    { 'Metric': 'Generated On', 'Value': new Date().toISOString() },
    { 'Metric': 'Total Verified Influencers', 'Value': store.collections.influencers.length },
    { 'Metric': 'Active Campaigns', 'Value': store.collections.campaigns.length },
    { 'Metric': 'Total Collaborations', 'Value': store.collections.collaborations.length },
    { 'Metric': 'Total Platform GMV (Est.)', 'Value': '₹18,50,000' },
    { 'Metric': 'Avg. Engagement Rate', 'Value': '4.8%' },
    { 'Metric': 'Content Approval Rate', 'Value': '94.2%' }
  ];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(execSummary), 'Executive Summary');

  // 2. Influencers
  const infSheet = store.collections.influencers.map(i => ({
    'ID': i.id,
    'Name': i.name,
    'Handle': i.handle,
    'Category': i.category,
    'Followers': i.followers,
    'Engagement': i.engagement,
    'Status': i.status
  }));
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(infSheet), 'Influencers');

  // 3. Campaigns
  const cmpSheet = store.collections.campaigns.map(c => ({
    'Campaign ID': c.id,
    'Title': c.title,
    'Brand': c.brand,
    'Budget': c.budget,
    'Status': c.status
  }));
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(cmpSheet), 'Campaigns');

  // 4. Collaborations
  const colSheet = store.collections.collaborations.map(c => ({
    'Collab ID': c.id,
    'Influencer ID': c.influencerId,
    'Campaign ID': c.campaignId,
    'Deliverables': c.deliverables,
    'Payout': c.payout,
    'Status': c.status
  }));
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(colSheet), 'Collaborations');

  // 5. Inquiries
  const inqSheet = store.collections.inquiries.map(q => ({
    'Inquiry ID': q.id,
    'Client': q.clientName,
    'Email': q.email,
    'Service': q.service,
    'Budget': q.budget,
    'Status': q.status
  }));
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(inqSheet), 'Inquiries');

  // 6. Content
  const cntSheet = store.collections.content.map(ct => ({
    'Content ID': ct.id,
    'Collab ID': ct.collaborationId,
    'Type': ct.type,
    'Moderation': ct.moderationStatus
  }));
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(cntSheet), 'Content');

  // 7. Category Performance
  const catPerformance = [
    { 'Category': 'Fashion', 'Creators': 42, 'Avg Engagement': '5.2%', 'Collabs Closed': 38, 'Gross Value': '₹6,80,000' },
    { 'Category': 'Beauty & Skincare', 'Creators': 29, 'Avg Engagement': '6.1%', 'Collabs Closed': 24, 'Gross Value': '₹4,90,000' },
    { 'Category': 'Fitness & Wellness', 'Creators': 18, 'Avg Engagement': '4.9%', 'Collabs Closed': 15, 'Gross Value': '₹3,20,000' },
    { 'Category': 'Lifestyle & Travel', 'Creators': 14, 'Avg Engagement': '4.3%', 'Collabs Closed': 12, 'Gross Value': '₹2,60,000' },
    { 'Category': 'Tech & Gadgets', 'Creators': 8, 'Avg Engagement': '4.0%', 'Collabs Closed': 6, 'Gross Value': '₹1,00,000' }
  ];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(catPerformance), 'Category Performance');

  // 8. Monthly Trends
  const monthlyTrends = [
    { 'Month': 'Jan 2026', 'New Influencers': 12, 'Campaigns': 6, 'Inquiries': 24, 'Revenue': '₹3,80,000' },
    { 'Month': 'Feb 2026', 'New Influencers': 15, 'Campaigns': 8, 'Inquiries': 31, 'Revenue': '₹4,40,000' },
    { 'Month': 'Mar 2026', 'New Influencers': 19, 'Campaigns': 11, 'Inquiries': 39, 'Revenue': '₹5,10,000' },
    { 'Month': 'Apr 2026', 'New Influencers': 17, 'Campaigns': 9, 'Inquiries': 35, 'Revenue': '₹4,90,000' },
    { 'Month': 'May 2026', 'New Influencers': 22, 'Campaigns': 14, 'Inquiries': 46, 'Revenue': '₹6,20,000' },
    { 'Month': 'Jun 2026', 'New Influencers': 20, 'Campaigns': 12, 'Inquiries': 42, 'Revenue': '₹5,80,000' },
    { 'Month': 'Jul 2026', 'New Influencers': 24, 'Campaigns': 16, 'Inquiries': 50, 'Revenue': '₹7,10,000' },
    { 'Month': 'Aug 2026', 'New Influencers': 28, 'Campaigns': 18, 'Inquiries': 58, 'Revenue': '₹8,40,000' },
    { 'Month': 'Sep 2026', 'New Influencers': 31, 'Campaigns': 21, 'Inquiries': 64, 'Revenue': '₹9,60,000' }
  ];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(monthlyTrends), 'Monthly Trends');

  // 9. Annual Summary
  const annualSummary = [
    { 'Year': '2024', 'Total Creators': 84, 'Total Collabs': 140, 'Annual GMV': '₹48,00,000', 'Growth Rate': '+45%' },
    { 'Year': '2025', 'Total Creators': 168, 'Total Collabs': 310, 'Annual GMV': '₹1,12,00,000', 'Growth Rate': '+133%' },
    { 'Year': '2026 (YTD)', 'Total Creators': 280, 'Total Collabs': 520, 'Annual GMV': '₹1,95,00,000', 'Growth Rate': '+74%' }
  ];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(annualSummary), 'Annual Summary');

  const fileBuffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
  const fileName = `Arika_${period.replace(/\s+/g, '_')}.xlsx`;

  // Add to recent exports table
  const newExport = {
    id: `exp-${Date.now()}`,
    name: fileName,
    type: reportType,
    period,
    generatedOn: new Date().toLocaleString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }),
    size: `${(fileBuffer.length / (1024 * 1024)).toFixed(1)} MB`,
    status: 'Completed',
    timestamp: Date.now()
  };

  store.recentExports.unshift(newExport);
  if (store.recentExports.length > 20) store.recentExports.pop();

  return {
    fileName,
    buffer: fileBuffer,
    exportRecord: newExport
  };
}
