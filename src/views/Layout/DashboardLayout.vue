<template>
  <div class="wrapper">
    <notifications></notifications>
    <side-bar>
      <template slot="links">
        <sidebar-item v-if="role == 0"
          :link="{
            name: 'Dashboard',
            path: '/admin',
            icon: 'ni ni-tv-2 text-primary',
          }"
        >
        </sidebar-item>

        <sidebar-item v-if="role == 1"
          :link="{
            name: 'Home',
            path: '/teacher',
            icon: 'ni ni-tv-2 text-primary',
          }"
        >
        </sidebar-item>
        <sidebar-item v-if="role == 2"
          :link="{
            name: 'Home',
            path: '/student',
            icon: 'ni ni-tv-2 text-primary',
          }"
        >
        </sidebar-item>
        <sidebar-item v-if="role == 0"
                  :link="{
                    name: 'Teacher Management',
                    path: '/admin/teacher',
                    icon: 'ni ni-key-25 text-info'
                  }"
        >
          <sidebar-item
          v-for="(item, index) in subjectObj"
              :item="item"
              :index="index"
              :key="item.id"
              :link="{
                name: item.subjectName,
                path: '/admin/subject/' + item.id,
              }"
        ></sidebar-item>
        </sidebar-item>
        <sidebar-item v-if="role == 0"
                :link="{
                  name: 'Student Management',
                  path: '/admin/student',
                  icon: 'ni ni-single-02 text-info'
                }"
        > 
          <sidebar-item
            v-for="(item, index) in gradeObj"
              :item="item"
              :index="index"
              :key="item.id"
              :link="{
                name: item.gradeName,
                path: '/admin/grade/' + item.id,
              }"
          ></sidebar-item> 
          </sidebar-item>
        <sidebar-item v-if="role == 0"
                  :link="{
                    name: 'Test and Mark Management',
                    path: '/admin/test&mark',
                    icon: 'ni ni-key-25 text-info'
                  }"
        ></sidebar-item>
        <sidebar-item v-if="role == 0"
                  :link="{
                    name: 'Conduct Management',
                    path: '/admin/conduct',
                    icon: 'ni ni-key-25 text-info'
                  }"
        ></sidebar-item>
        <sidebar-item v-if="role == 0"
                  :link="{
                    name: 'Teacher Assignment',
                    path: '/admin/assign/teacher',
                    icon: 'ni ni-key-25 text-info'
                  }"
        ></sidebar-item>
      </template>
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
  import PerfectScrollbar from 'perfect-scrollbar';
  import 'perfect-scrollbar/css/perfect-scrollbar.css';

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

import DashboardNavbar from './DashboardNavbar.vue';
import ContentFooter from './ContentFooter.vue';
import DashboardContent from './Content.vue';
import { FadeTransition } from 'vue2-transitions';
import { get } from "../../services/services";
// import { mapGetters } from "vuex";
import SideBar from '../../components/SidebarPlugin/SideBar.vue';
import SidebarItem from '../../components/SidebarPlugin/SidebarItem.vue';

export default {
    computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn},
      role : function(){ return this.$store.getters.role}
    },
    components: {
      DashboardNavbar,
      ContentFooter,
      DashboardContent,
      FadeTransition,
        SideBar,
        SidebarItem
    },
    data() {
    return {
      gradeObj: [],
      subjectObj:[],
    };
  },
    methods: {
      initScrollbar() {
        let isWindows = navigator.platform.startsWith('Win');
        if (isWindows) {
          initScrollbar('sidenav');
        }
      },
      fetchGradeData() {
      if (this.$store.getters.role == 0) {
        let url ="http://localhost:8000/api/admin/grade/getall" 
        get(url)
          .then((res) => {
            this.gradeObj = res.data.data;
          })
          .catch((err) => {
            alert(err);
          });
        }
      },
      fetchSubjectData() {
      if (this.$store.getters.role == 0) {
        let url ="http://localhost:8000/api/admin/subject/getall" 
        get(url)
          .then((res) => {
            this.subjectObj = res.data.data;
          })
          .catch((err) => {
            alert(err);
          });
        }
      }
    },
    
    mounted() {
      this.initScrollbar()
      this.fetchGradeData()
      this.fetchSubjectData()
    }
  };
</script>

<style lang="scss">
</style>



