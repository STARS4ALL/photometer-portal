import {
  tessService
} from '../_services';

const state = {

};

const actions = {
  update({
    dispatch,
    commit
  }, {
    tess_req,
    tess,
    token
  }) {
    return new Promise((resolve, reject) => {

      commit('updateRequest', {
        tess
      });

      //console.log(tess)
      console.log({
        tess: tess,
        token: token
      })
      tessService.update(tess_req,tess, token)
        .then(
          response => {
            //console.log(response['tess']);
            commit('updateSuccess');
            //tess.state.current = response['tess'];
            resolve(response['tess'])
          },
          error => {
            commit('updateFailure');
            dispatch('alert/error', error, {
              root: true
            });
            reject(error)
          }
        );
    })
  },

  get({
    dispatch,
    commit
  }, {
    tess_name,
    tess_mac
  }) {
    return new Promise((resolve, reject) => {
      tessService.get(tess_name, tess_mac)
        .then(
          response => {
            resolve(response['tess'])
          },
          error => {
            dispatch('alert/error', error, {
              root: true
            });
            reject(error)
          }
        );

    })
  },

  getAll({
    dispatch,
    commit
  }, token) {
    return new Promise((resolve, reject) => {
      tessService.getAll(token)
        .then(
          response => {
            resolve(response['tess'])
          },
          error => {
            dispatch('alert/error', error, {
              root: true
            });
            resolve(error)
          }
        );
    })
  },

  getNew({
    dispatch,
    commit
  }, token) {
    return new Promise((resolve, reject) => {
      tessService.getNew(token)
        .then(
          response => {
            resolve(response['tess'])
          },
          error => {
            dispatch('alert/error', error, {
              root: true
            });
            resolve(error)
          }
        );
    })
  }

};

const mutations = {
  updateRequest(state) {
  },
  updateSuccess(state, tess) {
  },
  updateFailure(state, error) {
  }
};

export const tess = {
  namespaced: true,
  state,
  actions,
  mutations
};
