import Vuex from 'vuex';
import Vue from 'vue';
import { getWxUserCode } from '../api/user';
import {
  setAuth,
  removeAuth,
  getToken,
  getOpenid,
  setOpenid,
  setToken
} from '../utils/webStore';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: getToken(),
    openid: getOpenid()
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      setToken(token);
    },
    SET_OPENID(state, openid) {
      state.openid = openid;
      setOpenid(openid);
    }
  },
  actions: {
    // 微信授权
    WechatAuth({ commit }, url) {
      return new Promise((resolve, reject) => {
        setAuth();
        window.location = `${
          process.env.BASE_API
        }/public/wxauth?callback=${escape(url)}`;
        resolve();
      });
    },
    // 微信登录验证
    WechatUserInfo({ commit }, params) {
      return new Promise((resolve, reject) => {
        getWxUserCode({ ...params })
          .then(res => {
            commit('SET_TOKEN', res.token);
            commit('SET_OPENID', res.openid);
            resolve();
          })
          .catch(err => {
            removeAuth();
            reject(err);
          });
      });
    }
  }
});

export default store;
