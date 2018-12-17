import {
  grafanaService
} from '../_services';

const state = {
};

const actions = {
  syncGrafana({
    dispatch,
    commit
  }, token) {
    return new Promise((resolve, reject) => {
      commit('syncRequest');

      grafanaService.syncGrafana(token)
        .then(
          response => {
            commit('syncSuccess');
            resolve()
          },
          error => {
            commit('syncFailure');
            dispatch('alert/error', error, {
              root: true
            });
            reject(error)
          }
        );
    })
  }
};

const mutations = {
  syncRequest(state) {
  },
  syncSuccess(state, tess) {
  },
  syncFailure(state, error) {

  }
};

export const grafana = {
  namespaced: true,
  state,
  actions,
  mutations
};
