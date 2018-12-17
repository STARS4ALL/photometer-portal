import {
  loginService
} from '../_services';
import {
  tess
} from '../_store/tess.module';
import {
  router
} from '../_helpers';

const user = JSON.parse(localStorage.getItem('user'));

const state = {
  app_user: user ? user : {
    tess_user: {
      loggedIn: false
    },
    admin_user: {
      loggedIn: false
    }
  }
};

const actions = {
  login({
    dispatch,
    commit
  }, {
    tess_name,
    tess_mac
  }) {
    commit('loginRequest', {
      tess_name
    });

    loginService.login(tess_name, tess_mac)
      .then(
        response => {

          commit('loginSuccess', {
            name: tess_name,
            mac: tess_mac
          });

          localStorage.setItem('user', JSON.stringify(state.app_user));
          
          router.push('/tess');
        },
        error => {
          commit('loginFailure');
          dispatch('alert/error', error, {
            root: true
          });
        }
      );
  },
  loginAdmin({
    dispatch,
    commit
  }, {
    username,
    password
  }) {
    commit('loginRequest', {
      username
    });

    loginService.loginAdmin(username, password)
      .then(
        response => {
          commit('loginAdminSuccess', {
            name: username,
            token: response['token']
          });
          localStorage.setItem('user', JSON.stringify(state.app_user));
          router.push('/');
        },
        error => {
          commit('loginFailure');
          dispatch('alert/error', error, {
            root: true
          });
        }
      );
  },
  logout({
    commit
  }) {
    loginService.logout();
    commit('logout');

    localStorage.removeItem('user');

  }
};

const mutations = {
  loginRequest(state) {
    state.app_user = {
      tess_user: {
        loggedIn: false
      },
      admin_user: {
        loggedIn: false
      }
    }
  },
  loginSuccess(state, user) {
    state.app_user = {
      tess_user: {
        loggedIn: true,
        user: user
      },
      admin_user: {
        loggedIn: false
      }
    }

  },
  loginAdminSuccess(state, user) {
    state.app_user = {
      tess_user: {
        loggedIn: false
      },
      admin_user: {
        loggedIn: true,
        user: user
      }
    }

  },
  loginFailure(state) {
    state.app_user = {
      tess_user: {
        loggedIn: false
      },
      admin_user: {
        loggedIn: false
      }
    }

  },
  logout(state) {
    state.app_user = {
      tess_user: {
        loggedIn: false
      },
      admin_user: {
        loggedIn: false
      }
    }

  }
};

export const account = {
  namespaced: true,
  state,
  actions,
  mutations
};
