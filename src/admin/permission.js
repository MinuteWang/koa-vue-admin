import router from './router';
import store from './store';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条样式
// import { GetRequest } from './utils';

const whiteList = ['/login'];
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (store.state.token) {
    if (to.path === '/login') next('/app');
    next();
  } else {
    if (whiteList.includes(to.fullPath)) {
      next();
    } else {
      next('/login');
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});
