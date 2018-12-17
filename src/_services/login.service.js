import config from 'config';
import Vue from 'vue';

export const loginService = {
  login,
  loginAdmin,
  logout
};

function login(tess_name, tess_mac) {
  return Vue.http.get(`${config.apiUrl}/photometers/${tess_name}/${tess_mac}`)
    .then(response => {
      return new Promise((resolve, reject) => {
        //console.log(response["status"])

        if (response["status"] === 200) {
          let tess = (response.body);
          if (tess !== null) {
            tess["mac"] = tess_mac;
            tess["name"] = tess_name;
            resolve({
              ok: true,
              tess: tess
            });
          } else {
            reject('The name or MAC of the TESS is not correct');
          }
        } else {
          reject('The name or MAC of the TESS is not correct');
        }
      });
    }, error => {
      return new Promise((resolve, reject) => {
        if (error["status"] === 401) {
          reject('The name or MAC of the TESS is not correct');
        } else {
          reject("Server error. Please try again later.");
        }
      });
    });
}

function loginAdmin(grafana_user, grafana_pass) {
  try {
    var token = btoa(grafana_user + ':' + grafana_pass);
    return Vue.http.post(`${config.apiUrl}/grafanaRole/`,{token:token})
      .then(response => {
        //console.log(JSON.stringify(response));
        return new Promise((resolve, reject) => {
          if ("error" in response) {
            reject(response["error"]);
          } else {
            resolve({
              ok: true,
              token : token
            });
          }
        });
      }, error => {
        //console.log(JSON.stringify(error));
        return new Promise((resolve, reject) => {
          if (error["status"] === 401) {
            reject('The username or Password is not correct');
          } else {
            reject("Server error. Please try again later.");
          }
        });
      });
  } catch (e) {
    console.log(e)
  } finally {

  }
}

function logout() {
  //console.log("logout");
}
