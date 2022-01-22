<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
    </base-header>

    <b-container fluid class="mt--7">
      <b-row>
        <b-col>
          <b-card no-body>
            <b-tabs card>
            <b-tab title="Semester 1" active >
              <b-card-header class="border-0">
                <h3 class="mb-0">Class List</h3>
              </b-card-header>
              <el-table
                class="table-responsive table"
                header-row-class-name="thead-light"
                :data="posts_2"
                @selection-change="handleSelectionChange"
              >
          
                <el-table-column
                  label="FullName"
                  min-width="150px"
                  prop="student"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  label="Conduct"
                  prop="mark"
                  min-width="80px"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  label="Comment"
                  prop="comment"
                  min-width="220px"
                  align="center"
                >
                </el-table-column>
    
                <el-table-column label="Action" min-width="120px" align="center">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleEdit(scope.$index, scope.row)"
                      >Edit</el-button
                    >
          
                  </template>
                </el-table-column>

              </el-table>
              <b-card-footer class="py-4 d-flex justify-content-end position-relative">
                <!-- <base-pagination v-model="currentPage" :per-page="20" :total="50" :@input="getTeacherData(currentPage)"></base-pagination> -->
                <el-row class="position-absolute" v-if="multipleSelection.length > 1">
                  <el-button type="danger" @click="dialogMultiDelete=true">Xoá các lựa chọn</el-button>
                </el-row>
                <b-pagination
                  :total-rows="totalPage"
                  v-model="currentPage"
                  :per-page="perPage"
                  @input="getConductData(currentPage)"
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
            </b-tab>

            <b-tab title="Semester 2" >
              <b-card-header class="border-0">
                <h3 class="mb-0">Class List</h3>
              </b-card-header>
              <el-table
                class="table-responsive table"
                header-row-class-name="thead-light"
                :data="posts_3"
                @selection-change="handleSelectionChange"
              >
          
                <el-table-column
                  label="FullName"
                  min-width="150px"
                  prop="student"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  label="Conduct"
                  prop="mark"
                  min-width="80px"
                  align="center"
                >
                </el-table-column>
                <el-table-column
                  label="Comment"
                  prop="comment"
                  min-width="220px"
                  align="center"
                >
                </el-table-column>
    
                <el-table-column label="Action" min-width="120px" align="center">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleEdit(scope.$index, scope.row)"
                      >Edit</el-button
                    >
          
                  </template>
                </el-table-column>

              </el-table>
              <b-card-footer class="py-4 d-flex justify-content-end position-relative">
                <!-- <base-pagination v-model="currentPage" :per-page="20" :total="50" :@input="getTeacherData(currentPage)"></base-pagination> -->
                <el-row class="position-absolute" v-if="multipleSelection.length > 1">
                  <el-button type="danger" @click="dialogMultiDelete=true">Xoá các lựa chọn</el-button>
                </el-row>
                <b-pagination
                  :total-rows="totalPage"
                  v-model="currentPage"
                  :per-page="perPage"
                  @input="getConductData(currentPage)"
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
            </b-tab>

            </b-tabs>
          </b-card>
        </b-col>
      </b-row>
        <el-dialog
        title="Warning"
        :visible.sync="dialogDelete"
        width="30%"
        center
      >
        </el-dialog>
        <el-dialog
        title="Chỉnh sửa thông tin hạnh kiểm"
        :visible.sync="dialogEdit"
        :before-close="handleClose"
        width="70%"
      >
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="Mark">
            <el-input
              v-model="form.mark"
              :placeholder="conductObj.mark"
            ></el-input>
          </el-form-item>
          <el-form-item label="Comment">
            <el-input
              v-model="form.comment"
              :placeholder="conductObj.comment"
            ></el-input>
          </el-form-item>
          <el-form-item label="Semester">
            <el-input
              v-model="form.semester"
              :placeholder="conductObj.semester"
            ></el-input>
          </el-form-item>
          <el-form-item label="SchoolYear">
            <el-input
              v-model="form.schoolYear"
              :placeholder="conductObj.schoolYear"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmitEdit">Update</el-button>
            <el-button @click="dialogEdit = false">Cancel</el-button>
          </el-form-item>
        </el-form>
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
import { values } from 'd3';
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
      posts_2 :[],
      posts_3: [],
      keyword: null,
      dialogVisible: false,
      dialogEdit: false,
      dialogDelete: false,
      dialogMultiDelete: false,
      student: [],
      form: {
        mark: "",
        schoolYear: "",
        comment: "",
        semester: "",
      },
      conductObj: {},
      multipleSelection: [],
  
    };
  },
  created() {
  },
  watch: {
    keyword(after, before) {
      this.getResults();
    },
    "$route.params.id": function (id) {
      this.getConductData();

    },
  },
  computed: {
    ...mapGetters({
      //map `this.doneCount` to `this.$store.getters.doneTodosCount`
      user: "user",
    }),
  },
  
  methods: {
    getConductData(currentPage) {
      let url =
        "http://localhost:8000/api/teacher/conduct/"+ this.$route.params.id +"?page="+ this.currentPage ;
      // console.log("URL",url);
      get(url)
        .then((res) => {
          // console.log("Respon", res);
          this.perPage = res.data.data.per_page;
          this.totalPage = res.data.data.total;
          this.posts = res.data.data;
          console.log("conduct", this.posts)
          this.posts.forEach(element => {
            // console.log(element.conduct)
            element.conduct.forEach(value => {
              if(value.semester == 1)
              {
                var objConduct = {
                student: element.student.fullname,
                mark: value.mark,
                comment: value.comment,
              } 
              this.posts_2.push(objConduct)
              }else {
                var objConduct = {
                student: element.student.fullname,
                mark: value.mark,
                comment: value.comment,
              } 
              this.posts_3.push(objConduct)
              }
              
            })
          });          
          console.log("this.posts_2", this.posts_2)
        })
        .catch((err) => {
          alert(err);
        });
    },

    handleSelectionChange(val) {
      // this.currentRow = val;
      this.multipleSelection = val;
      if(this.multipleSelection.length >1){
      }
    },
    onSubmitEdit() {
      // console.log("Form",this.form);
      let url = "http://localhost:8000/api/teacher/conduct/update/" + this.conductObj[0].id;
      let payload = this.form;
      console.log("payload", payload);
      put(url, payload)
        .then((res) => {
          // console.log("Respon", res);
          this.dialogEdit = false;
          this.getConductData(this.currentPage);
          //   this.arrTeacher = res.data
          //   console.log(this.arrTeacher.length)
        })
        .catch((err) => {
          alert(err);
        });
    },
    handleClose(done) {
      this.$confirm("Are you sure to close this dialog?")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    async getConductById(id) {
      let url = "http://localhost:8000/api/teacher/conduct/detail/" + id;
      let json = await get(url);
      return json;
    },
    async handleEdit(index, row) {
      this.dialogEdit = true;
      const res = await this.getConductById(row.id);
      const user = res.data;
      console.log("user",res);
      this.conductObj = user.data;
      console.log("obj", this.conductObj[0].id)

    },
  },
  mounted(currentPage) {
    this.getConductData(currentPage);
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
</style>
