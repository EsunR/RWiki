<template>
  <el-container>
    <aside-index
      :indexList="indexList"
      :activeArticle="activeArticle"
      @indexClick="handleIndexClick"
    />
    <div class="scroll-wrapper" ref="scroll-main" @scroll="handleOnScroll">
      <div class="scroll-content">
        <project-info :projectInfo.sync="projectInfo" />
        <transition-group name="fade-down">
          <project-article
            v-for="item in articles"
            :key="item._id"
            :projectInfo="projectInfo"
            :articleInfo="item"
            @deleteArticleSuccess="deleteArticle"
            @modifyArticleSuccess="modifyArticle"
          ></project-article>
        </transition-group>
        <new-article :projectInfo="projectInfo" @addNewArticleSuccess="addNewArticle" />
      </div>
    </div>
  </el-container>
</template>

<script>
import AsideIndex from "../components/project/aside-index";
import ProjectArticle from "../components/project/article";
import ProjectInfo from "../components/project/project-info";
import NewArticle from "../components/project/new-article";
import { ScreenScroller } from "../plugins/utils";
const scroller = new ScreenScroller();
export default {
  name: "project",
  components: {
    AsideIndex,
    ProjectArticle,
    ProjectInfo,
    NewArticle
  },
  data() {
    this.timmer = null;
    return {
      projectInfo: {},
      articles: [],
      activeArticle: ""
    };
  },
  props: ["pid"],
  computed: {
    indexList: function() {
      let arr = [];
      this.articles.forEach(item => {
        if (item._id) {
          let { _id, title } = item;
          let indexItem = { _id, title };
          arr.push(indexItem);
        }
      });
      return arr;
    }
  },
  methods: {
    getProjectData() {
      return new Promise((resolve, reject) => {
        this.axios
          .get(`/project/getProjectByPid?pid=${this.pid}`)
          .then(res => {
            let data = res.data.data;
            this.articles = data.articles;
            delete data.articles;
            this.projectInfo = data;
            resolve();
          })
          .catch(err => {
            console.log(err);
            this.$message.error(`${err}`);
            reject();
          });
      });
    },
    handleOnScroll() {
      if (this.timmer != null) {
        clearTimeout(this.timmer);
      }
      // 防抖
      this.timmer = setTimeout(() => {
        let scrollTop = this.$refs["scroll-main"].scrollTop;
        let articleArr = document.querySelectorAll(".article");
        [].some.call(articleArr, el => {
          let topPos = el.offsetTop + el.clientHeight - scrollTop - 60;
          if (topPos > 50) {
            let DomId = el.getAttribute("id");
            if (this.activeArticle != DomId) {
              this.activeArticle = DomId;
            }
            return true;
          }
        });
      }, 100);
    },
    handleIndexClick(articleId) {
      let activeDom = document.querySelector(`#article_${articleId}`);
      let scrollDom = this.$refs["scroll-main"];
      let scroll_target = activeDom.offsetTop - 60;
      let scroll_current = scrollDom.scrollTop;
      scroller.scroll(scrollDom, 500, scroll_current, scroll_target);
    },
    addNewArticle(articleInfo) {
      this.articles.push(articleInfo);
    },
    deleteArticle(aid) {
      console.log(aid);
      this.articles.some((element, index) => {
        if (element._id === aid) {
          this.articles.splice(index, 1);
          return true;
        }
      });
    },
    modifyArticle(payload) {
      let pid = payload._id;
      this.articles.some((element, index) => {
        if (element._id === pid) {
          this.articles.splice(index, 1, payload);
          return true;
        }
      });
    }
  },
  mounted() {
    this.getProjectData().then(() => {
      this.$store.dispatch("setProjectPermission", this.projectInfo._id);
    });
  }
};
</script>

<style lang='scss' scoped>
.el-main {
  width: 100%;
  height: 100%;
  padding: 0;
}
.scroll-wrapper {
  width: 100%;
  margin: 0 auto;
  height: 100%;
  overflow-y: overlay;
  overflow-x: hidden;
  box-sizing: border-box;
  padding: 20px;
  /* 设置滚动条的样式 */
  &::-webkit-scrollbar {
    width: 8px;
  }
  /* 滚动条滑块 */
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.2);
  }
  @media screen and (max-width: 700px) {
    padding: 10px;
  }
  .scroll-content {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
  }
}
</style>