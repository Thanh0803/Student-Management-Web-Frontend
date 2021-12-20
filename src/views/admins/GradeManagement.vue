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
            <el-button 
              size="mini"
              type="success"
              @click="handleAdd()"
              class="import-button">
              Add Class List</el-button>

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
  
              <el-table-column label="Action" min-width="290px" align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
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
      <div>
        <el-dialog
        title="Warning"
        :visible.sync="dialogDelete"
        width="30%"
        center
      >
        <h3 class="text-center"
          >Bạn có muốn Xoá lớp này </h3>
          <h4 class="text-center red" >(Toàn bộ học sinh trong lớp sẽ bị xoá)</h4>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirmDelete">Confirm</el-button>
          <el-button  @click="dialogDelete = false"
            >Cancle</el-button
          >
        </span>
        </el-dialog>
        <b-modal ref="modalAdd" size="xl" title="Thêm lớp học"
        id="modal-add"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleAddClass">
          <el-form ref="form" :model="form" :rules="rules" label-width="120px" @submit.stop.prevent="handleSubmitAdd">
            <b-container class="bv-example-row">
              <b-row>
                <b-col>
                  <el-form-item label="ClassName" prop="className">
                    <el-input
                      v-model="form.className"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="HeadTeacher" prop="headTeacher">
                    <el-select
                      v-model="form.teacher_id"
                      clearable
                      filterable
                      
                    >
                      <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.fullname"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </b-col>
                <b-col>
                  <el-form-item label="SchoolYear" prop="schoolYear">
                    <el-input
                      v-model="form.schoolYear"
                      
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="AcademicYear" prop="academicYear">
                    <el-input
                      v-model="form.academicYear"
                      
                    ></el-input>
                  </el-form-item>
                </b-col>
              </b-row>
            </b-container>
          </el-form>
        </b-modal>

      </div>
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
import projects from "../Tables/projects";
import { get, put,del, post } from "../../services/services";
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
      classObj: {},
      multipleSelection: [],
      keyTeacherId: [],
      options: [],
      keyTeacherName: "",
      rules: {
          className: [
            { required: true, message: 'Nhập đủ tên lớp', trigger: 'blur' },
            // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
          ],
          teacher_id : [
            { required: true, message: 'Nhập đủ GVCN', trigger: 'change' }
          ],
          schoolYear: [
            { required: true, message: 'Nhập đủ tên trường', trigger: 'blur' },
            // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
          ],
          academicYear : [
            { required: true, message: 'Nhập đủ khối', trigger: 'change' }
          ],
  
        }
    };
  },
  created() {
  },
  watch: {
    keyword(after, before) {
      this.getResults();
    },
    "$route.params.id": function (id) {
      this.getClassData();
      this.getKeyTeacher();
      this.handleSubmitAdd();
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
    handleAdd(){
        this.$refs["modalAdd"].show();
        this.getKeyTeacher();
    },
    handleAddClass(bvModalEvt){
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmitAdd()
    },
    handleSubmitAdd(){
        this.$refs["form"].validate((valid) => {
          if (valid) {
            let url = "http://localhost:8000/api/admin/class/upload/"+ this.$route.params.id;
            let payload = this.form;
            console.log("payload",this.form)
            post(url,payload)
            .then((res) => {
              console.log("Respon", res);
              this.showNotification("success","Đã thêm thành công")
              this.getClassData(this.currentPage);
              //   this.arrTeacher = res.data
              //   console.log(this.arrTeacher.length)
            //   this.getStudentData(this.currentPage);
          
        })
        .catch((err) => {
          // alert(err);
          this.showNotification("danger",err)
        });
            this.$nextTick(() => {
          this.$bvModal.hide('modal-add')
        })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        
    },
    getKeyTeacher() {
      let url = "http://localhost:8000/api/admin/teacher/getall/";
      get(url)
        .then((res) => {
          let keyFillter = []
          // console.log("res",res)
          let arr = Object.keys(res.data.data).map((k) => res.data.data[k])
          // console.log("After",arr)
          arr.forEach((element)=>{
                if(this.keyTeacherId.includes(element.id)){
                  // console.log("ko ddung", element)
                }
                else{
                  keyFillter.push(element)
                  // console.log("ddung", element)
                }
           })
          //  console.log(keyFillter)
          this.options = keyFillter;
          //   console.log(this.options)
          //   this.keyTeacher = res.data.User.data.fullname
        })
        .catch((err) => {
          alert(err);
        });
    },
    resetModal() {
        this.form.className = ''
        this.form.schoolYear = ''
        this.form.academicYear = ''
        this.options = []
        // this.form.key_teacher = null
        this.form.teacher_id = null
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
      console.log("res",res);
      const user = res.data;
      console.log("user",user);
      this.classObj = user.data;
    },
    confirmDelete(){
      let url = "http://localhost:8000/api/admin/class/delete/" + this.classObj.id
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
