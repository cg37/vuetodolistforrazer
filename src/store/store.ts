import { defineStore } from "pinia";
import { ERouterPath } from "@/model/const";
import { ref } from "vue";

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

export { useTabStore };
