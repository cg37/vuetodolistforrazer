<template>
  <div class="news-title">Company News</div>
  <div class="responseive-container">
    <template v-for="(item, index) of newsStore.newsList" :key="item.id">
      <NewsItem
        :title="item.title"
        :content="item.content"
        :img-url="item.imgUrl"
        :index="index"
      />
    </template>
  </div>
</template>
<script setup lang="ts">
import { useNewsStore } from "@/store/store";
import { onMounted } from "vue";
import NewsItem from "@/components/NewsItem/NewsItem.vue";

const newsStore = useNewsStore();

onMounted(() => {
  newsStore.loadNews().catch((err) => {
    console.error("load news failed", err);
  });
});
</script>
<style lang="scss" scoped>
.news-title {
  font-size: 24px;
  font-weight: 600;
  margin: 48px 0 12px;
}
.responseive-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 8px 0 0 0;
  height: 100%;
  width: 100%;
}
</style>
