<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="h-24">
    <nav
      class="bg-emerald-100 h-full flex items-center justify-center gap-4 text-base lg:text-lg text-gray-700 font-medium"
    >
      <RouterLink to="/"> Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped></style>
