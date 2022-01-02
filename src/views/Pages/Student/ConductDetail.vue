<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success"></base-header>
    <b-container fluid class="mt--7">
      <b-row>
        <b-col>
          <b-card no-body>
            <b-card-header class="border-0">
              <h3 class="mb-0">Mark Detail</h3>
            </b-card-header>

            <el-table
              class="table-responsive"
              header-row-class-name="thead-dark"
              :data="posts"
            >
              <el-table-column
                label="SchoolYear"
                prop="schoolYear"
                min-width="80px"
                align="center"
                >
                </el-table-column>
              <el-table-column
                label="Semester"
                prop="semester"
                min-width="80px"
                align="center"
              >
              </el-table-column>
                <el-table-column
                label="Mark"
                prop="mark"
                min-width="200px"
                align="center"
                >
                </el-table-column>
              <el-table-column
                label="Comment"
                prop="comment"
                min-width="200px"
                align="center"
              >    
              </el-table-column>            
            </el-table>
            <b-card-footer class="py-4 d-flex justify-content-end">
              <b-pagination
                :total-rows="totalPage"
                v-model="currentPage"
                :per-page="perPage"
                @input="fetchConductData(currentPage)"
              ></b-pagination>
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
import projects from "../../Tables/projects";
import { get, put,del, post } from "../../../services/services";
import Vue from "vue";
import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);
import { mapGetters } from "vuex";
Vue.prototype.$confirm = MessageBox.confirm;
export default {
  components: {
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
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  data() {
    return {
      projects,
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
      form: {
        fif: {},
        fort: {},
        nine: {}
      },
      labelPosition: "left",
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
  computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn},
      role : function(){ return this.$store.getters.role}
    },
  methods: {
    fetchConductData() {
        let url ="http://localhost:8000/api/student/conduct/getall/"+this.$store.getters.user.id
        get(url)
          .then((res) => {
            this.posts = res.data.data;
          })
          .catch((err) => {
            alert(err);
          });
      },
  },
    
  mounted(currentPage) {
    this.fetchConductData(currentPage);
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
