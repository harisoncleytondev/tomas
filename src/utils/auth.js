import {jwtDecode} from 'jwt-decode';

export function getToken() {
  let token = sessionStorage.getItem('token');
  
  if (token) return token;

  token = localStorage.getItem('token');
  return token || null;
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

export function getPayload() {
  const token = getToken();
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
