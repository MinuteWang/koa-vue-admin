import store from 'store';

export function getToken() {
  return store.get('token');
}

export function setToken(token) {
  return store.set('token', token);
}

export function removeToken() {
  return store.remove('token');
}
