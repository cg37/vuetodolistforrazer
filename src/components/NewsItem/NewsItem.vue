<template>
  <div class="item-container">
    <div class="bg-img" v-if="props.imgUrl">
      <img :src="props.imgUrl" alt="img" class="centered-image" />
    </div>
    <div class="news-item">
      <div class="item-title">
        {{ props.title }}
      </div>
      <div class="item-content">
        {{ props.content }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  title: string;
  content: string;
  imgUrl?: string;
  index: number;
}
const props = withDefaults(defineProps<Props>(), {
  imgUrl: ""
});
</script>
<style lang="scss" scoped>
@media (max-width: 767px) {
  .item-container {
    display: flex;
    flex-direction: column;
    height: auto; // 改为自动高度
    .bg-img {
      position: relative;
      height: 200px; // 给图片容器固定高度
      width: 100%;
      .centered-image {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .news-item {
      padding: 16px;
      .item-title {
        font-size: 24px;
        margin-bottom: 8px;
      }
      .item-content {
        font-size: 16px;
      }
    }
  }
}
</style>
