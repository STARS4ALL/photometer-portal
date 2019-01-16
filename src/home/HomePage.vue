<template>
<div>
  <h1>Hi {{account.app_user.admin_user.user.name}}!</h1>
  <p>You're logged as Grafana admin</p>

  <div class="content">
    <div class="card">
      <div class=""><!--div class="card-body"-->
        <div class="card-header">
          <header>
            <h2 id="who_message" class="card-title">TESS</h2>
            <p class="tagline">In this section you can add or edit the TESS information.</p>
          </header>
        </div>

        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <header>
              <h4 id="who_message" class="card-title">Register</h4>
              <p class="tagline">Register a new TESS.</p>
            </header>
            <div class="form-group">
              <div class="form-group">
                <button type="button" class="btn btn-primary" @click="tessAdd">Add new TESS</button>
              </div>
            </div>

          </li>
          <li class="list-group-item" v-if="tess_list.length > 0">
              <header>
                <h4 id="who_message" class="card-title">Edit</h4>
                <p class="tagline">Select a TESS from the list to edit the information. TESSs marked with a * indicate that their MAC is not known.</p>
              </header>
              <div class="form-group" v-if="tess_list.length > 0">
                <!--label for="tessName">Select TESS to edit:</label-->
                <select v-model="tess_selected">
                  <option v-for="option in tess_list" v-bind:value="[option.name,option.mac]">
                    {{ option.mac ?"":"*" }}
                    {{ option.name }}&emsp;
                    {{ "info_location" in option?
              ("country" in option.info_location?(option.info_location.country+", "):"")
              +("town" in option.info_location?( option.info_location.town+", "):"")
              +("place" in option.info_location?( option.info_location.place):"")

              :"" }}
                  </option>
                </select>
                <button type="button" class="btn btn-primary" v-if="tess_selected" @click="tessEdit">Edit {{ tess_selected? tess_selected[0]:'' }}</button>
              </div>
          </li>
          <li class="list-group-item" v-if="tess_new.length > 0">
              <header>
                <h4 id="who_message" class="card-title">Pending</h4>
                <p class="tagline">List of TESSs that are broadcasting and haven't yet been added.</p>
              </header>
              <div class="form-group">
                <div class="row">
                  <div class="form-group col-md" v-for="option in tess_new">
                    <button type="button" class="btn btn-primary" @click="tessAddNew(option)">Add {{option}}</button>
                  </div>
                </div>
              </div>
          </li>
        </ul>
      </div>
    </div>

    <div style="padding=0.1em;">
      <div class="card">
        <div class="card-body">

          <header>
            <h2 class="card-title">Grafana</h2>
            <p class="tagline">In this section you can perform actions on the dashboard of the grafana portal.</p>
          </header>

          <div class="form-group">
            <button :disabled="grafana_sync" type="button" class="btn btn-primary" @click="grafanaSync">Sync Dashboards</button>
            <img v-show="grafana_sync" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
          </div>
        </div>
      </div>
    </div>


  </div>

  <p>
    <router-link to="/login">Logout</router-link>
  </p>
</div>
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex'
import {
  router
} from '../_helpers';

export default {
  data() {
    return {
      tess_list: [],
      tess_new: [],
      tess_selected: null,
      grafana_sync: false
    }
  },
  computed: {
    ...mapState({
      account: state => state.account
    })
  },
  created() {
    this.getAll(this.account.app_user.admin_user.user.token).then(
      response => {

      response.sort((a,b) => (parseInt(a.name.match(/\d+/)[0]) > parseInt(b.name.match(/\d+/)[0])) ? 1 :-1);


        this.tess_list = response;

      },
      error => {
        //TODO
      }
    );
    this.getNew(this.account.app_user.admin_user.user.token).then(
      response => {


        this.tess_new = response.filter((t) => t.startsWith("stars"));//response;

      },
      error => {
        //TODO
      }
    );
  },
  methods: {
    ...mapActions('tess', ['getAll', 'getNew']),
    ...mapActions('grafana', ['syncGrafana']),
    tessEdit() {
      router.push({
        path: '/tess',
        query: {
          name: this.tess_selected[0],
          mac: this.tess_selected[1]
        }
      })
    },
    tessAdd() {
      router.push({
        path: '/tess',
        query: {
          new: true
        }
      })
    },
    tessAddNew(name) {
      router.push({
        path: '/tess',
        query: {
          new: true,
          name: name
        }
      })
    },
    grafanaSync() {
      this.grafana_sync = true;
      this.syncGrafana(this.account.app_user.admin_user.user.token).then(
        response => {
          this.grafana_sync = false;

        },
        error => {
          this.grafana_sync = false;
        }
      );
    }
  }
};
</script>
