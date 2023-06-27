<script setup lang="ts">
import type { productType } from '@/types/productType'
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
import useGetSession from '@/hooks/useGetSession'
import ModalCustom from '@/components/ui/ModalCustom.vue'
import useAppNavigation from '@/composables/useAppNavigation'

const { route, router, toast } = useAppNavigation()
const { loading, setLoading, setCurrentProduct, isProductReviewModalOpen } = useGetProductsStore()

async function fetchCurrentProduct() {
  const jwtToken = localStorage.getItem('jwt')
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

      setCurrentProduct(doc as productType)
      setLoading(false)
    }
  } catch (error) {
    console.log(error)
    setLoading(false)
  } finally {
    setLoading(false)
  }
}

onMounted(async () => {
  const session = await useGetSession()
  if (!session) return

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
        <ModalCustom :isEditing="isProductReviewModalOpen">
          <ReviewModal />
        </ModalCustom>
      </div>
    </section>
  </div>
</template>
