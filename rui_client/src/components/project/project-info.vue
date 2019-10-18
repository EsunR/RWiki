<template>
  <div id="projectInfo" ref="projectInfo">
    <h1 class="projectName">
      {{projectInfo.projectName}}
      <i
        class="el-icon-info"
        @click.stop="showContributor = !showContributor;"
      ></i>
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
    <p class="desc">{{projectInfo.desc}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showContributor: false
    };
  },
  props: ["projectInfo"],
  methods: {},
  mounted() {
    window.addEventListener("click", () => {
      console.log(1);
      this.showContributor = false;
    });
  }
};
</script>

<style lang='scss' scoped>
#projectInfo {
  position: relative;
}

h1 {
  margin: 10px 0;
  color: $color-main;
  font-size: 2rem;
  font-weight: 500;
  padding-bottom: 10px;
  border-bottom: 1px solid $color-main-lite;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  i {
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
</style>