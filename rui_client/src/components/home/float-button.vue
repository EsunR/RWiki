<template>
  <div class="float-button wrapper">
    <el-button type="primary" @click="primaryClick" icon="el-icon-edit" circle></el-button>
  </div>
</template>

<script>
export default {
  props: ["primaryClick"]
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: fixed;
  button {
    width: 50px;
    height: 50px;
  }
}
</style>
