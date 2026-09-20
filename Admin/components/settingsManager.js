/**
 * Arika Collabs - Admin Settings Manager
 * Complete controller handling all 6 Settings views, form states, Excel downloads,
 * Superuser OTP verification, Data deletion, Full backups, and Non-destructive restores.
 */
(function(window, document) {
  'use strict';

  const SETTINGS_TABS = ['general', 'team', 'notifications', 'data', 'platform', 'security'];

  const SLOGANS = {
    general: { text: 'SETTINGS TODAY.<br>A STRONGER<br>ARIKA TOMORROW.', slash: '/' },
    team: { text: 'RIGHT PEOPLE.<br>RIGHT ACCESS.<br>BIGGER IMPACT.', slash: '/' },
    notifications: { text: 'STAY INFORMED.<br>STAY AHEAD.', slash: '/' },
    data: { text: 'DATA TODAY.<br>A BRIGHTER<br>TOMORROW.', slash: '/' },
    platform: { text: 'A STRONGER<br>PLATFORM FOR BRIGHTER<br>COLLABORATIONS.', slash: '/' },
    security: { text: 'SECURE CREATORS.<br>SAFE DATA.<br>BRIGHTER TOMORROWS.', slash: '/' }
  };

  const TITLES = {
    general: { title: 'Settings', sub: 'Manage your platform preferences, team access and configurations.' },
    team: { title: 'Team & Access', sub: 'Manage your team members, roles and access permissions.' },
    notifications: { title: 'Notifications', sub: 'Stay updated with important activity across the platform.' },
    data: { title: 'Data & Reports', sub: 'Export data, generate reports and get insights in structured Excel formats.' },
    platform: { title: 'Platform', sub: 'Configure core platform settings and manage essential configurations.' },
    security: { title: 'Security', sub: 'Manage security, data protection and system controls.' }
  };

  class SettingsManager {
    constructor() {
      this.currentTab = 'general';
      this.isDirty = false;
      this.state = null;
      this.activeDeletionRequest = null;
      this.otpTimerInterval = null;

      this.init();
    }

    async init() {
      this.resolveInitialTab();
      this.bindTabNavigation();
      await this.loadInitialSettings();
      this.bindGlobalActions();
    }

    resolveInitialTab() {
      const path = window.location.pathname.toLowerCase();
      if (path.includes('team')) this.currentTab = 'team';
      else if (path.includes('notification')) this.currentTab = 'notifications';
      else if (path.includes('data')) this.currentTab = 'data';
      else if (path.includes('platform')) this.currentTab = 'platform';
      else if (path.includes('security')) this.currentTab = 'security';
      else this.currentTab = 'general';
    }

    switchTab(tabKey, pushUrl = true) {
      if (!SETTINGS_TABS.includes(tabKey)) tabKey = 'general';
      this.currentTab = tabKey;

      // Update Tab Pill UI
      document.querySelectorAll('.settings-tab-btn').forEach(btn => {
        const target = btn.getAttribute('data-tab');
        btn.classList.toggle('active', target === tabKey);
      });

      // Update Header Title, Subtitle, Slogan
      const titleEl = document.getElementById('settings-page-title');
      const subEl = document.getElementById('settings-page-subtitle');
      const sloganTextEl = document.getElementById('settings-slogan-text');

      if (titleEl) titleEl.textContent = TITLES[tabKey].title;
      if (subEl) subEl.textContent = TITLES[tabKey].sub;
      if (sloganTextEl) sloganTextEl.innerHTML = `${SLOGANS[tabKey].text} <span class="settings-banner-sparkle">✦</span>`;

      // Show matching tab view
      document.querySelectorAll('.settings-view-pane').forEach(pane => {
        pane.style.display = (pane.id === `view-${tabKey}`) ? 'block' : 'none';
      });

      if (pushUrl) {
        const targetPath = tabKey === 'general' ? '/Admin/Settings' : `/Admin/Settings/${tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}`;
        window.history.pushState({ tab: tabKey }, '', targetPath);
      }

      // Re-trigger tab-specific data load if needed
      if (tabKey === 'team') this.loadTeamData();
      else if (tabKey === 'data') this.loadExportsData();
      else if (tabKey === 'security') this.loadSecurityData();
    }

    bindTabNavigation() {
      document.querySelectorAll('.settings-tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const tab = btn.getAttribute('data-tab');
          this.switchTab(tab, true);
        });
      });

      window.addEventListener('popstate', (e) => {
        this.resolveInitialTab();
        this.switchTab(this.currentTab, false);
      });
    }

    async loadInitialSettings() {
      try {
        const res = await fetch('/api/settings');
        const data = await res.json();
        if (data.success) {
          this.state = data;
          this.populateGeneralForm(data.general);
          this.populatePlatformForm(data.platform);
          this.populateNotificationSettings(data.notifications);
          this.switchTab(this.currentTab, false);
        }
      } catch (err) {
        console.error('Failed to load initial settings:', err);
      }
    }

    populateGeneralForm(gen) {
      if (!gen) return;
      this.setVal('gen-fullname', gen.fullName);
      this.setVal('gen-email', gen.email);
      this.setVal('gen-role', gen.role);
      this.setVal('gen-platname', gen.platformName);
      this.setVal('gen-platdesc', gen.platformDescription);
      this.setVal('gen-weburl', gen.websiteUrl);
      this.setVal('gen-contactemail', gen.contactEmail);
      this.setVal('gen-supportemail', gen.supportEmail);
      this.setVal('gen-currency', gen.defaultCurrency);
      this.setVal('gen-timezone', gen.defaultTimezone);
      this.setVal('gen-language', gen.language);
      this.setVal('gen-dateformat', gen.dateFormat);
      this.setVal('gen-timeformat', gen.timeFormat);

      const charCount = document.getElementById('gen-desc-counter');
      if (charCount && gen.platformDescription) {
        charCount.textContent = `${gen.platformDescription.length}/200`;
      }
    }

    populatePlatformForm(plat) {
      if (!plat) return;
      this.setVal('plat-name', plat.platformName);
      this.setVal('plat-desc', plat.platformDescription);
      this.setVal('plat-url', plat.websiteUrl);
      this.setVal('plat-support', plat.supportEmail);
      this.setVal('plat-contact', plat.contactEmail);

      const f = plat.featureSettings || {};
      this.setChecked('feat-inf-reg', f.influencerRegistration);
      this.setChecked('feat-email-notif', f.emailNotifications);
      this.setChecked('feat-inquiries', f.campaignInquiries);
      this.setChecked('feat-ig-links', f.instagramLinks);
      this.setChecked('feat-content-sub', f.contentSubmissions);
      this.setChecked('feat-public-web', f.publicWebsite);
      this.setChecked('plat-maintenance', plat.maintenanceMode);
    }

    populateNotificationSettings(notif) {
      if (!notif) return;
      const emailNotice = document.getElementById('notif-current-email');
      if (emailNotice) emailNotice.textContent = notif.notificationEmail || 'admin@arika.in';

      if (notif.preferences) {
        this.setChecked('pref-daily-summary', notif.preferences.dailySummaryEmail);
        this.setChecked('pref-weekly-insights', notif.preferences.weeklyInsights);
      }
    }

    setVal(id, val) {
      const el = document.getElementById(id);
      if (el && val !== undefined) el.value = val;
    }

    setChecked(id, val) {
      const el = document.getElementById(id);
      if (el && val !== undefined) el.checked = !!val;
    }

    markDirty() {
      this.isDirty = true;
      document.querySelectorAll('.settings-bottom-bar').forEach(bar => {
        bar.style.opacity = '1';
        bar.style.pointerEvents = 'auto';
      });
    }

    clearDirty() {
      this.isDirty = false;
    }

    showToast(message, type = 'success') {
      let toast = document.getElementById('settings-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'settings-toast';
        toast.className = 'settings-toast';
        document.body.appendChild(toast);
      }
      toast.className = `settings-toast toast-${type} active`;
      toast.innerHTML = `<span>${message}</span>`;
      setTimeout(() => {
        toast.classList.remove('active');
      }, 4000);
    }

    // ========================================================================
    // TEAM & ACCESS
    // ========================================================================
    async loadTeamData() {
      try {
        const res = await fetch('/api/settings/team');
        const data = await res.json();
        if (data.success) {
          this.renderTeamMembers(data.members);
          this.renderTeamCounts(data.counts);
          this.renderAccessLogs(data.accessLogs);
        }
      } catch (err) {
        console.error('Error loading team data:', err);
      }
    }

    renderTeamCounts(counts) {
      if (!counts) return;
      const totalEl = document.getElementById('stat-total-members');
      const adminEl = document.getElementById('stat-admin-count');
      const modEl = document.getElementById('stat-mod-count');
      if (totalEl) totalEl.textContent = counts.total || '3';
      if (adminEl) adminEl.textContent = counts.admin || '2';
      if (modEl) modEl.textContent = counts.moderator || '1';
    }

    renderTeamMembers(members) {
      const tbody = document.getElementById('team-members-tbody');
      if (!tbody) return;

      const searchVal = (document.getElementById('team-search-input')?.value || '').toLowerCase();
      const roleFilter = document.getElementById('team-role-filter')?.value || 'all';

      const filtered = (members || []).filter(m => {
        const matchSearch = m.name.toLowerCase().includes(searchVal) || m.email.toLowerCase().includes(searchVal);
        const matchRole = roleFilter === 'all' || m.role.toLowerCase() === roleFilter.toLowerCase();
        return matchSearch && matchRole;
      });

      tbody.innerHTML = filtered.map(m => {
        const roleBadge = m.role === 'Administrator' 
          ? `<span class="badge-role-admin">Administrator</span>` 
          : `<span class="badge-role-mod">Moderator</span>`;
        const youBadge = m.isSelf ? `<span style="background: #E0E7FF; color: #3730A3; font-size: 10.5px; font-weight: 700; padding: 2px 6px; border-radius: 4px; margin-left: 6px;">You</span>` : '';

        return `
          <tr>
            <td>
              <div style="display: flex; align-items: center; gap: 10px;">
                <img src="${m.avatar}" alt="${m.name}" style="width: 34px; height: 34px; border-radius: 50%; object-fit: cover; border: 1px solid #EFECE6;">
                <div>
                  <span style="font-weight: 600; color: #1A1A1A;">${m.name}</span>
                  ${youBadge}
                </div>
              </div>
            </td>
            <td style="color: #4A453E;">${m.email}</td>
            <td>${roleBadge}</td>
            <td><span class="badge-status-active">${m.status}</span></td>
            <td style="color: #78716C;">${m.lastActive}</td>
            <td style="text-align: right;">
              <button class="export-dl-btn" data-action="member-menu" data-id="${m.id}" title="Actions">︙</button>
            </td>
          </tr>
        `;
      }).join('');
    }

    renderAccessLogs(logs) {
      const list = document.getElementById('access-logs-list');
      if (!list) return;
      list.innerHTML = (logs || []).slice(0, 6).map(l => `
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #F5F3EF; font-size: 12.5px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <img src="${l.avatar}" alt="${l.user}" style="width: 26px; height: 26px; border-radius: 50%; object-fit: cover;">
            <div>
              <span style="font-weight: 600; color: #1A1A1A;">${l.user}</span>
              <span style="color: #78716C; margin-left: 6px;">${l.action}</span>
            </div>
          </div>
          <div style="color: #4A453E;">${l.details}</div>
          <div style="color: #9CA3AF; font-size: 11px;">${l.time}</div>
        </div>
      `).join('');
    }

    // ========================================================================
    // DATA & REPORTS
    // ========================================================================
    async loadExportsData() {
      try {
        const res = await fetch('/api/settings/data/recent-exports');
        const data = await res.json();
        if (data.success) {
          this.renderRecentExports(data.exports);
        }
      } catch (err) {
        console.error('Error loading exports data:', err);
      }
    }

    renderRecentExports(exports) {
      const tbody = document.getElementById('recent-exports-tbody');
      if (!tbody) return;
      tbody.innerHTML = (exports || []).map(exp => `
        <tr>
          <td>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="color: #15803D; font-weight: 700; font-size: 14px;">📊</span>
              <span style="font-weight: 600; color: #1A1A1A;">${exp.name}</span>
            </div>
          </td>
          <td><span style="color: #4A453E;">${exp.type}</span></td>
          <td><span style="color: #78716C;">${exp.period}</span></td>
          <td><span style="color: #78716C;">${exp.generatedOn}</span></td>
          <td><span style="color: #4A453E;">${exp.size}</span></td>
          <td><span class="badge-status-active">${exp.status}</span></td>
          <td>
            <button class="btn-white" data-action="download-report" data-name="${exp.name}" style="padding: 6px 12px; font-size: 12px;">
              ⬇ Download
            </button>
          </td>
        </tr>
      `).join('');
    }

    // ========================================================================
    // SECURITY & DATA DELETION WORKFLOW
    // ========================================================================
    async loadSecurityData() {
      try {
        const res = await fetch('/api/settings/security/status');
        const data = await res.json();
        if (data.success) {
          this.renderSecurityLogs(data.logs);
          if (data.security && data.security.lastBackup) {
            const b = data.security.lastBackup;
            const bEl = document.getElementById('sec-last-backup-text');
            if (bEl) bEl.textContent = `Last Backup: ${b.date}`;
          }
        }
      } catch (err) {
        console.error('Error loading security status:', err);
      }
    }

    renderSecurityLogs(logs) {
      const list = document.getElementById('security-logs-list');
      if (!list) return;
      list.innerHTML = (logs || []).slice(0, 6).map(l => {
        const dotColor = l.status === 'green' ? '#16A34A' : l.status === 'blue' ? '#2563EB' : l.status === 'amber' ? '#D97706' : '#9CA3AF';
        return `
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #F5F3EF; font-size: 12px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="width: 7px; height: 7px; border-radius: 50%; background: ${dotColor}; display: inline-block;"></span>
              <span style="font-weight: 600; color: #1A1A1A;">${l.user}</span>
            </div>
            <div style="color: #261C14; font-weight: 500;">${l.action}</div>
            <div style="color: #78716C;">${l.details}</div>
            <div style="color: #9CA3AF; font-size: 11px;">${l.time}</div>
          </div>
        `;
      }).join('');
    }

    async requestDeletionOTP() {
      const dateInput = document.getElementById('delete-date-input');
      const targetDate = dateInput?.value?.trim();
      if (!targetDate) {
        this.showToast('Please select or specify a valid deletion target date (e.g. 31 Mar 2022).', 'error');
        return;
      }

      const btn = document.getElementById('btn-request-otp');
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Sending Verification...';
      }

      try {
        const res = await fetch('/api/settings/security/request-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ targetDate })
        });
        const data = await res.json();

        if (data.success) {
          this.activeDeletionRequest = data;
          this.showToast(`Verification code sent to Superuser (${data.maskedEmail}). Valid for 5 minutes.`, 'success');
          
          // Enable OTP input and Verify & Delete button
          const otpInput = document.getElementById('delete-otp-input');
          const verifyBtn = document.getElementById('btn-verify-delete');
          if (otpInput) {
            otpInput.disabled = false;
            otpInput.focus();
          }
          if (verifyBtn) verifyBtn.disabled = false;

          // Start 5-minute countdown visual indicator
          this.startOTPCountdown(data.expiresIn || 300);
          this.loadSecurityData();
        } else {
          this.showToast(data.error || 'Failed to request verification code.', 'error');
        }
      } catch (err) {
        this.showToast(err.message || 'Network error requesting OTP.', 'error');
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.textContent = 'Request OTP';
        }
      }
    }

    startOTPCountdown(seconds) {
      clearInterval(this.otpTimerInterval);
      let rem = seconds;
      const countdownEl = document.getElementById('otp-countdown-display');

      const updateUI = () => {
        const m = Math.floor(rem / 60);
        const s = rem % 60;
        if (countdownEl) {
          countdownEl.textContent = `(Valid: ${m}:${s < 10 ? '0' : ''}${s})`;
          countdownEl.style.color = rem < 60 ? '#DC2626' : '#D97706';
        }
      };
      updateUI();

      this.otpTimerInterval = setInterval(() => {
        rem--;
        if (rem <= 0) {
          clearInterval(this.otpTimerInterval);
          if (countdownEl) countdownEl.textContent = '(Expired)';
          const verifyBtn = document.getElementById('btn-verify-delete');
          if (verifyBtn) verifyBtn.disabled = true;
          this.showToast('OTP has expired. Please request a new verification code.', 'error');
        } else {
          updateUI();
        }
      }, 1000);
    }

    async verifyAndExecuteDelete() {
      if (!this.activeDeletionRequest) {
        this.showToast('Please click Request OTP first.', 'error');
        return;
      }

      const otpVal = document.getElementById('delete-otp-input')?.value?.trim();
      if (!otpVal || otpVal.length !== 6) {
        this.showToast('Please enter the 6-digit Superuser OTP.', 'error');
        return;
      }

      const confirmAction = window.confirm(
        `FINAL CONFIRMATION:\n\nPermanently delete platform data up to ${this.activeDeletionRequest.targetDate}?\nThis operation is irreversible.`
      );
      if (!confirmAction) return;

      const verifyBtn = document.getElementById('btn-verify-delete');
      if (verifyBtn) {
        verifyBtn.disabled = true;
        verifyBtn.textContent = 'Processing Deletion...';
      }

      try {
        const res = await fetch('/api/settings/security/verify-delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            requestId: this.activeDeletionRequest.requestId,
            otp: otpVal
          })
        });
        const data = await res.json();

        if (data.success) {
          clearInterval(this.otpTimerInterval);
          this.activeDeletionRequest = null;
          this.showToast(`Data deleted successfully! Removed ${data.recordsDeleted} records up to ${data.targetDate}.`, 'success');

          // Reset inputs
          const otpInput = document.getElementById('delete-otp-input');
          if (otpInput) {
            otpInput.value = '';
            otpInput.disabled = true;
          }
          const cd = document.getElementById('otp-countdown-display');
          if (cd) cd.textContent = '';

          this.loadSecurityData();
        } else {
          this.showToast(data.error || 'Verification failed.', 'error');
        }
      } catch (err) {
        this.showToast(err.message || 'Deletion execution failed.', 'error');
      } finally {
        if (verifyBtn) {
          verifyBtn.disabled = false;
          verifyBtn.innerHTML = `
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Verify & Delete Data
          `;
        }
      }
    }

    // ========================================================================
    // BACKUP & RESTORE
    // ========================================================================
    async createFullBackup() {
      const btn = document.getElementById('btn-create-backup');
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Creating Full Backup...';
      }

      try {
        const res = await fetch('/api/settings/security/backup', { method: 'POST' });
        const data = await res.json();
        if (data.success) {
          this.showToast(`Full backup completed (${data.size}). Triggering download...`, 'success');
          window.location.href = data.downloadUrl;
          this.loadSecurityData();
        } else {
          this.showToast(data.error || 'Backup creation failed.', 'error');
        }
      } catch (err) {
        this.showToast(err.message || 'Backup failed.', 'error');
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = `
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Create Full Backup
          `;
        }
      }
    }

    triggerRestoreUpload() {
      const input = document.getElementById('restore-file-input');
      if (input) input.click();
    }

    async handleRestoreFile(file) {
      if (!file) return;
      try {
        const text = await file.text();
        const json = JSON.parse(text);

        if (!json.platform || json.platform !== 'Arika Collabs') {
          this.showToast('Invalid backup file. Signature must belong to Arika Collabs.', 'error');
          return;
        }

        const confirmRestore = window.confirm(
          `RESTORE PREVIEW:\n\nBackup Version: ${json.schemaVersion || '1.0.0'}\nCreated At: ${json.createdAt}\nPlatform: ${json.platform}\n\nExisting valid records will be preserved. Proceed with merge?`
        );
        if (!confirmRestore) return;

        this.showToast('Validating and merging backup records...', 'info');

        const res = await fetch('/api/settings/security/restore', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ backupData: json })
        });
        const data = await res.json();

        if (data.success) {
          this.showToast(data.message, 'success');
          this.loadSecurityData();
        } else {
          this.showToast(data.error || 'Restore failed.', 'error');
        }
      } catch (err) {
        this.showToast(`Error parsing backup: ${err.message}`, 'error');
      }
    }

    // ========================================================================
    // GLOBAL ACTIONS & EVENT BINDINGS
    // ========================================================================
    bindGlobalActions() {
      // Mark dirty on any input change in general/platform forms
      document.querySelectorAll('#view-general input, #view-general textarea, #view-general select, #view-platform input, #view-platform textarea').forEach(el => {
        el.addEventListener('input', () => this.markDirty());
        el.addEventListener('change', () => this.markDirty());
      });

      // Description Char Counters
      const genDesc = document.getElementById('gen-platdesc');
      if (genDesc) {
        genDesc.addEventListener('input', () => {
          const c = document.getElementById('gen-desc-counter');
          if (c) c.textContent = `${genDesc.value.length}/200`;
        });
      }

      const platDesc = document.getElementById('plat-desc');
      if (platDesc) {
        platDesc.addEventListener('input', () => {
          const c = document.getElementById('plat-desc-counter');
          if (c) c.textContent = `${platDesc.value.length}/200`;
        });
      }

      // Appearance Theme Selector Cards
      document.querySelectorAll('.theme-card').forEach(card => {
        card.addEventListener('click', () => {
          document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('active'));
          card.classList.add('active');
          const theme = card.getAttribute('data-theme');
          this.showToast(`Theme changed to ${theme}.`, 'info');
          this.markDirty();
        });
      });

      // Save Changes Buttons
      document.querySelectorAll('.btn-save-settings').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.saveSettings();
        });
      });

      // Discard Buttons
      document.querySelectorAll('.btn-discard-settings').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.loadInitialSettings();
          this.clearDirty();
          this.showToast('Unsaved changes discarded.', 'info');
        });
      });

      // Test Notification
      const btnSendTest = document.getElementById('btn-send-test-notif');
      if (btnSendTest) {
        btnSendTest.addEventListener('click', async () => {
          const email = document.getElementById('test-notif-email')?.value?.trim();
          if (!email) {
            this.showToast('Please enter an email address for the test.', 'error');
            return;
          }
          btnSendTest.disabled = true;
          btnSendTest.textContent = 'Sending...';

          try {
            const res = await fetch('/api/settings/notifications/test', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ recipient: email })
            });
            const data = await res.json();
            if (data.success) {
              this.showToast(data.message, 'success');
            } else {
              this.showToast(data.error || 'Failed to send test email.', 'error');
            }
          } catch (err) {
            this.showToast(err.message, 'error');
          } finally {
            btnSendTest.disabled = false;
            btnSendTest.innerHTML = `
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Send Test Email
            `;
          }
        });
      }

      // Quick Exports
      document.querySelectorAll('[data-export-dataset]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const dataset = btn.getAttribute('data-export-dataset');
          this.showToast(`Generating Excel export for ${dataset}...`, 'info');
          window.location.href = `/api/settings/data/export/${dataset}`;
        });
      });

      // Generate Monthly Report
      const btnMonthly = document.getElementById('btn-gen-monthly');
      if (btnMonthly) {
        btnMonthly.addEventListener('click', () => {
          const month = document.getElementById('report-month-select')?.value || 'September';
          const year = document.getElementById('report-year-select')?.value || '2026';
          this.generateReport('Monthly', month, year);
        });
      }

      // Generate Annual Report
      const btnAnnual = document.getElementById('btn-gen-annual');
      if (btnAnnual) {
        btnAnnual.addEventListener('click', () => {
          const year = document.getElementById('report-annual-year-select')?.value || '2026';
          this.generateReport('Annual', null, year);
        });
      }

      // View Sample Report Modal
      const btnSample = document.getElementById('btn-view-sample-report');
      if (btnSample) {
        btnSample.addEventListener('click', () => {
          this.openModal('sample-report-modal');
        });
      }

      // Invite Team Member Modal & Form
      const btnInvite = document.getElementById('btn-open-invite-modal');
      if (btnInvite) {
        btnInvite.addEventListener('click', () => this.openModal('invite-member-modal'));
      }

      const inviteForm = document.getElementById('invite-member-form');
      if (inviteForm) {
        inviteForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          const name = document.getElementById('invite-name')?.value?.trim();
          const email = document.getElementById('invite-email')?.value?.trim();
          const role = document.getElementById('invite-role')?.value || 'Moderator';
          const message = document.getElementById('invite-message')?.value?.trim();

          if (!name || !email) {
            this.showToast('Please fill in all required fields.', 'error');
            return;
          }

          try {
            const res = await fetch('/api/settings/team/invite', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name, email, role, message })
            });
            const data = await res.json();
            if (data.success) {
              this.showToast(data.message, 'success');
              this.closeModal('invite-member-modal');
              inviteForm.reset();
              this.loadTeamData();
            } else {
              this.showToast(data.error || 'Failed to send invite.', 'error');
            }
          } catch (err) {
            this.showToast(err.message, 'error');
          }
        });
      }

      // Team Search & Filter
      const searchInput = document.getElementById('team-search-input');
      if (searchInput) {
        searchInput.addEventListener('input', () => this.loadTeamData());
      }
      const roleFilter = document.getElementById('team-role-filter');
      if (roleFilter) {
        roleFilter.addEventListener('change', () => this.loadTeamData());
      }

      // Data Deletion Workflow Actions
      const btnReqOTP = document.getElementById('btn-request-otp');
      if (btnReqOTP) {
        btnReqOTP.addEventListener('click', () => this.requestDeletionOTP());
      }

      const btnVerifyDel = document.getElementById('btn-verify-delete');
      if (btnVerifyDel) {
        btnVerifyDel.addEventListener('click', () => this.verifyAndExecuteDelete());
      }

      // Backup & Restore Actions
      const btnBackup = document.getElementById('btn-create-backup');
      if (btnBackup) {
        btnBackup.addEventListener('click', () => this.createFullBackup());
      }

      const btnRestore = document.getElementById('btn-upload-restore');
      if (btnRestore) {
        btnRestore.addEventListener('click', () => this.triggerRestoreUpload());
      }

      const restoreInput = document.getElementById('restore-file-input');
      if (restoreInput) {
        restoreInput.addEventListener('change', (e) => {
          if (e.target.files && e.target.files[0]) {
            this.handleRestoreFile(e.target.files[0]);
          }
        });
      }

      // Superuser Management Modal
      const btnSuperuser = document.getElementById('btn-manage-superuser');
      if (btnSuperuser) {
        btnSuperuser.addEventListener('click', async () => {
          try {
            const res = await fetch('/api/settings/security/superuser');
            const data = await res.json();
            if (data.success) {
              document.getElementById('su-modal-email').textContent = data.maskedEmail;
              document.getElementById('su-modal-status').textContent = data.status;
              document.getElementById('su-modal-lastverif').textContent = data.lastVerification;
              this.openModal('superuser-modal');
            }
          } catch (err) {
            this.showToast('Could not load superuser details.', 'error');
          }
        });
      }

      // Admin Authentication Modal
      const btnAuthCfg = document.getElementById('btn-config-admin-auth');
      if (btnAuthCfg) {
        btnAuthCfg.addEventListener('click', () => this.openModal('admin-auth-modal'));
      }

      // Domain & SSL Modal
      const btnDomain = document.getElementById('btn-manage-domain');
      if (btnDomain) {
        btnDomain.addEventListener('click', () => this.openModal('domain-modal'));
      }

      // Modal Closers
      document.querySelectorAll('[data-close-modal]').forEach(btn => {
        btn.addEventListener('click', () => {
          const target = btn.getAttribute('data-close-modal');
          this.closeModal(target);
        });
      });
    }

    async generateReport(type, month, year) {
      this.showToast(`Generating ${type} report (${month || ''} ${year})...`, 'info');
      try {
        const res = await fetch('/api/settings/data/generate-report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type, month, year })
        });

        if (res.ok) {
          const blob = await res.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `Arika_${type}_Report_${year}.xlsx`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          this.showToast(`${type} report downloaded successfully!`, 'success');
          this.loadExportsData();
        } else {
          this.showToast('Failed to generate report.', 'error');
        }
      } catch (err) {
        this.showToast(err.message, 'error');
      }
    }

    async saveSettings() {
      const payload = {
        general: {
          fullName: document.getElementById('gen-fullname')?.value,
          email: document.getElementById('gen-email')?.value,
          platformName: document.getElementById('gen-platname')?.value,
          platformDescription: document.getElementById('gen-platdesc')?.value,
          websiteUrl: document.getElementById('gen-weburl')?.value,
          contactEmail: document.getElementById('gen-contactemail')?.value,
          supportEmail: document.getElementById('gen-supportemail')?.value,
          defaultCurrency: document.getElementById('gen-currency')?.value,
          defaultTimezone: document.getElementById('gen-timezone')?.value,
          language: document.getElementById('gen-language')?.value,
          dateFormat: document.getElementById('gen-dateformat')?.value,
          timeFormat: document.getElementById('gen-timeformat')?.value
        },
        platform: {
          platformName: document.getElementById('plat-name')?.value,
          platformDescription: document.getElementById('plat-desc')?.value,
          websiteUrl: document.getElementById('plat-url')?.value,
          supportEmail: document.getElementById('plat-support')?.value,
          contactEmail: document.getElementById('plat-contact')?.value,
          maintenanceMode: document.getElementById('plat-maintenance')?.checked,
          featureSettings: {
            influencerRegistration: document.getElementById('feat-inf-reg')?.checked,
            emailNotifications: document.getElementById('feat-email-notif')?.checked,
            campaignInquiries: document.getElementById('feat-inquiries')?.checked,
            instagramLinks: document.getElementById('feat-ig-links')?.checked,
            contentSubmissions: document.getElementById('feat-content-sub')?.checked,
            publicWebsite: document.getElementById('feat-public-web')?.checked
          }
        }
      };

      try {
        const res = await fetch('/api/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
          this.clearDirty();
          this.showToast('Settings saved successfully.', 'success');
        } else {
          this.showToast(data.error || 'Failed to save settings.', 'error');
        }
      } catch (err) {
        this.showToast(err.message, 'error');
      }
    }

    openModal(id) {
      const el = document.getElementById(id);
      if (el) el.classList.add('active');
    }

    closeModal(id) {
      const el = document.getElementById(id);
      if (el) el.classList.remove('active');
    }
  }

  // Initialize on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    window.settingsManager = new SettingsManager();
  });

})(window, document);
