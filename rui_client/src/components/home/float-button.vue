<template>
  <div class="float-button wrapper">
    <div class="inner">
      <div class="content">
        <div class="btn-wrapper">
          <el-button type="primary" @click="primaryClick" icon="el-icon-edit" circle></el-button>
        </div>
      </div>
    </div>
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
  width: 100%;
  left: 0px;
  bottom: 50px;
  .inner {
    max-width: 1350px;
    margin: 0 auto;
    display: flex;
    flex-direction: row-reverse;
    padding: 0 20px;
    @media screen and(min-width: 1350px) {
      padding: 0;
    }
    .content {
      display: flex;
      flex-direction: column-reverse;
      .btn-wrapper {
        margin-top: 5px;
        .el-button {
          width: 40px;
          height: 40px;
        }
      }
    }
  }
}
</style>
