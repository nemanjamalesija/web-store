<script setup lang="ts">
import { useProductsStore } from '@/stores/productsStore'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import SingleProduct from '../components/SingleProduct.vue'

const productsStore = useProductsStore()
const { products, loading } = storeToRefs(productsStore)

const { toggleLoading, setProducts } = useProductsStore()

async function fetchAllProducts() {
  toggleLoading()
  try {
    const response = await fetch('http://localhost:3001/api/v1/products')
    const {
      data: { doc }
    } = await response.json()

    console.log(doc)

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
    <div class="max-w-7xl mx-auto">
      <h1 class="" v-if="loading">Loading...</h1>
      <div class="">
        <h1 class="text-2xl lg:text-3xl text-orange-800 text-center font-bold mb-10">
          Mambo Jumbo
        </h1>
        <div class="">
          <SingleProduct v-for="product in products" :key="product.id" :product="product" />
        </div>
      </div>
    </div>
  </main>
</template>
