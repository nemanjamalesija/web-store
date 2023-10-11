<script setup lang="ts">
import useGetProductsStore from '../composables/useGetProductsStore'
import { cardIcons } from '../assets/icons/cardIcons'
import calculateAverageRating from '../helpers/calculateAverageRating'

const { currentProduct } = useGetProductsStore()
</script>
<template>
  <div class="card__details grid grid-cols-2 gap-x-5 gap-y-4 mb-20">
    <div class="card__data text-sm lg:text-base flex items-center gap-2">
      <!-- calories -->
      <div v-html="cardIcons.calories"></div>
      <span class="font-semibold">{{ currentProduct.calories }}</span
      ><span>calories</span>
    </div>

    <!-- raing -->
    <div class="card__data text-sm lg:text-base flex items-center gap-2">
      <div v-html="cardIcons.rating"></div>

      <!--  check if reviews are not undefined before rendering the rating-->
      <span v-if="currentProduct && currentProduct.reviews" class="font-semibold">{{
        calculateAverageRating(currentProduct)
      }}</span
      ><span>rating</span>
    </div>

    <!-- nutri score -->
    <div class="card__data text-sm lg:text-base flex items-center gap-2">
      <div v-html="cardIcons.nutriScore"></div>
      <span class="font-semibold">{{ currentProduct.nutriScore }}</span
      ><span>N.score</span>
    </div>

    <!-- price -->
    <div class="card__data text-sm lg:text-base flex items-center gap-2">
      <div v-html="cardIcons.price"></div>
      <span class="font-semibold">{{ currentProduct.price }}</span
      ><span>price</span>
    </div>
  </div>
</template>
