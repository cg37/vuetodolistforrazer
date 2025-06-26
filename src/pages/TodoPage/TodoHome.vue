<template>
  <div class="page-container">
    <div class="title-bar">
      <div class="title">Todo</div>
      <button type="button" class="btn btn-success" @click="showModal">
        + Create Task
      </button>
      <Modal
        ref="modalRef"
        modalId="advancedModal"
        title="Create New Task"
        size="lg"
        :staticBackdrop="true"
        @confirm="handleConfirm"
        @cancel="handleCancel"
      >
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingInput"
            placeholder="Task Title"
            v-model="newTodoTitle"
          />
          <label for="floatingInput">title</label>
        </div>
        <div class="form-floating">
          <textarea
            class="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            style="height: 100px"
            v-model="newTodoContent"
          ></textarea>
          <label for="floatingTextarea2">Content</label>
        </div>
      </Modal>
    </div>
    <TodosContainer>
      <template v-for="item of todoStore.sortedTodos()" :key="item.id">
        <TodoItem
          :title="item.title"
          :content="item.content"
          :id="item.id"
          :completed="item.completed"
          :img-url="item.imgUrl"
        />
      </template>
    </TodosContainer>
    <div class="news-title">Company News</div>
    <NewsContainer>
      <template v-for="(item, index) of newsStore.newsList" :key="item.id">
        <NewsItem
          :title="item.title"
          :content="item.content"
          :img-url="item.imgUrl"
          :index="index"
        />
      </template>
    </NewsContainer>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import TodosContainer from "@/components/TodosContainer/TodosContainer.vue";
import TodoItem from "@/components/TodoItem/TodoItem.vue";
import { useTodoStore, useNewsStore } from "@/store/store";
import Modal from "@/components/NewTodo/NewTodo.vue";
import NewsContainer from "@/components/NewsContainer/NewsContainer.vue";
import NewsItem from "@/components/NewsItem/NewsItem.vue";

const newTodoTitle = ref<string>("");
const newTodoContent = ref<string>("");
const todoStore = useTodoStore();

const modalRef = ref<InstanceType<typeof Modal> | null>(null);
const showModal = () => {
  modalRef.value?.show();
};
const handleConfirm = () => {
  if (!newTodoTitle.value.trim()) {
    alert("please input title");
    return;
  }
  todoStore.addTodo(newTodoTitle.value, newTodoContent.value);
  newTodoTitle.value = "";
  newTodoContent.value = "";
  modalRef.value?.hide(); // 可选：自动关闭
};

const handleCancel = () => {
  console.log("用户点击了取消");
};

const newsStore = useNewsStore();

onMounted(() => {
  todoStore.loadTodos().catch((err) => {
    console.error("load todo failed", err);
  });
  newsStore.loadNews().catch((err) => {
    console.error("load news failed", err);
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
.news-title {
  font-size: 24px;
  font-weight: 600;

  margin: 48px 0 12px;
}
</style>
