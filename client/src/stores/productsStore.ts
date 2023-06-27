import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ProductType } from '../types/productType'

export const useProductsStore = defineStore('product', () => {
  const products = ref([] as ProductType[])
  const currentProduct = ref({} as ProductType)
  const isProductReviewModalOpen = ref<boolean>(false)
  const loading = ref(false)

  function setProducts(productsAPI: ProductType[]) {
    products.value = productsAPI
  }

  function setCurrentProduct(singleProductAPI: ProductType) {
    currentProduct.value = singleProductAPI
  }

  function setLoading(payload: boolean) {
    loading.value = payload
  }

  function setIsReviewModalOpen(payload: boolean) {
    isProductReviewModalOpen.value = payload
  }

  function updateAllProducts(payload: ProductType) {
    const indexToUpdate = products.value.findIndex((prod) => prod.id === payload.id)

    if (indexToUpdate !== -1) {
      // Remove the old object
      products.value.splice(indexToUpdate, 1)

      // Add the updated object
      products.value.push(payload)
    }
  }

  return {
    products,
    loading,
    setProducts,
    setLoading,
    currentProduct,
    setCurrentProduct,
    isProductReviewModalOpen,
    setIsReviewModalOpen,
    updateAllProducts
  }
})
