<script setup lang="ts">
import { useProductsStore } from '@/stores/productsStore'
import { storeToRefs } from 'pinia'

const productsStore = useProductsStore()
const { currentProduct } = storeToRefs(productsStore)
</script>
<template>
  <section class="section-header h-[55vw] lg:h-[40vw]">
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
