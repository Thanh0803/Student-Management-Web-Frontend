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
                    name: 'Teacher Assignment',
                    path: '/admin/assign/teacher',
                    icon: 'ni ni-key-25 text-info'
                  }"
        ></sidebar-item>
        <sidebar-item v-if="role == 1"
          :link="{
            name: 'Home',
            path: '/teacher',
            icon: 'ni ni-tv-2 text-primary',
          }"
        ></sidebar-item>

        <sidebar-item v-if="role == 1"
          :link="{
            name: 'Main Class',
            path: '/teacher',
            icon: 'ni ni-key-25 text-info',
          }"
        >
          <sidebar-item
              v-for="(item, index) in AllclassObj"
                :item="item"
                :index="index"
                :key="item.id"
                :link="{
                  name: item.className ,
                  path: '/teacher/headteacher/class/' + item.id,
                }"
            ></sidebar-item>
        </sidebar-item>
        
        <sidebar-item v-if="role == 1"
                  :link="{
                    name: 'Subject Management',
                    path: '/admin/test&mark',
                    icon: 'ni ni-key-25 text-info'
                  }"
        >
          <sidebar-item v-if="role == 1"
                    :link="{
                      name: 'Mark',
                      path: '/admin/test&mark',
                      icon: 'ni ni-key-25 text-info'
                    }"
          >
            <sidebar-item
              v-for="(item, index) in AssignObj"
                :item="item"
                :index="index"
                :key="item.id"
                :link="{
                  name: item.subject.subjectName + ' - ' + item.lop.className ,
                  path: '/teacher/class/subject/' + item.subject.id,
                }"
            ></sidebar-item>
          </sidebar-item>
          <sidebar-item v-if="role == 1"
                  :link="{
                    name: 'Conduct',
                    path: '/admin/conduct',
                    icon: 'ni ni-key-25 text-info'
                  }"
        >
           <sidebar-item
            v-for="(item, index) in ClassObj"
              :item="item"
              :index="index"
              :key="item.id"
              :link="{
                name: item.className ,
                path: '/teacher/class/' + item.id,
              }"
          ></sidebar-item>
        </sidebar-item>
        </sidebar-item>
        
        <sidebar-item v-if="role == 2"
          :link="{
            name: 'Home',
            path: '/student',
            icon: 'ni ni-tv-2 text-primary',
          }"
        ></sidebar-item>
         <sidebar-item v-if="role == 2"
          :link="{
            name: 'Mark Detail',
            path: '/student',
            icon: 'ni ni-tv-2 text-primary',
          }"
        >
          <sidebar-item 
            v-for="(item, index) in class_studentObj"
                  :item="item"
                  :index="index"
                  :key="item.id"
                  :link="{
                    name: item.lop.className ,
                    path: '/student/class/' + item.id, // item.id: id of division
                  }"
          >
          </sidebar-item>
        </sidebar-item>
        <sidebar-item v-if="role == 2"
          :link="{
            name: 'Conduct Detail',
            path: '/student/conduct/',
            icon: 'ni ni-tv-2 text-primary',
          }"
        >
        </sidebar-item>
        
        
        
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
      class_studentObj:[],
      subject_studentObj: [],
      AssignObj:[],
      ClassObj:[],
      AllclassObj:[]
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
      fetchClassStudentData() {
      if (this.$store.getters.role == 2) {
        let url ="http://localhost:8000/api/student/class/getall/"+this.$store.getters.user.id
        get(url)
          .then((res) => {
            this.class_studentObj = res.data.data;
          })
          .catch((err) => {
            alert(err);
          });
        }
      },
      GetStudentfromHeadData() {
      if (this.$store.getters.role == 1) {
        let url = "http://localhost:8000/api/head/teacher/getall/class/" + this.$store.getters.user.id
        get(url)
          .then((res) => {
            this.AllclassObj = res.data.data;
            // console.log("this.AllclassObj",this.AllclassObj)
          })
          .catch((err) => {
            alert(err);
          });
        }
      },
      fetchSubjectData() {
      if (this.$store.getters.role == 0 ) {
        let url ="http://localhost:8000/api/admin/subject/getall"
        get(url)
          .then((res) => {
            this.subjectObj = res.data.data;
            // console.log("subject", this.subjectObj)
          })
          .catch((err) => {
            alert(err);
          });
        }
      },
      fetchAssignData() {
      if (this.$store.getters.role == 1) {
        
        let url ="http://localhost:8000/api/teacher/class/subject/getall/"+this.$store.getters.user.id ;
        get(url)
          .then((res) => {
            this.AssignObj = res.data.data;
            // console.log("assign",this.AssignObj)
          })
          .catch((err) => {
            alert(err);
          });
        }
      },
      fetchClassData() {
      if (this.$store.getters.role == 1) {
        
        let url = "http://localhost:8000/api/teacher/class/"+this.$store.getters.user.id ;
        // console.log("URL",url)
        get(url)
          .then((res) => {
            this.ClassObj = res.data.data;
            // console.log("class",res)
          })
          .catch((err) => {
            alert(err);
          });
        }
      },
    },

    
    mounted() {
      this.initScrollbar()
      this.fetchGradeData()
      this.fetchSubjectData()
      this.fetchAssignData()
      this.fetchClassData()
      this.fetchClassStudentData()
      this.GetStudentfromHeadData()
    }
  };
</script>

<style lang="scss">
</style>



