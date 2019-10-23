<template>
  <el-container>
    <aside-index />
    <el-main>
      <project-info :projectInfo.sync="projectInfo" />
      <project-article v-for="item in article" :key="item.id" />
      <article-editor :projectInfo="projectInfo" />
    </el-main>
  </el-container>
</template>

<script>
import AsideIndex from "../components/project/aside-index";
import ProjectArticle from "../components/project/article";
import ProjectInfo from "../components/project/project-info";
import ArticleEditor from "../components/project/article-editor";
export default {
  name: "project",
  components: {
    AsideIndex,
    ProjectArticle,
    ProjectInfo,
    ArticleEditor
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
  height: 100%;
  max-width: 1000px;
  margin: 0 auto;
  overflow-y: scroll;
  /* 设置滚动条的样式 */
  &::-webkit-scrollbar {
    width: 8px;
  }
  /* 滚动条滑块 */
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.2);
  }
}
</style>