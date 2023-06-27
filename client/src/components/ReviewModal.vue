<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import useGetProductsStore from '../hooks/useGetProductsStore'
import { ref } from 'vue'
import { baseUrl } from '@/constants/baseUrl'
import { useToast } from 'vue-toastification'
import CloseModalButton from './ui/CloseModalButton.vue'

const reviewRating = ref<number>(5)
const reviewMessage = ref<string>('')

const route = useRoute()
const router = useRouter()
const toast = useToast()

const { setIsReviewModalOpen } = useGetProductsStore()

async function submitReviewHandler() {
  const jwtToken = localStorage.getItem('jwt')

  try {
    const response = await fetch(`${baseUrl}/api/v1${route.fullPath}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwtToken
      },
      body: JSON.stringify({
        rating: reviewRating.value,
        review: reviewMessage.value
      })
    })

    if (!response.ok) {
      const error = await response.json()
      toast.error(error.message)
      return
    } else {
      setIsReviewModalOpen(false)
      router.push('/products')
      return toast.success('Review sucessfully submited. Thank you!')
    }
  } catch (error) {
    console.log(error)
  }
}
</script>
<template>
  <form class="form">
    <div class="flex flex-col mb-3">
      <label for="productReview" class="z-40 mb-2 font-bold text-neutral-500 text-sm lg:text-base"
        >How would you rate this product from 1 to 5 ?
      </label>
      <input
        type="number"
        min="1"
        max="5"
        step="0.1"
        class="form__input"
        id="productReview"
        v-model="reviewRating"
      />
    </div>
    <div class="mb-6">
      <textarea
        className=" min-h-[80px] py-4 px-5 block p-2.5 w-full text-sm lg:text-base text-gray-900 bg-[#f8f9fa]  rounded-lg border border-gray-300 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
        placeholder="Your thoughts..."
        v-model="reviewMessage"
      ></textarea>
    </div>
    <button
      class="btn bg-orange-500 py-3 px-5 text-sm lg:text-base hover:bg-orange-600 active:bg-orange-800"
      @click.prevent="submitReviewHandler"
    >
      Send review
    </button>

    <CloseModalButton @close-modal="setIsReviewModalOpen(false)" />
  </form>
</template>
