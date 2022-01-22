<template>
  <div>
    <!-- Header -->
    <notifications></notifications>
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <b-container>
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center"> </b-row>
        </div>
      </b-container>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            class="fill-default"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <b-container class="mt--8 pb-5 background" ref="form">
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-card no-body class="bg-secondary border-0 mb-0">
            <b-card-body class="px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                <small>Change Password</small>
              </div>
              <validation-observer
                v-slot="{ handleSubmit }"
                ref="formValidator"
              >
                <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
                  <base-input
                    alternative
                    class="mb-3"
                    name="Password"
                    :rules="{ required: true, min: 3 }"
                    prepend-icon="ni ni-lock-circle-open"
                    type="password"
                    placeholder="Current Password"
                    v-model="model.current_password"
                  >
                  </base-input>

                  <base-input
                    alternative
                    class="mb-3"
                    name="Password"
                    :rules="{ required: true, min: 3 }"
                    prepend-icon="ni ni-lock-circle-open"
                    type="password"
                    placeholder="New Password"
                    v-model="model.password"
                  >
                  </base-input>
                  <base-input
                    alternative
                    class="mb-3"
                    name="Password"
                    :rules="{ required: true, min: 3 }"
                    prepend-icon="ni ni-lock-circle-open"
                    type="password"
                    placeholder="Confirm Password"
                    v-model="model.confirmpassword"
                  >
                  </base-input>

                  <!-- <b-form-checkbox v-model="model.rememberMe">Remember me</b-form-checkbox> -->
                  <div class="text-center">
                    <base-button
                      type="primary"
                      native-type="submit"
                      class="my-4"
                      >Update</base-button
                    >
                  </div>
                </b-form>
              </validation-observer>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import { get, put, del, post } from "../../../services/services";
export default {
    
  data() {
    return {
        current_pw: "",
        model: {
            current_password: "",
            confirmpassword: "",
            password: "",
            // rememberMe: false
        },
      //   selected: "",
    };
  },
  methods: {

    onSubmit() {
      let url = "http://localhost:8000/api/teacher/detail/" + this.$store.getters.user.id;
         get(url)
        .then((res) => {
            this.current_pw = res.data.data;
            console.log("XXX", this.current_pw.password)
        })
      let confirmpassword = this.model.confirmpassword;
      let password = this.model.password;
      let current_password = this.model.current_password;
      
      if(current_password == "teacher")
      {
          if (confirmpassword == password) {
        let url =
          "http://localhost:8000/api/teacher/update/password/" + this.$store.getters.user.id;
        let payload = {
            password : password
        };
        put(url, payload)
          .then((res) => {
        
            this.showNotification("success", "Update Successfully");
            this.$router.push("/teacher");
    
          })
          .catch((err) => {
            this.showNotification("danger", err);
          });
      } else {
        this.showNotification(
          "danger",
          "Confirm Password not match, Please type again"
        );
        this.model.confirmpassword = ""
        this.model.password = ""
        this.model.current_password = ""
      }
      }else {
        this.showNotification(
          "danger",
          "Current Password not correct, Please type again"
        );
        this.model.confirmpassword = ""
        this.model.password = ""
        this.model.current_password = ""
      }
      
    },
    showNotification(type, message) {
      this.$notify({
        message: message,
        icon: "add_alert",
        horizontalAlign: "right",
        verticalAlign: "top",
        type: type,
      });
    },
  },
};
</script>
<style>
.background {
  background-color: #172b4d;
}
</style>
