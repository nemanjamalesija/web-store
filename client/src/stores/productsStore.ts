import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { productTypeAll } from '@/types/productType'

export const useProductsStore = defineStore('counter', () => {
  const products = ref([] as productTypeAll[])
  const loading = ref(false)

  function setProducts(productsAPI: productTypeAll[]) {
    products.value = productsAPI
  }

  function toggleLoading() {
    loading.value = !loading.value
  }

  return { products, loading, setProducts, toggleLoading }
})
