<template>
  <div class="wrapper">
    <notifications></notifications>
    <side-bar>
      <template slot="links">
        <sidebar-item
          v-if="role == 0"
          :link="{
            name: 'Dashboard',
            path: '/',
            icon: 'ni ni-tv-2 text-primary',
          }"
        >
        </sidebar-item>

        <sidebar-item
          v-if="role == 1"
          :link="{
            name: 'Home',
            path: '/teacher',
            icon: 'ni ni-tv-2 text-primary',
          }"
        >

        </sidebar-item>
        <sidebar-item
          v-if="role == 1"
          :link="{
            name: 'Quản lý lớp chủ nhiệm',
            icon: 'fas fa-home text-warning',
          }"
        >
          <sidebar-item
            v-for="(item, index) in teacherKeyObj"
            :item="item"
            :index="index"
            :key="item.id"
            :link="{
              name: 'Lớp ' + item.classname,
              path: '/teacher/class/' + item.id,
            }"
          ></sidebar-item>
          <sidebar-item
            
            :link="{
              name: 'Trao đổi với PHHS',
              path: '/teacher/chat_list',
            }"
          ></sidebar-item>
        </sidebar-item>
        <sidebar-item
          v-if="role == 1"
          :link="{
            name: 'Quản lý lớp Bộ môn ',
            icon: 'fas fa-chalkboard-teacher text-success',
          }"
          
        >
          <sidebar-item
            v-for="(item, index) in teacherObj"
            :item="item"
            :index="index"
            :key="item.id"
            :link="{
              name:
                'Lớp ' +
                item.class.classname +
                ' - ' +
                item.subject.subjectname,
              path: '/teacher/class_teach/' + item.class.id,
            }"
          ></sidebar-item>
        </sidebar-item>
        <sidebar-item
          v-if="role == 1"
          :link="{
            name: 'Change Password',
            path: '/teacher/change_password',
            icon: 'fas fa-key text-danger',
            
          }"
        >
        </sidebar-item>
        <sidebar-item
          v-if="role == 2"
          :link="{
            name: 'Home',
            path: '/student',
            icon: 'ni ni-tv-2 text-primary',
          }"
        >
        </sidebar-item>
        <sidebar-item
          v-if="role == 2"
          :link="{
            name: 'Change Password',
            path: '/student/change_password',
            icon: 'fas fa-key text-danger',
            
          }"
        >
        </sidebar-item>
        <sidebar-item
          v-if="role == 2"
          :link="{
            name: 'Các môn học',
            icon: 'fas fa-th-list text-yellow',
          }"
        >
        <sidebar-item
          v-for="(item, index) in studentObj"
          :item="item"
          :index="index"
          :key="item.id"
          :link="{
            name: item.subject_id,
            path: '/student/student/' +user.id + '/test_detail/' +item.class_sub,
          }"
        ></sidebar-item>
        </sidebar-item>
        <sidebar-item
            v-if="role == 2"
            :link="{
              name: 'Điểm ý thức',
              path: '/student/student/conduct',
              icon: 'ni ni-planet text-blue'
              }"
            >
        </sidebar-item>
        <sidebar-item
          v-if="role == 3"
          :link="{
            name: 'Home',
            path: '/parent',
            icon: 'ni ni-tv-2 text-primary',
          }"
        ></sidebar-item>
        <sidebar-item
          v-if="role == 3"
          :link="{
            name: 'Trò chuyện',
            path: '/parent/list_room',
            icon: 'fas fa-comments text-primary',
            
          }"
        ></sidebar-item>
        <sidebar-item
          v-if="role == 3"
          :link="{
            name: 'Change Password',
            path: '/parent/change_password',
            icon: 'fas fa-key text-danger',
            
          }"
        ></sidebar-item>
        <!-- <sidebar-item
              :link="{
                name: 'Maps',
                path: '/admin/maps',
                icon: 'ni ni-pin-3 text-orange'
              }">
        </sidebar-item>
        <sidebar-item
              :link="{
                name: 'User Profile',
                path: '/admin/profile',
                icon: 'ni ni-single-02 text-yellow'
                }">
        </sidebar-item>
        <sidebar-item
                :link="{
                  name: 'Tables',
                  path: '/admin/tables',
                  icon: 'ni ni-bullet-list-67 text-red'
                }">
        </sidebar-item>
        <sidebar-item v-if="!isLoggedIn"
                  :link="{
                    name: 'Login',
                    path: '/login',
                    icon: 'ni ni-key-25 text-info'
                  }">
        </sidebar-item> -->
        <sidebar-item
          v-if="role == 0"
          :link="{
            name: 'Quản lý Giáo viên',
            path: '/admin/teacher',
            icon: 'ni ni-key-25 text-info',
          }"
        >
        </sidebar-item>

        <sidebar-item
          v-if="role == 0"
          :link="{
            name: 'Quản lý học sinh',
            path: '/admin/student',
            icon: 'ni ni-single-02 text-info',
          }"
        >
        </sidebar-item>

        <sidebar-item
          v-if="role == 0"
          :link="{
            name: 'Quản lý lớp',
            path: '/admin/class',
            icon: 'ni ni-trophy text-danger',
          }"
        >
        </sidebar-item>
        <sidebar-item
          v-if="role == 0"
          :link="{
            name: 'Quản lý Bộ môn - Khối',
            path: '/admin/subject',
            icon: 'fas fa-sitemap text-success',
          }"
        >
        </sidebar-item>
        <sidebar-item
          v-if="role == 0"
          :link="{
            name: 'Phân công giáo viên',
            path: '/admin/assign',
            icon: 'fas fa-list-alt text-warning ',
          }"
        >
        </sidebar-item>
        <!-- <sidebar-item
                  :link="{
                    name: 'Register',
                    path: '/register',
                    icon: 'ni ni-circle-08 text-pink'
                  }">
        </sidebar-item> -->
      </template>

      <!-- <template slot="links-after">
        <hr class="my-3">
        <h6 class="navbar-heading p-0 text-muted">Documentation</h6>
        <b-nav class="navbar-nav mb-md-3">
          <b-nav-item
               href="https://www.creative-tim.com/learning-lab/bootstrap-vue/quick-start/argon-dashboard"
               >
              <i class="ni ni-spaceship"></i>
              <b-nav-text class="p-0">Getting started</b-nav-text>
          </b-nav-item>
          <b-nav-item href="https://www.creative-tim.com/learning-lab/bootstrap-vue/colors/argon-dashboard">
              <i class="ni ni-palette"></i>
              <b-nav-text class="p-0">Foundation</b-nav-text>
          </b-nav-item>
          <b-nav-item href="https://www.creative-tim.com/learning-lab/bootstrap-vue/avatar/argon-dashboard">
              <i class="ni ni-ui-04"></i>
              <b-nav-text class="p-0">Components</b-nav-text>
          </b-nav-item>
        </b-nav>
      </template> -->
    </side-bar>
    <div class="main-content">
      <dashboard-navbar :type="$route.meta.navbarType"></dashboard-navbar>

      <div @click="$sidebar.displaySidebar(false)">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}
function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}
import DashboardNavbar from "./DashboardNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import { FadeTransition } from "vue2-transitions";
import { get } from "../../services/services";
import { mapGetters } from "vuex";
export default {
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
    role: function () {
      return this.$store.getters.role;
    },
    ...mapGetters({
      // map `this.doneCount` to `this.$store.getters.doneTodosCount`
      user: "user",
    }),
    
  },
  components: {
    DashboardNavbar,
    ContentFooter,
    DashboardContent,
    FadeTransition,
  },
  data() {
    return {
      teacherKeyObj: [],
      teacherObj: [],
      studentObj: [],
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData();
  },
  methods: {
    initScrollbar() {
      let isWindows = navigator.platform.startsWith("Win");
      if (isWindows) {
        initScrollbar("sidenav");
      }
    },
    fetchData() {
      if (this.$store.getters.role == 1) {
        let url =
          "http://localhost:8000/api/teacher/getInfo/" +
          this.$store.getters.user.id;
        get(url)
          .then((res) => {
            // console.log(res);
            this.teacherKeyObj = res.data.classByKeyTeacher;
            this.teacherObj = res.data.classTeach.data;
            // this.classObj = res.data.data;
            // console.log(this.teacherObj);
            //   this.keyTeacher = res.data.User.data.fullname
          })
          .catch((err) => {
            alert(err);
          });
      } else if (this.$store.getters.role == 2) {
        let url =
          "http://localhost:8000/api/student/achievement/" +
          this.$store.getters.user.id;
        get(url)
          .then((res) => {
            console.log(res);
            // this.teacherKeyObj = res.data.classByKeyTeacher;
            this.studentObj = res.data.data;
            // this.classObj = res.data.data;
            console.log(this.studentObj);
            //   this.keyTeacher = res.data.User.data.fullname
          })
          .catch((err) => {
            alert(err);
          });
      }
    },
  },
  mounted() {
    this.initScrollbar();
  },
};
</script>
<style lang="scss">
</style>