<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="h-20 bg-orange-950 text-slate-100">
    <nav
      class="h-full px-10 flex items-center justify-between text-base lg:text-lg text-orange-50 font-medium border-b-2 text-inherit"
    >
      <h1 class="text-xxl lg:text-2xl uppercase text-center font-semibold">Mambo jumbo bowls</h1>
      <div class="flex items-center gap-6">
        <RouterLink to="/"> Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </div>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped></style>
