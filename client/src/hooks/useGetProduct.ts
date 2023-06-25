import { storeToRefs } from 'pinia'
import { useProductsStore } from '../stores/productsStore'

export default function useGetProduct() {
  const productsStore = useProductsStore()
  const { products, loading, currentProduct, isProductReviewModalOpen } = storeToRefs(productsStore)
  const { setLoading, setProducts, setCurrentProduct, toggleReviewModal } = useProductsStore()

  return {
    products,
    setProducts,
    currentProduct,
    setCurrentProduct,
    loading,
    setLoading,
    isProductReviewModalOpen,
    toggleReviewModal
  }
}
