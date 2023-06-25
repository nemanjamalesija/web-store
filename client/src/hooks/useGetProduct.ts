import { storeToRefs } from 'pinia'
import { useProductsStore } from '../stores/productsStore'

export default function useGetProduct() {
  const productsStore = useProductsStore()
  const { products, loading, currentProduct } = storeToRefs(productsStore)
  const { setLoading, setProducts, setCurrentProduct } = useProductsStore()

  return { products, setProducts, currentProduct, setCurrentProduct, loading, setLoading }
}
