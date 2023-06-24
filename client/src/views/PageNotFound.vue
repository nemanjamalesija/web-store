<template>
  <div class="container text-center py-20 mx-auto h-screen">
    <h1 class="text-4xl lg:text-5xl font-semibold mb-4">404 - Page not found</h1>
    <p class="text-gray-700 mb-10 text-lg lg:text-xl">
      This page no longer exists or was moved to another location.
    </p>
    <button
      class="btn py-3 px-6 bg-orange-500 uppercase text-white text-sm lg:text-base text-medium hover:bg-orange-600 active:bg-orange-800 rounded-full"
      @click="$router.go(-1)"
    >
      &larr; go back
    </button>
  </div>
</template>
