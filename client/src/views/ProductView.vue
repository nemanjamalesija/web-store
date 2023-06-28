<script setup lang="ts">
import type { ProductType } from '@/types/productType'
import { onMounted } from 'vue'
import { baseUrl } from '@/constants/baseUrl'
import ReviewsSlider from '@/components/ReviewsSlider.vue'
import ProductPageHeader from '@/components/ProductPageHeader.vue'
import ProductPageStats from '@/components/ProductPageStats.vue'
import ProductPageIngredients from '@/components/ProductPageIngredients.vue'
import ProductPageAbout from '@/components/ProductPageAbout.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import LeaveReview from '@/components/LeaveReview.vue'
import useGetProductsStore from '../hooks/useGetProductsStore'
import ReviewModal from '@/components/ReviewModal.vue'
import ModalCustom from '@/components/ui/ModalCustom.vue'
import useAppNavigation from '@/composables/useAppNavigation'

const { route, router, toast } = useAppNavigation()
const { loading, setLoading, setCurrentProduct, isProductReviewModalOpen } = useGetProductsStore()

async function fetchCurrentProduct() {
  const jwtToken = localStorage.getItem('jwt')

  if (!jwtToken) {
    toast.error('Could not get your session! Please log in.')
    router.push('/')
  }
  setLoading(true)

  try {
    const response = await fetch(`${baseUrl}/api/v1/products/${route.params.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwtToken
      }
    })

    if (!response.ok) {
      const error = await response.json()
      toast.error(error.message)
      router.push('/products')
      return
    } else {
      const {
        data: { doc }
      } = await response.json()

      setCurrentProduct(doc as ProductType)
      setLoading(false)
    }
  } catch (error) {
    toast.error('Oop, something went wrong!')
    console.log(error)
    setLoading(false)
  } finally {
    setLoading(false)
  }
}

onMounted(async () => {
  await fetchCurrentProduct()
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
