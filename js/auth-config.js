/* ==========================================================================
   DEVELOPMENT ONLY — Mock Authentication Configuration & Service
   Arika Collabs Role-Based Authentication
   Do NOT use in production. Replace with real API authentication backend.
   ========================================================================== */

(function(window) {
  'use strict';

  // Dedicated development credentials store
  const DEV_ACCOUNTS = [
    {
      id: 'admin-1',
      username: 'admin',
      email: 'admin@arikacollabs.com',
      password: 'admin123', // DEVELOPMENT ONLY
      role: 'admin',
      name: 'Admin',
      title: 'Administrator',
      avatar: '/assets/images/Professionelle Corporate Headshots_ Warum sie für Ihr Unternehmen unverzichtbar sind.jpg'
    },
    {
      id: 'user-1',
      username: 'user',
      email: 'user@arikacollabs.com',
      password: 'user123', // DEVELOPMENT ONLY
      role: 'user',
      name: 'Priya Sharma',
      title: 'Fashion Creator',
      avatar: '/assets/images/creator-priya.jpg'
    },
    {
      id: 'user-2',
      username: 'creator',
      email: 'creator@arikacollabs.com',
      password: 'creator123', // DEVELOPMENT ONLY
      role: 'user',
      name: 'Creator Demo',
      title: 'Verified Creator',
      avatar: '/assets/images/creator-aman.jpg'
    }
  ];

  const STORAGE_KEY = 'arika_auth_session';

  const ArikaAuth = {
    accounts: DEV_ACCOUNTS,

    /**
     * Authenticate credentials against selected account type.
     * @param {string} identifier - Email or username
     * @param {string} password - User password
     * @param {'user'|'admin'} selectedRole - Account type selected in UI
     * @returns {{ success: boolean, role?: string, user?: object, error?: string }}
     */
    login(identifier, password, selectedRole) {
      const cleanIdentifier = (identifier || '').trim().toLowerCase();
      const cleanPassword = (password || '').trim();
      const role = (selectedRole || 'user').toLowerCase();

      // Find account matching username or email
      const account = DEV_ACCOUNTS.find(acc =>
        acc.email.toLowerCase() === cleanIdentifier ||
        acc.username.toLowerCase() === cleanIdentifier
      );

      // Credential verification
      if (!account || account.password !== cleanPassword) {
        if (role === 'admin') {
          return {
            success: false,
            error: 'Invalid admin credentials.'
          };
        } else {
          return {
            success: false,
            error: 'Invalid user credentials.'
          };
        }
      }

      // Role verification (strict role mismatch validation)
      if (account.role !== role) {
        if (role === 'admin') {
          // Account exists as user, but user tried to log in under Admin role
          return {
            success: false,
            error: 'Invalid admin credentials.'
          };
        } else {
          // Admin tried to log in under User role
          return {
            success: false,
            error: 'Invalid user credentials.'
          };
        }
      }

      // Successful authentication
      const session = {
        token: 'dev_token_' + Math.random().toString(36).substring(2) + Date.now().toString(36),
        user: {
          id: account.id,
          name: account.name,
          email: account.email,
          username: account.username,
          title: account.title,
          avatar: account.avatar,
          role: account.role
        },
        role: account.role,
        createdAt: new Date().toISOString()
      };

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      } catch (e) {
        console.warn('Unable to store session in storage', e);
      }

      return {
        success: true,
        role: account.role,
        user: session.user,
        session
      };
    },

    /**
     * Retrieve the currently authenticated session.
     */
    getCurrentSession() {
      try {
        const raw = sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const session = JSON.parse(raw);
        if (session && session.user && session.role) {
          return session;
        }
      } catch (e) {
        console.warn('Corrupted session data', e);
      }
      return null;
    },

    /**
     * Terminate session and clear storage.
     */
    logout() {
      try {
        localStorage.removeItem(STORAGE_KEY);
        sessionStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.warn('Failed to clear session', e);
      }
      window.location.href = '/login.html';
    },

    /**
     * Route guard: Requires active admin session, redirects if unauthorized.
     */
    requireAdmin(redirectPath = '/login.html') {
      const session = this.getCurrentSession();
      if (!session || session.role !== 'admin') {
        // Clear any invalid session
        try {
          localStorage.removeItem(STORAGE_KEY);
          sessionStorage.removeItem(STORAGE_KEY);
        } catch (e) {}
        window.location.replace(redirectPath + '?error=unauthorized');
        return false;
      }
      return true;
    }
  };

  window.ArikaAuth = ArikaAuth;
})(window);
