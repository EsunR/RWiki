<template>
  <div id="login">
    <el-row>
      <el-col :md="14" class="left">
        <login-form></login-form>
      </el-col>
      <el-col :md="10" class="right">
        <right></right>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LoginForm from "../components/login/form";
import right from "../components/login/right";
export default {
  name: "login",
  components: {
    LoginForm,
    right
  },
  mounted() {
    this.$store.dispatch("setFullScreen", true);
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
    }
  }
}
</style>