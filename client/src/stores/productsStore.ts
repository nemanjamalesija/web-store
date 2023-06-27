import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { productType } from '../types/productType'

export const useProductsStore = defineStore('product', () => {
  const products = ref([] as productType[])
  const currentProduct = ref({} as productType)
  const isProductReviewModalOpen = ref<boolean>(false)
  const loading = ref(false)

  function setProducts(productsAPI: productType[]) {
    products.value = productsAPI
  }

  function setCurrentProduct(singleProductAPI: productType) {
    currentProduct.value = singleProductAPI
  }

  function setLoading(payload: boolean) {
    loading.value = payload
  }

  function setIsReviewModalOpen(payload: boolean) {
    isProductReviewModalOpen.value = payload
  }

  return {
    products,
    loading,
    setProducts,
    setLoading,
    currentProduct,
    setCurrentProduct,
    isProductReviewModalOpen,
    setIsReviewModalOpen
  }
})
