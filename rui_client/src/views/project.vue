<template>
  <el-container>
    <aside-index></aside-index>
    <el-main>
      <project-info :projectInfo="projectInfo"></project-info>
      <Article></Article>
    </el-main>
  </el-container>
</template>

<script>
import AsideIndex from "../components/project/aside-index";
import Article from "../components/project/article";
import ProjectInfo from "../components/project/project-info";
export default {
  name: "project",
  components: {
    AsideIndex,
    Article,
    ProjectInfo
  },
  data() {
    return {
      projectInfo: {},
      article: []
    };
  },
  props: ["pid"],
  methods: {
    getProjectData() {
      this.axios
        .get(`/project/getProjectByPid?pid=${this.pid}`)
        .then(res => {
          let data = res.data.data;
          this.article = data.articles;
          delete data.articles;
          this.projectInfo = data;
        })
        .catch(err => {
          console.log(err);
          this.$message.error(`${err}`);
        });
    }
  },
  mounted() {
    this.getProjectData();
  }
};
</script>

<style lang='scss' scoped>
.el-main {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
}
</style>