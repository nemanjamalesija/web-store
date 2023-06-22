<script setup lang="ts">
import { useProductsStore } from '@/stores/productsStore'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import SingleProduct from '../components/SingleProduct.vue'
import type { productType } from '../types/productType'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

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

    setProducts(doc as productType[])
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
    <div class="max-w-7xl mx-auto py-16 px-10 lg:px-0">
      <LoadingSpinner v-if="loading" />
      <div class="">
        <div class="flex flex-col lg:grid lg:grid-cols-3 gap-16 justify-between place-items-center">
          <SingleProduct v-for="product in products" :key="product.id" :product="product" />
        </div>
      </div>
    </div>
  </main>
</template>
