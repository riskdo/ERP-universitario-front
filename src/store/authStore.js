const TOKEN_KEY = 'erp_access_token';
const USER_KEY = 'erp_user';

export function saveSession({ access_token, user }) {
  sessionStorage.setItem(TOKEN_KEY, access_token);
  sessionStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function getUser() {
  const rawUser = sessionStorage.getItem(USER_KEY);
  return rawUser ? JSON.parse(rawUser) : null;
}

export function isAuthenticated() {
  return Boolean(getToken());
}

export function clearSession() {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
}
