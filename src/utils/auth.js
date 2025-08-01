import { jwtDecode } from 'jwt-decode';
import { getURL } from './api';

export async function getToken() {
  let token = sessionStorage.getItem('token');

  if (!token) {
    token = localStorage.getItem('token');
  }

  if (!token) return null;
  try {
    const res = await fetch(`${getURL()}user/auth/verify`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    if (data.valid) {
      return token;
    }

    return null;
  } catch (err) {
    console.error('Erro ao verificar token:', err);
    return null;
  }
}

export function isTokenInLocalStorage() {
  const tokenInLocal = localStorage.getItem('token');
  return !!tokenInLocal;
}

export function setTokenLocal(token) {
  localStorage.setItem('token', token);
}

export function setTokenSession(token) {
  sessionStorage.setItem('token', token);
}

export async function getPayload() {
  const token = await getToken();
  if (!token || typeof token !== 'string') {
    return null;
  }

  try {
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
}

export function deleteToken() {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
}
