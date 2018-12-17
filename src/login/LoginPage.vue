<template>
<div class="col-sm-6 offset-sm-3">
  <header>
    <h2>Login</h2>
    <p class="tagline">Use the name and the mac of the TESS to access.</p>
  </header>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="tess_name">Name</label>
      <input type="text" v-model="tess_name" name="tess_name" class="form-control" :class="{ 'is-invalid': submitted && !tess_name }" placeholder="TESS name" />
      <div v-show="submitted && !tess_name" class="invalid-feedback">Name is required</div>
    </div>
    <div class="form-group">
      <label htmlFor="tess_mac">MAC</label>
      <input type="text" v-model="tess_mac" name="tess_mac" class="form-control" :class="{ 'is-invalid': submitted && !tess_mac }" placeholder="TESS MAC" />
      <div v-show="submitted && !tess_mac" class="invalid-feedback">MAC is required</div>
    </div>
    <div class="form-group">
      <button class="btn btn-primary" :disabled="app_user.tess_user.loggedIn">Login</button>
      <img v-show="app_user.tess_user.loggedIn" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
      <router-link to="/login_admin" class="btn btn-link">Admin</router-link>
    </div>
  </form>
</div>
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex'

export default {
  data() {
    return {
      tess_name: '',
      tess_mac: '',
      submitted: false
    }
  },
  computed: {
    ...mapState('account', ['app_user'])
  },
  created() {
    // reset login status
    this.logout();
  },
  methods: {
    ...mapActions('account', ['login', 'logout']),
    handleSubmit(e) {
      this.submitted = true;
      const {
        tess_name,
        tess_mac
      } = this;
      if (tess_name && tess_mac) {
        this.login({
          tess_name,
          tess_mac
        })
      }
    }
  }
};
</script>
