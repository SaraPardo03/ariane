import {jwtDecode} from 'jwt-decode';

export function isTokenValid(token) {
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      return false;  // Token is expired
    }
    return true;  // Token is valid
  } catch (error) {
    return false;  // Invalid token
  }
}

export function getToken() {
  return localStorage.getItem('authToken');
}

export function setToken(token) {
  localStorage.setItem('authToken', token);
}

export function removeToken() {
  localStorage.removeItem('authToken');
}
