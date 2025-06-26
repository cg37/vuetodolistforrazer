<template>
  <div class="page-container">
    <div class="title-bar">
      <div class="title">Todo</div>
      <button type="button" class="btn btn-success">+ Create Task</button>
    </div>
    <TodosContainer>
      <template v-for="item of todoStore.todos" :key="item.id">
        <TodoItem
          :title="item.title"
          :content="item.content"
          :createdTime="item.createdTime"
          :completed="item.completed"
          :img-url="item.imgUrl"
        />
      </template>
    </TodosContainer>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import TodosContainer from "@/components/TodosContainer/TodosContainer.vue";
import TodoItem from "@/components/TodoItem/TodoItem.vue";
import { useTodoStore } from "@/store/store";

const todoList = ref();
const todoStore = useTodoStore();
onMounted(() => {
  todoStore
    .loadTodos()
    .then((res) => {
      todoList.value = res;
    })
    .catch((err) => {
      todoList.value = [];
      console.error(err);
    });
});
</script>
<style lang="scss" scoped>
.page-container {
  margin: 24px 56px;
}
.title-bar {
  margin: 12px 0 0;
  display: flex;
  align-items: center;
  gap: 12px;
  .title {
    font-size: 24px;
    font-weight: 400;
  }
}
</style>
