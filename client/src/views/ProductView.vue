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

const route = useRoute()

const productsStore = useProductsStore()
const { toggleLoading, setCurrentProduct } = useProductsStore()
const { loading } = storeToRefs(productsStore)

async function fetchCurrentProduct() {
  toggleLoading()
  try {
    const response = await fetch(`http://localhost:3001/api/v1/products/${route.params.id}`)
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
    <section class="product -mt-28 grid grid-cols-2 pb-20">
      <ProductPageIngredients />
      <div class="product__description py-[14vw] px-[8vw] bg-white">
        <ProductPageAbout />
        <ProductPageStats />
        <ReviewsSlider />
      </div>
    </section>
  </div>
</template>
