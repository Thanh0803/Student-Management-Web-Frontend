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
              <h3 class="mb-0">Teacher List</h3>
            </b-card-header>
            <el-button 
              size="mini"
              type="success"
              @click="handleImport"
              class="import-button">
              Add Teacher List</el-button>

            <el-table
              class="table-responsive table"
              header-row-class-name="thead-light"
              :data="posts"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" min-width="100px">
              </el-table-column>

              <el-table-column
                label=" Fullname"
                min-width="150px"
                prop="teacher.fullname"
              >
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
                label="Telephone Number"
                prop="teacher.phone"
                min-width="140px"
              >
              </el-table-column>
              <el-table-column
                label="Gender"
                min-width="110px"
                prop="teacher.gender"
              >    
              </el-table-column>
              <el-table-column label="Action" min-width="290px" align="center">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDetail(scope.$index, scope.row)"
                    >Detail</el-button
                  >
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleEdit(scope.$index, scope.row)"
                    >Edit</el-button
                  >
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                    >Delete</el-button
                  >
                  <!-- <el-button
                    size="mini"
                    type="primary"
                    v-if="scope.row.level == null"
                    @click="handleAddLevel(scope.$index, scope.row)"
                    >Add Level</el-button
                  > -->
                  <!-- <el-button
                    v-if="scope.row.level != null"
                    size="mini"
                    type="primary"
                    @click="handleUpdateLevel(scope.$index, scope.row)"
                    >Update Level</el-button
                  > -->
                </template>
              </el-table-column>

              <!-- <el-table-column label="Users" min-width="190px">
                <div class="avatar-group">
                    <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip"
                       data-original-title="Ryan Tompson">
                        <img alt="Image placeholder" src="/img/theme/team-1.jpg">
                    </a>
                    <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip"
                       data-original-title="Romina Hadid">
                        <img alt="Image placeholder" src="/img/theme/team-2.jpg">
                    </a>
                    <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip"
                       data-original-title="Alexander Smith">
                        <img alt="Image placeholder" src="/img/theme/team-3.jpg">
                    </a>
                    <a href="#" class="avatar avatar-sm rounded-circle" data-toggle="tooltip"
                       data-original-title="Jessica Doe">
                        <img alt="Image placeholder" src="/img/theme/team-4.jpg">
                    </a>
                </div>
            </el-table-column>

            <el-table-column label="Completion"
                             prop="completion"
                             min-width="240px">
                <template v-slot="{row}">
                    <div class="d-flex align-items-center">
                        <span class="completion mr-2">{{row.completion}}%</span>
                        <div>
                            <base-progress :type="row.statusType" :value="row.completion"/>
                        </div>
                    </div>
                </template>
            </el-table-column> -->
            </el-table>
            <b-card-footer class="py-4 d-flex justify-content-end">
              <!-- <base-pagination v-model="currentPage" :per-page="20" :total="50" :@input="getTeacherData(currentPage)"></base-pagination> -->
              <el-row
                class="position-absolute left-10"
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
                @input="getTeacherData(currentPage)"
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
      <!-- <div class="mt-5"></div>
      <dark-table></dark-table> -->
      <el-dialog
        title="Thông tin chi tiết giáo viên"
        :visible.sync="dialogVisible"
        width="70%"
      >
        <!-- <span>This is a message</span> -->
        <el-row :gutter="20">
          <el-col :span="8"
            ><div class="grid-content">
              <div>
                <b-img
                  src="https://anhdep123.com/wp-content/uploads/2021/05/hinh-avatar-trang.jpg"
                  fluid
                  alt="Responsive image"
                ></b-img>
              </div>
              <!-- <br />
              <h3 class="mb-0">Trình độ giáo viên</h3>
              <br /> -->
              <!-- <el-table :data="levelTeacher" style="width: 100%" border>
                <el-table-column prop="key" align="center" label="Thông tin">
                </el-table-column>
                <el-table-column prop="name" align="center" label="Nội dung">
                </el-table-column>
              </el-table> -->
            </div>
          </el-col>
          <el-col :span="16"
            ><div class="grid-content">
              <h3 class="mb-0">Thông tin cơ bản</h3>
              <br />
              <el-table :data="teacher" style="width: 100%" border>
                <el-table-column prop="key" label="Thông tin">
                </el-table-column>
                <el-table-column prop="name" label="Nội dung">
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
      <el-dialog
        title="Chỉnh sửa thông tin giáo viên"
        :visible.sync="dialogEdit"
        :before-close="handleClose"
        width="70%"
      >
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="Fullname">
            <el-input
              v-model="form.fullname"
              :placeholder="teacherObj.fullname"
            ></el-input>
          </el-form-item>
          <el-form-item label="Username">
            <el-input
              v-model="form.username"
              :placeholder="teacherObj.username"
            ></el-input>
          </el-form-item>
          <el-form-item label="Telephone">
            <el-input
              v-model="form.phone"
              :placeholder="teacherObj.phone"
            ></el-input>
          </el-form-item>
          <el-form-item label="Email">
            <el-input
              v-model="form.email"
              :placeholder="teacherObj.email"
            ></el-input>
          </el-form-item>
          <el-form-item label="Level">
            <el-input
              v-model="form.level"
              :placeholder="teacherObj.level"
            ></el-input>
          </el-form-item>
          <el-form-item label="Gender">
            <el-radio-group v-model="form.gender">
              <el-radio label="Female"></el-radio>
              <el-radio label="Male"></el-radio>
            </el-radio-group>
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary" @click="onSubmitEdit">Update</el-button>
            <el-button @click="dialogEdit = false">Cancel</el-button>
          </el-form-item>
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
        <span>Bạn có muốn xoá người này</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirmDelete">Confirm</el-button>
          <el-button @click="dialogDelete = false">Cancle</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="Warning"
        :visible.sync="dialogMultiDelete"
        width="30%"
        center
      >
        <span>Bạn có muốn xoá những người này</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirmMultiDelete"
            >Confirm</el-button
          >
          <el-button @click="dialogMultiDelete = false">Cancle</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="Thêm trình độ giáo viên"
        :visible.sync="dialogAddLevel"
        width="50%"
      >
        <el-form
          ref="formLevel"
          :label-position="labelPosition"
          :model="formLevel"
          label-width="170px"
        >
          <!-- <el-form-item label="Họ và tên">
            <el-input
              v-model="form.fullname"
              :placeholder="teacherObj.fullname"
            ></el-input>
          </el-form-item>
          <el-form-item label="Tên">
            <el-input
              v-model="form.name"
              :placeholder="teacherObj.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="Số điện thoại">
            <el-input
              v-model="form.phone"
              :placeholder="teacherObj.phone"
            ></el-input>
          </el-form-item>
          <el-form-item label="Email">
            <el-input
              v-model="form.email"
              :placeholder="teacherObj.email"
            ></el-input>
          </el-form-item>
          <el-form-item label="Giới tính">
            <el-radio-group v-model="form.gender">
              <el-radio label="nam"></el-radio>
              <el-radio label="nữ"></el-radio>
            </el-radio-group>
          </el-form-item> -->
          <el-form-item
            label="Trình độ tốt nghiệp"
            prop="level"
            :rules="[
              {
                required: true,
                message: 'Không được để trống trường này',
                trigger: 'blur',
              },
            ]"
          >
            <el-select
              v-model="formLevel.level"
              placeholder="please select teacher's level"
            >
              <el-option label="Tiến sỹ" value="Tiến sỹ"></el-option>
              <el-option label="Thạc sỹ" value="Thạc sỹ"></el-option>
              <el-option label="Đại Học" value="Đại học"></el-option>
              <el-option label="Cao Đẳng" value="Cao đẳng"></el-option>
              <el-option label="Sơ cấp" value="Sơ cấp"></el-option>
            </el-select>
          </el-form-item>
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
          </el-form-item>-->
          <el-form-item
            label="Mon hoc"
            prop="subject"
            :rules="[
              {
                required: true,
                message: 'Không được để trống trường này',
                trigger: 'blur',
              },
            ]"
          >
            <el-checkbox-group v-model="formLevel.subject">
              <el-checkbox label="Toan" name="subject"></el-checkbox>
              <el-checkbox label="Ngu Van" name="subject"></el-checkbox>
              <el-checkbox label="Ngoai ngu" name="subject"></el-checkbox>
              <el-checkbox label="Vat Ly" name="subject"></el-checkbox>
              <el-checkbox label="Hoa hoc" name="subject"></el-checkbox>
              <el-checkbox label="Lich su" name="subject"></el-checkbox>
              <el-checkbox label="Dia ly" name="subject"></el-checkbox>
              <el-checkbox label="GDCD" name="subject"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <!--<el-form-item label="Resources">
            <el-radio-group v-model="form.resource">
              <el-radio label="Sponsor"></el-radio>
              <el-radio label="Venue"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Activity form">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item> -->
          <el-form-item label="Khả năng chủ nhiệm">
            <el-radio-group v-model="formLevel.canBeKeyTeacher">
              <el-radio label="Có" value="Yes"></el-radio>
              <el-radio label="Không" value="No"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('formLevel')"
              >Update</el-button
            >
            <el-button @click="handleCloseAddForm('formLevel')"
              >Cancel</el-button
            >
          </el-form-item>
        </el-form>
        <!-- <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogEdit = false"
            >Confirm</el-button
          >
        </span> -->
      </el-dialog>
      <el-dialog
        title="Chỉnh sửa trình độ giáo viên"
        :visible.sync="dialogUpdateLevel"
        :before-close="handleClose"
        width="50%"
      >
        <el-form
          ref="formLevel"
          :label-position="labelPosition"
          :model="formLevel"
          label-width="170px"
        >
          <el-form-item label="Trình độ tốt nghiệp" prop="level">
            <el-select v-model="formLevel.level" :placeholder="levelObj.level">
              <el-option label="Tiến sỹ" value="Tiến sỹ"></el-option>
              <el-option label="Thạc sỹ" value="Thạc sỹ"></el-option>
              <el-option label="Đại Học" value="Đại học"></el-option>
              <el-option label="Cao Đẳng" value="Cao đẳng"></el-option>
              <el-option label="Sơ cấp" value="Sơ cấp"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Mon hoc" prop="subject">
            <el-checkbox-group v-model="formLevel.subject">
              <el-checkbox label="Toan" name="subject"></el-checkbox>
              <el-checkbox label="Ngu Van" name="subject"></el-checkbox>
              <el-checkbox label="Ngoai ngu" name="subject"></el-checkbox>
              <el-checkbox label="Vat Ly" name="subject"></el-checkbox>
              <el-checkbox label="Hoa hoc" name="subject"></el-checkbox>
              <el-checkbox label="Lich su" name="subject"></el-checkbox>
              <el-checkbox label="Dia ly" name="subject"></el-checkbox>
              <el-checkbox label="GDCD" name="subject"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="Khả năng chủ nhiệm">
            <el-radio-group v-model="formLevel.canBeKeyTeacher">
              <el-radio label="Có" value="Yes"></el-radio>
              <el-radio label="Không" value="No"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitEditLevelForm('formLevel')"
              >Update</el-button
            >
            <el-button @click="handleCloseSubmitForm('formLevel')"
              >Cancel</el-button
            >
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
//   import projects from '../Tables/projects'
import projects from "../Tables/projects";
import users from "../Tables/users";
import { mapGetters } from "vuex";
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
      dialogVisible: false,
      dialogEdit: false,
      dialogDelete: false,
      dialogMultiDelete: false,
      dialogUpdateLevel: false,
      dialogAddLevel: false,
      teacher: [],
      levelTeacher: [],
      form: {
        username: "",
        fullname: "",
        email: "",
        phone: "",
        gender: "",
        level: "",
      },
      formLevel: {
        level: "",
        subject: [],
        canBeKeyTeacher: "",
        grade: 0,
      },
      labelPosition: "left",
      teacherObj: {},
      levelObj: {},
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
      this.getTeacherData();
      this.handleImport();
    },    
  },
  computed: {
    ...mapGetters({
      //map `this.doneCount` to `this.$store.getters.doneTodosCount`
      user: "user",
    }),
  },
  methods: {
    getTeacherData(currentPage) {
      let url = "http://localhost:8000/api/admin/teacher/subject/getall/"+this.$route.params.id+"?page=" + this.currentPage;
      // console.log("URL",url)
      get(url)
        .then((res) => {
          this.perPage = res.data.meta.per_page;
          this.totalPage = res.data.meta.total;
          this.posts = res.data.data;
          // console.log("XXX",this.posts)

        })
        .catch((err) => {
          alert(err);
        });
    },
    handleCurrentChange(val) {
      // this.currentRow = val;
    },
    handleDetail(index, row) {
      // console.log(index, row.id);
      this.dialogVisible = true;
      let url = "http://localhost:8000/api/admin/teacher/" + row.id;
      get(url)
        .then((res) => {
          var user = res.data.data;
          // this.teacher = Object.entries(user).map((e) => ( { [e[0]]: e[1] } ))
          var result = Object.keys(user).map((key) => (
            {         
            key: key,
            name: user[key],
          }
          ));
          var temp = result.slice();
          temp.pop();
          var removed = temp.splice(1,1)
          this.teacher = temp;
          
          var level = result[result.length - 1].name;
          if (level !== null) {
            result = Object.keys(level).map((key) => ({
              key: key,
              name: level[key],
            }));
            result.shift();
            result.pop();
            // result[0].key = "Trình độ";
            // result[1].key = "Môn học";
            // result[2].key = "Chủ Nhiệm";
            // result.pop();
            // result.pop();
            this.levelTeacher = result;
          } else {
            this.levelTeacher = null;
          }
          // console.log("Level",level)
        })
        .catch((err) => {
          alert(err);
        });

      // var arr = Object.keys(user).map((key) => [Number(key), user[key]]);
      // console.log("arr", arr);
    },
    handleImport(){
      this.$router.push("/admin/teacher/upload/"+this.$route.params.id);
    },
    async handleEdit(index, row) {
      this.dialogEdit = true;

      const res = await this.getTeacherById(row.id);
      const user = res.data;
      // console.log("user", user);
      this.teacherObj = user.data;
      // console.log("Teacher", this.teacherObj);
      this.form.gender = user.data.gender;
      //   .then(function(result) {
      //     // console.log("json",result)
      //     var user = result.data.data
      //     console.log("user",user)
      //     this.teacher = user
      //     console.log("teacher",result)

      // })
    },
    handleClose(done) {
      this.$confirm("Are you sure to close this dialog?")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    async getTeacherById(id) {
      let url = "http://localhost:8000/api/admin/teacher/" + id;
      let json = await get(url);
      return json;
    },
    onSubmitEdit() {
      // console.log("Form",this.form);
      let url = "http://localhost:8000/api/admin/teacher/update/" + this.teacherObj.id;
      let payload = this.form;
      console.log("payload teacher", payload)
      put(url, payload)
        .then((res) => {
          // console.log("Respon", res);
          this.dialogEdit = false;
          this.getTeacherData(this.currentPage);
          //   this.arrTeacher = res.data
          //   console.log(this.arrTeacher.length)
        })
        .catch((err) => {
          alert(err);
        });
    },
    async handleDelete(index, row) {
      this.dialogDelete = true;
      const res = await this.getTeacherById(row.id);
      const user = res.data;
      // console.log(user);
      this.teacherObj = user.data;
    },
    confirmDelete() {
      let url = "http://localhost:8000/api/admin/teacher/" + this.teacherObj.id;
      del(url)
        .then((res) => {
          // console.log("Respon", res);
          this.dialogDelete = false;
          this.getTeacherData(this.currentPage);
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
    confirmMultiDelete() {
      let url = "http://localhost:8000/api/teacher/delete";
      let payload = {
        ids: "",
      };
      this.multipleSelection.forEach(function (item, index, array) {
        // console.log(item, index);
        if (index == 0) payload.ids = item.id;
        else {
          payload.ids = payload.ids + "," + item.id;
        }
        // payload.ids
      });
      // payload.ids.forEach(function(item, index, array) {
      //     console.log(item, index);
      //     // payload.ids.push(item.id)
      // });
      // console.log("payload",payload);
      post(url, payload)
        .then((res) => {
          // console.log("Respon", res);
          this.dialogMultiDelete = false;
          // this.getStudentData(this.currentPage);
          //   this.arrTeacher = res.data
          //   console.log(this.arrTeacher.length)
          this.getTeacherData(this.currentPage);
        })
        .catch((err) => {
          alert(err);
        });
    },
    // async handleAddLevel(index, row) {
    //   this.dialogAddLevel = true;
    //   const res = await this.getTeacherById(row.id);
    //   const user = res.data;
    //   console.log(user);
    //   this.teacherObj = user.data;
    // },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert(valid);
          let url =
            "http://localhost:8000/api/addLevelTecher/" + this.teacherObj.id;
          let payload = {
            level: "",
            subject: "",
            grade: "8",
            canBeKeyTeacher: "",
          };
          payload.level = this.formLevel.level;
          payload.canBeKeyTeacher = this.formLevel.canBeKeyTeacher;
          this.formLevel.subject.forEach(function (item, index, array) {
            // console.log(item, index);
            if (index == 0) payload.subject = item;
            else {
              payload.subject = payload.subject + "," + item;
            }
            // payload.ids
          });
          // console.log
          put(url, payload)
            .then((res) => {
              // console.log("Respon", res);
              this.dialogAddLevel = false;
              this.getTeacherData(this.currentPage);
              this.$refs[formName].resetFields();
              //   this.arrTeacher = res.data
              //   console.log(this.arrTeacher.length)
            })
            .catch((err) => {
              alert(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleCloseAddForm(formName) {
      this.dialogAddLevel = false;
      this.$refs[formName].resetFields();
    },
    async handleUpdateLevel(index, row) {
      this.dialogUpdateLevel = true;

      const res = await this.getTeacherById(row.id);
      const user = res.data;
      // console.log(user);
      this.teacherObj = user.data;
      this.levelObj = user.data.level;
      // console.log("levelObj",this.levelObj);
      // this.form.gender = user.data.gender;
      this.formLevel.canBeKeyTeacher = this.levelObj.canBeKeyTeacher;
      let subjectArr = [];
      if (this.levelObj.subject.length > 1) {
        let subjects = this.levelObj.subject.split(",");
        subjects.forEach(function (item, index, array) {
          // console.log(item, index);
          subjectArr.push(item);
        });
        this.formLevel.subject = subjectArr;
      }
    },
    handleCloseSubmitForm(formName) {
      this.dialogUpdateLevel = false;
      this.$refs[formName].resetFields();
    },
    submitEditLevelForm(formName) {
      let url =
        "http://localhost:8000/api/updateLevelTecher/" + this.teacherObj.id;
      let payload = {
        level: "",
        subject: "",
        // grade: "8",
        canBeKeyTeacher: "",
      };
      payload.level = this.formLevel.level;
      payload.canBeKeyTeacher = this.formLevel.canBeKeyTeacher;
      this.formLevel.subject.forEach(function (item, index, array) {
        // console.log(item, index);
        if (index == 0) payload.subject = item;
        else {
          payload.subject = payload.subject + "," + item;
        }
        // payload.ids
      });
      // console.log
      put(url, payload)
        .then((res) => {
          // console.log("Respon", res);
          this.dialogUpdateLevel = false;
          this.getTeacherData(this.currentPage);
          this.$refs[formName].resetFields();
          //   this.arrTeacher = res.data
          //   console.log(this.arrTeacher.length)
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
  mounted(currentPage) {
    this.getTeacherData(currentPage);
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
.el-table th {
  text-align: center;
}
.el-select {
  width: 90%;
}
.left-10 {
  left: 10%;
}
</style>
