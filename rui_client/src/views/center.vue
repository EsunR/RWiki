<template>
  <el-container>
    <el-aside width="100px">
      <aside-bar></aside-bar>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import AsideBar from "../components/aside/aside-bar";
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
.el-aside {
  height: 100%;
  color: #ffffff;
}
</style>