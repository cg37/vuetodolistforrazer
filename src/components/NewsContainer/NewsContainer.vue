<template>
  <div class="responseive-container">
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
.responseive-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 8px 0 0 0;
  height: 100%;
  width: 100%;
}
</style>
