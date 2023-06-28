import { baseUrl } from '../constants/baseUrl'
import { useProductsStore } from '../stores/productsStore'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
import { ProductType } from '../types/productType'

export default async function fetchCurrentProduct() {
  const { setLoading, setCurrentProduct } = useProductsStore()
  const router = useRouter()
  const route = useRoute()
  const toast = useToast()

  const jwtToken = localStorage.getItem('jwt')

  if (!jwtToken) {
    toast.error('Could not get your session! Please log in.')
    router.push('/')
  }
  setLoading(true)

  try {
    const response = await fetch(`${baseUrl}/api/v1/products/${route.params.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwtToken
      }
    })

    if (!response.ok) {
      const error = await response.json()
      toast.error(error.message)
      router.push('/products')
      return
    } else {
      const {
        data: { doc }
      } = await response.json()

      setCurrentProduct(doc as ProductType)
      setLoading(false)
    }
  } catch (error) {
    toast.error('Oop, something went wrong!')
    console.log(error)
    setLoading(false)
  } finally {
    setLoading(false)
  }
}
