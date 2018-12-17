<template>
<div>


  <div class="loading" v-if="loading">
    Loading...
    <router-link v-if="isAdmin" to="/" class="btn btn-link">Cancel</router-link>
  </div>

  <div v-if="tess" class="content">
    <header>
      <h2>{{ isNew?"Add new TESS":"Update TESS:"}} {{tess_name}}</h2>
      <p class="tagline" v-if="tess_name"><a v-bind:href="tess_dashboard" target="_blank">Grafana dashboard</a></p>
    </header>
    <form @submit.prevent="handleSubmit">
      <!-- Sign up card -->
      <div class="card person-card" v-if="isAdmin">
        <div class="card-body">
          <h2 id="who_message" class="card-title">TESS</h2>
          <div class="row">
            <div class="form-group col-md-6">
              <label for="tessName">Name</label>
              <input :disabled="!isEnable" type="text" v-model="tess.name" v-validate="'required'" name="tessName" class="form-control" :class="{ 'is-invalid': submitted && errors.has('tessName') }" placeholder="Type TESS name" />
              <div v-if="submitted && errors.has('tessName')" class="invalid-feedback">{{ errors.first('tessName') }}</div>
            </div>
            <div class="form-group col-md-6">
              <label for="tessMAC">MAC</label>
              <input :disabled="!isEnable" type="text" v-model="tess.mac" v-validate="'required'" name="tessMAC" class="form-control" :class="{ 'is-invalid': submitted && errors.has('tessMAC') }" placeholder="Type TESS mac" />
              <div v-if="submitted && errors.has('tessMAC')" class="invalid-feedback">{{ errors.first('tessMAC') }}</div>
            </div>
            <div class="form-group col-md-3">
              <label for="tessPeriod">Period (seconds)</label>
              <input :disabled="!isEnable" type="number" v-model="tess.info_tess.period" v-validate="'required'" name="tessPeriod" class="form-control" :class="{ 'is-invalid': submitted && errors.has('tessPeriod') }" placeholder="Type period (seconds)" />
              <div v-if="submitted && errors.has('tessPeriod')" class="invalid-feedback">{{ errors.first('tessPeriod') }}</div>
            </div>
            <div class="form-group col-md-3">
              <label for="tessLocalTimezone">Local Timezone</label>
              <input :disabled="!isEnable" type="text" v-model="tess.info_tess.local_timezone" name="tessLocalTimezone" class="form-control" :class="{ 'is-invalid': submitted && errors.has('tessLocalTimezone') }" placeholder="Type local UTC: UTC+1" />
              <div v-if="submitted && errors.has('tessLocalTimezone')" class="invalid-feedback">{{ errors.first('tessLocalTimezone') }}</div>
            </div>
            <div class="form-group col-md-3">
              <label for="tessZeroPoint">Zero point</label>
              <input :disabled="!isEnable" type="number" step="0.01" v-model="tess.info_tess.zero_point" name="tessZeroPoint" class="form-control" :class="{ 'is-invalid': submitted && errors.has('tessZeroPoint') }" placeholder="Type zero point" />
              <div v-if="submitted && errors.has('tessZeroPoint')" class="invalid-feedback">{{ errors.first('tessZeroPoint') }}</div>
            </div>
            <div class="form-group col-md-3">
              <label for="tessFilters">Filters</label>
              <input :disabled="!isEnable" type="text" v-model="tess.info_tess.filters" name="tessFilters" class="form-control" :class="{ 'is-invalid': submitted && errors.has('tessFilters') }" placeholder="Type filters" />
              <div v-if="submitted && errors.has('tessFilters')" class="invalid-feedback">{{ errors.first('tessFilters') }}</div>
            </div>
          </div>
          <button type="button" v-if="!isNew" v-bind:class="['btn',isEnable ? 'btn-primary' : 'btn-warning']" @click="swipeEnableInfo()">{{isEnable?"Disable":"Enable"}}</button>
        </div>
      </div>
      <div class="card person-card">
        <div class="card-body">
          <h2 id="who_message" class="card-title">Organization</h2>
          <div class="row">
            <div class="form-group col-md-6">
              <label for="orgName">Name</label>
              <input type="text" v-model="tess.info_org.name" name="orgName" class="form-control" :class="{ 'is-invalid': submitted && errors.has('orgName') }" placeholder="Type organization name" />
              <div v-if="submitted && errors.has('orgName')" class="invalid-feedback">{{ errors.first('orgName') }}</div>
            </div>
            <div class="form-group col-md-6">
              <label for="orgURL">Web URL</label>
              <input type="url" v-model="tess.info_org.web_url" name="orgURL" class="form-control" :class="{ 'is-invalid': submitted && errors.has('orgURL') }" placeholder="Type organization web" />
              <div v-if="submitted && errors.has('orgURL')" class="invalid-feedback">{{ errors.first('orgURL') }}</div>
            </div>
            <div class="form-group col-md-6">
              <label for="orgLogo">Logo (600x100)</label>
              <input type="url" v-model="tess.info_org.logo_url" name="orgLogo" class="form-control" :class="{ 'is-invalid': submitted && errors.has('orgLogo') }" placeholder="Type organization url logo" />
              <div v-if="submitted && errors.has('orgLogo')" class="invalid-feedback">{{ errors.first('orgLogo') }}</div>
            </div>
            <div class="form-group col-md-6">
              <img v-bind:src="tess.info_org.logo_url" style="max-height:100px;max-width:600px;" />
            </div>
            <div class="form-group col-md-12">
              <label for="orgDescription">Description</label>
              <textarea type="text" rows="10" v-model="tess.info_org.description" name="orgDescription" class="form-control" :class="{ 'is-invalid': submitted && errors.has('orgDescription') }" placeholder="Type organization  description" />
              <div v-if="submitted && errors.has('orgDescription')" class="invalid-feedback">{{ errors.first('orgDescription') }}</div>
          </div>
          <div class="form-group col-md-6">
            <label for="orgPhone">Phone</label>
            <input type="tel" v-model="tess.info_org.phone" name="orgPhone" class="form-control" :class="{ 'is-invalid': submitted && errors.has('orgPhone') }" placeholder="Type organization phone" />
            <div v-if="submitted && errors.has('orgPhone')" class="invalid-feedback">{{ errors.first('orgPhone') }}</div>
          </div>
          <div class="form-group col-md-6">
            <label for="orgMail">Mail</label>
            <input type="email" v-model="tess.info_org.mail" name="orgMail" class="form-control" :class="{ 'is-invalid': submitted && errors.has('orgMail') }" placeholder="Type organization mail" />
            <div v-if="submitted && errors.has('orgMail')" class="invalid-feedback">{{ errors.first('orgMail') }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6" style="padding=0.1em;">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title">Location</h2>
            <div class="form-group">
              <div class="row">
                <div class="form-group col-md-6">
                  <label for="locationLatitude">Latitude</label>
                  <input type="number" step="0.00000000000001" v-model="tess.info_location.latitude" v-validate="'required'" name="locationLatitude" class="form-control" :class="{ 'is-invalid': submitted && errors.has('locationLatitude') }" placeholder="Type latitude" />
                  <div v-if="submitted && errors.has('locationLatitude')" class="invalid-feedback">{{ errors.first('locationLatitude') }}</div>
                </div>
                <div class="form-group col-md-6">
                  <label for="locationLongitude">Longitude</label>
                  <input type="number" step="0.00000000000001" v-model="tess.info_location.longitude" v-validate="'required'" name="locationLongitude" class="form-control" :class="{ 'is-invalid': submitted && errors.has('locationLongitude') }"
                    placeholder="Type longitude" />
                  <div v-if="submitted && errors.has('locationLongitude')" class="invalid-feedback">{{ errors.first('locationLongitude') }}</div>
                </div>
              </div>

            </div>
            <div class="form-group">
              <label for="locationPlace">Place</label>
              <input type="text" v-model="tess.info_location.place" v-validate="'required'" name="locationPlace" class="form-control" :class="{ 'is-invalid': submitted && errors.has('locationPlace') }" placeholder="Type place name" />
              <div v-if="submitted && errors.has('locationPlace')" class="invalid-feedback">{{ errors.first('locationPlace') }}</div>
            </div>
            <div class="form-group">
              <label for="locationTown">Town</label>
              <input type="text" v-model="tess.info_location.town" name="locationTown" class="form-control" :class="{ 'is-invalid': submitted && errors.has('locationTown') }" placeholder="Type town name" />
              <div v-if="submitted && errors.has('locationTown')" class="invalid-feedback">{{ errors.first('locationTown') }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-6" style="padding=0.1em;">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title">Contact</h2>
            <div class="form-group">
              <label for="contactName">Name</label>
              <input type="text" v-model="tess.info_contact.name" name="contactName" class="form-control" :class="{ 'is-invalid': submitted && errors.has('contactName') }" placeholder="Type contact name" />
              <div v-if="submitted && errors.has('contactName')" class="invalid-feedback">{{ errors.first('contactName') }}</div>
            </div>
            <div class="form-group">
              <label for="contactPhone">Phone</label>
              <input type="tel" v-model="tess.info_contact.phone" name="contactPhone" class="form-control" :class="{ 'is-invalid': submitted && errors.has('contactPhone') }" placeholder="Type contact phone" />
              <div v-if="submitted && errors.has('contactPhone')" class="invalid-feedback">{{ errors.first('contactPhone') }}</div>
            </div>
            <div class="form-group">
              <label for="contactMail">Mail</label>
              <input type="email" v-model="tess.info_contact.mail" name="contactMail" class="form-control" :class="{ 'is-invalid': submitted && errors.has('contactMail') }" placeholder="Type contact mail" />
              <div v-if="submitted && errors.has('contactMail')" class="invalid-feedback">{{ errors.first('contactMail') }}</div>
            </div>
            <div class="form-group " style="display:none">
              <label for="contactTelegramID">Telegram ID</label>
              <input type="text" v-model="tess.info_contact.telegram_chat_id" name="contactTelegramID" class="form-control" :class="{ 'is-invalid': submitted && errors.has('contactTelegramID') }" placeholder="Type telegram ID" />
              <div v-if="submitted && errors.has('contactTelegramID')" class="invalid-feedback">{{ errors.first('contactTelegramID') }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card person-card">
      <div class="card-body">
        <h2 id="who_message" class="card-title">Images</h2>
        <div class="row">
          <div class="col-md-6" style="padding=0.1em;" v-for="(_img, index) in tess.info_img.urls">
			         <div class="card">
			            <div class="card-body">
			               <h2 class="card-title">Image {{index+1}}</h2>
			                  <div class="form-group">
                          <input type="url" v-model="tess.info_img.urls[index]" name="imgIndex" class="form-control" :class="{ 'is-invalid': submitted && errors.has('imgIndex') }" placeholder="Type  image url" />
                          <div v-if="submitted && errors.has('imgIndex')" class="invalid-feedback">{{ errors.first('imgIndex') }}</div>
			                  </div>
              			    <div class="form-group">
                          <img v-bind:src="tess.info_img.urls[index]"  style="max-width:100%;"/>
              			    </div>
              			    <div class="form-group">
                          <button type="button" class="btn btn-danger" @click="deleteRow(index)">Delete</button>
              			    </div>
			            </div>
			         </div>
          </div>
        </div>
        <button type="button" class="btn btn-primary" @click="addRow">Add Image</button>
      </div>
    </div>



    <div style="margin-top: 1em;">

    <div class="form-group">
      <div class="row">
    <div class="form-group col-md-10">
      <button class="btn btn-primary btn-lg btn-block" :disabled="updating">{{ isNew?"Create":"Update"}}</button>
      <img v-show="updating" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
</div>
      <div class="form-group col-md-2">
          <router-link v-if="!isAdmin" to="/login" class="btn btn-primary btn-lg btn-block">Logout</router-link>
          <router-link v-if="isAdmin" to="/" class="btn btn-primary btn-lg btn-block">Cancel</router-link>
          </div>
        </div>      </div>
            </div>




  </form>
</div>


</div>
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex'
import {
  tess
} from '../_store/tess.module'
import {
  account
} from '../_store/account.module'
import config from 'config';

/*
import {
  serverBus
} from '../index';
*/
export default {
  data() {
    return {
      tess_name: null,
      tess_mac: null,
      tess: null,
      isAdmin: false,
      //isTessUser: false,
      submitted: false,
      loading: false,
      updating: false,
      isEnable: false,
      isNew: false,
      adminToken: null,
      tess_dashboard: config.grafanaURL
    }
  },
  computed: {
    ...mapState('tess', ['status']),
    ...mapState({
      account: state => state.account,
    })
  },
  created() {
    this.isAdmin = account.state.app_user.admin_user.loggedIn;
    let isLogged = this.isAdmin || account.state.app_user.tess_user.loggedIn;

    if (!this.tess && isLogged) {
      if (!this.isAdmin) {
        let user = account.state.app_user.tess_user.user;
        this.tess_name = user.name;
        this.tess_mac = user.mac;
        this.fetchData(user.name, user.mac);
      } else {
        this.initAdmin();
      }
    } else {
      console.log("Pa' fuera")
    }
  },
  methods: {
    ...mapActions('tess', ['update', 'get']),
    ...mapActions('account', ['logout']),
    initAdmin() {
      this.adminToken = account.state.app_user.admin_user.user.token;

      if (this.$route.query.new) {
        this.tess = this.parseTESS({});
        this.isEnable = true;
        this.isNew = true;

        if (this.$route.query.name) {
          this.tess['name'] = this.$route.query.name;
        }

      } else if ('name' in this.$route.query && 'mac' in this.$route.query) {
        this.tess_name = this.$route.query.name;
        this.tess_mac = this.$route.query.mac;
        this.fetchData(this.$route.query.name, this.$route.query.mac);
      } else {
        console.log("Pa' fuera")
      }
    },
    handleSubmit(e) {
      if (!this.tess.name) {
        alert("TESS name is required");
        return;
      } else if (!this.tess.mac) {
        alert("TESS mac is required");
        return;
      }

      //console.log("handleSubmit")
      this.submitted = true;
      this.isEnable = true;
      this.$validator.validate().then(valid => {

        this.isEnable = this.isNew ? true : false;
        if (valid) {

          if (this.tess.info_img.urls.length && !this.tess.info_img.urls[this.tess.info_img.urls.length - 1]) {
            this.tess.info_img.urls.splice(this.tess.info_img.urls.length - 1, 1)
          }

          //console.log(this.tess)
          this.updating = true;
          console.log({
            tess: this.tess,
            token: this.adminToken
          })


          this.update({
            tess_req: {
              name: this.tess_name,
              mac: this.tess_mac
            },
            tess: this.tess,
            token: this.adminToken
          }).then(
            response => {
              //console.log(response);

              if (response) {
                this.tess = this.parseTESS(response);
                this.tess_name = this.tess.name;
                this.tess_mac = this.tess.mac;

                if (this.isAdmin) {
                  this.$router.replace({
                    query: {
                      name: this.tess_name,
                      mac: this.tess_mac
                    }
                  })
                }
              }

              this.updating = false;
            },
            error => {
              this.updating = false;
            }
          );

        } else {
          alert("Please, check all required fields");
        }
      });
    },
    addRow() {
      //console.log("addRow")
      if (this.tess.info_img.urls.length === 0 || this.tess.info_img.urls[this.tess.info_img.urls.length - 1])
        this.tess.info_img.urls.push('')
    },
    deleteRow(index) {
      //console.log("deleteRow")
      this.tess.info_img.urls.splice(index, 1)
    },
    fetchData(name, mac) {
      this.error = this.tess = null
      this.loading = true
      //console.log(name)
      //console.log(mac)

      this.get({
        tess_name: name,
        tess_mac: mac
      }).then(
        response => {
          console.log(response);
          this.tess = this.parseTESS(response);
          this.tess_name = this.tess.name;
          this.tess_mac = this.tess.mac;
          this.loading = false;

          this.tess_dashboard = config.grafanaURL + '/d/datasheet_' + this.tess.name + '/' + this.tess.name + '?orgId=1';
        },
        error => {
          this.loading = false;
        }
      );
    },
    swipeEnableInfo() {
      this.isEnable = !this.isEnable;
    },
    parseTESS(tess) {

      if (!tess) {
        return tess;
      }
      console.log(tess)

      if (!("info_org" in tess) || !tess["info_org"]) {
        tess["info_org"] = {};
      }

      if (!("info_location" in tess) || !tess["info_location"]) {
        tess["info_location"] = {};

        if (!tess.info_location.latitude && tess.latitude) {
          tess.info_location.latitude = tess.latitude;
        }

        if (!tess.info_location.longitude && tess.longitude) {
          tess.info_location.longitude = tess.longitude;
        }

        if (!tess.info_location.place && tess.place) {
          tess.info_location.place = tess.place;
        }

        if (!tess.info_location.town && tess.city) {
          tess.info_location.town = tess.city;
        }

      }

      if (!("info_contact" in tess) || !tess["info_contact"]) {
        tess["info_contact"] = {};
      }

      if (!("info_tess" in tess) || !tess["info_tess"]) {
        tess["info_tess"] = {};

        if (!tess.info_tess.zero_point && tess.zero_point) {
          tess.info_tess.zero_point = tess.zero_point;
          tess.zero_point = undefined;
        }

        if (!tess.info_tess.local_timezone && tess.local_timezone) {
          tess.info_tess.local_timezone = tess.local_timezone;
          tess.local_timezone = undefined;
        }

        if (!tess.info_tess.filters && tess.filters) {
          tess.info_tess.filters = tess.filters;
          tess.filters = undefined;
        }

      }

      if (!("info_img" in tess) || !tess["info_img"]) {
        tess["info_img"] = {
          "urls": []
        };
      }

      if (!("urls" in tess["info_img"]) || !tess["info_img"]["urls"]) {
        tess["info_img"]["urls"] = [];
      }







      return tess;
    }

  },
  mounted: function() {

    /*
        if (this.tess) {
          if (!"info_org" in this.tess) {
            this.tess["info_org"] = {};
          }

          if (!"info_location" in this.tess) {
            this.tess["info_location"] = {};
          }

          if (!this.tess.info_location.latitude && this.tess.latitude) {
            this.tess.info_location.latitude = this.tess.latitude;
          }
          if (!this.tess.info_location.longitude && this.tess.longitude) {
            this.tess.info_location.longitude = this.tess.longitude;
          }

          if (!"info_contact" in this.tess) {
            this.tess["info_contact"] = {};
          }

          if (!"info_tess" in this.tess) {
            this.tess["info_tess"] = {};
          }

          if (!this.tess.info_tess.zero_point && this.tess.zero_point) {
            this.tess.info_tess.zero_point = this.tess.zero_point;
          }

          if (!this.tess.info_tess.filters && this.tess.filters) {
            this.tess.info_tess.filters = this.tess.filters;
          }

          if (!"info_img" in this.tess) {
            this.tess["info_img"] = {
              "urls": ['']
            };
          }
        }
    */
  }
};
</script>
