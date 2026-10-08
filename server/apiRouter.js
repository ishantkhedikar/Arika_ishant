import express from 'express';
import {
  store,
  getSuperuserEmail,
  getMaskedSuperuserEmail,
  requestDeletionOTP,
  verifyAndExecuteDeletion,
  createFullBackup,
  restoreBackup,
  generateExcelExport,
  generateMultiSheetReport
} from '../Admin/services/settingsBackend.js';

export const apiRouter = express.Router();

// 1. General & Platform Settings
apiRouter.get('/settings', (req, res) => {
  res.json({
    success: true,
    general: store.general,
    platform: store.platform,
    notifications: store.notifications,
    security: {
      twoFactorAuth: store.security.twoFactorAuth,
      sessionControl: store.security.sessionControl,
      sessionTimeout: store.security.sessionTimeout,
      dataEncryption: store.security.dataEncryption,
      accessLogsMonitoring: store.security.accessLogsMonitoring,
      lastBackup: store.security.lastBackup
    }
  });
});

apiRouter.post('/settings', (req, res) => {
  try {
    const { general, platform, notifications, security } = req.body;
    if (general) Object.assign(store.general, general);
    if (platform) Object.assign(store.platform, platform);
    if (notifications) Object.assign(store.notifications, notifications);
    if (security) Object.assign(store.security, security);

    store.logAccessAction('Admin', 'Updated Settings', 'Updated platform configuration');
    res.json({ success: true, message: 'Settings saved successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. Team & Access
apiRouter.get('/settings/team', (req, res) => {
  const adminCount = store.teamMembers.filter(m => m.role === 'Administrator').length;
  const modCount = store.teamMembers.filter(m => m.role === 'Moderator').length;
  res.json({
    success: true,
    members: store.teamMembers,
    counts: {
      total: store.teamMembers.length,
      admin: adminCount,
      moderator: modCount,
      pending: 0
    },
    accessLogs: store.accessLogs
  });
});

apiRouter.post('/settings/team/invite', (req, res) => {
  try {
    const { name, email, role, message } = req.body;
    if (!name || !email || !role) {
      return res.status(400).json({ success: false, error: 'Full name, email and role are required.' });
    }
    const newMember = {
      id: `tm-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role,
      status: 'Active',
      lastActive: 'Just now',
      isSelf: false,
      avatar: '/assets/images/creator-priya.jpg'
    };
    store.teamMembers.push(newMember);
    store.logAccessAction('Admin', 'Invited Team Member', `${name} (${role})`);
    res.json({ success: true, member: newMember, message: `Invitation sent to ${email}.` });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

apiRouter.post('/settings/team/update-role', (req, res) => {
  try {
    const { id, role } = req.body;
    const member = store.teamMembers.find(m => m.id === id);
    if (!member) return res.status(404).json({ success: false, error: 'Team member not found.' });
    member.role = role;
    store.logAccessAction('Admin', 'Role Changed', `${member.name} → ${role}`);
    store.logSecurityAction('Admin', 'Team Role Changed', `${member.name} changed to ${role}`);
    res.json({ success: true, member, message: `Updated ${member.name} role to ${role}.` });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

apiRouter.post('/settings/team/status', (req, res) => {
  try {
    const { id, status } = req.body;
    const member = store.teamMembers.find(m => m.id === id);
    if (!member) return res.status(404).json({ success: false, error: 'Team member not found.' });
    member.status = status;
    store.logAccessAction('Admin', 'Status Updated', `${member.name} → ${status}`);
    res.json({ success: true, member });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

apiRouter.delete('/settings/team/:id', (req, res) => {
  try {
    const { id } = req.params;
    const idx = store.teamMembers.findIndex(m => m.id === id);
    if (idx === -1) return res.status(404).json({ success: false, error: 'Team member not found.' });
    const removed = store.teamMembers.splice(idx, 1)[0];
    store.logAccessAction('Admin', 'Removed Team Member', removed.name);
    res.json({ success: true, message: `${removed.name} removed from team.` });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Test Notification
apiRouter.post('/settings/notifications/test', (req, res) => {
  const { recipient } = req.body;
  if (!recipient || !recipient.includes('@')) {
    return res.status(400).json({ success: false, error: 'A valid email address is required.' });
  }
  store.logAccessAction('Admin', 'Sent Test Email', `Test email dispatched to ${recipient}`);
  res.json({ success: true, message: `Test notification email successfully delivered to ${recipient}.` });
});

// 4. Data & Reports
apiRouter.get('/settings/data/recent-exports', (req, res) => {
  res.json({ success: true, exports: store.recentExports });
});

apiRouter.get('/settings/data/export/:dataset', (req, res) => {
  try {
    const dataset = req.params.dataset.toLowerCase();
    const buffer = generateExcelExport(dataset);
    const fileName = `${dataset.charAt(0).toUpperCase() + dataset.slice(1)}_Export.xlsx`;

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    store.logAccessAction('Admin', 'Exported Dataset', `${fileName}`);
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

apiRouter.post('/settings/data/generate-report', (req, res) => {
  try {
    const { type, month, year } = req.body;
    const period = type === 'Annual' ? String(year || '2026') : `${month || 'Sep'} ${year || '2026'}`;
    const result = generateMultiSheetReport(type || 'Monthly', period);

    store.logAccessAction('Admin', 'Exported Report', result.fileName);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${result.fileName}"`);
    res.send(result.buffer);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. Security & Deletion & Superuser
apiRouter.get('/settings/security/status', (req, res) => {
  res.json({
    success: true,
    security: store.security,
    superuser: {
      configured: true,
      maskedEmail: getMaskedSuperuserEmail(),
      role: 'Super Administrator',
      status: 'Active',
      lastVerification: 'Verified (via Cloud Environment)'
    },
    logs: store.securityLogs
  });
});

apiRouter.get('/settings/security/superuser', (req, res) => {
  res.json({
    success: true,
    name: 'Primary Superuser',
    role: 'SUPERUSER',
    maskedEmail: getMaskedSuperuserEmail(),
    status: 'Active',
    permissions: [
      'Authorize Critical Data Deletion',
      'Deploy Database Schema Migrations',
      'System Audit & Recovery Enforcement',
      'Rotate Platform Encryption Keys'
    ],
    lastVerification: '12 min ago'
  });
});

apiRouter.post('/settings/security/request-otp', (req, res) => {
  try {
    const { targetDate } = req.body;
    const result = requestDeletionOTP(targetDate);
    res.json(result);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

apiRouter.post('/settings/security/verify-delete', (req, res) => {
  try {
    const { requestId, otp } = req.body;
    if (!requestId || !otp) {
      return res.status(400).json({ success: false, error: 'Request ID and 6-digit OTP are required.' });
    }
    const result = verifyAndExecuteDeletion(requestId, otp);
    res.json(result);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

apiRouter.post('/settings/security/backup', (req, res) => {
  try {
    const backup = createFullBackup();
    res.json({
      success: true,
      fileName: backup.fileName,
      size: backup.size,
      date: backup.date,
      downloadUrl: '/api/settings/security/download-last-backup'
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

apiRouter.get('/settings/security/download-last-backup', (req, res) => {
  try {
    const backup = createFullBackup();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="${backup.fileName}"`);
    res.send(JSON.stringify(backup.payload, null, 2));
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

apiRouter.post('/settings/security/restore', (req, res) => {
  try {
    const { backupData } = req.body;
    const result = restoreBackup(backupData);
    res.json(result);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

apiRouter.get('/settings/security/logs', (req, res) => {
  res.json({ success: true, logs: store.securityLogs });
});
