<template>
  <article class="item-container" tabindex="0">
    <div class="bg-img" v-if="props.imgUrl" aria-hidden="true">
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
  </article>
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
.item-container {
  height: 400px;
  display: flex;
}
@media (min-width: 768px) {
  .item-container {
    .bg-img {
      position: relative;
      height: 100%;
      width: 100%;
      overflow: hidden;
      flex: 1;
      .centered-image {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-width: 100%;
        max-height: 100%;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .news-item {
      flex: 1;
      padding: 16px;
      display: flex;
      flex-direction: column;
      .item-title {
        font-size: 24px;
        margin-bottom: 8px;
        font-weight: 600;
      }
      .item-content {
        flex: 1;
        font-size: 16px;
        overflow: auto;
      }
    }
  }
  .item-container:nth-child(odd) {
    flex-direction: row;
  }
  .item-container:nth-child(even) {
    flex-direction: row-reverse;
  }
}
@media (max-width: 767px) {
  .item-container {
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
