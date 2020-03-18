<template>
  <div>
    <el-upload
      class="upload-demo"
      drag
      action="xx"
      multiple
      :file-list="fileList"
      v-bind:data="fileData"
      :on-success="onSuccess"
      :on-error="onError"
      :before-upload="beforeUpload"
      :show-file-list="showFileList"
      accept="image/*"
      ref="upload"
      :http-request="uploadFile"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
    <el-button type="primary" @click="clearAll">删除</el-button>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      file: {},
      // param.append("file", this.file);
      // param.append("isAbsolutePath", "true");
      // param.append("destDir", "d://");
      fileList: [{ name: "food.jpg", url: "https://xxx.cdn.com/xxx.jpg" }],
      fileData: { destDir: "d://", file: this.file, isAbsolutePath: "true" },
      // fileData: [1, 2],
      showFileList: true,
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      value: true
    };
  },

  methods: {
    getFileData: function() {
      var formData = new FormData();
      formData.append("file", this.file);
      formData.append("isAbsolutePath", "true");
      formData.append("destDir", "d://");
      return formData;
    },

    beforeUpload: function(file) {
      this.file = file;
    },
    onSuccess: function(response, file, fileList) {
      console.log(response);
      console.log(file);
      console.log(fileList);
    },
    onError: function(err, file, fileList) {
      console.log(err);
      console.log(file);
      console.log(fileList);
    },
    clearAll() {
      console.log("clearAll");
      this.$refs.upload.submit();
    },
    uploadFile() {
      console.log("upload");
    }
  },

  computed: {
    myHeaders() {
      console.log("headers computed");

      return {
        "Content-Type": "multipart/form-data;"
      };
    }
  }
};
</script>
