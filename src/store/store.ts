import { defineStore } from "pinia";
import { ERouterPath, ITodoItem } from "@/model/const";
import { ref } from "vue";
import { fetchJson } from "../api/common";

const useTabStore = defineStore("tab", () => {
  const tabs = ref([
    { id: ERouterPath.TodoHome, title: "Todo" },
    { id: ERouterPath.InProgress, title: "In Progress" },
    { id: ERouterPath.Completed, title: "Completed" }
  ]);

  const activeTabId = ref<ERouterPath>(ERouterPath.TodoHome);

  const setActiveTab = (id: ERouterPath) => {
    activeTabId.value = id;
    console.log(id);
  };

  return { tabs, activeTabId, setActiveTab };
});

const useTodoStore = defineStore("todos", () => {
  const todos = ref<ITodoItem[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const loadTodos = () => {
    loading.value = true;
    error.value = null;
    return fetchJson<ITodoItem[]>("public/todos.json")
      .then((res) => {
        todos.value = res;
      })
      .catch((err) => {
        error.value = err instanceof Error ? err.message : "load failed";
        console.error("Error loading todos", err);
        todos.value = [
          {
            id: 1,
            title: "template task",
            completed: false,
            createdTime: 1750925345
          }
        ];
      })
      .finally(() => {
        loading.value = false;
      });
  };
  const inProgressTodo = () => {
    return todos.value.filter((it: ITodoItem) => !it.completed);
  };

  const completedTodo = () => {
    return todos.value.filter((it: ITodoItem) => it.completed);
  };
  const invertState = (createdTime: number) => {
    const todo = todos.value.find(
      (item: ITodoItem) => item.createdTime === createdTime
    );
    if (todo) todo.completed = !todo.completed;
  };
  // const addTodo = ()
  return {
    todos,
    loading,
    error,
    loadTodos,
    invertState,
    inProgressTodo,
    completedTodo
  };
});

export { useTabStore, useTodoStore };
