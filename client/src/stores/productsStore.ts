import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { productType } from '../types/productType'

export const useProductsStore = defineStore('counter', () => {
  const products = ref([] as productType[])
  const currentProduct = ref({} as productType)

  const loading = ref(false)

  function setProducts(productsAPI: productType[]) {
    products.value = productsAPI
  }

  function setCurrentProduct(singleProductAPI: productType) {
    currentProduct.value = singleProductAPI
  }

  function toggleLoading() {
    loading.value = !loading.value
  }

  return { products, loading, setProducts, toggleLoading, currentProduct, setCurrentProduct }
})
