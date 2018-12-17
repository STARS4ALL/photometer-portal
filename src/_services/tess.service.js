import config from 'config';
import Vue from 'vue';

export const tessService = {
  update,
  get,
  getAll,
  getNew
};

function update(tess_req, tess, auth = null) {

  var isNew = false;
  if (auth && !tess_req["name"] && !tess_req["mac"]) {
    isNew = true;
    tess_req["name"] = tess["name"];
    tess_req["mac"] = tess["mac"];
  }

  return Vue.http.post(`${config.apiUrl}/photometers/${tess_req["name"]}/${tess_req["mac"]}`, {
      tess: tess,
      token: auth,
      isNew: isNew
    })
    .then(response => {
      return new Promise((resolve, reject) => {
        //console.log(response["status"])
        if (response["status"] === 200) {
          let tess = (response.body);
          if (tess !== null) {
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

function get(tess_name, tess_mac) {
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

function getAll(token) {
  return Vue.http.post(`${config.apiUrl}/photometers_list`,{token:token})
    .then(response => {
      return new Promise((resolve, reject) => {
        //console.log(response["status"])
        if (response["status"] === 200) {
          let tess = (response.body);
          if (tess !== null) {
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

function getNew(token) {
  return Vue.http.post(`${config.apiUrl}/photometers_new`,{token:token})
    .then(response => {
      return new Promise((resolve, reject) => {
        //console.log(response["status"])
        if (response["status"] === 200) {
          let tess = (response.body);
          if (tess !== null) {
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


// function handleResponse(response) {
//   return response.text().then(text => {
//     const data = text && JSON.parse(text);
//     if (!response.ok) {
//       if (response.status === 401) {
//         // auto logout if 401 response returned from api
//         logout();
//         location.reload(true);
//       }
//
//       const error = (data && data.message) || response.statusText;
//       return Promise.reject(error);
//     }
//
//     return data;
//   });
// }
