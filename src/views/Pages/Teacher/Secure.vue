<template>
  <div>
    <base-header class="pb-3 pt-3 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
      <h1 v-if="user" >Welcome Teacher Tran Thi Phuong !</h1>
      <b-row class="pt-3">
        <b-col xl="3" md="6">
          <stats-card
            title="number of homeroom classes"
            type="gradient-red"
            icon="ni ni-active-40"
            :sub-title= "1"
            class="mb-4"
          >
            
          </stats-card>
        </b-col>
        <b-col xl="3" md="6">
          <stats-card
            title="number of students in charge"
            type="gradient-orange"
            icon="ni ni-chart-pie-35"
            :sub-title= "20"
            class="mb-4"
          >
            <!-- <template slot="footer">
              <span class="text-success mr-2">12.18%</span>
              <span class="text-nowrap">Since last month</span>
            </template> -->
          </stats-card>
        </b-col>
        <b-col xl="3" md="6">
          <stats-card
            title="number of classes being taught"
            type="gradient-green"
            icon="ni ni-chart-bar-32"
            :sub-title= "20"
            class="mb-4"
          >
            <!-- <template slot="footer">
              <span class="text-success mr-2">15.08%</span>
              <span class="text-nowrap">Since last month</span>
            </template> -->
          </stats-card>
        </b-col>
     
      </b-row>
    </base-header>
    <b-container>
      <h2 class="pt-3 container-fluid">Homeroom class list</h2>
      <b-row class="pt-3">
        
         
            <b-col  >
              <stats-card
                :title="'Class 10C1' "
                type="gradient-green"
                :sub-title="' 20 HS'"
                icon="far fa-eye"
                class="mb-4"
                :to="'/teacher/class/'"
              >
                <template slot="footer">
                  <span class="text-danger mr-2">Kien An High-School</span>
                  <span class="text-nowrap">Grade 10</span>
                </template>
              </stats-card>
            </b-col>
      </b-row>

      <h2 class="pt-3 container-fluid">Teaching class list</h2>
      <b-row class="pt-3">
        
         
            <b-col  >
              <stats-card
                :title="'Class 10C1' "
                type="gradient-green"
                :sub-title="' 20 HS'"
                icon="far fa-eye"
                class="mb-4"
                :to="'/teacher/class/'"
              >
                <template slot="footer">
                  <span class="text-danger mr-2">Kien An High-School</span>
                  <span class="text-nowrap">Grade 10</span>
                </template>
              </stats-card>
            </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import StatsCard from "@/components/Cards/StatsCard";
import { mapGetters } from "vuex";
import store from "../../../store/store";
import { get, put, del, post } from "../../../services/services";
export default {
  components: {
    //   LineChart,
    //   BarChart,
    //   BaseProgress,
    StatsCard,
    //   PageVisitsTable,
    //   SocialTrafficTable
  },
  data() {
    return {
      arrClassForm: [],
      analyze: {
        count_form_class: 0,
        count_form_student: 0,
        count_class_teach: 0,
        count_student_teach: 0
      },
      arrClassTeach : []
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData();
  },

  computed: {
    ...mapGetters({
      // map `this.doneCount` to `this.$store.getters.doneTodosCount`
      user: "user",
    }),
  },
  methods: {
    fetchData() {
      // console.log(store.getters.user.id)
      let id = store.getters.user.id;
      console.log(id);
      let url =
        "http://localhost:8000/api/teacher/form_class/" + store.getters.user.id;
      get(url)
        .then((res) => {
          this.arrClassForm = res.data.data;
          // console.log(this.arrClassForm);
          //   this.keyTeacher = res.data.User.data.fullname
        })
        .catch((err) => {
          alert(err);
        });

      url =
        "http://localhost:8000/api/teacher/analyze/" + store.getters.user.id;
      get(url)
        .then((res) => {
          // console.log(res);
          // this.arrClassForm = res.data.data;
          // console.log(this.arrClassForm);
          //   this.keyTeacher = res.data.User.data.fullname
          this.analyze.count_form_class = res.data.count_form_class,
          this.analyze.count_form_student= res.data.count_form_student,
          this.analyze.count_class_teach= res.data.count_class_teach,
          this.analyze.count_student_teach= res.data.count_student_teach
          this.arrClassTeach = res.data.demo.data
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
};
</script>