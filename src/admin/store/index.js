import Vuex from 'vuex';
import Vue from 'vue';
import { login } from 'admin/api/user';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: '',
    userinfo: {}
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    USER_INFO_CHANGE(state, userinfo) {
      state.userinfo = Object.assign({}, state.userinfo, userinfo);
    }
  },
  actions: {
    Login({ state, commit }, data) {
      return login(data).then(res => {});
    }
  }
});

export default store;
