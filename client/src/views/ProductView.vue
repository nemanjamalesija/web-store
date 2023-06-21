<script setup lang="ts">
import { useProductsStore } from '@/stores/productsStore'
import type { productType } from '@/types/productType'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const productsStore = useProductsStore()
const { toggleLoading, setCurrentProduct } = useProductsStore()
const { currentProduct, loading } = storeToRefs(productsStore)

async function fetchCurrentProduct() {
  toggleLoading()
  try {
    const response = await fetch(`http://localhost:3001/api/v1/products/${route.params.id}`)
    const {
      data: { doc }
    } = await response.json()

    console.log(doc)

    setCurrentProduct(doc as productType)
    toggleLoading()
  } catch (error) {
    console.log(error)
    toggleLoading()
  }
}
onMounted(async () => {
  await fetchCurrentProduct()
})

/*



 */
</script>
<template>
  <h1 v-if="loading">Loading...</h1>
  <section v-else class="section-header h-[55vw] lg:h-[40vw]">
    <div class="header__hero h-full relative">
      <div class="header__hero-overlay absolute h-full w-full z-20 opacity-80">&nbsp;</div>

      <img
        class="header__hero-img h-full w-full object-cover z-10 block"
        :src="currentProduct.image"
        :alt="currentProduct.name + ' image'"
      />
    </div>
    <div class="heading-box z-30">
      <h1
        class="heading-primary text-5xl lg:text-6xl text-center text-orange-50 uppercase font-light mb-4"
      >
        <span>{{ currentProduct.name }}</span>
      </h1>
      <div class="heading-box__group flex items-center justify-center">
        <div class="heading-box__detail flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.4"
            stroke="currentColor"
            class="heading-box__icon h-4 w-4 lg:w-6 lg:h-6 stroke-orange-50"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.485 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.485-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
          <span class="heading-box__text text-orange-50 text-xs lg:text-base font-bold"
            >{{ currentProduct.rating }}&nbsp;<span
              class="text-orange-50 uppercase bold text-xs lg:text-base"
              >Rating</span
            ></span
          >
        </div>
        <div class="heading-box__detail flex items-center gap-2 ml-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.4"
            stroke="currentColor"
            class="heading-box__icon h-4 w-4 lg:w-6 lg:h-6 stroke-orange-50"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span class="heading-box__text text-orange-50 text-xs lg:text-base font-bold"
            >{{ currentProduct.price }}&nbsp;<span
              class="text-orange-50 uppercase bold text-xs lg:text-base"
              >Price</span
            ></span
          >
        </div>
      </div>
    </div>
  </section>
  <section class="product -mt-28 grid grid-cols-2 pb-20">
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

    <div class="product__description py-[14vw] px-[8vw] bg-white">
      <h2
        class="heading-secondary heading-gradient text-text-lg lg:text-2xl uppercase mb-5 font-semibold"
      >
        About the {{ currentProduct.name }}
      </h2>
      <p class="product__description-text text-gray-600 text-base lg:text-lg font-thin mb-8">
        {{ currentProduct.description }}
      </p>
      <div class="card__details grid grid-cols-2 gap-x-5 gap-y-4">
        <div class="card__data text-sm lg:text-base flex items-center gap-2">
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
              d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
            />
          </svg>

          <span class="card__footer-value font-medium">{{ currentProduct.calories }}</span
          ><span class="text-gray-600">calories</span>
        </div>
        <div class="card__data text-sm lg:text-base flex items-center gap-2">
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

          <span class="card__footer-value font-medium">{{ currentProduct.rating }}</span
          ><span class="text-gray-600">rating</span>
        </div>
        <div class="card__data text-sm lg:text-base flex items-center gap-2">
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
              d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z"
            />
          </svg>

          <span class="font-medium">{{ currentProduct.nutriScore }}</span
          ><span class="text-gray-600">N.score</span>
        </div>
        <div class="card__data text-sm lg:text-base flex items-center gap-2">
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
              d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <span class="font-medium">{{ currentProduct.price }}</span
          ><span class="text-gray-600">price</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.header__hero-img,
.header__hero-overlay {
  -webkit-clip-path: polygon(0 0, 100% 0%, 100% 83%, 0% 98%);
  clip-path: polygon(0 0, 100% 0%, 100% 83%, 0% 98%);
}

.header__hero-overlay {
  background-image: -webkit-gradient(
    linear,
    left top,
    right bottom,
    from rgba(255, 185, 0, 0.85),
    to rgba(255, 119, 48, 0.85)
  );
  background-image: linear-gradient(
    to right bottom,
    rgba(255, 185, 0, 0.85),
    rgba(255, 119, 48, 0.85)
  );
}

.heading-box {
  position: absolute;
  bottom: 35vw;
  left: 50%;
  top: 37%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.heading-box__detail {
  text-shadow: 0 0.3rem 1.45rem rgba(0, 0, 0, 0.15);
}

.heading-box__icon {
  -webkit-filter: drop-shadow(0 0.75rem 0.5rem rgba(0, 0, 0, 0.25));
  filter: drop-shadow(0 0.75rem 0.5rem rgba(0, 0, 0, 0.25));
}
</style>
