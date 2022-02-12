<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
      <h1> Welcome Phan Ngoc Thao!</h1>
      
    </base-header>

    <!--Charts-->

    <b-container fluid class="mt--7">
      <b-row>
  
        <b-col xl="5" class="mt-8">
          <div class="pl-lg-4">
            <h6 class="heading-small text-muted mb-4">Student's Inofrmation</h6>
            <b-row>
              <b-col lg="6">
                <label class="form-control-label"> Fullname</label>
                <br />
                <span class="information">{{ user.fullname }}</span>
              </b-col>
              <b-col lg="6">
                <label class="form-control-label"> Email </label>
                <br />
                <span class="information">{{ user.email }}</span>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="6">
                <label class="form-control-label"> Gender </label>
                <br />
                <span class="information">{{ user.gender }}</span>
              </b-col>
              <b-col lg="6">
                <label class="form-control-label"> Telephone </label>
                <br />
                <span class="information">{{ user.phone }}</span>
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
      <b-row
        class="mt-5"
        v-for="(item, index) in achievements"
        :item="item"
        :index="index"
        :key="item.id"
      >
        <h2 class="mb-3">Bộ môn - {{ item.subject_id }}</h2>
        <b-col xl="12" class="mb-5 mb-xl-0">
          <card type="default" header-classes="bg-transparent">
            <b-row align-v="center" slot="header">
              <b-col>
                <h6 class="text-light text-uppercase ls-1 mb-1">
                  Thành tích học tập
                </h6>
                <h5 class="h3 h5-old text-white mb-0">Bảng điểm</h5>
              </b-col>
              <b-col>
                <b-nav class="nav-pills justify-content-end">
                  <b-nav-item
                    class="mr-2 mr-md-0"
                    :active="bigLineChart.activeIndex === 0"
                    link-classes="py-2 px-3"
                    @click.prevent="initBigChart(0)"
                  >
                    <span class="d-none d-md-block">Học kì</span>
                    <span class="d-md-none">M</span>
                  </b-nav-item>
                </b-nav>
              </b-col>
            </b-row>
            <!-- <bar-chart
              :height="350"
              ref="barChart"
              :chart-data="chart[index]"
              :extra-options="bigLineChart.extraOptions"
            >
            
            </bar-chart> -->
            <bar-chart
              :height="350"
              ref="barChart"
              :chart-data="chart[index]"
            >
            </bar-chart>
          </card>
        </b-col>
      </b-row>

    </b-container>
  </div>
</template>
<script>
// import '~bootstrap-vue/dist/bootstrap-vue.css';
// Charts
import * as chartConfigs from "@/components/Charts/config";
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";

// Components
import BaseProgress from "@/components/BaseProgress";
import StatsCard from "@/components/Cards/StatsCard";

// Tables
// import SocialTrafficTable from './Dashboard/SocialTrafficTable';
// import PageVisitsTable from './Dashboard/PageVisitsTable';
import { get } from "../../../services/services";
import { mapGetters } from "vuex";
export default {
  components: {
    LineChart,
    BarChart,
    BaseProgress,
    StatsCard,
    // PageVisitsTable,
    // SocialTrafficTable
  },
  computed: {
    ...mapGetters({
      // map `this.doneCount` to `this.$store.getters.doneTodosCount`
      user: "user",
    }),
  },
  data() {
    return {
      bigLineChart: {
        allData: [
          [10, 20, 10, 30, 15, 40, 20, 60, 60],
          [0, 20, 5, 25, 10, 30, 15, 40, 40],
        ],
        activeIndex: 0,
        chartData: {
          datasets: [
            {
              label: "Performance",
              data: [0, 20, 10, 30, 15, 40, 20, 60, 60],
            },
          ],
          labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        },
        extraOptions: chartConfigs.blueChartOptions,
      },
      redBarChart: {
        chartData: {},
        extraOptions: chartConfigs.blueChartOptions,
      },
      arrTeacher: [],
      arrStudent: [],
      numClass: 0,
      achievements: [],
      indexX: [],
      indexY: [],
      chart:[]
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData();
  },
  methods: {
    fetchData() {
      let url =
        "http://localhost:8000/api/student/achievement/" +
        this.$store.state.user.id;
      get(url)
        .then((res) => {
          console.log(res);
          this.achievements = res.data.data;
          this.initColChart();
          this.achievements.forEach((element) => {
            // console.log(element.id)
            var url =
              "http://localhost:8000/api/student/chart/student/" +
              this.$store.state.user.id +
              "/class_sub/" +
              element.class_sub;
            this.arrStudent.push(url);
          });
          // console.log(this.arrStudent);
          this.getAPI().then(results => {
            console.log(this.indexX.length)
            console.log(this.indexX)
            const that = this
            // this.achievements.forEach((element,index) => {
            //   let chartData = {
            //     datasets: [
            //       {
            //         label: "Điểm",
            //         data: that.indexX[0],
            //       },
            //     ],
            //     labels: that.indexY[0]
            //   };
            //   console.log(that.indexX)
            //   // this.chart.push(chartData)
            //   // console.log(index)
            // })
            // // console.log(this.chart)
          }
          );
        })
        .catch((err) => {
          alert(err);
        });
    },
    initBigChart(index) {
      // console.log("Achi", this.achievements);
      let chartData = {
        datasets: [
          {
            label: "Performance",
            data: this.bigLineChart.allData[index],
          },
        ],
        labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      };
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = 0;
    },
    initColChart() {
      let arr = this.achievements;
      let x = [];
      let y = [];
      arr.forEach((element) => {
        // console.log(element.id)
        x.push(element.subject_id);
        if (element.mark.final_grade == null) {
          y.push(0);
        } else {
          y.push(element.mark.final_grade);
        }
      });
      let chartData = {
        datasets: [
          {
            label: "Performance",
            data: y,
          },
        ],
        labels: x,
      };
      this.redBarChart.chartData = chartData;
    },
    initDataStudentSubject(class_sub) {
      let student_id = this.$store.state.user.id;
      let classSubject_id = class_sub;
      let url =
        "http://localhost:8000/api/student/chart/student/" +
        student_id +
        "/class_sub/" +
        classSubject_id;
      get(url)
        .then((res) => {
          console.log("Chate", res);
          //     let arr = res.data.data;
          //     let x = [];
          //     let y = []
          //     arr.forEach((element) => {

          //       // console.log(element.id)
          //       x.push(element.test.testname)
          //       if(element.mark == null) {y.push(0)}
          //       else{
          //       y.push(element.mark);
          //       }
          // });
          //     let chartData = {
          //       datasets: [
          //         {
          //           label: "Điểm",
          //           data: y,
          //         },
          //       ],
          //       labels:
          //       x ,
          //     };
          //     this.bigLineChart.chartData = chartData;
          //     this.bigLineChart.activeIndex = index;
        })
        .catch((err) => {
          alert(err);
        });
    },
    async getAPI() {
      let requests = this.arrStudent.map((url) => get(url));
      // let indexX = [];
      // let indexY = [];
      // Promise.all waits until all jobs are resolved
      Promise.all(requests).then((responses) =>
        responses.forEach((response) => {
          let arr = response.data.data;
          let x = [];
          let y = [];
          arr.forEach((element) => {
            // console.log(element.id)
            x.push(element.test.testname);
            if (element.mark == null) {
              y.push(0);
            } else {
              y.push(element.mark);
            }
          });
          let chartData = {
            datasets: [
              {
                label: "Điểm",
                data: y,
              },
            ],
            labels: 
            x ,
          };
          // indexX.push(x);
          this.chart.push(chartData)
          // this.indexY.push(y)
          // // indexY.push(y);
          // console.log("X",this.indexX[0])
        })
      );
      // console.log("X",this.indexX[0])
      // console.log("Y",indexY)
      // this.indexX = indexX;
      // this.indexY = indexY;
    },
  },
  mounted() {
    this.initBigChart(0);
    // this.initDataTeacher();
    // this.initDataStudent();
    // this.initDataClass();
  },
};
</script>
<style>
.el-table .cell {
  padding-left: 0px;
  padding-right: 0px;
}
.h5-old {
  font-size: 0.8125rem !important;
}
.information {
  display: block;
  width: 100%;
  height: calc(1.5em + 1.25rem + 2px);
  padding: 0.625rem 0rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  color: #8898aa;
  background-color: #f8f9fe;
  background-clip: padding-box;
  font-style: italic;
  /* border: 1px solid #cad1d7; */
  -webkit-box-shadow: none;
  box-shadow: none;
  -webkit-transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
</style>
