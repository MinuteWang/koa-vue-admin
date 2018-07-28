import router from '../router/moblie';
import store from './store';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条样式
import { isAuth, getOpenid } from './utils/webStore'; // getToken from localStorage
import { GetRequest } from './utils';

router.beforeEach((to, from, next) => {
  NProgress.start();
  // 是否微信授权
  if (!getOpenid()) {
    // 用户是否绑定微信
    if (isAuth()) {
      store.dispatch('WechatUserInfo', GetRequest()).then(res => {
        next();
      });
    } else {
      store.dispatch('WechatAuth', `${window.location.origin}/#${to.path}`);
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});
