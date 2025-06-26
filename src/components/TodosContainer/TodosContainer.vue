<template>
  <div class="responseive-container">
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
.responseive-container {
  display: grid;
  gap: 24px;
  height: 100%;
}
@media (min-width: 1024px) {
  .responseive-container {
    grid-template-columns: repeat(3, 1fr);
    margin: 8px 0 0;
  }
}
@media (min-width: 768px) and (max-width: 1023px) {
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
