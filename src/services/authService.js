/**
 * Arika Collabs - Client Authentication Service
 * Handles user and admin authentication states, credentials validation,
 * and localStorage persistence ('arika_auth_session').
 */

export const DEV_ACCOUNTS = [
  {
    id: 'admin-1',
    username: 'admin',
    email: 'admin@arikacollabs.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin',
    title: 'Administrator',
    avatar: '/assets/images/avatar-admin.svg'
  },
  {
    id: 'user-1',
    username: 'user',
    email: 'user@arikacollabs.com',
    password: 'user123',
    role: 'user',
    name: 'Priya Sharma',
    title: 'Fashion Creator',
    avatar: '/assets/images/creator-priya.jpg'
  },
  {
    id: 'user-2',
    username: 'creator',
    email: 'creator@arikacollabs.com',
    password: 'creator123',
    role: 'user',
    name: 'Creator Demo',
    title: 'Verified Creator',
    avatar: '/assets/images/creator-aman.jpg'
  }
];

const STORAGE_KEY = 'arika_auth_session';

export const authService = {
  getSession() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  setSession(session, rememberMe = true) {
    const raw = JSON.stringify(session);
    if (rememberMe) {
      localStorage.setItem(STORAGE_KEY, raw);
    } else {
      sessionStorage.setItem(STORAGE_KEY, raw);
    }
  },

  clearSession() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  },

  login(identifier, password, selectedRole = 'user', rememberMe = true) {
    const cleanId = (identifier || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();
    const targetRole = (selectedRole || 'user').toLowerCase();

    const account = DEV_ACCOUNTS.find(
      (a) => a.email.toLowerCase() === cleanId || a.username.toLowerCase() === cleanId
    );

    if (!account || account.password !== cleanPass) {
      return {
        success: false,
        error: targetRole === 'admin' ? 'Invalid admin credentials.' : 'Invalid user credentials.'
      };
    }

    if (account.role !== targetRole) {
      return {
        success: false,
        error: targetRole === 'admin' ? 'Invalid admin credentials.' : 'Invalid user credentials.'
      };
    }

    const session = {
      authenticated: true,
      role: account.role,
      user: {
        id: account.id,
        name: account.name,
        email: account.email,
        title: account.title,
        avatar: account.avatar
      },
      token: `dev-session-${Date.now()}`,
      loginAt: new Date().toISOString()
    };

    this.setSession(session, rememberMe);
    return { success: true, session, role: account.role };
  },

  register(data) {
    return {
      success: true,
      message: 'Registration received! Please log in with the demo account for testing.'
    };
  }
};
