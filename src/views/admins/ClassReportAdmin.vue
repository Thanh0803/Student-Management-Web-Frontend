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
                    <b-col>
                        <b-card no-body>
                        <el-table
                            class="table-responsive"
                            header-row-class-name="thead-light"
                            :data="posts"
                        >
                            <el-table-column type="selection" min-width="55px">
                            </el-table-column>

                            <el-table-column
                            label="ClassName"
                            min-width="150px"
                            prop="className"
                            >
                            </el-table-column>
                            <el-table-column
                            label="HeadTeacher"
                            min-width="150px"
                            prop="headTeacher"
                            >
                            </el-table-column>

                            <el-table-column label="Action" min-width="290px" align="center">
                            <template slot-scope="scope">
                                <el-button
                                size="mini"
                                type="danger"
                                @click="handleDetail_1(scope.$index, scope.row)"
                                >Show Report</el-button
                                >
                            </template>
                            </el-table-column>
                        </el-table>
                        <el-dialog
                            :visible.sync="dialogVisible_1"
                            width="75%"
                        >   
                                <div>
                                <b-col xl="7" :class="main_1">
                                    <card header-classes="bg-transparent" >
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
                        </el-dialog>
                        </b-card>
                    </b-col>
                    </b-row>
                </b-tab>
                <b-tab title="Grade 11" >
                    <b-row>
                    <b-col>
                        <b-card no-body>
                        <el-table
                            class="table-responsive "
                            header-row-class-name="thead-light"
                            :data="posts_2"
                        >
                            <el-table-column type="selection" min-width="55px">
                            </el-table-column>

                            <el-table-column
                            label="ClassName"
                            min-width="150px"
                            prop="className"
                            >
                            </el-table-column>
                            <el-table-column
                            label="HeadTeacher"
                            min-width="150px"
                            prop="headTeacher"
                            >
                            </el-table-column>

                            <el-table-column label="Action" min-width="290px" align="center">
                            <template slot-scope="scope">
                                <el-button
                                size="mini"
                                type="danger"
                                @click="handleDetail_2(scope.$index, scope.row)"
                                >Show Report</el-button
                                >
                            </template>
                            </el-table-column>
                        </el-table>
                        <el-dialog
                            :visible.sync="dialogVisible_2"
                            width="75%"
                        >   
                                <div>
                                <b-col xl="7" :class="main_1">
                                    <card header-classes="bg-transparent" >
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
                        </el-dialog>
        
                        </b-card>
                    </b-col>
                    </b-row>
                </b-tab>
                <b-tab title="Grade 12" > 
                    <b-row>
                    <b-col>
                        <b-card no-body>
                        <el-table
                            class="table-responsive"
                            header-row-class-name="thead-light"
                            :data="posts_3"
                        >
                            <el-table-column type="selection" min-width="55px">
                            </el-table-column>

                            <el-table-column
                            label="ClassName"
                            min-width="150px"
                            prop="className"
                            >
                            </el-table-column>
                            <el-table-column
                            label="HeadTeacher"
                            min-width="150px"
                            prop="headTeacher"
                            >
                            </el-table-column>

                            <el-table-column label="Action" min-width="290px" align="center">
                            <template slot-scope="scope">
                                <el-button
                                size="mini"
                                type="danger"
                                @click="handleDetail_3(scope.$index, scope.row)"
                                >Show Report</el-button
                                >
                            </template>
                            </el-table-column>
                        </el-table>
                        <el-dialog
                            :visible.sync="dialogVisible_3"
                            width="75%"
                        >   
                                <div>
                                <b-col xl="7" :class="main_1">
                                    <card header-classes="bg-transparent" >
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
                        </el-dialog>
                        </b-card>
                    </b-col>
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
      dialogVisible_1: false,
      dialogVisible_2: false,
      dialogVisible_3: false,
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
    getClassGrade10(currentPage) {
      let url = "http://localhost:8000/api/admin/grade/"+ 1 +"?page="+ currentPage ;
      get(url)
        .then((res) => {
          this.perPage = res.data.data.per_page;
          this.totalPage = res.data.data.total;
          this.posts = res.data.data;
          console.log("class", this.posts)
        })
        .catch((err) => {
          alert(err);
        });
    },
    getClassGrade11(currentPage) {
      let url = "http://localhost:8000/api/admin/grade/"+ 2 +"?page="+ currentPage ;
      get(url)
        .then((res) => {
          this.perPage = res.data.data.per_page;
          this.totalPage = res.data.data.total;
          this.posts_2 = res.data.data;
        })
        .catch((err) => {
          alert(err);
        });
    },
    getClassGrade12(currentPage) {
      let url = "http://localhost:8000/api/admin/grade/"+ 2 +"?page="+ currentPage ;
      get(url)
        .then((res) => {
          this.perPage = res.data.data.per_page;
          this.totalPage = res.data.data.total;
          this.posts_3 = res.data.data;
        })
        .catch((err) => {
          alert(err);
        });
    },
    handleDetail_1(index, row) {
    this.dialogVisible_1 = true;
    let url = "http://localhost:8000/api/admin/class/report/detail/"+ row.id;
      get(url)
        .then((res) => {
          this.post = res.data;
          console.log("XXX",this.post)
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
          console.log("render", this.renderChart)
          
          
          // );
        })
        .catch((err) => {
          alert(err);
        });
      },
    handleDetail_2(index, row) {
    this.dialogVisible_2 = true;
    let url = "http://localhost:8000/api/admin/class/report/detail/"+ row.id;
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
          console.log("render", this.renderChart)
          
          
          // );
        })
        .catch((err) => {
          alert(err);
        });
      },
    handleDetail_3(index, row) {
    this.dialogVisible_3 = true;
    let url = "http://localhost:8000/api/admin/class/report/detail/"+ row.id;
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
          console.log("render", this.renderChart)
          
          
          // );
        })
        .catch((err) => {
          alert(err);
        });
      },
  },
  mounted(currentPage) {
    this.getClassGrade10(currentPage);
    this.getClassGrade11(currentPage);
    this.getClassGrade12(currentPage);
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
