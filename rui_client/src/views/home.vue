<template>
  <div id="home">
    <div class="hoem-title">Project List</div>
    <el-row :gutter="20">
      <el-col :sm="8">
        <projectCard title="测试标题" desc="测试内容" :time="new Date()"/>
      </el-col>
      <el-col :sm="8">
        <projectCard title="测试标题" desc="测试内容" :time="new Date()"/>
      </el-col>
      <el-col :sm="8">
        <projectCard title="测试标题" desc="测试内容" :time="new Date()"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import projectCard from "../components/home/project-card";
export default {
  name: "home",
  components: {
    projectCard
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
#home {
  max-width: 1200px;
  margin: 0 auto;
  .hoem-title {
    color: #606266;
    border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
    padding-bottom: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .project-card {
    margin: 10px 0;
  }
}
</style>
