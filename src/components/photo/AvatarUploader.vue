<template>
  <div>
    <el-button ref="test" type="primary" id="test" @click="testButtonClick"
      >主要按钮</el-button
    >
    <button id="test1" @click="testButtonClick1">测试1</button>
    <el-upload
      action="#"
      list-type="picture-card"
      :auto-upload="false"
      :on-change="onChange"
      :multiple="false"
      ref="uploader"
      :file-list="fileList"
      :limit="1"
    >
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{ file }">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions" v-show="showUploadItem">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in"></i>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete"></i>
          </span>
        </span>

        <div
          class="reupload"
          ref="uploading"
          v-show="showUploading"
          :style="{
            width: reuploadWidth + 'px',
            height: reuploadWidth + 'px',
            'line-height': reuploadWidth + 'px',
            'font-size': reuploadWidth / 5 + 'px',
            display: 'block'
          }"
        >
          上传中..
        </div>
        <div
          class="reupload"
          ref="failUpload"
          v-show="showUploadFail"
          :style="{
            width: reuploadWidth + 'px',
            height: reuploadWidth + 'px',
            'line-height': reuploadWidth + 'px',
            'font-size': reuploadWidth / 5 + 'px',
            display: 'block'
          }"
        >
          <i>上传失败</i>
        </div>
      </div>
    </el-upload>
    <!-- 预览窗格 -->
    <el-dialog :visible.sync="previewModel">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
    <!-- 剪裁组件弹窗 -->
    <el-dialog
      :visible.sync="cropperModel"
      width="1000px"
      :before-close="beforeClose"
    >
      <Cropper
        :img-file="file.url"
        ref="vueCropper"
        :fixedNumber="fixedNumber"
        @upload="upload"
      >
      </Cropper>
    </el-dialog>
  </div>
</template>
<script>
import Cropper from "./Cropper";
// import axios from '@/assets/js/axios'
import Util from "@/components/axios/Util.js";
export default {
  name: "uploader",
  props: {
    initUrl: {
      // 初始图片链接
      default: ""
    },
    fixedNumber: {
      // 剪裁框比例设置
      default: function() {
        return [1, 1];
      }
    },
    width: {
      // 单图剪裁框宽度
      type: Number,
      default: 178
    },
    height: {
      // 单图剪裁框高度
      type: Number,
      default: 178
    }
  },
  data() {
    return {
      file: "", // 当前被选择的图片文件
      fileList: [],
      imageUrl: "", // 单图情况框内图片链接
      dialogImageUrl: "", // 多图情况弹窗内图片链接
      reupload: true, // 控制"重新上传"开关
      cropperModel: false, // 剪裁组件弹窗开关
      previewModel: false, //预览
      reuploadWidth: this.height * 0.7, // 动态改变”重新上传“大小
      disabled: false,
      showUploadItem: true,
      showUploadFail: false,
      showUploading: false
    };
  },
  updated() {
    if (this.$refs.vueCropper) {
      this.$refs.vueCropper.Update();
    }
  },
  watch: {
    initUrl: function(val) {
      // 监听传入初始化图片
      // console.info('watch');
      if (val) {
        if (typeof this.initUrl === "string") {
          this.imageUrl = val;
        }
      }
    }
  },
  mounted() {
    if (typeof this.initUrl === "string") {
      this.imageUrl = this.initUrl;
    }
  },
  methods: {
    testButtonClick() {
      console.log("按钮事件");
      this.$message({
        showClose: true,
        message: "按钮事件",
        type: "success"
      });
    },
    testButtonClick1() {
      //使用js原生方式根据id找到dom对象，并触发点击事件
      document.getElementById("test").click();
      //使用vue的ref方式找到原生dom对象，并触发点击事件
      this.$refs.test.$el.click();
      //使用vue的ref方式找到子组件，并触发子组件的click事件
      this.$refs.test.$emit("click");
    },
    onChange(file, fileList) {
      this.file = file;
      this.cropperModel = true;
      console.log("照片已选择：" + file.url);
    },
    /** **************************** single单图情况 **************************************/
    handlePictureCardPreview(file) {
      this.previewModel = true;
      // 点击进行图片展示
      this.dialogImageUrl = file.url;
      console.log("预览弹框 " + this.dialogImageUrl + " " + this.file.url);
    },
    handleRemove(file) {
      this.$refs.uploader.clearFiles();
    },
    async upload(data) {
      // console.log(data);
      // 自定义upload事件
      this.showUploadItem = false;
      this.showUploading = true;
      let img = new Image();

      img.onload = async () => {
        let blob = this.dataURItoBlob(data);
        let formData = new FormData();
        let nameArr = Util.splitFileName(this.file.name);
        formData.append(
          "file",
          blob,
          nameArr[0] +
            "_" +
            Util.dateFormat("YYYYmmddHHMMSS", new Date()) +
            nameArr[1]
        ); // 有的后台需要传文件名，不然会报错
        // destDir: "d://", file: this.file, isAbsolutePath: "true"
        formData.append("destDir", "d://");
        formData.append("isAbsolutePath", "true");
        this.imgUpload(formData);
        console.log("img.onload");
      };
      img.src = data;
    },

    async imgUpload(formData) {
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };

      this.$axios
        .post("http://127.0.0.1:50002/upService/uploadFile", formData, config)
        .then(response => {
          this.cropperModel = false;
          console.log(response);
          // this.item.uploadStatus = "1";
          // this.$emit("imgupload", currentPic);
          this.$message({
            showClose: true,
            message: "上传成功",
            type: "success"
          });
          this.showUploading = false;
          this.fileList = [
            { name: "lk05.jpg", url: "http://127.0.0.1:50002/images/lk05.jpg" }
          ];
        })
        .catch(error => {
          this.cropperModel = false;
          Util.showError(error, this);
          this.showUploadItem = true;
          this.showUploadFail = true;
          this.showUploading = false;
        });
    },
    beforeClose(done) {
      this.cropperModel = false;
      console.log(this.cropperModel);
      this.$message(this.cropperModel + "  ");
    },
    // base64转成bolb对象
    dataURItoBlob(base64Data) {
      let byteString;
      if (base64Data.split(",")[0].indexOf("base64") >= 0) {
        byteString = atob(base64Data.split(",")[1]);
      } else {
        byteString = unescape(base64Data.split(",")[1]);
      }
      let mimeString = base64Data
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];
      let ia = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ia], { type: mimeString });
    }
  },
  components: {
    Cropper
  }
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  color: #8c939d;
  text-align: center;
}
.avatar {
  display: block;
}
.reupload {
  border-radius: 50%;
  position: absolute;
  color: #fff;
  background-color: #000000;
  opacity: 0.6;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none;
}
#uploadIcon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none;
}
</style>
