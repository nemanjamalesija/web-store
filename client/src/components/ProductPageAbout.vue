<script setup lang="ts">
import { useProductsStore } from '@/stores/productsStore'
import { storeToRefs } from 'pinia'

const productsStore = useProductsStore()
const { currentProduct } = storeToRefs(productsStore)
</script>
<template>
  <div class="product__description-about">
    <h2
      class="heading-secondary heading-gradient text-text-lg lg:text-2xl uppercase mb-5 font-semibold text-center"
    >
      About the {{ currentProduct.name }}
    </h2>
    <p class="product__description-about--text text-gray-600 text-base lg:text-lg font-thin mb-8">
      {{ currentProduct.description }}
    </p>
  </div>
</template>
