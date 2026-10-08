/**
 * Arika Collabs - Client API Service
 * Handles API calls to backend proxy endpoints
 */

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export async function getSettings() {
  const res = await fetch(`${API_BASE}/settings`);
  return res.json();
}

export async function saveSettings(payload) {
  const res = await fetch(`${API_BASE}/settings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function getTeam() {
  const res = await fetch(`${API_BASE}/settings/team`);
  return res.json();
}

export async function inviteTeamMember(data) {
  const res = await fetch(`${API_BASE}/settings/team/invite`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function updateTeamRole(id, role) {
  const res = await fetch(`${API_BASE}/settings/team/update-role`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, role })
  });
  return res.json();
}

export async function updateTeamStatus(id, status) {
  const res = await fetch(`${API_BASE}/settings/team/status`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, status })
  });
  return res.json();
}

export async function deleteTeamMember(id) {
  const res = await fetch(`${API_BASE}/settings/team/${id}`, {
    method: 'DELETE'
  });
  return res.json();
}

export async function sendTestNotification(recipient) {
  const res = await fetch(`${API_BASE}/settings/notifications/test`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ recipient })
  });
  return res.json();
}

export async function getRecentExports() {
  const res = await fetch(`${API_BASE}/settings/data/recent-exports`);
  return res.json();
}

export function getExportDatasetUrl(dataset) {
  return `${API_BASE}/settings/data/export/${dataset}`;
}

export async function generateReport(payload) {
  const res = await fetch(`${API_BASE}/settings/data/generate-report`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to generate report');
  return res.blob();
}

export async function getSecurityStatus() {
  const res = await fetch(`${API_BASE}/settings/security/status`);
  return res.json();
}

export async function getSuperuser() {
  const res = await fetch(`${API_BASE}/settings/security/superuser`);
  return res.json();
}

export async function requestDeletionOtp(targetDate) {
  const res = await fetch(`${API_BASE}/settings/security/request-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ targetDate })
  });
  return res.json();
}

export async function verifyAndDelete(requestId, otp) {
  const res = await fetch(`${API_BASE}/settings/security/verify-delete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ requestId, otp })
  });
  return res.json();
}

export async function createBackup() {
  const res = await fetch(`${API_BASE}/settings/security/backup`, {
    method: 'POST'
  });
  return res.json();
}

export function getDownloadBackupUrl() {
  return `${API_BASE}/settings/security/download-last-backup`;
}

export async function restoreBackup(backupData) {
  const res = await fetch(`${API_BASE}/settings/security/restore`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ backupData })
  });
  return res.json();
}

export async function getSecurityLogs() {
  const res = await fetch(`${API_BASE}/settings/security/logs`);
  return res.json();
}
