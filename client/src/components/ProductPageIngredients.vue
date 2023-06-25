<script setup lang="ts">
import useGetProduct from '../hooks/useGetProduct'

const { currentProduct } = useGetProduct()
</script>
<template>
  <div class="product__ingredients py-[14vw] px-[8vw] bg-slate-50">
    <div class="product__ingredients-details">
      <h2
        class="heading-secondary heading-gradient text-text-lg lg:text-2xl uppercase mb-5 font-semibold text-center"
      >
        Ingredients
      </h2>
      <div class="flex flex-col product__ingredients-bases mb-8">
        <div class="product__ingredients-bases grid grid-cols-4 gap-3">
          <img
            v-for="(image, index) in currentProduct.ingredientsImages?.bases"
            :key="index"
            :src="image"
            alt="aaaa"
            class="h-full w-full inline-block object-cover p-4"
          />
        </div>
        <div class="product__ingredients-bases-ingredients grid grid-cols-4 gap-3">
          <h4
            v-for="(base, index) in currentProduct.ingredients?.bases"
            :key="index"
            class="text-center text-xs lg:text-sm -mt-2 text-gray-600"
          >
            {{ base }}
          </h4>
        </div>
      </div>

      <div class="product__ingredients-proteins flex flex-col mb-8">
        <div class="product__ingredients-proteins-images grid grid-cols-4 gap-3">
          <img
            v-for="(image, index) in currentProduct.ingredientsImages?.proteins"
            :key="index"
            :src="image"
            alt="aaaa"
            class="h-full w-full inline-block object-cover p-4"
          />
        </div>
        <div class="product__ingredients-proteins-names grid grid-cols-4 gap-3">
          <h4
            v-for="(protein, index) in currentProduct.ingredients?.proteins"
            :key="index"
            class="text-xs lg:text-sm -mt-2 text-gray-600 text-center"
          >
            {{ protein }}
          </h4>
        </div>
      </div>

      <div class="flex flex-col product__ingredients-toppings mb-8">
        <div class="product__ingredients-toppings-images grid grid-cols-4 gap-3">
          <img
            v-for="(image, index) in currentProduct.ingredientsImages?.mixinsAndToppings"
            :key="index"
            :src="image"
            alt="aaaa"
            class="h-full w-full inline-block object-cover p-4"
          />
        </div>
        <div class="product__ingredients-toppings-names grid grid-cols-4 gap-3">
          <h4
            v-for="(topping, index) in currentProduct.ingredients?.mixinsAndToppings"
            :key="index"
            class="pl-6 text-xs lg:text-sm -mt-2 text-gray-600"
          >
            {{ topping }}
          </h4>
        </div>
      </div>

      <div class="flex flex-col product__ingredients-sauces">
        <div class="product__ingredients-sauces-images grid grid-cols-4 gap-3">
          <img
            v-for="(image, index) in currentProduct.ingredientsImages?.sauces"
            :key="index"
            :src="image"
            alt="aaaa"
            class="h-full w-full inline-block object-cover p-4"
          />
        </div>
        <div class="product__ingredients-sauces-names grid grid-cols-4 gap-3">
          <h4
            v-for="(sauce, index) in currentProduct.ingredients?.sauces"
            :key="index"
            class="text-center text-xs lg:text-sm -mt-2 text-gray-600"
          >
            {{ sauce }}
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>
