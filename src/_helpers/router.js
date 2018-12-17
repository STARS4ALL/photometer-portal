import {
  account
} from '../_store/account.module';
import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../home/HomePage';
import LoginPage from '../login/LoginPage';
import LoginAdminPage from '../login/LoginAdminPage';
import TessEditPage from '../tess/TessEditPage';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      component: HomePage
    },
    {
      path: '/login',
      component: LoginPage
    },
    {
      path: '/login_admin',
      component: LoginAdminPage
    },
    {
      path: '/tess',
      component: TessEditPage
    },
    // otherwise redirect to home
    {
      path: '*',
      redirect: '/'
    }
  ]
});

router.beforeEach((to, from, next) => {

  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/login_admin'];
  const userPages = ['/tess'];
  const authRequired = !publicPages.includes(to.path);
  const adminLoggedIn = account.state.app_user.admin_user.loggedIn;
  const userLoggedIn = account.state.app_user.tess_user.loggedIn;
  const loggedIn = adminLoggedIn || userLoggedIn;

  console.log("authRequired: " + authRequired + " loggedIn:" + loggedIn + " from: " + from.path + " to:" + to.path + " status: " + JSON.stringify(account.state))
  if (authRequired && !loggedIn) {
    if (['/login', '/login_admin'].includes(from.path))
      return next(from.path);
    return next('/login');
  }

  if (userLoggedIn && authRequired &&  !userPages.includes(to.path)){
    return next('/tess');
  }


  next();
});
