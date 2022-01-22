<template>
  <div>
      <notifications></notifications>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
    </base-header>
    <div>
      <!--limit:最大上传数，on-exceed：超过最大上传数量时的操作  -->
      <el-upload
        v-if="dalen < 1"
        class="upload-demo"
        action=""
        :on-change="handleChange"
        :on-remove="handleRemove"
        :on-preview="handlePreview"
        :on-exceed="handleExceed"
        :limit="limitUpload"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
        :auto-upload="false"
        :file-list="fileList"
      >
        <el-button size="small" type="primary" v-if="dalen < 1">Tải tệp lên</el-button>
        <!-- <div slot="tip" class="el-upload__tip">只 能 上 传 xlsx / xls 文 件</div> -->
      </el-upload>

      <!-- 数据展示 -->
      <h1 class="title">{{fileName}}</h1>
      <el-main v-if="dalen > 0">
        <el-table :data="da" ref="table">
          <!-- <el-table-column prop="code" label="Code"> </el-table-column> -->
          <el-table-column prop="username" label="Username" min-width="100px" align="center"> </el-table-column>
          <el-table-column prop="fullname" label="Fullname" align="center"> </el-table-column>
          <el-table-column prop="phone" label="Telephone" align="center"> </el-table-column>
          <el-table-column prop="email" min-width="130px" label="Email" align="center"> </el-table-column>
          <el-table-column prop="level" min-width="130px" label="Level" align="center"> </el-table-column>
          <el-table-column prop="password" min-width="130px" label="Password" align="center"> </el-table-column>
          <el-table-column prop="gender" min-width="45px" label="Gender" align="center"> </el-table-column>
          <el-table-column prop="lop_id" min-width="45px" label="Lop_id" align="center"> </el-table-column>
        </el-table>
      </el-main>
      <div style="text-align: center;">
      <el-button type="success" @click="handleUpload" v-if="dalen > 0" 
        >Hoàn thành</el-button
      >
      <el-button type="danger" @click="handleRemove" v-if="dalen > 0" 
        >Huỷ</el-button
      >
      </div>

    </div>
  </div>
</template>
<script>
import XLSX from "xlsx";
import Vue from "vue";
Vue.use(XLSX);
import {
  Upload,
  Button,
  ButtonGroup,
  Main,
  Table,
  TableColumn,
} from "element-ui";
// import { event } from 'd3';
import { get, put, del, post } from "../../services/services";
import Notifications from '../../components/NotificationPlugin/Notifications.vue';
Vue.use(Button);
Vue.use(Upload);
Vue.use(ButtonGroup);
Vue.use(Main);
Vue.use(Table);
Vue.use(TableColumn);
export default {
  components: { Notifications },
  data() {
    return {
      limitUpload: 1,
      fileTemp: null,
      file: null,
      fileName: null,
      da: [],
      fileList: [],
      dalen: 0,
    };
  },
  watch: {
    "$route.params.id": function (id) {
      this.handleUpload();
    },    
  },
  methods: {
      handlePreview(file) {
        console.log(file);
      },
    handleChange(file, fileList) {
      this.fileTemp = file.raw;
      if (this.fileTemp) {
        if (
          this.fileTemp.type ==
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          this.fileTemp.type == "application/vnd.ms-excel"
        ) {
          this.importfxx(this.fileTemp);
        } else {
          this.$message({
            type: "warning",
            message: "Định dạng của tệp đính kèm là sai, vui lòng xóa nó và tải lên lại!",
          });
        }
      } else {
        this.$message({
          type: "warning",
          message: "Vui lòng tải lên tệp đính kèm！",
        });
      }
    },
    handleExceed() {
      this.$message({
        type: "warning",
        message: "超出最大上传文件数量的限制！",
      });
      return;
    },
    handleRemove() {
      this.fileTemp = null;
      this.da = null;
      this.dalen = 0;
      this.fileName = null
      return this.$refs.table.reload;
    },
    importfxx(obj) {
      let _this = this;
      let inputDOM = this.$refs.inputer;
      // 通过DOM取文件数据
      console.log("obj name",obj.name);
      // this.file = event.currentTarget.files[0];
      this.fileName = obj.name
      this.file = obj;
      var rABS = false; //是否将文件读取为二进制字符串
      var f = this.file;
      var reader = new FileReader();
      //if (!FileReader.prototype.readAsBinaryString) {
      FileReader.prototype.readAsBinaryString = function (f) {
        var binary = "";
        var rABS = false; //是否将文件读取为二进制字符串
        var pt = this;
        var wb; //读取完成的数据
        var outdata;
        var reader = new FileReader();
        reader.onload = function (e) {
          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          var XLSX = require("xlsx");
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              //手动转化
              type: "base64",
            });
          } else {
            wb = XLSX.read(binary, {
              type: "binary",cellDates: true, dateNF: 'yyyy/mm/dd;@'
            });
          }
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]],{raw: false}); //outdata就是你想要的东西
          // console.log('未处理的原始数据如下：');
          console.log('outdata',outdata);
          //此处可对数据进行处理
          let arr = [];
          outdata.map((v) => {
            let obj = {};
            let nameTemp = [];
            // console.log("obj", obj)
            obj.fullname = v["Fullname"];
            obj.username = v["Username"];
            obj.email = v["Email"];
            obj.password = v["Password"];
            obj.phone = v["Telephone"];
            obj.gender = v["Gender"];
            obj.lop_id = v["Lop_id"];
            nameTemp = obj.email.split('@');
            var birthdayTemp = v["Birthday"];
            // console.log("XXX", birthdayTemp)
            var birthdayArray = birthdayTemp.split("/");
            var birthday = new Date(birthdayArray[2],birthdayArray[1],birthdayArray[0])
            obj.birthdayYear = parseInt(birthdayArray[2]);
            obj.birthdayMonth = birthday.getMonth();
            obj.birthdayDate = birthday.getDate();
            arr.push(obj);
          });
          _this.da = arr;
          _this.dalen = arr.length;
          console.log('data',_this.da )
          console.log('dataleng',_this.dalen )
          console.log('arr',arr )
          return arr;
        };
        reader.readAsArrayBuffer(f);
      };
      // console.log(this.da)
      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },
    handleUpload() {
      // console.log(this.da);
      let url = "http://localhost:8000/api/admin/teacher/upload/"+this.$route.params.id;
      console.log("url",url)
      let payload = {
        data: [],
      };
      payload.data = this.da;
      console.log('payload',payload.data);
      post(url, payload)
        .then((res) => {
          console.log("Respon", res);
        if(res.data.count <0){
            this.showNotification("danger","Học sinh thuộc lớp không có trong hệ thống")
        this.handleRemove();
        }else
        {
          this.showNotification("success","Đã lưu dữ liệu thành công")
        this.handleRemove();
        }
        })
        .catch((err) => {
        //   alert(err);
        console.log("Respon", err);
        this.showNotification("danger","Dữ liệu không hợp lệ")
        this.handleRemove();
        });
    },
    showNotification(type,message){
      this.$notify({
              message:
                message,
              icon: "add_alert",
              horizontalAlign: 'right',
              verticalAlign: 'top',
              type: type,
            });
    },
  },
  // mounted(file,fileList){
  //   this.handleChange(file,fileList);
  // }
};
</script>
<style>
.el-upload, .margin-center{
  margin: 2.5rem 32.5rem;
}
.title{
  margin: 2.5rem;
  text-align: center;
}
.el-table .cell {
    word-break: break-word;
}
</style>