<template>
  <el-aside :width="`${barWidth}px`">
    <div class="wrapper">123</div>
  </el-aside>
</template>

<script>
export default {
  data() {
    return {
      barWidth: 250,
      hide: false
    };
  },
  mounted() {
    if (document.body.clientWidth < 500) {
      this.barWidth = 0;
      this.hide = true;
    }
  }
};
</script>

<style lang='scss' scoped>
.el-aside {
  background-color: white;
  box-shadow: 0px 0 5px rgba(0, 0, 0, 0.2);
}
.wrapper {
  padding: 20px;
}
</style>