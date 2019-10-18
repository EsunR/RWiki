<template>
  <div id="login-reg-form">
    <!-- 标题 -->
    <h1 class="title">
      <i class="el-icon-edit"></i>
      <span>RWiki</span>
    </h1>
    <h2 class="subtitle">A Open Source Wiki System</h2>
    <!-- 表单 -->
    <el-form ref="loginForm" :model="form" :rules="rules">
      <el-form-item prop="name">
        <el-input v-model="form.name" placeholder="用户名">
          <template slot="prepend">
            <i class="el-icon-user-solid prefix"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="form.password" placeholder="密码">
          <template slot="prepend">
            <i class="el-icon-key prefix"></i>
          </template>
        </el-input>
      </el-form-item>
      <transition name="repass">
        <el-form-item class="repass" v-if="loginMode === false" prop="rePassword">
          <el-input type="password" v-model="form.rePassword" placeholder="再次输入密码">
            <template slot="prepend">
              <i class="el-icon-key prefix"></i>
            </template>
          </el-input>
        </el-form-item>
      </transition>
    </el-form>
    <div :class="{'switch': true, 'switch-down': !loginMode}" @click="loginMode = !loginMode">
      <span v-show="loginMode">没有账号，点击注册</span>
      <span v-show="!loginMode">已有账号，点击登录</span>
    </div>
    <div class="btn-box" @click="loginMode ? login() : register()">
      <el-button type="primary" icon="el-icon-arrow-right" circle></el-button>
    </div>
    <!-- 尾部信息 -->
    <div class="footer">
      <div class="img-wrapper">
        <img src="../../assets/svg/R-logo.svg" />
      </div>
      <div class="info">
        <p>EsunR Production</p>
        <p>
          Github:
          <a href="https://github.com/EsunR/RWiki">RWiki</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "login-reg-form",
  data() {
    var checkPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.rePassword !== "" && this.loginMode === false) {
          this.$refs.loginForm.validateField("rePassword");
        }
        callback();
      }
    };
    var checkPassword2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        name: "",
        password: "",
        rePassword: ""
      },
      loginMode: true,
      rules: {
        name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: ["change", "blur"]
          }
        ],
        password: [{ validator: checkPassword, trigger: ["change", "blur"] }],
        rePassword: [{ validator: checkPassword2, trigger: ["change", "blur"] }]
      }
    };
  },
  methods: {
    ...mapActions(["changeLoginState"]),
    login() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.axios
            .post("/base/login", this.form)
            .then(res => {
              this.$message.success("登录成功");
              this.changeLoginState(true);
              window.localStorage.setItem("login_token", res.data.data.token);
              this.$store.dispatch("setFullScreen", false);
              this.$router.push("/");
            })
            .catch(err => {
              this.$message.error(`${err}`);
            });
        } else {
          return false;
        }
      });
    },
    register() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.axios
            .post("/base/register", this.form)
            .then(res => {
              this.$message.success("注册成功，已登录");
              this.changeLoginState(true);
              window.localStorage.setItem("login_token", res.data.data.token);
              this.$store.dispatch("setFullScreen", false);
              this.$router.push("/home");
            })
            .catch(err => {
              this.$message.error(`${err}`);
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang='scss'>
$repass-transition: all 0.5s ease;
#login-reg-form {
  position: relative;
  padding: 40px;
  box-sizing: border-box;
  height: 100%;
  .title {
    font-size: 2.5rem;
    margin: 0;
    i {
      color: #409eff;
    }
    span {
      font-family: "Times New Roman", Times, serif;
      margin-left: 10px;
      font-weight: 500;
    }
  }
  .subtitle {
    font-size: 1rem;
    font-weight: 100;
    font-family: "Times New Roman", Times, serif;
    margin: 0;
    margin-left: 52px;
  }

  .el-form {
    position: relative;
    margin-top: 5rem;
    .el-input-group__prepend {
      background-color: #409eff;
      border: none;
    }
    .prefix {
      color: white;
    }
    .repass {
      position: absolute;
      width: 100%;
    }
    .repass-enter-active,
    .repass-leave-active {
      transition: $repass-transition;
    }
    .repass-enter,
    .repass-leave-to {
      transform: translateY(-80px);
      opacity: 0;
    }
  }

  .switch {
    display: flex;
    flex-direction: row-reverse;
    transition: $repass-transition;
    span {
      cursor: pointer;
      color: #409eff;
      font-size: 14px;
      text-align: right;
      opacity: 0.8;
      &:hover {
        opacity: 1;
        text-decoration: underline;
      }
    }
  }
  .switch-down {
    transform: translateY(65px);
  }

  .btn-box {
    position: absolute;
    right: 0px;
    bottom: 170px;
    transform: translateX(50%);
    z-index: 999;
    @media (max-width: 990px) {
      transform: translateX(0);
      right: 40px;
    }
    button {
      width: 60px;
      height: 60px;
      font-size: 1.2rem;
    }
  }

  .footer {
    position: absolute;
    bottom: 40px;
    height: 50px;
    display: flex;
    .img-wrapper {
      width: 20px;
      height: 20px;
      background-color: #fe8257;
      padding: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 100%;
      }
    }
    .info {
      padding: 10px 20px;
      background-color: rgba(0, 0, 0, 0.1);
      p {
        font-size: 12px;
        margin: 0;
        a {
          color: black;
        }
      }
    }
  }
}
</style>