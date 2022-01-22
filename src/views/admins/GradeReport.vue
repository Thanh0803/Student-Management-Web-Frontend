<template>
      <div id="app">
        <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
          <!-- Card stats -->
          <h1>Class Report</h1>
        </base-header>
        <b-container fluid class="realative">
          <div>
            <b-card no-body>
              <div class="row justify-content-center">
                <div class="card">
                    <input 
                      type="text" 
                      v-model="searchText" 
                      @keyup="fetchData_grade1()"
                      placeholder="Enter School Year">
                </div>
            </div>
              <b-tabs card>
                <b-tab title="Grade 10" active>
                    <b-col>
                        <b-card-header class="border-0">
                            <h2 class="text-uppercase" align="center">Statistical report on the number of student results</h2>
                            <h3 class="text-uppercase" align="center">Grade 10</h3>
                        </b-card-header>
                    </b-col>          
                    <canvas
                    ref="renderChart_1"
                    id="canvas"
                    class="bg"
                    width="100"
                    height="100"></canvas>
                    <b-col xl="7" :class="main_1" >
                    <card header-classes="bg-transparent" >
                        <bar-chart
                        id="chart"
                        :height="350"
                        ref="renderChart_1"
                        :chart-data="renderChart_1.chartData"
                        >
                        </bar-chart>
                    </card>
                    </b-col>                       
                </b-tab>
                <b-tab title="Grade 11"  >
                    <b-col>
                        <b-card-header class="border-0">
                            <h2 class="text-uppercase" align="center">Statistical report on the number of student results</h2>
                            <h3 class="text-uppercase" align="center">Grade 11</h3>
                        </b-card-header>
                    </b-col>          
                    <canvas
                    ref="renderChart_2"
                    id="canvas"
                    width="100"
                    height="100"></canvas>
                    <b-col xl="7" :class="main_2">
                    <card header-classes="bg-transparent" >
                        <bar-chart
                        id="chart"
                        :height="400"
                        ref="renderChart_2"
                        :chart-data="this.renderChart_2.chartData"
                        >
                        </bar-chart>
                    </card>
                    </b-col>
            
                </b-tab>
                <b-tab title="Grade 12"  >
                    <b-col>
                        <b-card-header class="border-0">
                            <h2 class="text-uppercase" align="center">Statistical report on the number of student results</h2>
                            <h3 class="text-uppercase" align="center">Grade 12</h3>
                        </b-card-header>
                    </b-col>          
                    <canvas
                    ref="renderChart_3"
                    id="canvas"
                    width="100"
                    height="100"></canvas>
                    <b-col xl="7" :class="main_3">
                    <card header-classes="bg-transparent" >
                        <bar-chart
                        id="chart"
                        :height="350"
                        ref="renderChart_3"
                        :chart-data="renderChart_3.chartData"
                        >
                        </bar-chart>
                    </card>
                    </b-col>
                </b-tab>
              </b-tabs>
            </b-card>
          </div>
        </b-container>
      </div>
</template>
<script>
// import '~bootstrap-vue/dist/bootstrap-vue.css';
// Charts
import * as chartConfigs from "@/components/Charts/config";
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import LineChartNew from "@/components/Charts/LineChartNew";
// Components
import BaseProgress from "@/components/BaseProgress";
import StatsCard from "@/components/Cards/StatsCard";

// Tables
// import SocialTrafficTable from './Dashboard/SocialTrafficTable';
// import PageVisitsTable from './Dashboard/PageVisitsTable';
import { get } from "../../services/services";
import { mapGetters } from "vuex";
import Exporter from "vue-chartjs-exporter";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Table,
  TableColumn,
  Button,
  Dialog,
  MessageBox,
  Row,
  Col,
  Form,
  FormItem,
  Select,
  Option,
  TimePicker,
  DatePicker,
  CheckboxButton,
  Checkbox,
  CheckboxGroup,
  Switch,
  Radio,
  Tag,
  RadioGroup,
} from "element-ui";
import Vue from "vue";
import { Bar, Pie } from "vue-chartjs";
export default {
  components: {
    Pie,
    name:'app',
    LineChart,
    BarChart,
    LineChartNew,
    BaseProgress,
    StatsCard,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    [Tag.name]: Tag,
    [Row.name]: Row,
    [Col.name]: Col,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Select.name]: Select,
    [Option.name]: Option,
    [TimePicker.name]: TimePicker,
    [DatePicker.name]: DatePicker,
    [CheckboxButton.name]: CheckboxButton,
    [CheckboxGroup.name]: CheckboxGroup,
    [Switch.name]: Switch,
    [Checkbox.name]: Checkbox,
    [Radio.name]: Radio,
    [CheckboxGroup.name]: CheckboxGroup,
    [RadioGroup.name]: RadioGroup,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,

  },
  computed: {
    ...mapGetters({
      // map `this.doneCount` to `this.$store.getters.doneTodosCount`
      user: "user",
    }),
    main_1() {
      return this.status ? "mb-5 mb-xl-0 mt--5" : "mb-5 mb-xl-0";
    },
    main_2() {
      return this.status ? "mb-5 mb-xl-0 mt--5" : "mb-5 mb-xl-0";
    },
    main_3() {
      return this.status ? "mb-5 mb-xl-0 mt--5" : "mb-5 mb-xl-0";
    },
    notBack() {
      return this.status2 ? "mt-4" : "mt-4 none";
    },
    back() {
      return this.status2 ? "none" : "mt-4";
    },
    print() {
      return this.status ? " mb-7 mb-xl-4 none" : "mb-7 mb-xl-4";
    },
  },
  data() {
    return {
      post_1: [],
      post_2: [],
      post_3: [],
      searchText: '',
      text: '',
      renderChart_1: {
        chartData: {
          type: Pie,
          default: null
        },
        extraOptions: chartConfigs.blueChartOptions,
      },
      renderChart_2: {
        chartData: {
          type: Bar,
          default: null,

        },
        extraOptions: chartConfigs.blueChartOptions,
      },
      renderChart_3: {
        chartData: {
          type: Pie,
          default: null
        },
        extraOptions: chartConfigs.blueChartOptions,
      },
      status: true,
      status2: true,
      chart: [],
      options: {
        
      },
    };
  },

  watch: {
    data: function(){
      this.renderChart_1();
      this.renderChart_2();
      this.renderChart_3();
    }
  },
  methods: {
    fetchData_grade1() {
      if (this.searchText.length == 4){
        this.text = this.searchText
      }else{
        this.text = '2020'
      }
      let url = "http://localhost:8000/api/admin/grade/report/"+this.text +"/"+ 1;
      get(url)
        .then((res) => {
          this.post_1 = res.data;
          console.log("this_post1",this.post_1)
          let very_good = parseFloat(this.post_1.very_good/this.post_1.total)*100
          let good = parseFloat(this.post_1.good/this.post_1.total)*100
          let average = parseFloat(this.post_1.average/this.post_1.total)*100
          let lower_avg = parseFloat(this.post_1.lower_average/this.post_1.total)*100
          let chartData = 
            {
              labels: ["Very Good", "Good", "Average", "Lower Average", "Fail"],

              datasets: [
                {
                  backgroundColor: ["#d48a8a", "#b5cf60", "#ffd360","#e66b60", "#296b60"],
                  data: [very_good, good, average, lower_avg, 0]
                }
              ],
            responsive: true, 
            maintainAspectRatio: false,
           }
          this.renderChart_1.chartData = chartData;
          // console.log("111111111",this.renderChart_1.chartData)
        })
        .catch((err) => {
          alert(err);
        });
    },
    fetchData_grade2() {
      if (this.searchText.length == 4){
        this.text = this.searchText
      }else{
        this.text = '2020'
      }
      let url = "http://localhost:8000/api/admin/grade/report/"+this.text +"/"+ 2;
      get(url)
        .then((res) => {
          this.post_2 = res.data;
          console.log("2",this.post_2)
          let very_good = parseFloat(this.post_2.very_good/this.post_2.total)*100
          let good = parseFloat(this.post_2.good/this.post_2.total)*100
          let average = parseFloat(this.post_2.average/this.post_2.total)*100
          let lower_avg = parseFloat(this.post_2.lower_average/this.post_2.total)*100
          let chartData = 
            {
              labels: ["Very Good", "Good", "Average", "Lower Average", "Fail"],

              datasets: [
                {
                  
                  backgroundColor: ["#d48a8a", "#b5cf60", "#ffd360","#e66b60", "#296b60"],
                  data: [very_good, good, average, lower_avg, 0]
                }
              ],
            responsive: true, 
            maintainAspectRatio: false,
           }
          this.renderChart_2.chartData = chartData;
          // console.log("222222222222", this.renderChart_2.chartData)

        })
        .catch((err) => {
          alert(err);
        });
    },
    fetchData_grade3() {
      if (this.searchText.length == 4){
        this.text = this.searchText
      }else{
        this.text = '2020'
      }
      let url = "http://localhost:8000/api/admin/grade/report/"+this.text +"/"+ 3;
      get(url)
        .then((res) => {
          this.post_3 = res.data;
          console.log(this.post_3)
          let very_good = parseFloat(this.post_3.very_good/this.post_3.total)*100
          let good = parseFloat(this.post_3.good/this.post_3.total)*100
          let average = parseFloat(this.post_3.average/this.post_3.total)*100
          let lower_avg = parseFloat(this.post_3.lower_average/this.post_3.total)*100
          let chartData = 
            {
              labels: ["Very Good ", "Good", "Average", "Lower Average", "Fail"],

              datasets: [
                {
                  
                  backgroundColor: ["#d48a8a", "#b5cf60", "#ffd360","#e66b60", "#296b60"],
                  data: [very_good, good, average, lower_avg, 0]
                }
              ],
            responsive: true, 
            maintainAspectRatio: false,
           }
          this.renderChart_3.chartData = chartData;
          // console.log("XXXXX", this.renderChart_3.chartData)
        })
        .catch((err) => {
          alert(err);
        });
    },
  },

  mounted() {
    this.fetchData_grade1();
    this.fetchData_grade2();
    this.fetchData_grade3();
    this.renderChart_1;
    this.renderChart_2;
    this.renderChart_3;
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
  color: #aa9088;
  background-color: #f8f9fe;
  background-clip: padding-box;
  font-style: italic;
  /* border: 1px solid #cad1d7; */
  -webkit-box-shadow: none;
  box-shadow: none;
  -webkit-transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
.text-center {
  text-align: center;
}
.hidden {
  /* display: none; */
  /* width: 1500px !important; */
  /* height: 100px !important; */
  top: 0 !important;
  position: absolute !important;
  /* right: 0; */
  /* left: -1700px !important; */
  /* opacity: 0; */
}
.realative {
  position: relative;
  /* opacity: 0; */
}
.left {
  left: -1700px !important;
}
.none {
  display: none;
  /* opacity: 0; */
}
.rating {
  border: none;
  background-color: inherit;
  font-size: 0.9rem;
}
.el-table .cell {
  word-break: break-word;
}
#bar-chart{
    height: 350px !important;
    width: 500px !important;
}
</style>
