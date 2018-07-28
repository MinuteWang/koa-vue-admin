import Vuex from 'vuex';
import Vue from 'vue';
import { setAuth } from '../utils/webStore';

Vue.use(Vuex);

const store = new Vuex.Store({
  actions: {
    // 微信授权
    WechatAuth({ commit }, url) {
      return new Promise((resolve, reject) => {
        setAuth();
        window.location = `${
          process.env.BASE_API
        }/wechat/auth?callback=${escape(url)}`;
        resolve();
      });
    }
  }
});

export default store;
