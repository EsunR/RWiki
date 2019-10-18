<template>
  <div class="project-card" @click="$emit('click')">
    <div class="cover" :style="{backgroundImage: `url(${getCover(cover)})`}"></div>
    <div class="content">
      <div class="projectName">{{projectName}}</div>
      <hr />
      <div class="desc">{{desc}}</div>
      <div class="time">{{time | formatTime}}</div>
    </div>
  </div>
</template>

<script>
let defaultCover =
  "http://img.cdn.esunr.xyz/the_caravan_by_patryk_wojciechowicz_2x.png";
export default {
  name: "project-card",
  props: {
    cover: {
      type: String,
      default: defaultCover
    },
    projectName: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    time: {
      required: true
    },
    pid: {
      required: true
    }
  },
  methods: {
    getCover(url) {
      if (url === "") {
        return defaultCover;
      } else {
        return url;
      }
    }
  }
};
</script>

<style lang="scss">
.project-card {
  width: 100%;
  border: 2px solid rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.2s linear;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
  }
  .cover {
    width: 100%;
    padding-bottom: 40%;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100%;
  }
  .content {
    background-color: #fff;
    padding: 10px;
    .projectName {
      font-size: 16px;
    }
    .desc {
      font-size: 14px;
      min-height: 50px;
    }
    .time {
      font-size: 14px;
    }
  }
}
</style>
