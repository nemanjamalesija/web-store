<script setup lang="ts">
import { useProductsStore } from '@/stores/productsStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
const currentSlideIndex = ref(0)

const productsStore = useProductsStore()
const { currentProduct } = storeToRefs(productsStore)
</script>
<template>
  <div class="slider">
    <h3
      class="heading-tertiary heading-gradient text-text-lg lg:text-2xl uppercase mb-5 font-semibold text-center"
    >
      Reviews
    </h3>
    <div
      v-if="currentProduct.reviews !== undefined && currentProduct.reviews.length > 0"
      class="slider__box"
    >
      <p class="text-gray-600 text-base lg:text-lg font-thin mb-5">
        {{ currentProduct.reviews[currentSlideIndex]?.review }}
      </p>

      <div class="slider__box-user-info flex items-center gap-3">
        <img
          class="slider__box-user-image object-cover h-14 w-14 rounded-full inline-block"
          :src="currentProduct.reviews[currentSlideIndex]?.user.photo"
          :alt="currentProduct.reviews[currentSlideIndex]?.user.photo + ' image'"
        />
        <div class="flex flex-col items-start justify-start">
          <h4 class="heading-fourth text-gray-600 text-base lg:text-lg">
            {{ currentProduct.reviews[currentSlideIndex]?.user.name }}
          </h4>
          <div class="slider__box-user-rating text-sm lg:text-base flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.4"
              stroke="currentColor"
              class="w-6 h-6 stroke-orange-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.485 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.485-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
            <div class="">
              <span class="text-gray-600 mr-2">rated this bowl</span>
              <span class="card__footer-value font-medium mr-1">{{
                currentProduct.reviews[currentSlideIndex].rating
              }}</span
              ><span class="text-gray-600 mr-1">/</span>
              <span class="font-medium">5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
