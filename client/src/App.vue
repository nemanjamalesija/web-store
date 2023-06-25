<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationLayout from './components/NavigationLayout.vue'
import { onMounted } from 'vue'
import useGetSession from './hooks/useGetSession'

async function getUserFromLocalStorage() {
  const session = await useGetSession()

  if (!session) return
}

onMounted(async () => {
  await getUserFromLocalStorage()
})
</script>

<template>
  <NavigationLayout />
  <RouterView />
</template>
