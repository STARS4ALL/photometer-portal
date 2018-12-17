import config from 'config';
import Vue from 'vue';

export const grafanaService = {
  syncGrafana
};

function syncGrafana(token) {
  return Vue.http.post(`${config.apiUrl}/grafana/sync`, {
      token: token
    })
    .then(response => {
      return new Promise((resolve, reject) => {
        resolve({
          ok: true
        });
      });
    }, error => {
      return new Promise((resolve, reject) => {
        if (error["status"] === 401) {
          reject('Credentials error');
        } else {
          reject("Server error. Please try again later.");
        }
      });
    });
}
