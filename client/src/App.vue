<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationLayout from './components/NavigationLayout.vue'
import { onMounted } from 'vue'
import useGetSession from './hooks/useGetSession'

// controls redirecting when manually changing routes
onMounted(async () => {
  await useGetSession()
})
</script>

<template>
  <NavigationLayout />

  <RouterView />
</template>
