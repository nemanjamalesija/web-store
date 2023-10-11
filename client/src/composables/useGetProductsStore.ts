import { storeToRefs } from 'pinia'
import { useProductsStore } from '../stores/productsStore'

export default function useGetProductsStore() {
  const productsStore = useProductsStore()
  const { products, loading, currentProduct, isProductReviewModalOpen } = storeToRefs(productsStore)
  const { setLoading, setProducts, setCurrentProduct, setIsReviewModalOpen, updateAllProducts } =
    useProductsStore()

  return {
    products,
    setProducts,
    currentProduct,
    setCurrentProduct,
    loading,
    setLoading,
    isProductReviewModalOpen,
    setIsReviewModalOpen,
    updateAllProducts
  }
}
