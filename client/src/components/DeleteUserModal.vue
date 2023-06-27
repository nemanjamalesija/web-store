<script setup lang="ts">
import useGetAdminStore from '@/hooks/useGetAdminStore'
import CloseModalButton from './ui/CloseModalButton.vue'

const { setIsDeleting } = useGetAdminStore()
</script>
<template>
  <div>
    <h2 class="text-base lg:text-lg font-semibold text-center mb-9">
      Are you sure you want to delete this user ?
    </h2>
    <form action="">
      <div class="flex items-center justify-center gap-5">
        <button
          class="btn text-sm lg:text-base py-3 px-5 flex items-center gap-2 bg-red-500 hover:bg-red-600"
        >
          Delete
        </button>
        <button
          type="button"
          class="btn text-sm lg:text-base py-3 px-7 flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600"
          @click.prevent="setIsDeleting(false)"
        >
          back
        </button>
      </div>
    </form>
    <CloseModalButton @close-modal="setIsDeleting(false)" />
  </div>
</template>
