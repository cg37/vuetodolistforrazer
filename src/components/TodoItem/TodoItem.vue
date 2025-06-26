<template>
  <div class="item-container">
    <div class="bg-img" v-if="props.imgUrl">
      <img :src="props.imgUrl" alt="img" class="centered-image" />
    </div>
    <div class="todo-item">
      <div class="item-title">
        {{ props.title }}
      </div>
      <div class="item-content">
        {{ props.content }}
      </div>
      <div class="created">
        {{ createdAt }}
      </div>
    </div>
    <div class="control-panel">
      <template v-if="props.completed">
        <button
          type="button"
          class="btn btn-success"
          @click="todoStore.invertState(props.createdTime)"
        >
          In Progress
        </button>
        <button type="button" class="btn btn-secondary">cancel</button>
      </template>
      <template v-else>
        <button
          type="button"
          class="btn btn-primary"
          @click="todoStore.invertState(props.createdTime)"
        >
          Start
        </button>
        <button type="button" class="btn btn-danger">Remove</button>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import formatDate from "@/utils/formatTime";
import { useTodoStore } from "@/store/store";
const todoStore = useTodoStore();
interface Props {
  title: string;
  content: string;
  completed: boolean;
  createdTime: number;
  imgUrl?: string;
}
const props = withDefaults(defineProps<Props>(), {
  imgUrl: ""
});

const createdAt = computed(() => {
  const dateString = formatDate(props.createdTime);
  return `Created At: ${dateString}`;
});
</script>
<style lang="scss" scoped>
.item-container {
  width: 100%;
  height: 500px;
  border: 1px solid #bbb;
  border-radius: 8px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  .todo-item {
    margin: 12px 8px 0px;
    .item-title {
      font-size: 36px;
      font-weight: 500;
      margin: 0 0 12px 0;
    }
    .item-content {
      font-size: 20px;
      color: #333;
    }
    flex: 1;
  }
  .control-panel {
    justify-self: flex-end;
    margin: 0 0 0 8px;
  }
}
.bg-img {
  width: 100%;
  height: 60%;
  position: relative; /* 为绝对定位图片提供参照 */
  overflow: hidden; /* 隐藏超出部分 */
  border: 1px solid #ddd; /* 仅用于演示，可移除 */
  .centered-image {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* 精确居中 */
    min-width: 100%;
    min-height: 100%;
    object-fit: cover;
  }
}
.btn {
  margin: 0 12px 0 0;
}
</style>
