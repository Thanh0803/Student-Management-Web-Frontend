<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <b-container>
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-white">Welcome to Kien An High School!</h1>
              <p class="text-lead text-white">Please Login with Username and Password</p>
            </b-col>
          </b-row>
        </div>
      </b-container>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1"
             xmlns="http://www.w3.org/2000/svg">
          <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <b-container class="mt--8 pb-5">
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-card no-body class="bg-secondary border-0 mb-0">
            <b-card-body class="px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                <small>Sign in with credentials</small>
              </div>
              <validation-observer v-slot="{handleSubmit}" ref="formValidator">
                <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
                  <base-input alternative
                              class="mb-3"
                              name="Username"
                              :rules="{required: true}"
                              prepend-icon="fa fa-user"
                              placeholder="Username"
                              v-model="model.username">
                  </base-input>

                  <base-input alternative
                              class="mb-3"
                              name="Password"
                              :rules="{required: true, min: 3}"
                              prepend-icon="ni ni-lock-circle-open"
                              type="password"
                              placeholder="Password"
                              v-model="model.password">
                  </base-input>

                  <!-- <b-form-checkbox v-model="model.rememberMe">Remember me</b-form-checkbox> -->
                  <div>
                    <!-- <b-form-group label="You are: " v-slot="{ ariaDescribedby }"> -->
                        <!-- <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="0">Admin</b-form-radio>
                        <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="1">User</b-form-radio> -->
                    <!-- </b-form-group> -->

                    <!-- <div class="mt-3">Selected: <strong>{{ selected }}</strong></div> -->
                    <b-form-group label="You are:" v-slot="{ ariaDescribedby }">
                      <b-form-radio
                        v-model="selected"
                        :aria-describedby="ariaDescribedby"
                        name="some-radios"
                        value="0"
                        >Admin</b-form-radio
                      >
                      <b-form-radio
                        v-model="selected"
                        :aria-describedby="ariaDescribedby"
                        name="some-radios"
                        value="1"
                        >Teacher</b-form-radio
                      >
                      <b-form-radio
                        v-model="selected"
                        :aria-describedby="ariaDescribedby"
                        name="some-radios"
                        value="2"
                        >Student</b-form-radio
                      >
                    </b-form-group>
                  </div>
                  <div class="text-center">
                    <base-button type="primary" native-type="submit" class="my-4">Sign in</base-button>
                  </div>
              </b-form>
              </validation-observer>
            </b-card-body>
          </b-card>
          <b-row class="mt-3">
            <b-col cols="6">
              <router-link to="/dashboard" class="text-light"><small>Forgot password?</small></router-link>
            </b-col>
            <b-col cols="6" class="text-right">
              <router-link to="/register" class="text-light"><small>Create new account</small></router-link>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        model: {
          username: '',
          password: '',
          // rememberMe: false
        },
        selected: ''
      };
    },
    methods: {
      onSubmit() {
        // this will be called only after form is valid. You can do api call here to login
        let username = this.model.username
        let password = this.model.password
        // let selected = this.selected
        // console.log("selected",selected)
        // console.log("username",username)
        // console.log("password",password)
       
        this.$store.dispatch('loginUser', { username, password })
          .then(() => this.$router.push('/'))
          .catch(err => console.log(err))
        }
    }
  };
</script>
