<template>
  <div class="page-container">
    <TodosContainer>
      <template v-for="item of todoStore.inProgressTodo()" :key="item.id">
        <TodoItem
          :title="item.title"
          :content="item.content"
          :id="item.id"
          :completed="item.completed"
          :img-url="item.imgUrl"
        />
      </template>
    </TodosContainer>
  </div>
</template>
<script lang="ts" setup>
import TodosContainer from "@/components/TodosContainer/TodosContainer.vue";
import TodoItem from "@/components/TodoItem/TodoItem.vue";
import { useTodoStore } from "@/store/store";

const todoStore = useTodoStore();
</script>
<style lang="scss" scoped>
.page-container {
  margin: 24px 56px;
}
</style>
