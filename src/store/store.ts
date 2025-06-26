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
        const serverTodos = await fetchJson<ITodoItem[]>("public/todos.json");
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
    return {
      todos,
      loading,
      error,
      loadTodos,
      invertState,
      inProgressTodo,
      completedTodo,
      addTodo,
      sortedTodos
    };
  },
  {
    persist: {
      storage: localStorage
    }
  }
);

export { useTabStore, useTodoStore };
