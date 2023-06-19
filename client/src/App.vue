<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="h-24">
    <nav
      class="h-full flex items-center justify-center gap-4 text-base lg:text-lg text-gray-700 font-medium border-b-2 border-gray-100"
    >
      <RouterLink to="/"> Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped></style>
