<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'

const productsStore = useUserStore()
const { currentUser } = storeToRefs(productsStore)
</script>
<template>
  <div
    class="flex items-center justify-between gap-2 border border-1 border-orange-500 py-4 px-6 rounded-md"
  >
    <p class="text-sm lg:text-lg">Want to leave a review?</p>
    <RouterLink
      to="/login"
      v-if="!currentUser.name"
      class="btn inline-block py-3 px-6 bg-orange-500 uppercase text-white text-sm lg:text-base text-medium hover:bg-orange-600 active:bg-orange-800 rounded-full"
    >
      Log in
    </RouterLink>
    <RouterLink
      to="/login"
      v-if="currentUser.name"
      class="btn inline-block py-3 px-6 bg-orange-500 uppercase text-white text-sm lg:text-base text-medium hover:bg-orange-600 active:bg-orange-800 rounded-full"
    >
      Click here
    </RouterLink>
  </div>
</template>
