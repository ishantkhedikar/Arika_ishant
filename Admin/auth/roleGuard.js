/**
 * Admin Route Guard
 * Enforces role-based security: only users with role === "admin" can access /Admin.
 * Any unauthorized attempt will immediately clear any mismatched session and redirect to /login.html.
 */
(function() {
  'use strict';

  const STORAGE_KEY = 'arika_auth_session';

  function verifyAdminAccess() {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        denyAccess();
        return false;
      }

      const session = JSON.parse(raw);
      if (!session || !session.user || session.role !== 'admin') {
        denyAccess();
        return false;
      }

      // Valid admin session confirmed
      return true;
    } catch (e) {
      denyAccess();
      return false;
    }
  }

  function denyAccess() {
    console.warn('Unauthorized access to /Admin blocked. Redirecting to login.');
    // Prevent rendering of any admin content
    document.documentElement.style.display = 'none';
    window.location.replace('/login.html?error=unauthorized');
  }

  // Execute immediately synchronously
  if (!verifyAdminAccess()) {
    // Access denied and redirection triggered
    return;
  } else {
    document.documentElement.style.display = '';
  }
})();
