<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationLayout from './components/NavigationLayout.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useGetSession from './hooks/useGetSession'

const router = useRouter()

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
