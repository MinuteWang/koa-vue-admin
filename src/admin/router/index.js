import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);
Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: _import('AdminLogin') },
    {
      path: '/app',
      component: _import('Layout/index'),
      redirect: '/app/product-list',
      children: [
        { path: '/app/product-list', component: _import('ProductList') }
      ]
    }
  ]
});
