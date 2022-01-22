<template>
  <div>

    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
      <b-row>
        <b-col xl="3" md="6">
          <stats-card title="Total teacher"
                      type="gradient-red"
                      :sub-title= "arrTeacher.toString()"
                      icon="ni ni-active-40"
                      class="mb-4">

            <template slot="footer">
              <!-- <span class="text-success mr-2">3.48%</span> -->
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
        <b-col xl="3" md="6">
          <stats-card title="Total student"
                      type="gradient-orange"
                      :sub-title= "arrStudent.toString()"
                      icon="ni ni-chart-pie-35"
                      class="mb-4">

            <template slot="footer">
              <!-- <span class="text-success mr-2">12.18%</span> -->
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
        <b-col xl="3" md="6">
          <stats-card title="Total Admin"
                      type="gradient-info"
                      :sub-title= "arrAdmin.toString()"
                      icon="ni ni-money-coins"
                      class="mb-4">

            <template slot="footer">
              <!-- <span class="text-success mr-2">13.98%</span> -->
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
        <b-col xl="3" md="6">
          <stats-card title="Total classs"
                      type="gradient-green"
                      :sub-title= "arrClass.toString()"
                      icon="ni ni-chart-bar-32"
                      class="mb-4">

            <template slot="footer">
              <!-- <span class="text-success mr-2">15.08%</span> -->
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
      </b-row>
    </base-header>

    <!--Charts-->
    <b-container fluid class="mt--7">

      <!-- End charts-->

      <!--Tables-->
      <b-row class="mt-5">
        <b-col xl="8" class="mb-5 mb-xl-0">
          <page-visits-table></page-visits-table>
        </b-col>
       
      </b-row>
      <!--End tables-->
    </b-container>

  </div>
</template>
<script>
  import DashboardNavbar from './Layout/DashboardNavbar.vue';
  // Charts
  import * as chartConfigs from '@/components/Charts/config';
  import LineChart from '@/components/Charts/LineChart';
  import BarChart from '@/components/Charts/BarChart';

  // Components
  import BaseProgress from '@/components/BaseProgress';
  import StatsCard from '@/components/Cards/StatsCard';

  // Tables
  import SocialTrafficTable from './Dashboard/SocialTrafficTable';
  import PageVisitsTable from './Dashboard/PageVisitsTable';
  import { get } from '../services/services'
  export default {
    components: {
      DashboardNavbar,
      LineChart,
      BarChart,
      BaseProgress,
      StatsCard,
      PageVisitsTable,
      SocialTrafficTable
    },
    data() {
      return {
        bigLineChart: {
          allData: [
            [10, 20, 10, 30, 15, 40, 20, 60, 60],
            [0, 20, 5, 25, 10, 30, 15, 40, 40]
          ],
          activeIndex: 0,
          chartData: {
            datasets: [
              {
                label: 'Performance',
                data: [0, 20, 10, 30, 15, 40, 20, 60, 60],
              }
            ],
            labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          },
          extraOptions: chartConfigs.blueChartOptions,
        },
        redBarChart: {
          chartData: {
            labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
              label: 'Sales',
              data: [25, 20, 30, 22, 17, 29]
            }]
          },
          extraOptions: chartConfigs.blueChartOptions
        },
        arrTeacher : [],
        arrStudent : [],
        arrAdmin: [],
        arrClass: [],
      };
    },
    methods: {
      initBigChart(index) {
        let chartData = {
          datasets: [
            {
              label: 'Performance',
              data: this.bigLineChart.allData[index]
            }
          ],
          labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        };
        this.bigLineChart.chartData = chartData;
        this.bigLineChart.activeIndex = index;
      },
      initDataTeacher(){
        let url = 'http://localhost:8000/api/admin/teacher/total/'
        get(url).then(res =>{
          // console.log("Respon",res)
          this.arrTeacher = res.data
          // console.log(this.arrTeacher.length)
          })
        .catch(
          err => {
            alert(err)
          }
        )
      },
      initDataStudent()
      {
        let url = 'http://localhost:8000/api/admin/student/total/'
        get(url).then(res =>{
          // console.log("Respon",res)
          this.arrStudent = res.data
          // console.log(this.arrStudent)
          })
        .catch(
          err => {
            alert(err)
          }
        )
      },
      initDataAdmin()
      {
        let url = 'http://localhost:8000/api/admin/total/'
        get(url).then(res =>{
          // console.log("Respon",res)
          this.arrAdmin = res.data
          // console.log(this.arrStudent)
          })
        .catch(
          err => {
            alert(err)
          }
        )
      },
      initDataClass()
      {
        let url = 'http://localhost:8000/api/admin/class/total/'
        get(url).then(res =>{
          // console.log("Respon",res)
          this.arrClass = res.data
          // console.log(this.arrStudent)
          })
        .catch(
          err => {
            alert(err)
          }
        )
      }

    },
    mounted() {
      this.initBigChart(0);
      this.initDataTeacher();
      this.initDataStudent();
      this.initDataAdmin();
      this.initDataClass();
    }
  };
</script>
<style>
.el-table .cell{
  padding-left: 0px;
  padding-right: 0px;
}
</style>
