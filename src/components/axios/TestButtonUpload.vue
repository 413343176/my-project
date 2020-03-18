<template>
  <div class="parent">
    <el-row :gutter="20">
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <input class="file-name" type="text" v-bind:value="fileName" /></div
      ></el-col>
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <input
            class="inputfile"
            type="file"
            name="file"
            id="myFile"
            v-on:change="getFile"
            accept=""
          />
          <label for="myFile" class="el-icon-upload">点击上传文件</label>
        </div></el-col
      >
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <input class="file-size" type="text" v-bind:value="fileSize" /></div
      ></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    </el-row>

    <button v-on:click="uploadClick">上传</button>
    <button v-on:click="downloadClick">下载</button>
    <button class="test-button" v-on:click="buttonClick">点击通讯</button>
    <img v-bind:src="imagePath" class="image" />
    <el-button icon="el-icon-upload" @click="visible = true">Button</el-button>
    <el-dialog :visible.sync="visible" title="Hello world">
      <p>Try Element</p>
    </el-dialog>
    <div class="progress">
      <span
        v-bind:style="{
          width: item.uploadPercentage,
          backgroundColor: item.uploadStatus == 1 ? '' : 'red'
        }"
      ></span>
    </div>
  </div>
</template>
<script>
import fs from "fs";
import Util from "./Util.js";
export default {
  data: function() {
    return {
      imagePath: "",
      file: "",
      visible: false,
      fileName: "",
      item: { uploadStatus: 2, uploadPercentage: 0 },
      fileSize: ""
    };
  },

  methods: {
    buttonClick: function() {
      console.log("buttonClick");
      let data = {
        CstNo: "1234",
        PrintPwd: "1234"
      };
      let config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      this.$axios
        .post("http://127.0.0.1:50002/CheckPass/CheckPass", config)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getFile: function(event) {
      this.file = event.target.files[0];
      console.log(this.file);
      this.fileName = this.file.name;
      console.log(Util.formatFileSize(this.file.size, 0));
      this.fileSize = Util.formatFileSize(this.file.size, 0);
      Util.formatFileSize(this.file.size, 0);
    },
    uploadClick: function() {
      let param = new FormData();
      param.append("file", this.file);
      param.append("isAbsolutePath", "true");
      param.append("destDir", "d://");
      let that = this;
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        timeout: 10000,
        onUploadProgress: function(event) {
          console.log(event);
          that.item.uploadPercentage = (event.loaded / event.total) * 100 + "%";
          console.log(that.item.uploadPercentage);
        }
      };
      this.item.uploadStatus = "1";
      this.$axios
        .post("http://127.0.0.1:50002/upService/uploadFile", param, config)
        .then(response => {
          console.log(response);
          this.item.uploadStatus = "1";
        })
        .catch(error => {
          Promise.reject(error);
          console.log(error);
          this.item.uploadStatus = "2";
          console.log(this.item.uploadStatus);
        });
    },
    downloadClick: function() {
      // let formData = new FormData();
      // formData.append("file", this.file);
      // formData.append("name", "zhangsan");

      // let config = {
      //   headers: {
      //     "Conten-Type": "multipart/form-data"
      //   }
      // };

      // this.$axios
      //   .post("http://127.0.0.1:50002/upload/UserList", formData, config)
      //   .then(response => {
      //     console.log(response);
      //   })
      //   .catch(response => {
      //     console.log(response);
      //   });
      // 获取远端图片
      this.$axios({
        method: "get",
        url: "http://127.0.0.1:50002/images/lk06.jpg",
        responseType: "blob"
      }).then(function(response) {
        console.log(response);
        let blob = new Blob([response.data], {
          type: "image/jpeg"
        });
        let fileName = Date.parse(new Date()) + ".jpg";
        if (window.navigator.msSaveOrOpenBlob) {
          // console.log(2)
          navigator.msSaveBlob(blob, fileName);
        } else {
          // console.log(3)
          var link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = fileName;
          link.click();
          //释放内存
          window.URL.revokeObjectURL(link.href);
        }
      });
    }
  }
};
</script>
<style scoped>
.test-button {
  color: red;
}
.image {
  height: 300px;
}
.parent {
  position: static;
}

.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
.inputfile + label {
  font-size: 1.1em;
  font-weight: 800;
  color: white;
  background-color: rgb(26, 116, 151);
  display: inline-block;
}
.inputfile:focus + label,
.inputfile + label:hover {
  background-color: green;
  cursor: pointer;
}
.file-name {
  max-width: 100px;
}
.file-size {
  max-width: 100px;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.progress {
  position: relative;
  width: 80%;
  height: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  /*注意这里*/
  box-shadow: 0 0 1px 0px #ddd inset;
}

.progress span {
  position: absolute;
  display: inline-block;
  width: 10%;
  height: 100%;
  background-color: #3e97df;
}
</style>
