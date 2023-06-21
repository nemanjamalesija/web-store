<script setup lang="ts">
import { useProductsStore } from '@/stores/productsStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
const currentSlideIndex = ref(0)

const productsStore = useProductsStore()
const { currentProduct } = storeToRefs(productsStore)
</script>
<template>
  <div>
    <p v-if="currentProduct.reviews !== undefined && currentProduct.reviews.length > 0" class="">
      {{ currentProduct.reviews[currentSlideIndex]?.review }}
    </p>
  </div>
</template>
