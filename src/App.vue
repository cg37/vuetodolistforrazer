<template>
  <NavBar />
  <div class="router-view-container">
    <RouterView />
  </div>
</template>
<script lang="ts" setup>
import NavBar from "@/components/NavBar/NavBar.vue";
</script>
<style lang="scss" scoped>
.router-view-container {
  height: 100%;
  flex: 1;
}
</style>
