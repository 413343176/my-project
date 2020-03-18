<template>
  <div id="app">
    <div class="cropper">
      <avatar-uploader :init-url="imageUrl"></avatar-uploader>
    </div>
    <test-button-upload></test-button-upload>
    <test-drop-upload />
    <test-element-upload></test-element-upload>
    <Header></Header>
    <Todo></Todo>
    <Footer></Footer>
    <div></div>
  </div>
</template>

<script>
import Header from "./components/todo/Header.vue";
import Footer from "./components/todo/Footer.vue";
import Todo from "./components/todo/Todo.vue";
import Bus from "./javascript/Bus.js";
import Vue from "vue";
import TestButtonUpload from "./components/axios/TestButtonUpload.vue";
import TestDropUpload from "./components/axios/TestDropUpload.vue";
import TestElementUpload from "./components/axios/TestElementUpload.vue";
import AvatarUploader from "./components/photo/AvatarUploader";

Vue.use(Bus);
export default {
  components: {
    TestButtonUpload: TestButtonUpload,
    TestDropUpload: TestDropUpload,
    TestElementUpload: TestElementUpload,
    Header: Header,
    Footer: Footer,
    Todo: Todo,
    AvatarUploader
  },
  data: function() {
    return {
      imageUrl: "http://127.0.0.1:50002/images/lk05.jpg"
    };
  },
  mounted: function() {
    this.$Bus.bind("buttonClick", this.callback);
  },
  created: function() {},
  beforeDestroy: function() {
    this.$Bus.unbind("buttonClick", this.callback);
  },
  methods: {
    callback: function(msg) {
      console.log(msg);
    }
  }
};
</script>

<style scoped>
.item {
  background-color: blue;
}
.cropper {
  width: 500px;
  height: 400px;
}
</style>
