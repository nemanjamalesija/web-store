<script setup lang="ts">
import { useProductsStore } from '@/stores/productsStore'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

const productsStore = useProductsStore()
const { products, loading } = storeToRefs(productsStore)

const { toggleLoading, setProducts } = useProductsStore()

async function fetchAllProducts() {
  ;('')
  toggleLoading()
  try {
    const response = await fetch('http://localhost:3001/api/v1/products')
    const {
      data: { doc }
    } = await response.json()

    setProducts(doc)
    toggleLoading()
  } catch (error) {
    console.log(error)
    toggleLoading()
  }
}
onMounted(async () => {
  await fetchAllProducts()
})
</script>

<template>
  <main>
    <h1 class="" v-if="loading">Loading...</h1>
    <div v-else v-for="product in products" :key="product.id">
      <img :src="product.image" :alt="`${product.name} image`" />
      <h3 class="">{{ product.name }}</h3>
    </div>
    <h1>aa</h1>
  </main>
</template>
