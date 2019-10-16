<template>
  <div id="login">
    <el-row>
      <el-col :md="10" class="left">left</el-col>
      <el-col :md="14" class="right">
        right
        <!-- <img class="right-img" src="https://api.dujin.org/bing/1366.php" /> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LoginForm from "../components/login/form";
export default {
  name: "login",
  components: {
    LoginForm
  }
};
</script>

<style lang='scss'>
#login {
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  .el-row {
    height: 100%;
    overflow: hidden;
    .left {
      height: 100%;
    }
    .right {
      height: 100%;
      background: url("https://api.dujin.org/bing/1366.php") no-repeat;
      overflow: hidden;
    }
  }
}
</style>