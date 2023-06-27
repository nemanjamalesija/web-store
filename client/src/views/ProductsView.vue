<script setup lang="ts">
import { onMounted } from 'vue'
import SingleProduct from '@/components/SingleProduct.vue'
import type { productType } from '@/types/productType'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { baseUrl } from '@/constants/baseUrl'
import { useToast } from 'vue-toastification'
import useGetProductsStore from '../hooks/useGetProductsStore'
import useGetSession from '@/hooks/useGetSession'

const { products, loading, setLoading, setProducts } = useGetProductsStore()

const toast = useToast()

async function fetchAllProducts() {
  const session = await useGetSession()
  if (!session) return

  const { jwtToken } = session

  setLoading(true)
  try {
    const response = await fetch(`${baseUrl}/api/v1/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwtToken
      }
    })

    if (!response.ok) {
      const error = await response.json()
      toast.error(error.message)
      return
    }

    const {
      data: { doc }
    } = await response.json()

    setProducts(doc as productType[])
    setLoading(false)
  } catch (error) {
    console.log(error)
    setLoading(false)
  }
}

onMounted(async () => {
  await fetchAllProducts()
})
</script>

<template>
  <main>
    <div class="max-w-7xl mx-auto py-16 px-10 lg:px-0">
      <LoadingSpinner v-if="loading" />
      <section
        class="products pt-20 flex flex-col lg:grid lg:grid-cols-3 gap-16 justify-between place-items-center"
      >
        <SingleProduct v-for="product in products" :key="product.id" :product="product" />
      </section>
    </div>
  </main>
</template>
../hooks/useGetUserStore
