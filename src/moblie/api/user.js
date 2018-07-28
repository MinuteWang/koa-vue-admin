import request from '../utils/request';

export function getWxUserCode(data) {
  return request({
    url: '/public/wxlogin',
    method: 'post',
    data
  });
}
