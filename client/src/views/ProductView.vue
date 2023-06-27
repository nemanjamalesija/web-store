<script setup lang="ts">
import type { productType } from '@/types/productType'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ReviewsSlider from '../components/ReviewsSlider.vue'
import ProductPageHeader from '../components/ProductPageHeader.vue'
import ProductPageStats from '../components/ProductPageStats.vue'
import ProductPageIngredients from '../components/ProductPageIngredients.vue'
import ProductPageAbout from '../components/ProductPageAbout.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import LeaveReview from '@/components/LeaveReview.vue'
import { baseUrl } from '../constants/baseUrl'
import { useToast } from 'vue-toastification'
import useGetProductsStore from '../hooks/useGetProductsStore'
import ReviewModal from '@/components/ReviewModal.vue'
import useGetSession from '@/hooks/useGetSession'
import ModalCustom from '@/components/ModalCustom.vue'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const { loading, setLoading, setCurrentProduct, isProductReviewModalOpen, toggleReviewModal } =
  useGetProductsStore()

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
  <LoadingSpinner v-if="loading" />
  <div class="relative" v-else>
    <ProductPageHeader />
    <section class="product -mt-12 lg:-mt-28 flex flex-col lg:grid lg:grid-cols-2">
      <ProductPageIngredients />
      <div class="product__description py-[14vw] px-[8vw] bg-white">
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
