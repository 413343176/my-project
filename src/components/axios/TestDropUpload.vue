<template>
  <div class="m-5 dropbox" id="drop-box">
    <h2 v-if="items.length == 0">请把文件拖拽到这</h2>

    <div v-for="(item, index) in items" v-bind:key="index">
      <div>{{ item.name }}</div>
      <div class="progress">
        <span
          v-bind:style="{
            width: item.uploadPercentage,
            backgroundColor: item.uploadStatus == 1 ? '' : 'red'
          }"
        ></span>
      </div>
    </div>
    <!-- <el-button type="primary" v-on:click="buttonClick">主要按钮</el-button> -->
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      items: []
    };
  },
  methods: {
    buttonClick: function(e) {
      console.log(e);
    },
    uploadFile: function(file) {
      let item = {
        name: file.name,
        uploadPercentage: "0",
        uploadStatus: "1"
      };
      this.items.push(item);
      let param = new FormData();
      param.append("file", file);
      param.append("isAbsolutePath", "true");
      param.append("destDir", "d://");
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        timeout: 10000,
        onUploadProgress: function(event) {
          console.log(event);
          item.uploadPercentage = (event.loaded / event.total) * 100 + "%";
          console.log(item.uploadPercentage);
        }
      };
      item.uploadStatus = "1";
      this.$axios
        .post("http://127.0.0.1:50002/upService/uploadFile", param, config)
        .then(response => {
          console.log(response);
          item.uploadStatus = "1";
        })
        .catch(error => {
          Promise.reject(error);
          console.log(error);
          item.uploadStatus = "2";
          console.log(item.uploadStatus);
        });
    },
    onDrag: function(event) {
      event.stopPropagation();
      event.preventDefault();
      // console.log(event);
    },
    onDrop: function(event) {
      this.items = [];
      event.stopPropagation();
      event.preventDefault();
      console.log(event);
      let dt = event.dataTransfer;
      this.files = dt.files;
      for (let i = 0; i < this.files.length; i++) {
        this.uploadFile(this.files[i]);
      }
    }
  },
  mounted: function() {
    let dropBox = document.getElementById("drop-box");
    dropBox.addEventListener("dragenter", this.onDrag, false);
    dropBox.addEventListener("dragover", this.onDrag, false);
    dropBox.addEventListener("drop", this.onDrop, false);
  }
};
</script>
<style scoped>
.dropbox {
  border: 0.25rem dashed #007bff;
  min-height: 5rem;
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
