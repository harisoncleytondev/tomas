import { jwtDecode } from 'jwt-decode'

export function getToken() {
    if (localStorage.getItem('token') == null) {
        return null;
    } 

    return localStorage.getItem('token');
}

export function setToken(token) {
    return localStorage.setItem('token', token);
}

export function getPayload() {
    return jwtDecode(getToken());
}

export function deleteToken() {
    return localStorage.removeItem('token');
}