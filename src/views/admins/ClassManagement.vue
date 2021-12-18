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
              <h3 class="mb-0">Class Management</h3>
            </b-card-header>
            <!-- <el-table></el-table> -->
            <el-button size="mini" type="success" class="add-class-button" 
                @click="handleAdd()" >Thêm lớp học</el-button>
            <el-table
              class="table-responsive table"
              header-row-class-name="thead-light"
              :data="posts"
              @selection-change="handleSelectionChange"
            >
             

              <el-table-column label="Lớp" min-width="100px" prop="classname">
                <!-- <template v-slot="{row}">
                    <b-media no-body class="align-items-center">
                        <a href="#" class="avatar rounded-circle mr-3">
                            <img alt="Image placeholder" :src="row.img">
                        </a>
                        <b-media-body>
                            <span class="font-weight-600 name mb-0 text-sm">{{row.title}}</span>
                        </b-media-body>
                    </b-media>
                </template> -->
              </el-table-column>
              <el-table-column
                label="Giáo Viên chủ nhiệm"
                prop="teacher_name"
                min-width="170px"
                align="center"
              >
              </el-table-column>
              <el-table-column
                label="Khối"
                prop="grade"
                min-width="100px"
                align="center"
              >
              </el-table-column>
              <el-table-column
                label="Số lượng học sinh"
                prop="num_student"
                min-width="170px"
                align="center"
              >
              </el-table-column>
              <!-- <el-table-column
                label="Giới tính"
                min-width="110px"
                prop="gender"
              >
                <template v-slot="{ row }">
                  <badge
                    class="badge-dot mr-4"
                    type=""
                    v-if="row.gender == 'nam'"
                  >
                    <i :class="`bg-info`"></i>
                    <span class="status" :class="`text-info`">{{
                      row.gender
                    }}</span>
                  </badge>
                  <badge class="badge-dot mr-4" type="" v-else>
                    <i :class="`bg-warning`"></i>
                    <span class="status" :class="`text-warning`">{{
                      row.gender
                    }}</span>
                  </badge>
                </template>
              </el-table-column> -->
              <el-table-column label="Action" min-width="190px" align="center">
                <template slot-scope="scope">
                  <a
                    class="tab-action"
                    id="a-add"
                    v-b-popover.hover.top="'Chỉnh sửa lớp học'"
                    @click="handleEdit(scope.$index, scope.row)"
                    ><i class="fas icon-action green fa-user-edit"></i
                  ></a>
                  <!-- <a
                    class="tab-action"
                    
                    v-b-popover.hover.top="'Thêm môn học'"
                    @click="handleEdit(scope.$index, scope.row)"
                    ><i class="far icon-action green fa-list-alt"></i></a> -->
                  <!-- <b-tooltip target="a-add" title="Online!"></b-tooltip> -->
                  <a
                    class="tab-action"
                    @click="handleDelete(scope.$index, scope.row)"
                    v-b-popover.hover.top="'Xoá lớp học'"
                    ><i class="fas icon-action danger fa-trash"></i
                  ></a>
                </template>
              </el-table-column>
            </el-table>

            <b-card-footer
              class="py-4 d-flex justify-content-end position-relative"
            >
              <!-- <base-pagination v-model="currentPage" :per-page="20" :total="50" :@input="getTeacherData(currentPage)"></base-pagination> -->
              <el-row
                class="position-absolute"
                v-if="multipleSelection.length > 1"
              >
                <el-button type="danger" @click="dialogMultiDelete = true"
                  >Xoá các lựa chọn</el-button
                >
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
        <b-modal ref="modalEdit" size="lg" title="Chỉnh sửa lớp học"
        id="modal-prevent-closing"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk">
          <el-form ref="form" :model="form" label-width="120px" @submit.stop.prevent="handleSubmit">
            <b-container class="bv-example-row">
              <b-row>
                <b-col>
                  <el-form-item label="ClassName">
                    <el-input
                      v-model="form.className"
                      :placeholder="classObj.className"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="HeadTeacher">
                    <el-select
                      v-model="form.teacher_id"
                      clearable
                      filterable
                      :placeholder="keyTeacherName"
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
                  <el-form-item label="SchoolYear">
                    <el-input
                      v-model="form.schoolYear"
                      :placeholder="classObj.schoolYear"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="AcademicYear">
                    <el-select
                      v-model="form.academicYear"
                      :placeholder="classObj.academicYear"
                    >
                      <!-- <el-option label="Khối 6" value= 6></el-option>
                      <el-option label="Khối 7" value= 7></el-option>
                      <el-option label="Khối 8" value= 8></el-option>
                      <el-option label="Khối 9" value= 9></el-option>
                      <el-option label="Khối 10" value= 10></el-option>
                      <el-option label="Khối 11" value= 11></el-option>
                      <el-option label="Khối 12" value= 12></el-option> -->
                    </el-select>
                  </el-form-item>
                  <!-- <el-form-item>
                    <el-button type="primary" @click="onSubmitEdit"
                      >Update</el-button
                    >
                    <el-button @click="dialogEdit = false">Cancel</el-button>
                  </el-form-item> -->
                </b-col>
              </b-row>
            </b-container>
          </el-form>
        </b-modal>
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
                    <el-select
                      v-model="form.academicYear"
                      
                    >
                      <!-- <el-option label="Khối 6" value= 6></el-option>
                      <el-option label="Khối 7" value= 7></el-option>
                      <el-option label="Khối 8" value= 8></el-option>
                      <el-option label="Khối 9" value= 9></el-option>
                      <el-option label="Khối 10" value= 10></el-option>
                      <el-option label="Khối 11" value= 11></el-option>
                      <el-option label="Khối 12" value= 12></el-option> -->
                    </el-select>
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
//   import projects from '../Tables/projects'
import projects from "../Tables/projects";
import users from "../Tables/users";
import { get, put, del, post } from "../../services/services";
import Vue from "vue";
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

      //   dialogVisible: false,
      //   dialogEdit: false,
        dialogDelete: false,
      //   dialogMultiDelete: false,
      //   student: [],
      form: {
        className: "",
        schoolYear: "",
        academicYear: "",
        teacher_id: "",
      },
      keyTeacherId: [],
      options: [],
      classObj: {},
      keyTeacherName: "",
      multipleSelection: [],
      rules: {
          className: [
            { required: true, message: 'Nhập đủ tên lớp', trigger: 'blur' },
            // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
          ],
          teacher_id : [
            { required: true, message: 'Nhập đủ GVCN', trigger: 'change' }
          ],
          schoolYear: [
            { required: true, message: 'Nhập đủ nam hoc', trigger: 'blur' },
            // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
          ],
          academicYear : [
            { required: true, message: 'Nhập đủ nien khoa', trigger: 'change' }
          ],
        }
    };
  },
  methods: {
    getClassData(currentPage) {
        console.log(currentPage)
      let url = "http://localhost:8000/api/admin/class?page=" + currentPage;
      get(url)
        .then((res) => {
        //   console.log("Respon", res);
          this.perPage = res.data.meta.per_page;
          this.totalPage = res.data.meta.total;
          this.posts = res.data.data;
          let key = []
          this.posts.forEach((element)=>{
              key.push(element.teacher_id);
          })
          this.keyTeacherId = key
          //   this.arrTeacher = res.data
          //   console.log(this.arrTeacher.length)
        })
        .catch((err) => {
          alert(err);
        });
    },
    handleSelectionChange(val) {
      // this.currentRow = val;
      this.multipleSelection = val;
      if (this.multipleSelection.length > 1) {
      }
      // console.log("Selection",this.multipleSelection)
    },
    async getClassById(id) {
      let url = "http://localhost:8000/api/class/" + id;
      let json = await get(url);
      return json;
    },
    async handleEdit(index, row) {
      // alert("afsdf")
      this.$refs["modalEdit"].show();
      const res = await this.getClassById(row.id);
      const classs = res.data;
    //   console.log(classs.data);
      this.classObj = classs.data;
      this.classObj.grade = classs.data.grade.toString();
      // this.form.gender = user.data.gender;
      this.getKeyTeacher();
      this.keyTeacherName = classs.data.key_teacher.fullname;
      //   this.getTeacherbyId()
    },
    getKeyTeacher() {
      let url = "http://localhost:8000/api/admin/level/keyTeacher";
      get(url)
        .then((res) => {
          let keyFillter = []
          // console.log(res)
          let arr = Object.keys(res.data.User.data).map((k) => res.data.User.data[k])
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
    handleSubmit(){
        // console.log(this.form.grade)
        let url = "http://localhost:8000/api/class/" + this.classObj.id;
        let payload = this.form;
        put(url, payload)
        .then((res) => {
          console.log("Respon", res);
          this.getClassData(this.currentPage)
        //   this.dialogEdit = false;
        //   this.getStudentData(this.currentPage);
        //   this.removeForm();
          this.showNotification("success","Đã cập nhật thành công")
          //   this.arrTeacher = res.data
          //   console.log(this.arrTeacher.length)
        })
        .catch((err) => {
          // alert(err);
          this.showNotification("danger",err)
        });
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
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
    resetModal() {
        this.form.classname = ''
        this.form.grade = ''
        this.form.school = ''
        this.options = []
        this.form.key_teacher = null
        this.form.teacher_id = null
        // this.form.classname = ''
        // this.nameState = null
      },
    handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
        
      },
      confirmDelete(){
          let url = "http://localhost:8000/api/class/" + this.classObj.id;
          del(url)
        .then((res) => {
          // console.log("Respon", res);
          this.dialogDelete = false;
          if(res.data.code == 1){
            this.showNotification("danger",res.data.message)
          }else
          {this.getClassData(this.currentPage);
          this.showNotification("success","Đã xoá thành công")}
          //   this.arrTeacher = res.data
          //   console.log(this.arrTeacher.length)
        })
        .catch((err) => {
          // alert(err);
          this.showNotification("danger",err)
        });
      },
    async handleDelete(index, row) {
        this.dialogDelete = true
        const res = await this.getClassById(row.id);
      const classs = res.data;
    //   console.log(classs.data);
      this.classObj = classs.data;
      this.classObj.grade = classs.data.grade.toString();
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
            let url = "http://localhost:8000/api/class/"
            let payload = this.form;
            post(url,payload)
            .then((res) => {
        //   console.log("Respon", res);
        //   this.dialogMultiDelete = false;
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
        
    }

  },

  mounted(currentPage) {
    this.getClassData(currentPage);
  },
};
</script>
<style>
.tab-action:hover {
  border-color: #f5f7fa;
  background-color: #f5f7fa;
}
.icon-action {
  margin-right: 12px;
  font-size: 20px;
}
.green {
  color: #59bb57 !important;
}
.danger {
  color: rgb(236 37 37) !important;
}
h5 {
  font-size: 1.25rem;
}
.el-select {
  width: 100%;
}
.text-center{
    text-align: center;
}
.red{
    color: red;
}
.add-class-button{
        width: 105px;
    /* float: right; */
    position: absolute;
    right: 10%;
    top: 3%;
}
.el-table .cell {
    word-break: break-word;
}
</style>