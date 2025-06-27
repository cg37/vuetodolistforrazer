<template>
  <nav
    class="navbar navbar-expand-lg bg-body-tertiary bg-dark navbar-dark"
    aria-label="Main navigation"
  >
    <div class="container-fluid --bs-body-bg">
      <a class="navbar-brand" href="#">My Todolist</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="isMenuExpanded = !isMenuExpanded"
        @keydown.enter="isMenuExpanded = !isMenuExpanded"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li v-for="item of tabStore.tabs" :key="item.id" class="nav-item">
            <router-link
              class="nav-link"
              :class="[tabStore.activeTabId === item.id ? 'active' : '']"
              :to="{ name: item.id }"
              @click="tabStore.setActiveTab(item.id)"
              :aria-current="tabStore.activeTabId === item.id ? 'page' : null"
            >
              {{ item.title }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script lang="ts" setup>
import { useTabStore } from "@/store/store";
import { ref, onMounted, onUnmounted } from "vue";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min";
onMounted(() => {
  // 1. 使用更精准的选择器（避免全局查询）
  const collapseToggles = document.querySelectorAll<HTMLElement>(
    '[data-bs-toggle="collapse"]'
  );
  const collapseInstances: bootstrap.Collapse[] = [];

  // 2. 添加类型注解，并存储实例以便销毁
  collapseToggles.forEach((toggleEl) => {
    const targetId = toggleEl.getAttribute("data-bs-target");
    if (!targetId) return; // 防御性检查

    const instance = new bootstrap.Collapse(toggleEl, {
      toggle: false
    });
    collapseInstances.push(instance);
  });

  // 3. 组件卸载时销毁实例（避免内存泄漏）
  onUnmounted(() => {
    collapseInstances.forEach((instance) => instance.dispose());
  });
});
const tabStore = useTabStore();
const isMenuExpanded = ref(false);
</script>
<style lang="scss" scoped>
.navbar {
  padding: 0.5rem 1rem;

  .navbar-brand {
    font-weight: bold;
  }

  .nav-link {
    transition: all 0.2s ease;
    &:hover {
      color: rgba(255, 255, 255, 0.8);
      background-color: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
    }
    &.active {
      border-radius: 8px;
      font-weight: 500;
      color: white !important;
      background-color: rgba(255, 255, 255, 0.1);
      &:hover {
        background-color: rgba(255, 255, 255, 0.15);
      }
    }
  }
}
</style>
