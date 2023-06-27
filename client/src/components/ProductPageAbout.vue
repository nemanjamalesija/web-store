<script setup lang="ts">
import useGetProductsStore from '@/hooks/useGetProductsStore'

const { currentProduct } = useGetProductsStore()
</script>
<template>
  <div class="product__description-about mb-8">
    <h2
      class="heading-secondary heading-gradient text-text-lg lg:text-2xl uppercase mb-5 font-semibold text-center"
    >
      About the {{ currentProduct.name }}
    </h2>
    <p class="product__description-about--text text-gray-600 text-sm lg:text-lg font-thin">
      {{ currentProduct.description }}
    </p>
  </div>
</template>
