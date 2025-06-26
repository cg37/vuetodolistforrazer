<template>
  <TodosContainer>
    <template v-for="item of todoStore.completedTodo()" :key="item.id">
      <TodoItem
        :title="item.title"
        :content="item.content"
        :createdTime="item.createdTime"
        :completed="item.completed"
        :img-url="item.imgUrl"
      />
    </template>
  </TodosContainer>
</template>
<script lang="ts" setup>
import TodosContainer from "@/components/TodosContainer/TodosContainer.vue";
import TodoItem from "@/components/TodoItem/TodoItem.vue";
import { useTodoStore } from "@/store/store";

const todoStore = useTodoStore();
</script>
