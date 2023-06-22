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
        <div class="heading-box__detail flex items-center gap-3 mr-5">
          <p v-for="(label, i) in currentProduct.labels" :key="i" class="card__labels flex gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-4 w-4 lg:w-6 lg:h-6 stroke-orange-50"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span class="text-orange-50 uppercase text-xs lg:text-base">{{ label }}</span>
          </p>
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
