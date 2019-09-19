<template>
  <div class="project-card">
    <div class="cover" :style="{backgroundImage: `url(${cover})`}"></div>
    <div class="content">
      <div class="title">{{title}}</div>
      <hr>
      <div class="desc">{{desc}}</div>
      <div class="time">{{time}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "project-card",
  // props: ["cover", "projectTitle", "description", "time"]
  props: {
    cover: {
      type: String,
      default:
        "http://img.cdn.esunr.xyz/the_caravan_by_patryk_wojciechowicz_2x.png" // TODO: 这里放项目默认展示图片
    },
    title: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    time: {
      type: Date,
      required: true
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
    .title {
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
