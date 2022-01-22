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
              <h3 class="mb-0">Subject List</h3>
            </b-card-header>
            <el-table

              class="table table-bordered"
              header-row-class-name="thead-light"
              :span-method="objectSpanMethod"
              :data="posts"
              @selection-change="handleSelectionChange"
            >

              <el-table-column
                align="center"
                label=" Grade"
                min-width="150px"
                prop="grade"
              >
              </el-table-column>
              <el-table-column
                align="center"
                label="Subject"
                prop="subjectName"
                min-width="140px"
              >
              </el-table-column>
              <el-table-column label="Action" min-width="290px" align="center">
                <template slot-scope="scope">
                  <el-button
                    size="default"
                    type="danger"
                    @click="handleDetail(scope.$index, scope.row)"
                    >Detail</el-button
                  >
                </template>
              </el-table-column>

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
      multipleSelection: [],
    };
  },
  created() {
  },
  watch: {
    keyword(after, before) {
      this.getResults();
    }, 
  },
  computed: {
    ...mapGetters({
      //map `this.doneCount` to `this.$store.getters.doneTodosCount`
      user: "user",
    }),
  },
  methods: {
    getTeacherData() {
      let url = "http://localhost:8000/api/admin/subject/getall";
      get(url)
        .then((res) => {
        // console.log("res", res)
          // this.perPage = res.data.meta.per_page;
          // this.totalPage = res.data.meta.total;
          this.posts = res.data.data;
        })
        .catch((err) => {
          alert(err);
        });
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      let _row = 1,
        _col = 1;
      //The index of the column we want to merge
      if (![0].includes(columnIndex)) {
        return {
          rowspan: 1,
          colspan: 1
        };
      }
 
      const tableLen = this.posts.length;
      
      const preRow = this.posts[rowIndex - 1] || {};

      if (
        row.grade === preRow.grade 
        ) {
        _row = 0;

      } else if (rowIndex + 1 < tableLen) {
        for (let i = rowIndex + 1; i < tableLen; i++) {
          const nextRow = this.posts[i];
          if (
            nextRow.grade === row.grade 
          ) {
            _row++;
          } else {
            break;
          }
        }
      }
      return {
        rowspan: _row,
        colspan: _col
        
      };
    },
    
    handleDetail(index, row)
    {
      // console.log("row", row);
      this.$router.push("/admin/teacher/subject/getall/"+row.id);
    },
    handleSelectionChange(val) {
      // this.currentRow = val;
      this.multipleSelection = val;
      if (this.multipleSelection.length > 1) {
      }
    },
  },
  mounted(currentPage) {
    this.getTeacherData();
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
.el-table .cell{
  font-size: 13px ;
}
.el-table th div {
  overflow: inherit !important;
}
.el-table th > .cell {
  width: 100%;
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

div.right{
  
    /* align-content: right; */
    margin-left: 880px; 
        }
</style>
