<script setup lang="ts">
type singleProductPropsType = {
  isEditing: boolean
}

const props = defineProps<singleProductPropsType>()
</script>
<template>
  <Transition name="modal">
    <div v-if="props.isEditing" class="modal-mask">
      <div class="popup-modal relative">
        <slot>
          <!-- fallback content -->
          modal content
        </slot>
      </div>
    </div>
  </Transition>
</template>

<style>
.modal-enter-from .popup-modal,
.modal-leave-to .popup-modal {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.popup-modal {
  width: 600px;
  margin: auto;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}
</style>
