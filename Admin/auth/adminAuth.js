/**
 * Admin Authentication & Session Management Module
 */
(function(window) {
  'use strict';

  const STORAGE_KEY = 'arika_auth_session';

  const AdminAuth = {
    getSession() {
      try {
        const raw = sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
      } catch (e) {
        return null;
      }
    },

    logout() {
      try {
        localStorage.removeItem(STORAGE_KEY);
        sessionStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.error('Logout error:', e);
      }
      window.location.replace('/login.html');
    },

    init() {
      const session = this.getSession();
      if (!session || session.role !== 'admin') {
        this.logout();
        return;
      }

      // Populate user info if elements exist
      const nameEl = document.getElementById('admin-display-name');
      const avatarEl = document.getElementById('admin-avatar-img');

      if (nameEl && session.user && session.user.name) {
        nameEl.textContent = session.user.name;
      }

      if (avatarEl && session.user && session.user.avatar) {
        avatarEl.src = session.user.avatar;
      }

      // Bind logout buttons (in sidebar and header dropdown)
      document.querySelectorAll('[data-action="admin-logout"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          AdminAuth.logout();
        });
      });
    }
  };

  window.AdminAuth = AdminAuth;
})(window);
