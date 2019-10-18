<template>
  <div id="home">
    <div class="head">
      <div class="hoem-title">Project List</div>
      <div class="user-info" v-show="userInfo.name">
        <img class="user-avatar" src="../../assets/image/default-avatar.png" />
        <span>{{userInfo.name}}</span>
      </div>
    </div>
    <el-row :gutter="20">
      <div class="no-project" v-show="projectList.length === 0">这里空空如也，貌似您还没有参与过任何项目</div>
      <el-col :sm="8" v-for="item in projectList" :key="item._id">
        <projectCard
          :pid="item._id"
          :projectName="item.projectName"
          :desc="item.desc"
          :time="item.updateTime"
          :cover="item.cover"
          @click="handleProjectCardClick(item._id)"
        />
      </el-col>
    </el-row>
    <float-button :primaryClick="addProject" />
    <el-dialog title="创建新项目" :visible.sync="dialogVisible" width="30%">
      <div class="dialog-body">
        <!-- @formData="test" -->
        <new-project-form @cancel="dialogVisible = false" @submit="handleSubmitSuccess" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import projectCard from "@com/home/project-card";
import floatButton from "@com/home/float-button";
import newProjectForm from "@com/home/new-project-form";
export default {
  name: "home",
  components: {
    projectCard,
    floatButton,
    newProjectForm
  },
  data() {
    return {
      projectList: [],
      dialogVisible: false
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo;
    }
  },
  methods: {
    getProjetList() {
      this.axios
        .get("/project/getProjectListByUid")
        .then(res => {
          if (res.data.data.length > 0) {
            this.projectList = res.data.data;
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    addProject() {
      this.dialogVisible = true;
    },
    handleSubmitSuccess() {
      this.dialogVisible = false;
      this.getProjetList();
    },
    handleProjectCardClick(pid) {
      this.$router.push(`/project/${pid}`);
    }
  },
  mounted() {
    this.getProjetList();
  }
};
</script>

<style lang="scss" scoped>
#home {
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
    padding-bottom: 10px;
    margin-bottom: 10px;
    .hoem-title {
      color: #606266;
      font-weight: bold;
    }
    .user-info {
      cursor: pointer;
      display: flex;
      align-items: center;
      .user-avatar {
        width: 30px;
        margin-right: 5px;
      }
    }
  }
  .no-project {
    margin-left: 10px;
  }
  .project-card {
    margin: 10px 0;
  }
  .el-dialog {
    .dialog-footer {
      position: absolute;
      bottom: 20px;
      display: flex;
      justify-content: center;
      width: 100%;
      margin-left: -20px;
    }
  }
  .float-button {
    position: absolute;
    right: 50px;
    bottom: 50px;
  }
}
</style>

<style>
#home .el-dialog {
  width: 90% !important;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: 0 auto;
  height: 300px;
  max-width: 1000px;
  border-radius: 10px;
}
</style>

