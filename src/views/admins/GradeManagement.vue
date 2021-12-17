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
              <h3 class="mb-0">Class List</h3>
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
                label="ClassName"
                min-width="150px"
                prop="className"
              >
              </el-table-column>
              <el-table-column
                label="HeadTeacher"
                prop="headTeacher"
                min-width="140px"
              >
              </el-table-column>
              <el-table-column
                label="SchoolYear"
                prop="schoolYear"
                min-width="140px"
              >
              </el-table-column>
              <!-- <el-table-column label="Email"
                             prop="email"
                             min-width="250px">
            </el-table-column> -->
              <el-table-column label="Action" min-width="290px" align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="success"
                    @click="handleDetail(scope.$index, scope.row)"
                    >Student List</el-button
                  >
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                    >Delete</el-button
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
                @input="getClassData(currentPage)"
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
        title="Chinh sua thong tin Lop hoc"
        :visible.sync="dialogEdit" 
        :before-close="handleClose"
        width="70%"
      >
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="ClassName">
            <el-input
              v-model="form.className"
              :placeholder="classObj.className"
            ></el-input>
          </el-form-item>
          <el-form-item label="HeadTeacher">
            <el-input
              v-model="form.headTeacher"
              :placeholder="classObj.headTeacher"
            ></el-input>
          </el-form-item>
          <el-form-item label="schoolYear">
            <el-input
              v-model="form.schoolYear"
              :placeholder="classObj.schoolYear"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="Activity zone">
            <el-select
              v-model="form.region"
              placeholder="please select your zone"
            >
              <el-option label="Zone one" value="shanghai"></el-option>
              <el-option label="Zone two" value="beijing"></el-option>
            </el-select>
          </el-form-item> -->
          <!-- <el-form-item label="Activity time">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="Pick a date"
                v-model="form.date1"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker
                placeholder="Pick a time"
                v-model="form.date2"
                style="width: 100%"
              ></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="Instant delivery">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="Activity type">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="Online activities" name="type"></el-checkbox>
              <el-checkbox
                label="Promotion activities"
                name="type"
              ></el-checkbox>
              <el-checkbox label="Offline activities" name="type"></el-checkbox>
              <el-checkbox
                label="Simple brand exposure"
                name="type"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="Resources">
            <el-radio-group v-model="form.resource">
              <el-radio label="Sponsor"></el-radio>
              <el-radio label="Venue"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Activity form">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item> -->
          <!-- <el-form-item>
            <el-button type="primary" @click="onSubmitEdit">Update</el-button>
            <el-button @click="dialogEdit = false">Cancel</el-button>
          </el-form-item> -->
        </el-form>
        <!-- <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogEdit = false"
            >Confirm</el-button
          >
        </span> -->
      </el-dialog>
      <el-dialog
        title="Warning"
        :visible.sync="dialogDelete"
        width="30%"
        center
      >
        <span
          >Bạn có muốn xoá người này</span
        >
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirmDelete">Confirm</el-button>
          <el-button  @click="dialogDelete = false"
            >Cancle</el-button
          >
        </span>
      </el-dialog>
      <el-dialog
        title="Warning"
        :visible.sync="dialogMultiDelete"
        width="30%"
        center
      >
        <!-- <span
          >Bạn có muốn xoá những người này</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirmMultiDelete">Confirm</el-button>
          <el-button  @click="dialogMultiDelete = false"
            >Cancle</el-button
          >
        </span> -->
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
//   import projects from '../Tables/projects'
import projects from "../Tables/projects";
import users from "../Tables/users";
//   import LightTable from "../Tables/RegularTables/LightTable";
//   import DarkTable from "../Tables/RegularTables/DarkTable";
// import { get } from '../services/services'
import { get, put,del, post } from "../../services/services";
import Vue from "vue";
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
        className: "className",
        headTeacher: "headTeacher",
        schoolYear: "schoolYear",
      },
      classObj: {},
      multipleSelection: [],
    };
  },
  created() {
    // this.fetchData();
    // this.getClassData()
  },
  watch: {
    keyword(after, before) {
      this.getResults();
    },
    "$route.params.id": function (id) {
      this.getClassData();
    },
    
  },
  computed: {
    ...mapGetters({
      //map `this.doneCount` to `this.$store.getters.doneTodosCount`
      user: "user",
    }),
  },
  methods: {
    getClassData(currentPage) {
      let url =
        "http://localhost:8000/api/admin/grade/"+ this.$route.params.id +"?page="+ this.currentPage ;
      // console.log("URL",url);
      get(url)
        .then((res) => {
          // console.log("Respon", res);
          this.perPage = res.data.data.per_page;
          this.totalPage = res.data.data.total;
          this.posts = res.data.data;
          // console.log("ResponLop", this.posts);
      
        })
        .catch((err) => {
          alert(err);
        });
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
    handleSelectionChange(val) {
      // this.currentRow = val;
      this.multipleSelection = val;
      if(this.multipleSelection.length >1){

      }
        // console.log("Selection",this.multipleSelection)
    },
    handleDetail(index, row) {
    this.$router.push('/admin/grade/class/'+row.id)
      },
    handleClose(done) {
      this.$confirm("Are you sure to close this dialog?")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    async getClassById(id) {
      let url = "http://localhost:8000/api/admin/class/delete/" + id;
      let json = await get(url);
      return json;
    },
    async handleDelete(index, row) {
      this.dialogDelete = true
      const res = await this.getClassById(row.id);
      const user = res.data;
      // console.log(user);
      this.classObj = user.data;
    },
    confirmDelete(){
      let url = "http://localhost:8000/admin/class/delete/" + this.classObj.id
      del(url)
        .then((res) => {
          console.log("Respon", res);
          this.dialogDelete = false;
          this.getClassData(this.currentPage);
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
  mounted(currentPage) {
    this.getClassData(currentPage);
    this.handleDetail(currentPage);
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
