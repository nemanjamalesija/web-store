<script setup lang="ts">
import { useProductsStore } from '@/stores/productsStore'
import type { productType } from '@/types/productType'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ReviewsSlider from '../components/ReviewsSlider.vue'
import ProductPageHeader from '../components/ProductPageHeader.vue'
import ProductPageStats from '../components/ProductPageStats.vue'
import ProductPageIngredients from '../components/ProductPageIngredients.vue'
import ProductPageAbout from '../components/ProductPageAbout.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import { baseUrl } from '../constants/baseUrl'

import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const { currentUser } = storeToRefs(userStore)

const route = useRoute()

const productsStore = useProductsStore()
const { toggleLoading, setCurrentProduct } = useProductsStore()
const { loading } = storeToRefs(productsStore)

async function fetchCurrentProduct() {
  toggleLoading()
  try {
    const response = await fetch(`${baseUrl}/api/v1/products/${route.params.id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const {
      data: { doc }
    } = await response.json()

    console.log(doc)

    setCurrentProduct(doc as productType)
    toggleLoading()
  } catch (error) {
    console.log(error)
    toggleLoading()
  }
}
onMounted(async () => {
  await fetchCurrentProduct()
})
</script>
<template>
  <LoadingSpinner v-if="loading" />
  <div v-else>
    <ProductPageHeader />
    <section class="product -mt-12 lg:-mt-28 flex flex-col lg:grid lg:grid-cols-2">
      <ProductPageIngredients />
      <div class="product__description py-[14vw] px-[8vw] bg-white">
        <ProductPageAbout />
        <ProductPageStats />
        <ReviewsSlider />
        <h1 class="text-8xl">{{ currentUser.name }}</h1>
      </div>
    </section>
  </div>
</template>
