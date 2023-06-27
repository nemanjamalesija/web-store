<script setup lang="ts">
const emits = defineEmits(['close-modal'])
</script>
<template>
  <button type="button" class="absolute top-0 right-0" @click="emits('close-modal')">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-8 h-8 stroke-neutral-500"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
</template>
