<script setup lang="ts">
import { onMounted } from 'vue'
import SingleProduct from '@/components/SingleProduct.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import useGetProductsStore from '../hooks/useGetProductsStore'
import useGetSession from '@/hooks/useGetSession'
import fetchAllProducts from '@/helpers/fetchAllProducts'

const { products, loading } = useGetProductsStore()

onMounted(async () => {
  const session = await useGetSession()
  if (!session) return

  const { jwtToken } = session

  await fetchAllProducts(jwtToken)
})
</script>

<template>
  <main>
    <div class="max-w-7xl mx-auto py-16 px-10 lg:px-0">
      <LoadingSpinner v-if="loading" />
      <section
        class="products pt-20 flex flex-col lg:grid lg:grid-cols-3 gap-16 justify-between place-items-center"
      >
        <SingleProduct
          v-for="(product, index) in products"
          :key="product.id"
          :product="product"
          :index="index"
        />
      </section>
    </div>
  </main>
</template>
../hooks/useGetUserStore
