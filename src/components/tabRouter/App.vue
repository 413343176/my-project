<template>
  <div>
    <router-link :to="{ path: '/login' }">登录界面</router-link>
    <router-link :to="{ name: 'Main' }">主界面</router-link>
    <router-link :to="{ name: 'Page1' }">Page1页面</router-link>
    <p>{{ this.$route.name }}</p>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
