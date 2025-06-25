<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary bg-dark navbar-dark">
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
              aria-current="page"
              @click="tabStore.setActiveTab(item.id)"
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
import { onMounted } from "vue";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min";
onMounted(() => {
  // 手动初始化所有 Bootstrap 组件
  Array.from(document.querySelectorAll('[data-bs-toggle="collapse"]')).forEach(
    (toggleEl) => {
      new bootstrap.Collapse(toggleEl, {
        toggle: false
      });
    }
  );
});
const tabStore = useTabStore();
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
