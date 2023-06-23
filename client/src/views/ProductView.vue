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
import { useToast } from 'vue-toastification'

import { useUserStore } from '@/stores/userStore'
import router from '@/router'

const userStore = useUserStore()
const { currentUser } = storeToRefs(userStore)

const route = useRoute()
const toast = useToast()

const productsStore = useProductsStore()
const { setLoading, setCurrentProduct } = useProductsStore()
const { loading } = storeToRefs(productsStore)

async function fetchCurrentProduct() {
  setLoading(true)
  const jwtToken = localStorage.getItem('jwt')

  try {
    const response = await fetch(`${baseUrl}/api/v1/products/${route.params.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwtToken
      }
    })

    if (!jwtToken) {
      const error = await response.json()
      toast.error(error.message)
      router.push('/login')
      return
    } else {
      const {
        data: { doc }
      } = await response.json()

      setCurrentProduct(doc as productType)
      setLoading(false)
    }
  } catch (error) {
    setLoading(false)
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
