import Vuex from 'vuex';
import Vue from 'vue';
import { login } from 'admin/api/user';
import { getToken, setToken } from 'admin/utils/webStore';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    token: getToken(),
    userinfo: {}
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      setToken(token);
    },
    USER_INFO_CHANGE(state, userinfo) {
      state.userinfo = Object.assign({}, state.userinfo, userinfo);
    }
  },
  actions: {
    Login({ state, commit }, data) {
      return login(data).then(res => {
        commit('SET_TOKEN', res.data.token);
      });
    }
  }
});

export default store;
