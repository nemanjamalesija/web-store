<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="h-24 mb-5">
    <nav
      class="h-full flex items-center justify-end text-base lg:text-lg text-gray-700 font-medium border-b-2 border-gray-100"
    >
      <div class="px-10 flex items-center gap-6">
        <RouterLink to="/"> Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </div>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped></style>
