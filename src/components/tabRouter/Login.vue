<template>
  <div>
    <el-button type="success" @click="loginClick">登录</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // message: "Login"
    };
  },
  methods: {
    loginClick() {
      this.$router.push({ path: "/main" });
    }
  }
};
</script>

<style></style>
