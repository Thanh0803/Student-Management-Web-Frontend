<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
    </base-header>

    <b-container fluid class="mt--7">
        <b-card no-body>
            <b-tabs card>
                <b-tab title="Grade 10" active>
                    <b-row>
                        <b-card no-body img-width="500px">
                            <div>
                                <el-button
                                size="lg"
                                type="default"
                                @click="handleDetail_1(10)"
                                >Maths</el-button>
                                <el-button
                                size="lg"
                                type="default"
                                @click="handleDetail_2(10)"
                                >Literature</el-button>
                                <el-button
                                size="lg"
                                type="default"
                                @click="handleDetail_3(10)"
                                >Foreign language</el-button>
                                <el-button
                                size="lg"
                                type="default"
                                @click="handleDetail_4(10)"
                                >Physics</el-button>
                                <el-button
                                size="lg"
                                type="default"
                                @click="handleDetail_5(10)"
                                >Chemistry</el-button>
                                <el-button
                                size="lg"
                                type="default"
                                @click="handleDetail_6(10)"
                                >History</el-button>
                                <el-button
                                size="lg"
                                type="default"
                                @click="handleDetail_7(10)"
                                >Biology</el-button>
                                <el-button
                                size="lg"
                                type="default"
                                @click="handleDetail_8(10)"
                                >Informatics</el-button>
                            </div>
  
                            <div>
                            <b-col xl="7" :class="main_1">
                                <card header-classes="bg-transparent" width="500px">
                                <bar-chart
                                    :height="350"
                                    :weight="500"
                                    ref="pieChart"
                                    :chart-data="renderChart.chartData"
                                >
                                </bar-chart>
                                </card>
                            </b-col>
                            </div>
                        </b-card>
                    </b-row>
                </b-tab>
                <b-tab title="Grade 11" >
                    <b-row>
                        <b-card no-body img-width="500px">
                            <div>
                                <el-button
                                size="lg"
                                type="default"
                                @click="handleDetail_1(11)"
                                >Maths</el-button>
                                <el-button
                                size="lg"
                                type="default"
                                @click="handleDetail_2(11)"
                                >Literature</el-button>
                                <el-button
                                size="lg"
                                type="default"
                                @click="handleDetail_3(11)"
                                >Foreign language</el-button>
                                <el-button
                                size="lg"
                                type="default"
                                @click="handleDetail_4(11)"
                                >Physics</el-button>
                                <el-button
                                size="lg"
                                type="default"
                                @click="handleDetail_5(11)"
                                >Chemistry</el-button>
                                <el-button
                                size="lg"
                                type="default"
                                @click="handleDetail_6(11)"
                                >History</el-button>
                                <el-button
                                size="lg"
                                type="default"
                                @click="handleDetail_7(11)"
                                >Biology</el-button>
                                <el-button
                                size="lg"
                                type="default"
                                @click="handleDetail_8(11)"
                                >Informatics</el-button>
                            </div>
  
                            <div>
                            <b-col xl="7" :class="main_1">
                                <card header-classes="bg-transparent" width="500px">
                                <bar-chart
                                    :height="350"
                                    :weight="500"
                                    ref="pieChart"
                                    :chart-data="renderChart.chartData"
                                >
                                </bar-chart>
                                </card>
                            </b-col>
                            </div>
                        </b-card>
                    </b-row>
                </b-tab>
                <b-tab title="Grade 12" >
                    <b-row>
                        <b-card no-body img-width="500px">
                            <div>
                                <el-button
                                size="lg"
                                type="default"
                                @click="handleDetail_1(12)"
                                >Maths</el-button>
                                <el-button
                                size="lg"
                                type="default"
                                @click="handleDetail_2(12)"
                                >Literature</el-button>
                                <el-button
                                size="lg"
                                type="default"
                                @click="handleDetail_3(12)"
                                >Foreign language</el-button>
                                <el-button
                                size="lg"
                                type="default"
                                @click="handleDetail_4(12)"
                                >Physics</el-button>
                                <el-button
                                size="lg"
                                type="default"
                                @click="handleDetail_5(12)"
                                >Chemistry</el-button>
                                <el-button
                                size="lg"
                                type="default"
                                @click="handleDetail_6(12)"
                                >History</el-button>
                                <el-button
                                size="lg"
                                type="default"
                                @click="handleDetail_7(12)"
                                >Biology</el-button>
                                <el-button
                                size="lg"
                                type="default"
                                @click="handleDetail_8(12)"
                                >Informatics</el-button>
                            </div>
  
                            <div>
                            <b-col xl="7" :class="main_1">
                                <card header-classes="bg-transparent" width="500px">
                                <bar-chart
                                    :height="350"
                                    :weight="500"
                                    ref="pieChart"
                                    :chart-data="renderChart.chartData"
                                >
                                </bar-chart>
                                </card>
                            </b-col>
                            </div>
                        </b-card>
                    </b-row>
                </b-tab>
            </b-tabs>
        </b-card>
    </b-container>
  </div>
</template>
<script>
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
  RadioGroup,
} from "element-ui";
import * as chartConfigs from "@/components/Charts/config";
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import LineChartNew from "@/components/Charts/LineChartNew";
// Components
import BaseProgress from "@/components/BaseProgress";
import StatsCard from "@/components/Cards/StatsCard";
import projects from "../Tables/projects";
import { get, put,del, post } from "../../services/services";
import Vue from "vue";
import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);
import { mapGetters } from "vuex";
import { Pie } from "vue-chartjs";
Vue.prototype.$confirm = MessageBox.confirm;

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
    // [avatar.name]: avatar,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  data() {
    return {
      projects,
      renderChart: {
        chartData: {
          type: Pie,
          default: null
        },
        extraOptions: chartConfigs.blueChartOptions,
      },
      
      currentPage: 1,
      totalPage: 1,
      perPage: 1,
      posts: [],
      posts_2: [],
      posts_3: [],
      post: [],
      post_2: [],
      post_3: [],
      keyword: null,
      dialogVisible: false,
      dialogEdit: false,
      dialogDelete: false,
      dialogMultiDelete: false,


    };
  },
  created() {
  },
  watch: {
  },
  computed: {
    ...mapGetters({
      //map `this.doneCount` to `this.$store.getters.doneTodosCount`
      user: "user",
    }),
    main_1() {
      return this.status ? "mb-5 mb-xl-0 mt--5" : "mb-5 mb-xl-0";
    },
  },
  
  methods: {
    handleDetail_1($id) {
    let url = "http://localhost:8000/api/admin/subject/report/detail/"+ "Math" +"/"+ $id;
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
              labels: [">=8", "6.5->8.0", "5.0->6.5", "3.5->5.0", "<3.5"],

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

        })
        .catch((err) => {
          alert(err);
        });
      },
    handleDetail_2($id) {
    let url = "http://localhost:8000/api/admin/subject/report/detail/"+ "Literature" +"/"+ $id;
      get(url)
        .then((res) => {
          this.post = res.data;
          let very_good = parseFloat(this.post.very_good/this.post.total)*100
          let good = parseFloat(this.post.good/this.post.total)*100
          let average = parseFloat(this.post.average/this.post.total)*100
          let lower_avg = parseFloat(this.post.lower_average/this.post.total)*100
          let chartData = 
            {
              labels: [">=8", "6.5->8.0", "5.0->6.5", "3.5->5.0", "<3.5"],

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

        })
        .catch((err) => {
          alert(err);
        });
      },
    handleDetail_3($id) {
    let url = "http://localhost:8000/api/admin/subject/report/detail/"+ "English" +"/"+ $id;
      get(url)
        .then((res) => {
          this.post = res.data;
          let very_good = parseFloat(this.post.very_good/this.post.total)*100
          let good = parseFloat(this.post.good/this.post.total)*100
          let average = parseFloat(this.post.average/this.post.total)*100
          let lower_avg = parseFloat(this.post.lower_average/this.post.total)*100
          let chartData = 
            {
              labels: [">=8", "6.5->8.0", "5.0->6.5", "3.5->5.0", "<3.5"],

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

        })
        .catch((err) => {
          alert(err);
        });
      },
    handleDetail_4($id) {
    let url = "http://localhost:8000/api/admin/subject/report/detail/"+ "Physics" +"/"+ $id;
      get(url)
        .then((res) => {
          this.post = res.data;
          let very_good = parseFloat(this.post.very_good/this.post.total)*100
          let good = parseFloat(this.post.good/this.post.total)*100
          let average = parseFloat(this.post.average/this.post.total)*100
          let lower_avg = parseFloat(this.post.lower_average/this.post.total)*100
          let chartData = 
            {
              labels: [">=8", "6.5->8.0", "5.0->6.5", "3.5->5.0", "<3.5"],

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
        })
        .catch((err) => {
          alert(err);
        });
      },
    handleDetail_5($id) {
    let url = "http://localhost:8000/api/admin/subject/report/detail/"+ "Chemistry" +"/"+ $id;
      get(url)
        .then((res) => {
          this.post = res.data;
          let very_good = parseFloat(this.post.very_good/this.post.total)*100
          let good = parseFloat(this.post.good/this.post.total)*100
          let average = parseFloat(this.post.average/this.post.total)*100
          let lower_avg = parseFloat(this.post.lower_average/this.post.total)*100
          let chartData = 
            {
              labels: [">=8", "6.5->8.0", "5.0->6.5", "3.5->5.0", "<3.5"],

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

        })
        .catch((err) => {
          alert(err);
        });
      },
    handleDetail_6($id) {
    let url = "http://localhost:8000/api/admin/subject/report/detail/"+ "History" +"/"+ $id;
      get(url)
        .then((res) => {
          this.post = res.data;
          let very_good = parseFloat(this.post.very_good/this.post.total)*100
          let good = parseFloat(this.post.good/this.post.total)*100
          let average = parseFloat(this.post.average/this.post.total)*100
          let lower_avg = parseFloat(this.post.lower_average/this.post.total)*100
          let chartData = 
            {
              labels: [">=8", "6.5->8.0", "5.0->6.5", "3.5->5.0", "<3.5"],

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
 
        })
        .catch((err) => {
          alert(err);
        });
      },
    handleDetail_7($id) {
    let url = "http://localhost:8000/api/admin/subject/report/detail/"+ "Biology" +"/"+ $id;
      get(url)
        .then((res) => {
          this.post = res.data;
          let very_good = parseFloat(this.post.very_good/this.post.total)*100
          let good = parseFloat(this.post.good/this.post.total)*100
          let average = parseFloat(this.post.average/this.post.total)*100
          let lower_avg = parseFloat(this.post.lower_average/this.post.total)*100
          let chartData = 
            {
              labels: [">=8", "6.5->8.0", "5.0->6.5", "3.5->5.0", "<3.5"],

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
    handleDetail_8($id) {
    let url = "http://localhost:8000/api/admin/subject/report/detail/"+ "Informatics" +"/"+ $id;
      get(url)
        .then((res) => {
          this.post = res.data;
          let very_good = parseFloat(this.post.very_good/this.post.total)*100
          let good = parseFloat(this.post.good/this.post.total)*100
          let average = parseFloat(this.post.average/this.post.total)*100
          let lower_avg = parseFloat(this.post.lower_average/this.post.total)*100
          let chartData = 
            {
              labels: [">=8", "6.5->8.0", "5.0->6.5", "3.5->5.0", "<3.5"],

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
      this.handleDetail_1();
      this.handleDetail_2();
      this.handleDetail_3();
      this.handleDetail_4();
      this.handleDetail_5();
      this.handleDetail_6();
      this.handleDetail_7();
      this.handleDetail_8();

      },
};
</script>
<style>
.el-table.table-dark {
  background-color: #172b4d;
  color: #f8f9fe;
}

.el-table.table-dark th,
.el-table.table-dark tr {
  background-color: #172b4d;
}

.el-table.table-dark td,
.el-table.table-dark th.is-leaf {
  border-bottom: none;
}
.el-table .cell,
.el-table th div {
  overflow: inherit !important;
}
.el-table th > .cell {
  width: auto;
}
.position-relative{
  position: relative;
}
.position-absolute{
  position: absolute;
  left: 10%;
}
#bar-chart{
    height: 400px !important;
    width: 500px !important;
}
</style>
