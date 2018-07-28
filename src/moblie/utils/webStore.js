import session from 'store/storages/sessionStorage';

export function isAuth() {
  return session.read('isAuth');
}

export function setAuth() {
  return session.write('isAuth', true);
}

export function removeAuth() {
  return session.remove('isAuth');
}

export function getOpenid() {
  return session.read('Openid');
}

export function setOpenid(value) {
  return session.write('Openid', value);
}
