import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import * as api from '../../services/api';

const SETTINGS_TABS = [
  { key: 'general', label: 'General', title: 'Settings', sub: 'Manage your platform preferences, team access and configurations.', slogan: 'SETTINGS TODAY.<br>A STRONGER<br>ARIKA TOMORROW.' },
  { key: 'team', label: 'Team & Access', title: 'Team & Access', sub: 'Manage your team members, roles and access permissions.', slogan: 'RIGHT PEOPLE.<br>RIGHT ACCESS.<br>BIGGER IMPACT.' },
  { key: 'notifications', label: 'Notifications', title: 'Notifications', sub: 'Stay updated with important activity across the platform.', slogan: 'STAY INFORMED.<br>STAY AHEAD.' },
  { key: 'data', label: 'Data & Reports', title: 'Data & Reports', sub: 'Export data, generate reports and get insights in structured Excel formats.', slogan: 'DATA TODAY.<br>A BRIGHTER<br>TOMORROW.' },
  { key: 'platform', label: 'Platform', title: 'Platform', sub: 'Configure core platform settings and manage essential configurations.', slogan: 'A STRONGER<br>PLATFORM FOR BRIGHTER<br>COLLABORATIONS.' },
  { key: 'security', label: 'Security', title: 'Security', sub: 'Manage security, data protection and system controls.', slogan: 'SECURE CREATORS.<br>SAFE DATA.<br>BRIGHTER TOMORROWS.' }
];

export default function AdminSettings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'general';
  const [activeTab, setActiveTab] = useState(initialTab);

  const [loading, setLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // General & Platform Settings
  const [general, setGeneral] = useState({
    fullName: 'Admin',
    email: 'admin@arika.in',
    role: 'Administrator',
    avatar: '/assets/images/avatar-admin.svg',
    platformName: 'Arika Collabs',
    platformDescription: 'Connecting brands with the right Instagram creators for authentic and result-driven collaborations.',
    websiteUrl: 'https://arika.in',
    contactEmail: 'hello@arika.in',
    supportEmail: 'support@arika.in',
    defaultCurrency: 'INR (₹)',
    defaultTimezone: '(GMT+05:30) India Standard Time (IST)',
    dateFormat: 'DD MMM YYYY (17 Sep 2026)',
    appearance: 'light'
  });

  const [platform, setPlatform] = useState({
    influencerRegistration: true,
    inquiryPipeline: true,
    instagramLinkage: true,
    contentSubmissions: true,
    maintenanceMode: false
  });

  const [notifications, setNotifications] = useState({
    emailInfluencers: true,
    emailCampaigns: true,
    emailInquiries: true,
    inAppInfluencers: true,
    inAppCampaigns: true,
    inAppInquiries: true,
    pushInfluencers: false,
    pushCampaigns: true,
    pushInquiries: false
  });

  // Team
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamCounts, setTeamCounts] = useState({ total: 0, admin: 0, moderator: 0 });
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteForm, setInviteForm] = useState({ name: '', email: '', role: 'Moderator', message: '' });

  // Notifications Test
  const [testEmail, setTestEmail] = useState('');
  const [testResult, setTestResult] = useState('');

  // Data & Reports
  const [recentExports, setRecentExports] = useState([]);
  const [reportType, setReportType] = useState('Monthly');
  const [reportMonth, setReportMonth] = useState('September');
  const [reportYear, setReportYear] = useState('2026');

  // Security
  const [securityStatus, setSecurityStatus] = useState(null);
  const [superuser, setSuperuser] = useState(null);
  const [securityLogs, setSecurityLogs] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [targetDate, setTargetDate] = useState('31 Mar 2022');
  const [deletionRequestId, setDeletionRequestId] = useState(null);
  const [otpCode, setOtpCode] = useState('');
  const [deletionStep, setDeletionStep] = useState(1); // 1: prompt date, 2: enter OTP, 3: success
  const [otpMessage, setOtpMessage] = useState('');
  const [backupMessage, setBackupMessage] = useState('');

  useEffect(() => {
    loadAllSettings();
  }, []);

  const loadAllSettings = async () => {
    setLoading(true);
    try {
      const s = await api.getSettings();
      if (s.success) {
        if (s.general) setGeneral((prev) => ({ ...prev, ...s.general }));
        if (s.platform) setPlatform((prev) => ({ ...prev, ...s.platform }));
        if (s.notifications) setNotifications((prev) => ({ ...prev, ...s.notifications }));
      }

      const tm = await api.getTeam();
      if (tm.success) {
        setTeamMembers(tm.members || []);
        if (tm.counts) setTeamCounts(tm.counts);
      }

      const ex = await api.getRecentExports();
      if (ex.success) setRecentExports(ex.exports || []);

      const sec = await api.getSecurityStatus();
      if (sec.success) {
        setSecurityStatus(sec.security);
        setSuperuser(sec.superuser);
        if (sec.logs) setSecurityLogs(sec.logs);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleTabSwitch = (key) => {
    setActiveTab(key);
    setSearchParams({ tab: key });
  };

  const currentTabObj = SETTINGS_TABS.find((t) => t.key === activeTab) || SETTINGS_TABS[0];

  // Save Settings
  const handleSaveSettings = async (e) => {
    e?.preventDefault();
    setSaveMessage('Saving platform configurations...');
    try {
      const res = await api.saveSettings({
        general,
        platform,
        notifications
      });
      if (res.success) {
        setSaveMessage('✓ Platform settings saved successfully.');
        setTimeout(() => setSaveMessage(''), 3000);
      }
    } catch (err) {
      setSaveMessage(`Error: ${err.message}`);
    }
  };

  // Team Invite
  const handleInviteSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.inviteTeamMember(inviteForm);
      if (res.success) {
        setTeamMembers([res.member, ...teamMembers]);
        setInviteModalOpen(false);
        setInviteForm({ name: '', email: '', role: 'Moderator', message: '' });
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteMember = async (id) => {
    if (!confirm('Are you sure you want to revoke access for this team member?')) return;
    try {
      const res = await api.deleteTeamMember(id);
      if (res.success) {
        setTeamMembers(teamMembers.filter((m) => m.id !== id));
      }
    } catch (err) {
      alert(err.message);
    }
  };

  // Test Notification
  const handleTestNotification = async (e) => {
    e.preventDefault();
    if (!testEmail) return;
    try {
      const res = await api.sendTestNotification(testEmail);
      setTestResult(res.message);
      setTimeout(() => setTestResult(''), 4000);
    } catch (err) {
      setTestResult(`Failed: ${err.message}`);
    }
  };

  // Generate Report
  const handleGenerateReport = async () => {
    try {
      const blob = await api.generateReport({
        type: reportType,
        month: reportMonth,
        year: reportYear
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Arika_${reportType}_Report_${reportYear}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      alert(err.message);
    }
  };

  // Deletion OTP Workflow
  const handleRequestOtp = async () => {
    try {
      const res = await api.requestDeletionOtp(targetDate);
      if (res.success) {
        setDeletionRequestId(res.requestId);
        setOtpMessage(`Verification code sent to Superuser: ${res.maskedEmail}`);
        setDeletionStep(2);
      } else {
        alert(res.error || 'Failed to request OTP');
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleVerifyDelete = async () => {
    try {
      const res = await api.verifyAndDelete(deletionRequestId, otpCode);
      if (res.success) {
        setDeletionStep(3);
        setOtpMessage(`Success! Removed ${res.deletedCount} records prior to ${targetDate}.`);
        loadAllSettings();
      } else {
        alert(res.error || 'Invalid OTP code');
      }
    } catch (err) {
      alert(err.message);
    }
  };

  // Backup & Restore
  const handleCreateBackup = async () => {
    setBackupMessage('Generating full snapshot...');
    try {
      const res = await api.createBackup();
      if (res.success) {
        setBackupMessage(`Snapshot created: ${res.fileName} (${res.size})`);
        const a = document.createElement('a');
        a.href = api.getDownloadBackupUrl();
        a.download = res.fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    } catch (err) {
      setBackupMessage(`Error: ${err.message}`);
    }
  };

  return (
    <div className="admin-page-content settings-page-content">
      {/* Settings Top Header with Tab Slogan */}
      <div className="settings-header-banner">
        <div className="settings-title-group">
          <h1>{currentTabObj.title}</h1>
          <p className="portal-header-subtitle">{currentTabObj.sub}</p>
        </div>

        <div className="settings-slogan-card">
          <div
            dangerouslySetInnerHTML={{
              __html: `${currentTabObj.slogan} <span class="settings-banner-sparkle">✦</span>`
            }}
          />
        </div>
      </div>

      {/* Tabs Navigation Pills */}
      <div className="settings-tabs-nav">
        {SETTINGS_TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`settings-tab-btn cursor-pointer ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => handleTabSwitch(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {saveMessage && (
        <div
          style={{
            padding: '12px 18px',
            borderRadius: '8px',
            background: saveMessage.includes('Error') ? '#FEE2E2' : '#DCFCE7',
            color: saveMessage.includes('Error') ? '#B91C1C' : '#15803D',
            marginBottom: '20px',
            fontWeight: 500
          }}
        >
          {saveMessage}
        </div>
      )}

      {/* ============================================================== */}
      {/* 1. GENERAL TAB */}
      {/* ============================================================== */}
      {activeTab === 'general' && (
        <div className="settings-pane">
          <div className="settings-card-panel">
            <h3>Administrator Profile</h3>
            <p className="card-subtext">Manage primary admin identity and contact email.</p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', margin: '20px 0' }}>
              <img
                src={general.avatar}
                alt="Avatar"
                style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-signature-gold)' }}
              />
              <div>
                <strong>{general.fullName}</strong>
                <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{general.email}</div>
                <span className="category-pill" style={{ marginTop: '4px', display: 'inline-block' }}>
                  {general.role}
                </span>
              </div>
            </div>

            <form onSubmit={handleSaveSettings} className="two-col-form">
              <div>
                <label>Admin Name</label>
                <input
                  type="text"
                  value={general.fullName}
                  onChange={(e) => setGeneral({ ...general, fullName: e.target.value })}
                />
              </div>
              <div>
                <label>Admin Notification Email</label>
                <input
                  type="email"
                  value={general.email}
                  onChange={(e) => setGeneral({ ...general, email: e.target.value })}
                />
              </div>

              <div>
                <label>Default Currency</label>
                <select
                  value={general.defaultCurrency}
                  onChange={(e) => setGeneral({ ...general, defaultCurrency: e.target.value })}
                >
                  <option>INR (₹)</option>
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                </select>
              </div>

              <div>
                <label>Timezone</label>
                <select
                  value={general.defaultTimezone}
                  onChange={(e) => setGeneral({ ...general, defaultTimezone: e.target.value })}
                >
                  <option>(GMT+05:30) India Standard Time (IST)</option>
                  <option>(GMT+00:00) UTC</option>
                  <option>(GMT-04:00) Eastern Time (ET)</option>
                  <option>(GMT-07:00) Pacific Time (PT)</option>
                </select>
              </div>

              <div className="span-2" style={{ marginTop: '14px' }}>
                <button type="submit" className="btn btn-primary cursor-pointer">
                  Save General Changes &rarr;
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. TEAM & ACCESS TAB */}
      {/* ============================================================== */}
      {activeTab === 'team' && (
        <div className="settings-pane">
          <div className="portal-stats-grid" style={{ marginBottom: '20px' }}>
            <div className="stat-card">
              <span className="stat-value">{teamCounts.total || teamMembers.length}</span>
              <span className="stat-label">Total Team Members</span>
            </div>
            <div className="stat-card">
              <span className="stat-value text-gold">{teamCounts.admin || 1}</span>
              <span className="stat-label">Administrators</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{teamCounts.moderator || (teamMembers.length - 1)}</span>
              <span className="stat-label">Moderators</span>
            </div>
          </div>

          <div className="settings-card-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3>Team Members</h3>
                <p className="card-subtext">Manage staff roles, access permissions and invite new team members.</p>
              </div>
              <button
                type="button"
                className="btn btn-primary cursor-pointer"
                onClick={() => setInviteModalOpen(true)}
              >
                + Invite Member
              </button>
            </div>

            <div className="table-responsive">
              <table className="portal-table">
                <thead>
                  <tr>
                    <th>Member</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Last Active</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map((m) => (
                    <tr key={m.id}>
                      <td>
                        <div className="table-user-cell">
                          <img src={m.avatar || '/assets/images/creator-priya.jpg'} alt={m.name} className="table-avatar" />
                          <strong>{m.name} {m.isSelf ? '(You)' : ''}</strong>
                        </div>
                      </td>
                      <td className="text-muted">{m.email}</td>
                      <td>
                        <span className="category-pill">{m.role}</span>
                      </td>
                      <td>
                        <span className="status-badge status-approved">{m.status}</span>
                      </td>
                      <td className="text-muted">{m.lastActive}</td>
                      <td style={{ textAlign: 'right' }}>
                        {!m.isSelf && (
                          <button
                            type="button"
                            className="btn btn-outline btn-xs cursor-pointer"
                            onClick={() => handleDeleteMember(m.id)}
                            style={{ color: '#DC2626' }}
                          >
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. NOTIFICATIONS TAB */}
      {/* ============================================================== */}
      {activeTab === 'notifications' && (
        <div className="settings-pane">
          <div className="settings-card-panel">
            <h3>Notification Preferences</h3>
            <p className="card-subtext">Configure dispatch channels for emails, in-app notifications and alerts.</p>

            <form onSubmit={handleSaveSettings} style={{ marginTop: '20px' }}>
              <table className="portal-table" style={{ marginBottom: '24px' }}>
                <thead>
                  <tr>
                    <th>Event Category</th>
                    <th style={{ textAlign: 'center' }}>Email</th>
                    <th style={{ textAlign: 'center' }}>In-App</th>
                    <th style={{ textAlign: 'center' }}>Push Alerts</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>New Influencer Applications</strong>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                        Notify when creators register or submit media kits
                      </div>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={notifications.emailInfluencers}
                        onChange={(e) => setNotifications({ ...notifications, emailInfluencers: e.target.checked })}
                      />
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={notifications.inAppInfluencers}
                        onChange={(e) => setNotifications({ ...notifications, inAppInfluencers: e.target.checked })}
                      />
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={notifications.pushInfluencers}
                        onChange={(e) => setNotifications({ ...notifications, pushInfluencers: e.target.checked })}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <strong>Campaign Deliverables & Draft Reviews</strong>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                        Notify when creators upload reels or stories for approval
                      </div>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={notifications.emailCampaigns}
                        onChange={(e) => setNotifications({ ...notifications, emailCampaigns: e.target.checked })}
                      />
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={notifications.inAppCampaigns}
                        onChange={(e) => setNotifications({ ...notifications, inAppCampaigns: e.target.checked })}
                      />
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={notifications.pushCampaigns}
                        onChange={(e) => setNotifications({ ...notifications, pushCampaigns: e.target.checked })}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <strong>New Inbound Inquiries & Brand Proposals</strong>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                        Notify when new contact requests are received
                      </div>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={notifications.emailInquiries}
                        onChange={(e) => setNotifications({ ...notifications, emailInquiries: e.target.checked })}
                      />
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={notifications.inAppInquiries}
                        onChange={(e) => setNotifications({ ...notifications, inAppInquiries: e.target.checked })}
                      />
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={notifications.pushInquiries}
                        onChange={(e) => setNotifications({ ...notifications, pushInquiries: e.target.checked })}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>

              <button type="submit" className="btn btn-primary cursor-pointer">
                Save Notification Settings &rarr;
              </button>
            </form>

            <div style={{ marginTop: '36px', borderTop: '1px solid #E5E7EB', paddingTop: '20px' }}>
              <h4>Test Dispatch Service</h4>
              <p className="card-subtext">Send a verification test notification to confirm mail dispatch.</p>
              <form onSubmit={handleTestNotification} style={{ display: 'flex', gap: '12px', marginTop: '10px', maxWidth: '480px' }}>
                <input
                  type="email"
                  placeholder="Enter email recipient..."
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  style={{ flex: 1, padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: '6px' }}
                  required
                />
                <button type="submit" className="btn btn-outline cursor-pointer">
                  Send Test
                </button>
              </form>
              {testResult && <p style={{ marginTop: '8px', color: '#16A34A', fontSize: '0.85rem' }}>{testResult}</p>}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. DATA & REPORTS TAB */}
      {/* ============================================================== */}
      {activeTab === 'data' && (
        <div className="settings-pane">
          <div className="settings-card-panel" style={{ marginBottom: '24px' }}>
            <h3>One-Click Excel Dataset Exports</h3>
            <p className="card-subtext">
              Instantly export complete platform collections into clean, formatted OpenXML (.xlsx) spreadsheets.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginTop: '16px' }}>
              {['influencers', 'campaigns', 'collaborations', 'inquiries', 'content'].map((ds) => (
                <a
                  key={ds}
                  href={api.getExportDatasetUrl(ds)}
                  className="btn btn-outline"
                  style={{ textAlign: 'center', padding: '12px 14px' }}
                  download
                >
                  📥 Export {ds.charAt(0).toUpperCase() + ds.slice(1)}
                </a>
              ))}
            </div>
          </div>

          <div className="settings-card-panel" style={{ marginBottom: '24px' }}>
            <h3>Generate Multi-Sheet Executive Report</h3>
            <p className="card-subtext">Consolidate metrics, budgets, and roasters into a packaged workbook.</p>

            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap', marginTop: '16px' }}>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                style={{ padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: '6px' }}
              >
                <option>Monthly</option>
                <option>Annual</option>
              </select>

              {reportType === 'Monthly' && (
                <select
                  value={reportMonth}
                  onChange={(e) => setReportMonth(e.target.value)}
                  style={{ padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: '6px' }}
                >
                  <option>September</option>
                  <option>August</option>
                  <option>July</option>
                  <option>June</option>
                </select>
              )}

              <select
                value={reportYear}
                onChange={(e) => setReportYear(e.target.value)}
                style={{ padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: '6px' }}
              >
                <option>2026</option>
                <option>2025</option>
              </select>

              <button
                type="button"
                className="btn btn-primary cursor-pointer"
                onClick={handleGenerateReport}
              >
                Generate .XLSX Report &rarr;
              </button>
            </div>
          </div>

          <div className="settings-card-panel">
            <h3>Recent Generated Exports</h3>
            <div className="table-responsive" style={{ marginTop: '14px' }}>
              <table className="portal-table">
                <thead>
                  <tr>
                    <th>Report Name</th>
                    <th>Type</th>
                    <th>Generated Date</th>
                    <th>File Size</th>
                    <th style={{ textAlign: 'right' }}>Download</th>
                  </tr>
                </thead>
                <tbody>
                  {recentExports.map((r, i) => (
                    <tr key={i}>
                      <td>
                        <strong>{r.name}</strong>
                      </td>
                      <td>
                        <span className="category-pill">{r.type}</span>
                      </td>
                      <td className="text-muted">{r.date}</td>
                      <td>{r.size}</td>
                      <td style={{ textAlign: 'right' }}>
                        <a
                          href={r.url || api.getExportDatasetUrl('influencers')}
                          className="btn btn-outline btn-xs"
                          download
                        >
                          Download
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 5. PLATFORM TAB */}
      {/* ============================================================== */}
      {activeTab === 'platform' && (
        <div className="settings-pane">
          <div className="settings-card-panel">
            <h3>Feature Toggles & Infrastructure</h3>
            <p className="card-subtext">Toggle system pipelines and user workflows in real time.</p>

            <form onSubmit={handleSaveSettings} style={{ marginTop: '20px' }}>
              {[
                { key: 'influencerRegistration', label: 'Public Influencer Registration', desc: 'Allow creators to sign up and submit applications on the homepage.' },
                { key: 'inquiryPipeline', label: 'Brand Inquiry Pipeline', desc: 'Accept direct partnership inquiry submissions from brand marketers.' },
                { key: 'instagramLinkage', label: 'Instagram Profile Verifications', desc: 'Display live Instagram handles and automated metrics sync.' },
                { key: 'contentSubmissions', label: 'Creator Draft Submissions', desc: 'Allow verified creators to upload reel previews in their portal.' },
                { key: 'maintenanceMode', label: 'Maintenance Mode', desc: 'Restrict public access for planned platform infrastructure maintenance.' }
              ].map((f) => (
                <div
                  key={f.key}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '14px 0',
                    borderBottom: '1px solid #F0EBE2'
                  }}
                >
                  <div>
                    <strong>{f.label}</strong>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{f.desc}</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={platform[f.key]}
                    onChange={(e) => setPlatform({ ...platform, [f.key]: e.target.value === 'on' || e.target.checked })}
                    style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                  />
                </div>
              ))}

              <div style={{ marginTop: '24px' }}>
                <button type="submit" className="btn btn-primary cursor-pointer">
                  Save Platform Toggles &rarr;
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 6. SECURITY & DELETION TAB */}
      {/* ============================================================== */}
      {activeTab === 'security' && (
        <div className="settings-pane">
          {/* Security Status Overview */}
          <div className="settings-card-panel" style={{ marginBottom: '24px' }}>
            <h3>Platform Security & Superuser Authorization</h3>
            <p className="card-subtext">
              Cryptographic controls, audit trails, and authorized destructive workflow protections.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', margin: '20px 0' }}>
              <div style={{ padding: '16px', background: '#FDFBF7', borderRadius: '8px', border: '1px solid #F0EBE2' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>2-Factor Authentication</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#16A34A', marginTop: '4px' }}>
                  ✓ Enforced
                </div>
              </div>

              <div style={{ padding: '16px', background: '#FDFBF7', borderRadius: '8px', border: '1px solid #F0EBE2' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Session Timeout</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, marginTop: '4px' }}>
                  {securityStatus?.sessionTimeout || '60 Minutes'}
                </div>
              </div>

              <div style={{ padding: '16px', background: '#FDFBF7', borderRadius: '8px', border: '1px solid #F0EBE2' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Data Encryption</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#2563EB', marginTop: '4px' }}>
                  AES-256 GCM
                </div>
              </div>

              <div style={{ padding: '16px', background: '#FDFBF7', borderRadius: '8px', border: '1px solid #F0EBE2' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Primary Superuser</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, marginTop: '4px' }}>
                  {superuser?.maskedEmail || 's***@arika.in'}
                </div>
              </div>
            </div>
          </div>

          {/* Backup & Restore Panel */}
          <div className="settings-card-panel" style={{ marginBottom: '24px' }}>
            <h3>Full Platform Snapshot & Restore</h3>
            <p className="card-subtext">
              Export complete JSON system snapshot for cold-storage backup, or restore platform state.
            </p>

            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginTop: '16px' }}>
              <button
                type="button"
                className="btn btn-primary cursor-pointer"
                onClick={handleCreateBackup}
              >
                Create Full Platform Backup &rarr;
              </button>
            </div>

            {backupMessage && (
              <p style={{ marginTop: '10px', color: '#16A34A', fontSize: '0.85rem' }}>{backupMessage}</p>
            )}
          </div>

          {/* Destructive Data Deletion Workflow */}
          <div className="settings-card-panel" style={{ borderColor: '#FCA5A5' }}>
            <h3 style={{ color: '#DC2626' }}>Danger Zone: Date-Scoped Data Deletion</h3>
            <p className="card-subtext">
              Permanently purges historic data records created prior to the chosen target date. Requires
              one-time Superuser OTP verification.
            </p>

            <div style={{ marginTop: '16px' }}>
              <button
                type="button"
                className="btn btn-outline cursor-pointer"
                style={{ color: '#DC2626', borderColor: '#FCA5A5' }}
                onClick={() => {
                  setDeleteModalOpen(true);
                  setDeletionStep(1);
                  setOtpCode('');
                  setOtpMessage('');
                }}
              >
                Initiate Data Deletion Workflow &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invite Member Modal */}
      {inviteModalOpen && (
        <div
          className="creator-modal-overlay active"
          onClick={() => setInviteModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="creator-modal"
            style={{ maxWidth: '480px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="creator-modal__close cursor-pointer"
              onClick={() => setInviteModalOpen(false)}
            >
              &times;
            </button>
            <h3>Invite Team Member</h3>
            <p className="card-subtext">Send an invitation link with granular role privileges.</p>

            <form onSubmit={handleInviteSubmit} style={{ marginTop: '16px' }}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={inviteForm.name}
                  onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: '6px' }}
                />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: '6px' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>
                  Assigned Role
                </label>
                <select
                  value={inviteForm.role}
                  onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value })}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: '6px' }}
                >
                  <option>Moderator</option>
                  <option>Administrator</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary w-full cursor-pointer">
                Send Invite &rarr;
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Deletion Workflow Modal */}
      {deleteModalOpen && (
        <div
          className="creator-modal-overlay active"
          onClick={() => setDeleteModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="creator-modal"
            style={{ maxWidth: '480px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="creator-modal__close cursor-pointer"
              onClick={() => setDeleteModalOpen(false)}
            >
              &times;
            </button>

            <h3 style={{ color: '#DC2626' }}>Authorize Data Deletion</h3>

            {deletionStep === 1 && (
              <div style={{ marginTop: '16px' }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                  Select the cut-off date. All historical records logged prior to this date will be permanently deleted.
                </p>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginTop: '12px', marginBottom: '4px' }}>
                  Target Cut-off Date
                </label>
                <input
                  type="text"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: '6px', marginBottom: '16px' }}
                />

                <button
                  type="button"
                  className="btn btn-outline w-full cursor-pointer"
                  style={{ color: '#DC2626', borderColor: '#DC2626' }}
                  onClick={handleRequestOtp}
                >
                  Request Superuser Authorization OTP &rarr;
                </button>
              </div>
            )}

            {deletionStep === 2 && (
              <div style={{ marginTop: '16px' }}>
                <p style={{ fontSize: '0.85rem', color: '#16A34A', background: '#DCFCE7', padding: '10px', borderRadius: '6px' }}>
                  {otpMessage}
                </p>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginTop: '12px', marginBottom: '4px' }}>
                  Enter 6-Digit Verification Code
                </label>
                <input
                  type="text"
                  placeholder="e.g. 849201"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', letterSpacing: '4px', textAlign: 'center', fontSize: '1.2rem', border: '1px solid #E5E7EB', borderRadius: '6px', marginBottom: '16px' }}
                />

                <button
                  type="button"
                  className="btn btn-primary w-full cursor-pointer"
                  style={{ background: '#DC2626' }}
                  onClick={handleVerifyDelete}
                >
                  Confirm & Execute Permanent Purge
                </button>
              </div>
            )}

            {deletionStep === 3 && (
              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', color: '#16A34A', marginBottom: '8px' }}>✓</div>
                <p style={{ color: '#16A34A', fontWeight: 600 }}>{otpMessage}</p>
                <button
                  type="button"
                  className="btn btn-primary cursor-pointer"
                  style={{ marginTop: '14px' }}
                  onClick={() => setDeleteModalOpen(false)}
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
