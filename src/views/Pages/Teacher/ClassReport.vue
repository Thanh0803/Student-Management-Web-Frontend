<template>
      <div id="app">
        <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
          <!-- Card stats -->
          <h1>Class Report</h1>
        </base-header>
        <b-container fluid class="realative">
          <div>
            <b-card no-body>
              <b-tabs card>
                <div>
                    <b-col>
                      <b-card-header class="border-0">
                        <h1 class="text-uppercase" align="center">Department of Education and Training</h1>
                        <h2 class="text-uppercase" align="center">Kien An High School</h2>
                      </b-card-header>
                    </b-col>          
                    <canvas
                      ref="canvas"
                      id="canvas"
                      class="bg"
                      width="100"
                      height="100"></canvas>
                    <b-col xl="7" :class="main_1">
                      <card header-classes="bg-transparent" >
                        <bar-chart
                          :height="350"
                          ref="pieChart"
                          :chart-data="renderChart.chartData"
                        >
                        </bar-chart>
                      </card>
                    </b-col>
                        
                </div>
                
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
import { get } from "../../../services/services";
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
import { Pie } from "vue-chartjs";
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
      return this.status ? "information none" : "information";
    },
    main_3() {
      return this.status ? "" : "none";
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
      post: [],
      renderChart: {
        chartData: {
          type: Pie,
          default: null
        },
        extraOptions: chartConfigs.blueChartOptions,
      },
      download_status: "Download Report",
      status: true,
      status2: true,
      chart: [],
      options: {
        
      },
    };
  },

  watch: {
    value(after, before) {
    },
    "$route.params.id": function (id) {
      this.fetchData();
    },
    data: function(){
      this.renderChart();
    }
  },
  methods: {
    fetchData() {
      let url = "http://localhost:8000/api/teacher/class/report/"+this.$route.params.id;
      get(url)
        .then((res) => {
          this.post = res.data;
          console.log(this.post)
          let very_good = parseFloat(this.post.very_good/this.post.total)*100
          let good = parseFloat(this.post.good/this.post.total)*100
          let average = parseFloat(this.post.average/this.post.total)*100
          let lower_avg = parseFloat(this.post.lower_average/this.post.total)*100
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
          this.renderChart.chartData = chartData;
          
          
          // );
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
  mounted() {
    this.fetchData();
    const canvas = this.$refs.canvas;
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
</style>
