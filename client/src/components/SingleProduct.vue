<script setup lang="ts">
import type { productType } from '@/types/productType'

type singleProductPropsType = {
  product: productType
}

const props = defineProps<singleProductPropsType>()
</script>
<template>
  <div class="card">
    <div class="card__header">
      <div class="card__picture">
        <div class="card__picture-overlay">&nbsp;</div>
        <img
          class="card__picture-img"
          :src="props.product.image"
          :alt="props.product.name + ' image'"
        />
      </div>
      <h3 class="heading-tertirary text-center text-orange-800 text-xl lg:text-2xl font-semibold">
        {{ props.product.name }}
      </h3>
    </div>
    <div class="card__details">
      <div class="flex justify-end items-center gap-2 col-span-2">
        <span
          v-for="(label, i) in props.product.labels"
          :key="i"
          class="card__labels text-xs lg:text-sm"
        >
          {{ label }}
        </span>
      </div>

      <p class="card__text text-base lg:text-lg italic">{{ props.product.summary }}</p>
      <div class="card__data">
        <svg class="card__icon">
          <!-- <use xlink:href="img/icons.svg#icon-map-pin"></use> -->
          🎈
        </svg>
        <span>Banff, Canada</span>
      </div>
      <div class="card__data">
        <svg class="card__icon">
          <!-- <use xlink:href="img/icons.svg#icon-calendar"></use> -->
          🎈
        </svg>
        <span>April 2021</span>
      </div>
      <div class="card__data">
        <svg class="card__icon">
          <!-- <use xlink:href="img/icons.svg#icon-flag"></use> -->
          🎈
        </svg>
        <span>3 stops</span>
      </div>
      <div class="card__data">
        <svg class="card__icon">
          <!-- <use xlink:href="img/icons.svg#icon-user"></use> -->
          🎈
        </svg>
        <span>25 people</span>
      </div>
    </div>
    <div class="card__footer">
      <p>
        <span class="card__footer-value">\ {{ props.product.price }}</span>
        <span class="card__footer-text">per person</span>
      </p>
      <p class="card__ratings">
        <span class="card__footer-value">{{ props.product.rating }}</span>
        <span class="card__footer-text">rating {{ props.product.reviewsNumber }}</span>
      </p>
      <a class="btn btn--green btn--small" href="#">Details</a>
    </div>
  </div>
</template>

<style>
.card {
  border-radius: 3px;
  overflow: hidden;
  -webkit-box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.1);
  box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.1);
  background-color: #fff;
  -webkit-transition: 0.3s all;
  transition: 0.3s all;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}
.card__header {
  position: relative;
}
.card__picture {
  position: relative;
  -webkit-clip-path: polygon(0 0, 100% 0%, 100% 83%, 0% 98%);
  clip-path: polygon(0 0, 100% 0%, 100% 83%, 0% 98%);
  height: 22rem;
}
.card__picture-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
}
.card__picture-img {
  -o-object-fit: cover;
  object-fit: cover;
  height: 100%;
  width: 100%;
}
.card__details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 1.75rem;
  grid-column-gap: 2rem;
  padding: 2.5rem 3rem;
}
.card__sub-heading {
  font-size: 1.2rem;
  text-transform: uppercase;
  font-weight: 700;
  grid-column: 1 / -1;
}

.card__text {
  grid-column: 1 / -1;
}
.card__data {
  font-size: 1.3rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.card__data svg {
  margin-right: 0.7rem;
}
.card__icon {
  height: 2rem;
  width: 2rem;
  fill: #55c57a;
}
.card__footer {
  background-color: #f7f7f7;
  border-top: 1px solid #f1f1f1;
  padding: 25px 30px;
  font-size: 1.4rem;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  margin-top: auto;
}
.card__footer-value {
  font-weight: 700;
}
.card__footer-text {
  color: #999;
}
.card__ratings {
  grid-row: 2 / 3;
}
.card .btn-small,
.card .btn {
  grid-row: 1 / 3;
  justify-self: end;
  -ms-flex-item-align: center;
  align-self: center;
}
</style>
