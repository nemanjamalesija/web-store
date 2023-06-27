<script setup lang="ts">
import type { productType } from '@/types/productType'
import { cardIcons } from '../assets/icons/cardIcons'
import calculateAverageRating from '@/helpers/calculateAverageRating'

type singleProductPropsType = {
  product: productType
  index: number
}

const props = defineProps<singleProductPropsType>()
</script>
<template>
  <article
    class="card rounded-sm overflow-hidden transition-all duration-300 flex flex-col bg-white text-gray-600"
  >
    <!-- card header -->
    <div class="card__header relative">
      <figure class="card__picture relative h-60 lg:h-64">
        <img
          class="card__picture-img object-cover h-full w-full"
          :src="props.product.image"
          :alt="props.product.name + ' image'"
        />
      </figure>

      <h3 class="heading-tertirary text-center text-orange-800 text-xl lg:text-2xl font-semibold">
        {{ props.product.name }}
      </h3>
    </div>

    <!-- card body -->
    <div class="card__details grid grid-cols-2 gap-x-5 gap-y-4 py-6 px-7">
      <!-- summary -->
      <p class="card__text col-span-2 text-sm lg:text-base italic mb-3">
        {{ props.product.summary }}
      </p>

      <!-- calories -->
      <div class="card__data text-sm lg:text-base flex items-center gap-2">
        <div v-html="cardIcons.calories"></div>
        <span class="card__footer-value font-semibold">{{ props.product.calories }}</span
        ><span>calories</span>
      </div>

      <!-- rating -->
      <div class="card__data text-sm lg:text-base flex items-center gap-2">
        <div v-html="cardIcons.rating"></div>
        <span class="card__footer-value font-semibold">{{
          calculateAverageRating(props.product)
        }}</span
        ><span>rating</span>
      </div>

      <!-- nutri score -->
      <div class="card__data text-sm lg:text-base flex items-center gap-2">
        <div v-html="cardIcons.nutriScore"></div>

        <span class="font-semibold">{{ props.product.nutriScore }}</span
        ><span>N.score</span>
      </div>

      <!-- price-->
      <div class="card__data text-sm lg:text-base flex items-center gap-2">
        <div v-html="cardIcons.price"></div>
        <span class="font-semibold">{{ props.product.price }}</span
        ><span>price</span>
      </div>
    </div>

    <div
      class="card__footer bg-slate-50 border-t-2 border-slate-50 b py-6 px-7 mt-auto flex l items-center"
    >
      <div class="flex items-center">
        <div class="flex flex-col gap-2">
          <p v-for="(label, i) in props.product.labels" :key="i" class="card__labels flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5 stroke-orange-500"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>

            <span class="text-xs lg:text-sm text-gray-500">{{ label }}</span>
          </p>
        </div>
      </div>
      <router-link
        :to="`/products/${props.product.id}`"
        class="btn inline-block py-3 px-6 bg-orange-500 text-sm lg:text-base hover:bg-orange-600 active:bg-orange-800 justify-self-end self-center ml-auto"
        href="#"
        >Details</router-link
      >
    </div>
  </article>
</template>

<style>
.card {
  -webkit-box-shadow: 0 1rem 2.5rem rgba(0, 0, 0, 0.1);
  box-shadow: 0 1rem 2.5rem rgba(0, 0, 0, 0.1);
}

.card__picture {
  -webkit-clip-path: polygon(0 0, 100% 0%, 100% 83%, 0% 98%);
  clip-path: polygon(0 0, 100% 0%, 100% 83%, 0% 98%);
}
</style>
