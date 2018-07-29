// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import FastClick from 'fastclick';
import App from 'moblie/App';
import router from 'moblie/router';
import 'moblie/utils/rem';
import 'moblie/permission';
import store from 'moblie/store';

Vue.config.productionTip = false;
FastClick.attach(document.body);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
