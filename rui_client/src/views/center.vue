<template>
  <el-container>
    <aside-bar></aside-bar>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import AsideBar from "../components/center/aside/aside-bar";
export default {
  name: "center",
  components: {
    AsideBar
  },
  data() {
    return {};
  }
};
</script>

<style lang='scss' scoped>

</style>