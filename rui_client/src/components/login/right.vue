<template>
  <div id="login-right">
    <img class="background-img" src="https://api.dujin.org/bing/1366.php" />
    <div class="right-content-wrapper">
      <h3>每日一言 | Hitokoto</h3>
      <div class="hitokoto" ref="hitokoto">
        <div class="content">{{hitokoto.content}}</div>
        <div class="from">—— {{hitokoto.from}}</div>
      </div>
      <button class="fresh-button" @click="handleFresh">
        Fresh
        <i ref="fresh-icon" class="el-icon-refresh test"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    this.freshing = false;
    return {
      hitokoto: {
        from: "",
        content: ""
      }
    };
  },
  methods: {
    getHitokoto() {
      return new Promise((resolve, reject) => {
        this.axios
          .get("https://v1.hitokoto.cn/")
          .then(res => {
            this.hitokoto.content = res.data.hitokoto;
            this.hitokoto.from = res.data.from;
            resolve();
          })
          .catch(err => {
            console.log(err);
            this.$message.error(`${err}`);
            reject();
          });
      });
    },
    handleFresh() {
      // 节流
      if (!this.freshing) {
        this.freshing = true;
        let icon = this.$refs["fresh-icon"];
        icon.classList.add("rotate");
        setTimeout(() => {
          icon.classList.remove("rotate");
        }, 1000);

        let hitokoto = this.$refs["hitokoto"];
        hitokoto.classList.add("hitokoto-duration");
        hitokoto.classList.add("hitokoto-leave");
        setTimeout(() => {
          hitokoto.classList.remove("hitokoto-duration");
          hitokoto.classList.remove("hitokoto-leave");
          hitokoto.classList.add("hitokoto-enter");
          this.getHitokoto()
            .catch(err => {
              console.log(err);
              this.$message.error(`${err}`);
              hitokoto.classList.add("hitokoto-duration");
              hitokoto.classList.remove("hitokoto-enter");
              this.freshing = false;
            })
            .finally(() => {
              hitokoto.classList.add("hitokoto-duration");
              hitokoto.classList.remove("hitokoto-enter");
              this.freshing = false;
            });
        }, 1000);
      }
    }
  },
  mounted() {
    this.getHitokoto();
  }
};
</script>

<style lang='scss' scoped>
#login-right {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.background-img {
  height: 100%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.right-content-wrapper {
  color: white;
  width: 100%;
  height: 100%;
  position: relative;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  h3 {
    font-weight: 500;
    margin: 40px;
  }

  .hitokoto {
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    box-sizing: border-box;
    padding: 0 40px;
    .content {
      font-size: 1.5rem;
    }
    .from {
      margin-top: 20px;
      text-align: right;
    }
  }
  .hitokoto-leave {
    transform: translateY(50px);
    opacity: 0;
  }
  .hitokoto-enter {
    transform: translateY(-100px);
    opacity: 0;
  }
  .hitokoto-duration {
    transition: all 1s ease;
  }

  .fresh-button {
    transition: all 0.5s ease;
    position: absolute;
    bottom: 40px;
    right: 40px;
    background: none;
    color: white;
    border: 1px solid white;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: #fff;
      color: black;
    }
    i {
      transition-property: transform;
      transition-duration: 1s;
      transition-timing-function: linear;
    }
    .rotate {
      transform: rotate(360deg);
    }
  }
}
</style>