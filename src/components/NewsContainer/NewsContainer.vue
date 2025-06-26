<template>
  <div class="responseive-container">
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
.responseive-container {
  display: grid;
  gap: 24px;
  margin: 8px 0 0 0;
  height: 100%;
  width: 100%;
}
@media (min-width: 768) {
  .responseive-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 767px) {
  .responseive-container {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
