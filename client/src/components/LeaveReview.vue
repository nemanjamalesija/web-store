<script setup lang="ts">
import useGetUserStore from '../composables/useGetUserStore'
import useGetProductsStore from '../composables/useGetProductsStore'

const { currentUser } = useGetUserStore()
const { setIsReviewModalOpen } = useGetProductsStore()
</script>
<template>
  <div
    class="flex items-center justify-between gap-2 border border-1 border-orange-500 py-4 px-6 rounded-md"
  >
    <p class="text-sm lg:text-lg">Want to leave a review?</p>
    <button
      v-if="currentUser.name"
      class="btn py-3 px-6 bg-orange-500 text-sm lg:text-base hover:bg-orange-600 active:bg-orange-800"
      @click="setIsReviewModalOpen(true)"
    >
      Click here
    </button>
  </div>
</template>
