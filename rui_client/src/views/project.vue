<template>
  <el-container>
    <aside-index
      :indexList="indexList"
      :activeArticle="activeArticle"
      @indexClick="handleIndexClick"
    />
    <el-main ref="el-main">
      <div class="wrapper" ref="scroll-main" @scroll="handleOnScroll">
        <project-info :projectInfo.sync="projectInfo" />
        <project-article
          v-for="item in articles"
          :key="item.id"
          :projectInfo="projectInfo"
          :articleInfo="item"
        />
        <new-article :projectInfo="projectInfo" @addNewArticleSuccess="addNewArticle" />
      </div>
    </el-main>
  </el-container>
</template>

<script>
import AsideIndex from "../components/project/aside-index";
import ProjectArticle from "../components/project/article";
import ProjectInfo from "../components/project/project-info";
import NewArticle from "../components/project/new-article";
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
    this.AnimationTimmer = null;
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
      this.axios
        .get(`/project/getProjectByPid?pid=${this.pid}`)
        .then(res => {
          let data = res.data.data;
          this.articles = data.articles;
          delete data.articles;
          this.projectInfo = data;
        })
        .catch(err => {
          console.log(err);
          this.$message.error(`${err}`);
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
      if (this.AnimationTimmer) {
        clearInterval(this.AnimationTimmer);
      }
      let activeDom = document.querySelector(`#article_${articleId}`);
      let scroll_dis = activeDom.offsetTop - 60;
      let scrollDom = this.$refs["scroll-main"];
      let scroll_current = scrollDom.scrollTop;

      let s = Math.abs(scroll_current - scroll_dis);
      let sign = Math.sign(scroll_dis - scroll_current);

      // 没毫秒移动多少距离
      let speed = s / 100;
      let scroll_last = scrollDom.scrollTop - 1;

      this.AnimationTimmer = setInterval(() => {
        let scroll_current = scrollDom.scrollTop;
        // 防止滚动目标达不到屏幕顶端而卡住
        if (scroll_last === scroll_current) {
          clearInterval(this.AnimationTimmer);
          return;
        } else {
          scroll_last = scroll_current;
        }
        scrollDom.scrollTop += speed * sign;
        switch (sign) {
          case -1:
            if (scroll_current - speed < scroll_dis) {
              // 如果下一帧滚超了，现在就停止定时器并手动规正位置
              clearInterval(this.AnimationTimmer);
              scrollDom.scrollTop = scroll_dis;
            }
            break;
          case 1:
            if (scroll_current + speed > scroll_dis) {
              clearInterval(this.AnimationTimmer);
              scrollDom.scrollTop = scroll_dis;
            }
            break;
          case 0:
            clearInterval(this.AnimationTimmer);
            break;
        }
      }, 1);
    },
    addNewArticle(articleInfo) {
      this.articles.push(articleInfo);
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
  padding: 0;
}
.wrapper {
  width: 100%;
  max-width: 1000px;
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
}
</style>