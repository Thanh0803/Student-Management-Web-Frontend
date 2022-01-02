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
                  label="Subject"
                  min-width="110px"
                  align="center"
                  v-for=" item in items_subject" :key="item.message"
                  :prop = item.message
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
            </el-table>
            <b-card-footer class="py-4 d-flex justify-content-end">
              <b-pagination
                :total-rows="totalPage"
                v-model="currentPage"
                :per-page="perPage"
                @input="getMarkData(currentPage)"
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
      teacher: [],
      levelTeacher: [],
      form: {
        fif: {},
        fort: {},
        nine: {}
      },
      labelPosition: "left",
      items_subject: [],
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
      let url = "http://localhost:8000/api/student/mark/getall/"+this.$route.params.id+"?page=" + currentPage;
      get(url)
        .then((res) => {
          this.perPage = res.data.meta.per_page;
          this.totalPage = res.data.meta.total;
          this.posts = res.data.data;
          var temp = res.data.data;
          console.log("this.posts",this.posts)
          
          let arr_subject = []
          let arr_fif = []
          let arr_fort = []
          let arr_nine = []

          temp.forEach((element, index_element)=>{
              if (index_element == 1)
              {
                var object_subject = {message : 'subject.subjectName'}
                arr_subject.push(object_subject)
              }
          });
          temp[0].fif.forEach((value, index) => {
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
          
          

          this.items_subject = arr_subject
          console.log(" this.items_subject", this.items_subject)
          this.items_fif = arr_fif 
          console.log(" this.items_fif", this.items_fif)
          this.items_fort = arr_fort 
          this.items_nine= arr_nine
        })
        .catch((err) => {
          alert(err);
        });
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
