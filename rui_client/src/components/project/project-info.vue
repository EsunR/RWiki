<template>
  <div id="projectInfo" ref="projectInfo">
    <h1 class="projectName">
      <div class="left">
        {{projectInfo.projectName}}
        <el-button
          round
          @click="editMode = !editMode"
          :type="editMode ? 'info' : 'default'"
          size="small"
        >{{editMode ? "取消编辑" : "编辑此段"}}</el-button>
      </div>
      <i class="el-icon-info right" @click.stop="showContributor = !showContributor;"></i>
    </h1>
    <transition name="fade-down">
      <div class="info-card" v-show="showContributor">
        <ul>
          <li class="creator">
            <img :src="projectInfo.creator ? projectInfo.creator.avatar : ''" />
            <div class="name">
              {{projectInfo.creator?projectInfo.creator.name : ""}}
              <span>创建者</span>
            </div>
          </li>
          <li class="partner" v-for="item in projectInfo.partners" :key="item.id">
            <img :src="item.avatar" />
            <div class="name">{{item.name}}</div>
          </li>
        </ul>
      </div>
    </transition>
    <p class="desc" v-if="!editMode" v-html="projectInfo.desc"></p>
    <div class="editor" v-if="editMode">
      <textarea v-model="editorContent" name="info-editor" id="info-editor" rows="8"></textarea>
      <div class="btn-wrapper">
        <el-button type="success" size="small" @click="handleSubmit">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mergString } from "../../plugins/utils";
export default {
  data() {
    return {
      showContributor: false,
      editMode: false,
      editorContent: ""
    };
  },
  props: ["projectInfo"],
  methods: {
    handleSubmit() {
      // 转义防止XSS
      let editorContent = this.editorContent;
      editorContent = mergString(editorContent, "\n");
      editorContent = this._.escape(editorContent).replace(/\n/g, "</p><p>");
      this.axios
        .post("/project/modifyProjectInfo", {
          _id: this.projectInfo._id,
          desc: editorContent
        })
        .then(res => {
          this.$message.success("修改成功");
          this.$emit("update:projectInfo", res.data.data);
          this.editMode = false;
        })
        .catch(err => {
          console.log(err);
          this.$message.error(`${err}`);
        });
    }
  },
  mounted() {
    window.addEventListener("click", () => {
      this.showContributor = false;
    });
  },
  watch: {
    editMode: function() {
      this.editorContent = this._.unescape(this.projectInfo.desc);
      this.editorContent = this.editorContent.replace(/<\/p><p>/g, "\n\n"); // 拓展段间距
    }
  }
};
</script>

<style lang='scss' scoped>
#projectInfo {
  position: relative;
}

.projectName {
  margin: 10px 0;
  color: $color-main;
  font-size: 2rem;
  font-weight: 500;
  padding-bottom: 10px;
  border-bottom: 1px solid $color-main-lite;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    display: flex;
    align-items: center;
    button {
      margin-left: 10px;
    }
  }
  .right {
    cursor: pointer;
    font-size: 1.5rem;
    position: relative;
    right: 7px;
  }
}
.info-card {
  background-color: #fff;
  position: absolute;
  right: 0;
  border-radius: $radius;
  filter: drop-shadow($shadow);
  &::after {
    content: " ";
    width: 30px;
    height: 30px;
    background-color: #fff;
    position: absolute;
    top: -10px;
    right: 6px;
    transform: rotate(45deg);
  }
  ul {
    padding: 10px;
    li {
      min-width: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        width: 30px;
      }
      .name {
        margin-left: 10px;
        display: flex;
        align-items: center;
        z-index: 2;
        span {
          margin-left: 5px;
          background-color: $color-main;
          color: #fff;
          border-radius: 5px;
          font-size: 12px;
          padding: 3px;
        }
      }
    }
  }
}

.editor {
  .btn-wrapper {
    display: flex;
    flex-direction: row-reverse;
    margin-top: 10px;
  }
}
</style>