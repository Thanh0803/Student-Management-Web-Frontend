<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
      <h1>Student Report</h1>
    </base-header>
    <b-container fluid class="realative">
       <div>
        <b-card no-body>
          <b-tabs card>
            <b-tab title="Semester 1"  >
              <div id="header_1">
                  <b-row>
                    <b-col>
                      <b-card no-body>
                        <b-card-header class="border-0">
                          <h1 class="text-uppercase" align="center">Department of Education and Training</h1>
                          <h2 class="text-uppercase" align="center">Kien An High School</h2>

                          <h2 class="mb-0" >Student Name: <span>{{this.items_student_1.fullname}} </span></h2>
                          <h2 class="mb-0" > Class: <span>{{this.items_student_1.classname}} </span></h2>
                          <h2 class="mb-0" > Report of Semester I-<span>{{this.items_student_1.schoolyear}} </span></h2>
                          
                        </b-card-header>

                        <el-table
                          class="table-responsive"
                          header-row-class-name="thead-dark"
                          :data="post_1"
                        >
                          <el-table-column
                              label="Subject"
                              min-width="110px"
                              align="center"
                              prop = 'subject.subjectName'
                            >
                            </el-table-column>
                          <el-table-column
                            label="15mins"
                            min-width="110px"
                            align="center"
                            prop = "fif.fif_string"
                          >
                          </el-table-column>
                            <el-table-column
                              label="45mins"
                              min-width="110px"
                              align="center"
                              prop = "fort.fort_string"
                            >
                            </el-table-column>
                          <el-table-column
                            label="90mins"
                            min-width="110px"
                            align="center"
                            prop = "nine.nine_string"
                          >    
                          </el-table-column> 
                          <el-table-column
                            label="Average"
                            min-width="110px"
                            align="center"
                            prop = "sumary"
                          >    
                          </el-table-column>      
                        </el-table>
                        <b-card-header class="border-0">
                        <h3 class="mb-0" > Final: </h3>
                        </b-card-header>
                        <el-table
                          class="table-responsive"
                          header-row-class-name="thead-dark"
                          :data="arrFinal_1"
                        >
                          <el-table-column
                              label="Sumary"
                              min-width="110px"
                              align="center"
                              prop = "finalmark"
                            >
                            </el-table-column>
                          <el-table-column
                            label="Conduct"
                            min-width="110px"
                            align="center"
                            prop = "conduct"
                          >
                          </el-table-column>
                                
                        </el-table>
                      </b-card>
                    </b-col>
                  </b-row>
              </div>
              <b-button pill variant="success" :class="notBack" @click="printPDF">
                <i class="fas fa-share-square"></i> {{ download_status }}
              </b-button>
              <b-button pill variant="success" :class="back"  >
                <i class="fas fa-thin fa-check"></i> Downloaded Successfully
              </b-button>
            </b-tab>
            <b-tab title="Semester 2">
              <div id="header_2">
                  <b-row>
                    <b-col>
                      <b-card no-body>
                        <b-card-header class="border-0">
                          <h1 class="text-uppercase" align="center">Department of Education and Training</h1>
                          <h2 class="text-uppercase" align="center">Kien An High School</h2>

                          <h2 class="mb-0" >Student Name: <span>{{this.items_student_2.fullname}} </span></h2>
                          <h2 class="mb-0" > Class: <span>{{this.items_student_2.classname}} </span></h2>
                          <h2 class="mb-0" > Report of Semester II-<span>{{this.items_student_2.schoolyear}} </span></h2>
                          
                        </b-card-header>

                        <el-table
                          class="table-responsive"
                          header-row-class-name="thead-dark"
                          :data="post_2"
                        >
                          <el-table-column
                              label="Subject"
                              min-width="110px"
                              align="center"
                              prop = 'subject.subjectName'
                            >
                            </el-table-column>
                          <el-table-column
                            label="15mins"
                            min-width="110px"
                            align="center"
                            prop = "fif.fif_string"
                          >
                          </el-table-column>
                            <el-table-column
                              label="45mins"
                              min-width="110px"
                              align="center"
                              prop = "fort.fort_string"
                            >
                            </el-table-column>
                          <el-table-column
                            label="90mins"
                            min-width="110px"
                            align="center"
                            prop = "nine.nine_string"
                          >    
                          </el-table-column> 
                          <el-table-column
                            label="Average"
                            min-width="110px"
                            align="center"
                            prop = "sumary"
                          >    
                          </el-table-column>      
                        </el-table>
                        <b-card-header class="border-0">
                        <h3 class="mb-0" > Final: </h3>
                        </b-card-header>
                        <el-table
                          class="table-responsive"
                          header-row-class-name="thead-dark"
                          :data="arrFinal_2"
                        >
                          <el-table-column
                              label="Sumary"
                              min-width="110px"
                              align="center"
                              prop = "finalmark"
                            >
                            </el-table-column>
                          <el-table-column
                            label="Conduct"
                            min-width="110px"
                            align="center"
                            prop = "conduct"
                          >
                          </el-table-column>
                                
                        </el-table>
                      </b-card>
                    </b-col>
                  </b-row>
              </div>
              <b-button pill variant="success" :class="notBack" @click="printPDF">
                <i class="fas fa-share-square"></i> {{ download_status }}
              </b-button>
              <b-button pill variant="success" :class="back"  >
                <i class="fas fa-thin fa-check"></i> Downloaded Successfully
              </b-button>
            </b-tab>
            <b-tab title="All SchoolYear" active>
              <div id="header_all">
                  <b-row>
                    <b-col>
                      <b-card no-body>
                        <b-card-header class="border-0">
                          <h1 class="text-uppercase" align="center">Department of Education and Training</h1>
                          <h2 class="text-uppercase" align="center">Kien An High School</h2>

                          <h2 class="mb-0" >Student Name: <span>{{this.items_student_2.fullname}} </span></h2>
                          <h2 class="mb-0" > Class: <span>{{this.items_student_2.classname}} </span></h2>
                          <h2 class="mb-0" > Report of Semester II-<span>{{this.items_student_2.schoolyear}} </span></h2>
                          
                        </b-card-header>

                        <el-table
                          class="table-responsive"
                          header-row-class-name="thead-dark"
                          :data="post_2"
                        >
                          <el-table-column
                              label="Subject"
                              min-width="110px"
                              align="center"
                              prop = 'subject.subjectName'
                            >
                            </el-table-column>
                          <el-table-column
                            label="Semester 1"
                            min-width="110px"
                            align="center"
                            prop = "sumary_1"
                          >
                          </el-table-column>
                          <el-table-column
                            label="Semester 2"
                            min-width="110px"
                            align="center"
                            prop = "sumary_2"
                          >
                          </el-table-column>
                          <el-table-column
                            label="All SchoolYear"
                            min-width="110px"
                            align="center"
                            prop = "sumary_3"
                          >
                          </el-table-column>
                          
                        </el-table>
                        <b-card-header class="border-0">
                        <h3 class="mb-0" > Final: </h3>
                        </b-card-header>
                        <el-table
                          class="table-responsive"
                          header-row-class-name="thead-dark"
                          :data="arrFinal_2"
                        >
                          <el-table-column
                              label="Sumary"
                              min-width="110px"
                              align="center"
                              prop = "finalmark_year"
                            >
                            </el-table-column>
                          <el-table-column
                            label="Conduct"
                            min-width="110px"
                            align="center"
                            prop = "conduct"
                          >
                          </el-table-column>
                        </el-table>
                        <b-card-header class="border-0">
                        <h3 class="pb-3" > Statement given for : <span>{{this.items_student_2.getall}} </span></h3>
                        </b-card-header>
                      </b-card>
                    </b-col>
                  </b-row>
              </div>
              <b-button pill variant="success" :class="notBack" @click="printPDF">
                <i class="fas fa-share-square"></i> {{ download_status }}
              </b-button>
              <b-button pill variant="success" :class="back"  >
                <i class="fas fa-thin fa-check"></i> Downloaded Successfully
              </b-button>
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
export default {
  components: {
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
      currentPage: 1,
      totalPage: 1,
      perPage: 1,
      post_1: [],
      post_2: [],
      arrFinal_1: [],
      obj_all:{},
      arrFinal_2: [],
      arrFinal_all: [],
      items_final: {},
      object_all:{},
      items_student_1: {},
      items_student_2: {},
      arrConduct_1: [],
      arrConduct_2: [],
      arrStudent_1: [],
      arrStudent_2: [],
      redBarChart: {
        chartData: {},
        extraOptions: chartConfigs.blueChartOptions,
      },
      download_status: "Download Report",
      status: true,
      status2: true,
      chart: [],
      options: [
        {
          value: "Giỏi",
          label: "Giỏi",
        },
        {
          value: "Khá",
          label: "Khá",
        },
        {
          value: "Trung bình",
          label: "Trung bình",
        },
        {
          value: "Yếu",
          label: "Yếu",
        },
      ],
      linedata: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "Data One",
            borderColor: "#FC2525",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "white",
            backgroundColor: this.gradient,
            data: [40, 39, 10, 40, 39, 80, 40],
          },
          {
            label: "Data Two",
            borderColor: "#05CBE1",
            pointBackgroundColor: "white",
            pointBorderColor: "white",
            borderWidth: 1,
            backgroundColor: this.gradient2,
            data: [60, 55, 32, 10, 2, 12, 53],
          },
        ],
      },
    };
  },

  watch: {
    value(after, before) {
    },
    "$route.params.id": function (id) {
      this.fetchDataSemester_1();
      this.fetchDataSemester_2();
    },
  },
  methods: {
    fetchDataSemester_1(currentPage) {
      let url = "http://localhost:8000/api/teacher/mark/getall/" + this.$route.params.id + "/semester/" + 1 +"?page=" + currentPage;
      get(url)
        .then((res) => {
          this.perPage = res.data.meta.per_page;
          this.post_1 = res.data.data;
          // this.post_all.push(this.post_1)
          // console.log("post1", this.post_1)
          
          var temp = res.data.data;
          var string_fif = ""
          var string_fort = ""
          var string_nine = ""
          let sum = 0
          let count=0
          let count_2=0
          let final =0
          let length = temp.length
          // console.log("leng", length)
          let sumary = 0

          temp.forEach((element, index_ele)=>{

            element.fif.forEach((value, index) => {
              sum = sum + value.mark
              count+=1
              string_fif = string_fif + "\xa0\xa0\xa0" + value.mark     
            });
            
          
            element.fort.forEach((value, index) => {
              sum = sum + value.mark*2
              count+=2
              string_fort = string_fort + "\xa0\xa0\xa0" + value.mark
              });
            
            element.nine.forEach((value, index) => {
              sum = sum + value.mark*3
              count+=3
              string_nine = string_nine + "\xa0\xa0\xa0" + value.mark
              });
          var avg = sum/count
          var avg = avg.toFixed(2)

          if (element.subject.subjectName == "Math" || element.subject.subjectName == "Physics" || element.subject.subjectName == "English" )
          {
            sumary = avg*2 +sumary
            count_2 +=2
          }else{
            sumary = avg + sumary
            count_2+=1
          }
          if (length == index_ele + 1 )
          {
            final = (sumary/count_2)
            final = final.toFixed(2)
          }

          element.fif["fif_string"] = string_fif
          element.fort["fort_string"] = string_fort
          element.nine["nine_string"] = string_nine
          element.sumary = avg    

          sum = 0
          count = 0
          avg = 0
          string_fif = ""
          string_fort = ""
          string_nine = ""

          
          });

          var object_student = 
            {
              fullname : temp[0].student.fullname,
              student_id : temp[0].student.id,
              classname : temp[0].lop.className,
              semester : temp[0].semester,
              schoolyear: temp[0].lop.schoolYear,
              finalmark: final
            }          
          
          this.items_student_1 = object_student
          
          var url = "http://localhost:8000/api/teacher/conduct/getall/"+this.items_student_1.student_id;
          this.arrStudent_1.push(url);
          this.getAPI1().then((results) => {
            const that = this;
          });

        })
        .catch((err) => {
          alert(err);
        });
    },
    fetchDataSemester_2(currentPage) {
      let url = "http://localhost:8000/api/teacher/mark/getall/" + this.$route.params.id + "/semester/" + 2 +"?page=" + currentPage;
      get(url)
        .then((res) => {
          this.perPage = res.data.meta.per_page;
          this.post_2 = res.data.data;
          
          var temp = res.data.data;
          var string_fif = ""
          var string_fort = ""
          var string_nine = ""
          let sum = 0
          let count=0
          let count_2=0
          let final =0
          let final_year =0
          let length = temp.length
          // console.log("leng", length)
          let sumary = 0
          let mark_year =0

          temp.forEach((element, index_ele)=>{
            element.fif.forEach((value, index) => {
              sum = sum + value.mark
              count+=1
              string_fif = string_fif + "\xa0\xa0\xa0" + value.mark     
            });
            
          
            element.fort.forEach((value, index) => {
              sum = sum + value.mark*2
              count+=2
              string_fort = string_fort + "\xa0\xa0\xa0" + value.mark
              });
            
            element.nine.forEach((value, index) => {
              sum = sum + value.mark*3
              count+=3
              string_nine = string_nine + "\xa0\xa0\xa0" + value.mark
              });
          var avg = sum/count
          var avg = avg.toFixed(2)

          
          if (element.subject.subjectName == "Math" || element.subject.subjectName == "Physics" || element.subject.subjectName == "English" )
          {
            sumary = avg*2 +sumary
            count_2 +=2
          }else{
            sumary = avg + sumary
            count_2+=1
          }
          if (length == index_ele + 1 )
          {
            final = (sumary/count_2)
            final = final.toFixed(2)
          }

          element.fif["fif_string"] = string_fif
          element.fort["fort_string"] = string_fort
          element.nine["nine_string"] = string_nine
          element.sumary_2 = avg  
          element.sumary_1 = this.post_1[index_ele]["sumary"]
          let sumary_3 = (parseFloat(element.sumary_1)+parseFloat(avg))/2
          sumary_3 = sumary_3.toFixed(2)
          element.sumary_3 = sumary_3 

          if (element.subject.subjectName == "Math" || element.subject.subjectName == "Physics" || element.subject.subjectName == "English" )
          {
            mark_year = sumary_3*2 +mark_year
          }else{
            mark_year = sumary_3 + mark_year
          }

          if (length == index_ele + 1 )
          {
            final_year = (mark_year/count_2)
            final_year = final_year.toFixed(2)
          }
          
          

          sum = 0
          count = 0
          avg = 0
          string_fif = ""
          string_fort = ""
          string_nine = ""

          });

          var object_student = 
            {
              fullname : temp[0].student.fullname,
              student_id : temp[0].student.id,
              classname : temp[0].lop.className,
              semester : temp[0].semester,
              schoolyear: temp[0].lop.schoolYear,
              finalmark: final,
              finalmark_year: final_year
            }
          
          this.items_student_2 = object_student
          
          var url = "http://localhost:8000/api/teacher/conduct/getall/"+this.items_student_2.student_id;
          this.arrStudent_2.push(url);
          this.getAPI2().then((results) => {

            const that = this;
          });

        })
        .catch((err) => {
          alert(err);
        });
    },
    
    async getAPI1() {
      let requests = this.arrStudent_1.map((url) => get(url));
      Promise.all(requests).then((responses) =>
      {
        
        responses.forEach((response) => {
          this.arrConduct_1 = response.data.data;
          this.arrConduct_1.forEach((ele_conduct, index_conduct)=>{
       
            if((ele_conduct.semester == this.items_student_1.semester) 
            && (ele_conduct.schoolYear == this.items_student_1.schoolyear ))
            {
              this.items_student_1["conduct"] = ele_conduct.mark
              this.arrFinal_1.push(this.items_student_1)
              // this.arrFinal_all.push(this.items_student_1["finalmark"])
            }
          });
        })
    });
    },
    async getAPI2() {
      let requests = this.arrStudent_2.map((url) => get(url));
      Promise.all(requests).then((responses) =>
      {
        
        responses.forEach((response) => {
          this.arrConduct_2 = response.data.data;
          this.arrConduct_2.forEach((ele_conduct, index_conduct)=>{
       
            if((ele_conduct.semester == this.items_student_2.semester) 
            && (ele_conduct.schoolYear == this.items_student_2.schoolyear ))
            {
              this.items_student_2["conduct"] = ele_conduct.mark
              if ((ele_conduct.mark == "Good" && parseFloat(this.items_student_2.finalmark_year) >= 8.0))
              {
                this.items_student_2["getall"] = "Excellent Student"
              }
              console.log(this.items_student_2)
              // console.log(parseFloat(this.items_student_2.finalmark_year))
              this.arrFinal_2.push(this.items_student_2)
            }
          });
        })
    });
    },

    printPDF() {
        const that = this;
        let promise = new Promise(function (resolve, reject) {
          // the function is executed automatically when the promise is constructed
          that.status = false;
          that.download_status = "Downloading ... ";
          // after 1 second signal that the job is done with the result "done"
          setTimeout(() => resolve("done"), 3000);
        });
        promise.then((responses) => {
          // let name =
          let header_1 = document.getElementById("header_1");
          let componet_1 = [];
          componet_1.push(header_1);
 
          // console.log(componet)
          let exp_1 = new Exporter(componet_1);
          exp_1.export_pdf().then((pdf) => {
            pdf.save("report_sem1.pdf");
            that.status = true;
            this.status2 = false
          });

          let header_2 = document.getElementById("header_2");
          let componet_2 = [];
          componet_2.push(header_2);
 
          // console.log(componet)
          let exp_2 = new Exporter(componet_2);
          exp_2.export_pdf().then((pdf) => {
            pdf.save("report_sem2.pdf");
            that.status = true;
            this.status2 = false
          });

          let header_all = document.getElementById("header_all");
          let componet_all = [];
          componet_2.push(header_all);
 
          // console.log(componet)
          let exp_all = new Exporter(componet_all);
          exp_2.export_pdf().then((pdf) => {
            pdf.save("report_AllSchollyear.pdf");
            that.status = true;
            this.status2 = false
          });
        });
      // }
   
    },
    showNotification(type, message) {
      this.$notify({
        message: message,
        icon: "add_alert",
        horizontalAlign: "right",
        verticalAlign: "top",
        type: type,
      });
    },
    // handleBack(){
    //   this.$router.push("headteacher/class/" + this.$route.params.id);
    // }
  },
  mounted(currentPage) {
    this.fetchDataSemester_1(currentPage);
    this.fetchDataSemester_2(currentPage);
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
  /* background-color: #f8f9fe; */
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
