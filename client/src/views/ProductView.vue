<script setup lang="ts">
import type { ProductType } from '../types/productType'
import { onMounted } from 'vue'
import { baseUrl } from '../constants/baseUrl'
import ReviewsSlider from '../components/ReviewsSlider.vue'
import ProductPageHeader from '../components/ProductPageHeader.vue'
import ProductPageStats from '../components/ProductPageStats.vue'
import ProductPageIngredients from '../components/ProductPageIngredients.vue'
import ProductPageAbout from '../components/ProductPageAbout.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import LeaveReview from '../components/LeaveReview.vue'
import useGetProductsStore from '../composables/useGetProductsStore'
import ReviewModal from '../components/ReviewModal.vue'
import ModalCustom from '../components/ui/ModalCustom.vue'
import useAppNavigation from '../composables/useAppNavigation'
import fetchProduct from '../api/fetchProduct'

const { route, router } = useAppNavigation()
const { loading, setLoading, setCurrentProduct, isProductReviewModalOpen } = useGetProductsStore()

async function fetchProductHandler() {
  setLoading(true)

  const product = await fetchProduct(route.params.id as string)

  if (!product) {
    return router.push('/products')
  }
  setCurrentProduct(product)
  setLoading(false)
}

onMounted(async () => {
  await fetchProductHandler()
})
</script>
<template>
  <LoadingSpinner class="mt-16" v-if="loading" />
  <div v-else class="relative product">
    <ProductPageHeader />
    <section class="-mt-12 lg:-mt-28 flex flex-col lg:grid lg:grid-cols-2">
      <ProductPageIngredients />
      <div class="py-[14vw] px-[8vw] bg-white">
        <ProductPageAbout />
        <ProductPageStats />
        <ReviewsSlider />
        <LeaveReview />
        <ModalCustom :isVisible="isProductReviewModalOpen">
          <ReviewModal />
        </ModalCustom>
      </div>
    </section>
  </div>
</template>
