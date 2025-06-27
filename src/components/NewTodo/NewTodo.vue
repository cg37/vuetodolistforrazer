<template>
  <div
    class="modal fade"
    :id="modalId"
    :aria-labelledby="`${modalId}Label`"
    tabindex="-1"
    aria-hidden="true"
    ref="modalElement"
    role="dialog"
  >
    <div
      class="modal-dialog"
      :class="{
        'modal-sm': size === 'sm',
        'modal-lg': size === 'lg',
        'modal-xl': size === 'xl'
      }"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" :id="`${modalId}Label`">
            <slot name="title">{{ title }}</slot>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="emit('cancel')"
          ></button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="emit('cancel')"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="emit('confirm')"
            >
              确认
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Modal } from "bootstrap";

const props = defineProps({
  modalId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ""
  },
  size: {
    type: String as () => "sm" | "lg" | "xl" | "",
    default: ""
  },
  staticBackdrop: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["confirm", "cancel", "hidden"]);

const modalElement = ref<HTMLElement | null>(null);
let modalInstance: Modal | null = null;

onMounted(() => {
  if (modalElement.value) {
    modalInstance = new Modal(modalElement.value, {
      backdrop: props.staticBackdrop ? "static" : true,
      keyboard: !props.staticBackdrop
    });

    modalElement.value.addEventListener("hidden.bs.modal", () => {
      emit("hidden");
    });
  }
});

defineExpose({
  show() {
    modalInstance?.show();
  },
  hide() {
    modalInstance?.hide();
  }
});
</script>
