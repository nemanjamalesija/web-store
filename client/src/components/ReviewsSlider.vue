<script setup lang="ts">
import { ref } from 'vue'
import { format } from 'date-fns'
import useGetProduct from '../hooks/useGetProduct'

const currentSlideIndex = ref(0)

const { currentProduct } = useGetProduct()

function formatDate(date: string) {
  return format(new Date(date), 'MMMM d, yyyy')
}

function nextReviewHandler() {
  if (currentSlideIndex.value === currentProduct.value.reviews.length - 1)
    currentSlideIndex.value = 0
  else currentSlideIndex.value += 1
}

function previousReviewHandler() {
  if (currentSlideIndex.value === 0)
    currentSlideIndex.value = currentProduct.value.reviews.length - 1
  else currentSlideIndex.value -= 1
}
</script>
<template>
  <div class="slider relative px-7 mb-12">
    <h3
      class="heading-tertiary heading-gradient text-text-lg lg:text-2xl uppercase mb-5 font-semibold text-center"
    >
      Reviews
    </h3>
    <div
      v-if="currentProduct.reviews !== undefined && currentProduct.reviews.length > 0"
      class="slider__box"
    >
      <p class="text-gray-600 text-sm lg:text-lg font-thin mb-8">
        {{ currentProduct.reviews[currentSlideIndex]?.review }}
      </p>

      <div class="slider__box-user-info flex items-center gap-3">
        <img
          class="slider__box-user-image object-cover h-10 w-10 lg:h-14 lg:w-14 rounded-full inline-block"
          :src="currentProduct.reviews[currentSlideIndex]?.user.photo"
          :alt="currentProduct.reviews[currentSlideIndex]?.user.photo + ' image'"
        />
        <div class="flex flex-col items-start justify-start gap-1 lg:gap-0">
          <div class="slider__box-user-namedate flex items-center justify-center gap-2">
            <p class="text-sm lg:text-lg font-semibold">
              {{ currentProduct.reviews[currentSlideIndex]?.user.name }}
            </p>
          </div>

          <div class="slider__box-user-rating text-xs lg:text-base flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.4"
              stroke="currentColor"
              class="h-4 w-4 lg:w-5 lg:h-5 stroke-orange-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.485 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.485-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
            <div class="flex items-center justify-center gap-1">
              <p class="flex items-center justify-center gap-1">
                <span class="font-semibold">{{
                  currentProduct.reviews[currentSlideIndex].rating
                }}</span
                ><span>/</span>
                <span class="font-semibold">5</span>
                <span class="text-gray-500">-</span>
              </p>
              <span class="text-xs lg:text-sm text-gray-500 flex items-center justify-center">{{
                formatDate(currentProduct.reviews[currentSlideIndex].createdAt)
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button
      class="btn btn-slider btn-slider--right py-1 px-2 lg:py-2 lg:px-4 rounded-full bg-slate-50 hover:bg-slate-100"
      @click="nextReviewHandler"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 stroke-orange-500"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </button>
    <button
      class="btn btn-slider btn-slider--left py-1 px-2 lg:py-2 lg:px-4 bg-slate-50 hover:bg-slate-100"
      @click="previousReviewHandler"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 stroke-orange-500"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.btn-slider {
  position: absolute;
  top: 44%;
  transform: translate(-50%, -50%);
}

.btn-slider--left {
  left: -8%;
}

.btn-slider--right {
  right: -14%;
}

@media only screen and (max-width: 1000px) {
  .btn-slider--left {
    left: -3%;
  }

  .btn-slider--right {
    right: -6%;
  }
}
</style>
