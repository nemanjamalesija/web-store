import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { productType, reviewType } from '../types/productType'

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

  function addNewReview(payload: reviewType) {
    console.log(payload.product)

    const ids = products.value.map((prod) => prod)

    const reviewedProduct = products.value.find((prod) => prod.id === payload.product)
    const reviewedProductIndex = products.value.findIndex(
      (product) => product.id === reviewedProduct.id
    )

    console.log(products.value)
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
    addNewReview
  }
})
