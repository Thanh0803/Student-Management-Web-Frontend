<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
    </base-header>

    <b-container fluid class="mt--7">
      <b-row>
        <b-col>
          <b-card no-body>
            <b-card-header class="border-0">
              <h3 class="mb-0">Student List</h3>
     
            <div class="right">
            <el-button 
              size="mini"
              type="success"
              @click="classReport"
              class="import-button">
              Class Report</el-button>
            </div>
            </b-card-header>
            <el-table
              class="table-responsive table"
              header-row-class-name="thead-light"
              :data="posts"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" min-width="55px">
              </el-table-column>

              <el-table-column
                align="center"
                label="FullName"
                min-width="150px"
                prop="student.fullname"
              >
              </el-table-column>
              <el-table-column
                align="center"
                label="TelePhone"
                prop="student.phone"
                min-width="140px"
              >
              </el-table-column>
              <el-table-column
                label="Email"
                prop="student.email"
                min-width="140px"
              >
              </el-table-column>
  
              <el-table-column label="Action" min-width="290px" align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="studentDetail(scope.$index, scope.row)"
                    >Information</el-button
                  >
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDetail(scope.$index, scope.row)"
                    >Mark Detail</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="reportDetail(scope.$index, scope.row)"
                    >Report</el-button>
                  
                </template>
              </el-table-column>

            </el-table>

            <b-card-footer class="py-4 d-flex justify-content-end position-relative">
              <el-row class="position-absolute" v-if="multipleSelection.length > 1">
                <el-button type="danger" @click="dialogMultiDelete=true">Xoá các lựa chọn</el-button>
              </el-row>
              <b-pagination
                :total-rows="totalPage"
                v-model="currentPage"
                :per-page="perPage"
                @input="getStudentData(currentPage)"
              >
              <template v-slot:prev-text>
                  <a class="page-link" aria-label="Previous">
                    <span aria-hidden="true"
                      ><i class="fa fa-angle-left" aria-hidden="true"></i
                    ></span>
                  </a>
                </template>
                <template v-slot:next-text>
                  <a class="page-link" aria-label="Next">
                    <span aria-hidden="true"
                      ><i class="fa fa-angle-right" aria-hidden="true"></i
                    ></span>
                  </a>
                </template>
              </b-pagination>
            </b-card-footer>
          </b-card>
        </b-col>
      </b-row>
      <el-dialog
        title="Thông tin chi tiết hoc sinh"
        :visible.sync="dialogVisible"
        width="70%"
      >
        <!-- <span>This is a message</span> -->
        <el-row :gutter="20">
          <el-col :span="8"
            ><div class="grid-content">
              <div>
                <b-img
                  src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwoHCAoJBwkGCAoHCAoICAcIDRIICQcKFREWFhURExMYHCggGCYxGxMTITEhMSkrLi4uFx8zODMsNygtLisBCgoKCw0NDw0NFS0dHxkrKysrKysrLSsrKysrLTcrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAN8A2QMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAQIFBgQDB//EADYQAQACAgEBBQUFBwUBAAAAAAABAgMRBAUSISIxUjJBUXKSExVCYmMzNFNhcYKiIyRzgZEU/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFhEBAQEAAAAAAAAAAAAAAAAAABEB/9oADAMBAAIRAxEAPwD9EAaQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADv8AKO+WhxelXyx2s9vs49NfaBn7g3DocXTsOOPY7XzPrHHw/wAKn0lHM7PN0l+FhtGpxU/6ePkdIraJnDOvyyUY4vkxWwTNMlOzKgAAAAAAAAAAAAAAAAAAAPRwMP8A9GaKx3xXxWBodK4PZiMuaN3nyaceZEajUR3R3JZVIACJSA83K4teTSa2jv8Aw2c9mx2w3mlvc6lldZwbrGWI12PaUZAfzFQAAAAAAAAAAAAAAAAavQsf7TJP4vZZTc6LH+2j49pBogIoAAACJfHmY4yYL1n0vuraNxMT74BykfD0i2SIjJeI/DZVpAAAAAAAAAAAAAAAABudE/d/7mG1eh5Y1fHv2fEitgRuEoAAAACLd0TMpefm5Ix4L2mdeHsg5y87yZJ9VrKnf5yNIAAAAAAAAAAAAAAAAT5Ptw808fNS8eXs2fEB1dbRaItHvWY3SebFI+xzW+SzY3DKpERO0gAjcAT5MfrXI76YqTv1PdzeVXj1nxeO3s1c9e9sl5vbzsuYI7/eAqAAAAAAAAAAAAAAAAAAHm0OF1S2KOxyPFWPZyM81sHTYeRjyxE0vSX23Hm5OImPJb7S8RqMmX6kiuotetY3a2ng5PVaUia4fFdi2ta0atO/62RqI8u4gtlyXzW7eSe9UGsQAQAAAAAAAAAAAAAADcL4sVs89jFG5a3F6VSmr5/9S/p/CDKxYb5v2dLz/g9ePpOW/fbsVbdaxXurGo/kmPNKrIjo1vfl1/RP3P8Ar3+lsBRj/c/69/pPuf8AXv8AS2Aox/uf9e/0n3P+vf6WwFGPPR592b/F87dIyxG65KS3ET3lHNZuFmxe1TcflfCe7unudXO3m5PBxciPFXU+qCjnR6eZwr8ad9ndPU8yoAAAAAAAAAAPtx+PbkXilPrfGImZ7NfOzouBxY42OI7Pjn2rGi/F4teNTsUj5p9T7wlG4ZVIjcG4BIhIAhIAIBII3AJRPkbg3AK3rFomt43EsPqHAnBPbxd+P0+lvT/6rakWia2jcSDlfdsenncaeNkmPwX9l5mkAAAAAAAJ8gaHSMEZcn2lo7qVbW+95emYoxcakfHxPQmqts3CogtuDcKgLbNqgLbNqgLbNqgLbNwqAtuDcKgLbN/FUB5+p4Iz4ZmPOrA13fK6ie+NfHwua5FPssuSn5lxHzAUAAAADW5iPzCY84+aoOjw+HHSvpqvtSs+GPlSC2zapALbNo3BuATs2jcEgnZtUgFtm0SgFtm1QFtm1QFtm1UAvtidVr2eRM/GvabLI6v+8R/xA8IAAAAAB74+aoA6OvsRP5Tb4cHLOTDG/OKvuBs2AGzYAbNgBs2AGzYAbNgBs2AGzYAbZPVpic8a/hNWZ1G/SwuXknLmvf8AtB8gAAAf/9k="
                  fluid
                  alt="Responsive image"
                ></b-img>
              </div></div
          ></el-col>
          <el-col :span="16"
            ><div class="grid-content">
                <h3 class="mb-0">Thông tin cơ bản</h3>
              <br />
              <el-table :data="student" style="width: 100%">
                <el-table-column prop="key" label="Thông tin" width="180">
                </el-table-column>
                <el-table-column prop="name" label="Nội dung" width="180">
                </el-table-column>
              </el-table></div
          ></el-col>
          <!-- <el-col :span="4"><div class="grid-content ">àdsff</div></el-col> -->
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >Confirm</el-button
          >
        </span>
      </el-dialog>
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
import projects from "../../Tables/projects";
import { get, put,del, post } from "../../../services/services";
import Vue from "vue";
import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);
import { mapGetters } from "vuex";
Vue.prototype.$confirm = MessageBox.confirm;

export default {
  components: {
    //   LightTable,
    //   DarkTable,
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
      // users
      currentPage: 1,
      totalPage: 1,
      perPage: 1,
      posts: [],
      keyword: null,
      dialogVisible: false,
      dialogEdit: false,
      dialogDelete: false,
      dialogMultiDelete: false,
      student: [],
      form: {
        className: "",
        schoolYear: "",
        academicYear: "",
        teacher_id: "",
      },
      multipleSelection: [],
      options: [],
    };
  },
  created() {
  },
  watch: {
    keyword(after, before) {
      this.getResults();
    },
    "$route.params.id": function (id) {
      this.getStudentData();
      this.classReport();

    },
  },
  computed: {
    ...mapGetters({
      //map `this.doneCount` to `this.$store.getters.doneTodosCount`
      user: "user",
    }),
  },
  
  methods: {
    getStudentData(currentPage) {
      let url = "http://localhost:8000/api/head/teacher/getall/student/"+ this.$route.params.id +"?page="+ currentPage ;
      get(url)
        .then((res) => {
          this.perPage = res.data.data.per_page;
          this.totalPage = res.data.data.total;
          this.posts = res.data.data;
            // console.log("this.posts",this.posts)

      
        })
        .catch((err) => {
          alert(err);
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if(this.multipleSelection.length >1){

      }
    },
    studentDetail(index, row) {
      // console.log(index, row.id);
      this.dialogVisible = true;
      let url = "http://localhost:8000/api/teacher/student/" + row.id;
      get(url)
        .then((res) => {
          var user = res.data.data;
          var result = Object.keys(user).map((key) => ({
            key: key,
            name: user[key],
          }));
          // console.log("Result",result)
          var temp = result.slice();
          temp.pop();
          var removed = temp.splice(2,1)
          // console.log("Temp",temp)
          this.student = temp;

        })
        .catch((err) => {
          alert(err);
        });

    },
    handleDetail(index, row) {
        // console.log("row", row)
    this.$router.push('/teacher/mark/detail/'+row.id)
      },
    reportDetail(index, row)
    {
      this.$router.push('/teacher/student/report/'+row.id)
    },
    classReport(){
      this.$router.push('/teacher/class/report/'+this.$route.params.id)
    },
    handleClose(done) {
      this.$confirm("Are you sure to close this dialog?")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
  mounted(currentPage) {
    this.getStudentData(currentPage);
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
div.right{
  
    /* align-content: right; */
    margin-left: 750px; 
        }
</style>
