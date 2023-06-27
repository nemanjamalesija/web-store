<script setup lang="ts">
import { ref } from 'vue'
import useGetProductsStore from '../hooks/useGetProductsStore'
import { starIconsReview } from '../assets/icons/stars'
import formatDate from '@/helpers/formatDate'

const currentSlideIndex = ref(0)

const { currentProduct } = useGetProductsStore()

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

const createStarsArray = (rating: number) => {
  const starsArray = []

  for (let i = 1; i <= 5; i++) {
    let halfStar = i - 0.5

    if (rating >= i) starsArray.push(starIconsReview.fullStar)
    else if (rating >= halfStar) starsArray.push(starIconsReview.halfStar)
    else starsArray.push(starIconsReview.emptyStar)
  }

  return starsArray
}
</script>

<template>
  <div class="slider relative px-7 mb-8">
    <h3
      class="heading-tertiary heading-gradient text-text-lg lg:text-2xl uppercase mb-8 font-semibold text-center"
    >
      Reviews
    </h3>
    <article
      v-if="currentProduct.reviews !== undefined && currentProduct.reviews.length > 0"
      class="slider__box"
    >
      <!-- review user image -->
      <div class="flex items-center mb-4 space-x-4">
        <figure>
          <img
            class="w-12 h-12 rounded-full"
            :src="currentProduct.reviews[currentSlideIndex]?.user.photo"
            :alt="currentProduct.reviews[currentSlideIndex]?.user.photo + ' image'"
          />
        </figure>

        <!-- format user join date -->
        <div class="space-y-1 font-medium dark:text-white">
          <p>
            {{ currentProduct.reviews[currentSlideIndex]?.user.name }}

            <time
              class="block text-sm text-gray-500 dark:text-gray-400"
              datetime="{{formatDate(currentProduct.reviews[currentSlideIndex].user.joinedAt)}}"
            >
              Joined on {{ formatDate(currentProduct.reviews[currentSlideIndex].user.joinedAt) }}
            </time>
          </p>
        </div>
      </div>

      <div class="flex items-center mb-1 gap-1">
        <!-- number of stars -->
        <div
          v-for="(svgString, index) in createStarsArray(
            currentProduct.reviews[currentSlideIndex].rating
          )"
          :key="index"
        >
          <div v-html="svgString"></div>
        </div>

        <p class="flex text-sm items-center justify-center gap-1">
          {{ currentProduct.reviews[currentSlideIndex].rating }} / 5
        </p>

        <!-- date of the posted review -->
        <p class="text-sm text-gray-500 dark:text-gray-400">
          - Reviewed on
          <time
            datetime="{{formatDate(currentProduct.reviews[currentSlideIndex].user.joinedAt)}}"
            >{{ formatDate(currentProduct.reviews[currentSlideIndex].user.joinedAt) }}</time
          >
        </p>
      </div>

      <p class="mb-2 text-gray-500 dark:text-gray-400">
        {{ currentProduct.reviews[currentSlideIndex]?.review }}
      </p>
    </article>

    <!-- slider buttons absolute -->
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
  top: 60%;
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
