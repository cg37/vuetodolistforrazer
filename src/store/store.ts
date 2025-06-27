import { defineStore } from "pinia";
import { ERouterPath, ITodoItem, INewsItem } from "@/model/const";
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
  };

  return { tabs, activeTabId, setActiveTab };
});

const useTodoStore = defineStore(
  "todos",
  () => {
    const todos = ref<ITodoItem[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const lastSynced = ref<number | null>(null); // last synced timestamp

    const loadTodos = async () => {
      loading.value = true;

      try {
        const serverTodos = await fetchJson<ITodoItem[]>("todos.json");
        const serverIds = new Set(serverTodos.map((item) => item.id));
        const localOnly = todos.value.filter(
          (item: ITodoItem) => !serverIds.has(item.id)
        );
        todos.value = [...serverTodos, ...localOnly];
        lastSynced.value = Date.now();
      } catch (err) {
        error.value = err instanceof Error ? err.message : "load faild";
        console.error("Error loading todos", err);
        if (!todos.value.length) {
          todos.value = [
            {
              title: "template task",
              content: "11111",
              completed: false,
              id: 1750925345
            }
          ];
        }
      } finally {
        loading.value = false;
      }
    };
    const inProgressTodo = () => {
      return [...todos.value]
        .filter((it: ITodoItem) => !it.completed)
        .sort((a: ITodoItem, b: ITodoItem) => b.id - a.id);
    };

    const completedTodo = () => {
      return [...todos.value]
        .filter((it: ITodoItem) => it.completed)
        .sort((a: ITodoItem, b: ITodoItem) => b.id - a.id);
    };
    const invertState = (id: number) => {
      const todo = todos.value.find((item: ITodoItem) => item.id === id);
      if (todo) todo.completed = !todo.completed;
    };
    const sortedTodos = () => {
      return [...todos.value].sort((a: ITodoItem, b: ITodoItem) => b.id - a.id);
    };
    const addTodo = (title: string, content: string) => {
      const newTodo: ITodoItem = {
        title,
        content,
        completed: false,
        id: Math.abs(Date.now())
      };
      todos.value.unshift(newTodo);
      return newTodo;
    };
    const deleteTodo = (id: number) => {
      todos.value = todos.value.filter((item: ITodoItem) => item.id !== id);
    };
    return {
      todos,
      loading,
      error,
      loadTodos,
      invertState,
      inProgressTodo,
      completedTodo,
      addTodo,
      sortedTodos,
      deleteTodo
    };
  },
  {
    persist: {
      storage: localStorage
    }
  }
);

export const useNewsStore = defineStore("news", () => {
  const newsList = ref<INewsItem[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const loadNews = async () => {
    loading.value = true;
    error.value = null;
    try {
      const data = await fetchJson<INewsItem[]>("news.json");
      newsList.value = data;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to load news";
      console.error("Error loading news:", err);
    } finally {
      loading.value = false;
    }
  };

  return {
    newsList,
    loading,
    error,
    loadNews
  };
});
export { useTabStore, useTodoStore };
