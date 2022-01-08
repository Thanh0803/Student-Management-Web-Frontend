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
              <h3 class="mb-0">Mark Detail</h3>
            </b-card-header>

            <el-table
              class="table-responsive table"
              header-row-class-name="thead-light"
              :data="posts"
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                fixed
                label=" Fullname"
                min-width="150px"
                prop="student.fullname"
                align="center"
              >
              </el-table-column>
              <el-table-column
                label="15mins"
                min-width="110px"
                align="center"
                v-for=" item in items_fif" :key="item.message"
                :prop = item.message
              >
              </el-table-column>
                <el-table-column
                  label="45mins"
                  min-width="110px"
                  align="center"
                  v-for="item in items_fort" :key="item.message"
                  :prop = item.message
                >
                </el-table-column>
              <el-table-column
                label="90mins"
                min-width="110px"
                align="center"
                v-for="item in items_nine" :key="item.message"
                :prop = item.message
              >    
              </el-table-column>
              <el-table-column label="Action" min-width="120px" align="center" fixed="right">
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
            <b-card-footer class="py-4 d-flex justify-content-end">
              <!-- <base-pagination v-model="currentPage" :per-page="20" :total="50" :@input="getTeacherData(currentPage)"></base-pagination> -->
              <b-pagination
                :total-rows="totalPage"
                v-model="currentPage"
                :per-page="perPage"
                @input="getMarkData(currentPage)"
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
        title="Chỉnh sửa điểm "
        :visible.sync="dialogEdit"
        :before-close="handleClose"
        width="70%"
      >
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="15mins">
            <el-input
              v-model="form.fif[item.id]"
              v-for="item in fif_items" :key="item.id"
              :placeholder = item.message
            ></el-input>
          </el-form-item>
          <el-form-item label="45mins">
            <el-input
              v-model="form.fort[item.id]"
               v-for="item in fort_items" :key="item.id"
              :placeholder = item.message
            ></el-input>
          </el-form-item>
          <el-form-item label="90mins">
            <el-input
              v-model="form.nine[item.id]"
               v-for="item in nine_items" :key="item.id"
              :placeholder = item.message
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
Vue.prototype.$confirm = MessageBox.confirm;


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
        fif: {},
        fort: {},
        nine: {}
      },
      labelPosition: "left",
      items_fif: [],
      items_fort: [],
      items_nine: [],
      fif_items : [],
      fort_items : [],
      nine_items : [],
      row_id : 0
    };
  },
  created() {
  },
  watch: {
    keyword(after, before) {
      this.getResults();
    },
    "$route.params.id": function (id) {
      this.getMarkData();
    },    
  },
  computed: {
    ...mapGetters({
      //map `this.doneCount` to `this.$store.getters.doneTodosCount`
      user: "user",
    }),
  },
  methods: {
    getMarkData(currentPage) {
      let url = "http://localhost:8000/api/teacher/class/subject/detail/"+this.$route.params.id+"?page=" + currentPage;
      get(url)
        .then((res) => {
          this.perPage = res.data.meta.per_page;
          this.totalPage = res.data.meta.total;
          this.posts = res.data.data;
          var temp = res.data.data;
          console.log("temp", temp)
          
          let arr_fif = []
          let arr_fort = []
          let arr_nine = []

          temp[0].fif.forEach((value, index) => {
            // console.log("value.mark",value.mark)
            var object_fif = {message : 'fif['+index +"].mark"}
            arr_fif.push(object_fif)
          });
          temp[0].fort.forEach((value, index) => {
            var object_fort = {message : 'fort['+index +"].mark"}
            arr_fort.push(object_fort)
          });
          temp[0].nine.forEach((value, index) => {
            var object_nine = {message : 'nine['+index +"].mark"}
            arr_nine.push(object_nine)
          });

          this.items_fif = arr_fif 
          this.items_fort = arr_fort 
          this.items_nine= arr_nine
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
      let url = "http://localhost:8000/api/teacher/mark/update/" + this.row_id;
      console.log("url",url)
      let payload = this.form;
      console.log("payload", payload);
      put(url, payload)
        .then((res) => {
          // console.log("Respon", res);
          this.dialogEdit = false;
          this.getMarkData(this.currentPage);
        })
        .catch((err) => {
          alert(err);
        });
      // console.log("form", this.form);
    },
  
    handleClose(done) {
        this.$confirm("Are you sure to close this dialog?")
            .then((_) => {
            done();
            })
            .catch((_) => {});
    },
    async getMarkById(id) {
      let url = "http://localhost:8000/api/teacher/type/" + id;
      let json = await get(url);
      return json;
    },
    async handleEdit(index, row) {
      this.dialogEdit = true;

      let fif = []
      let fort = []
      let nine = []

      row.fif.forEach((value, index) => {
        // console.log("value", value.mark)
        var obj_fif = {message : value.mark, id : value.id}
        fif.push(obj_fif);
      });
      row.fort.forEach((value, index) => {
        // console.log("value", value.mark)
        var obj_fort = {message : value.mark, id : value.id}
        fort.push(obj_fort);
      });
      row.nine.forEach((value, index) => {
        // console.log("value", value.mark)
        var obj_nine = {message : value.mark, id : value.id}
        nine.push(obj_nine);
      });

      this.fif_items = fif
      this.fort_items = fort
      this.nine_items = nine
      // console.log("Row",row)
      this.row_id = row.id
    },
  },
    
  mounted(currentPage) {
    this.getMarkData(currentPage);
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
  left: 50%;
}
</style>
