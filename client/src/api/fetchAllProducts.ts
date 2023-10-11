import { baseUrl } from '../constants/baseUrl'
import useGetProductsStore from '../composables/useGetProductsStore'
import { ProductType } from '../types/productType'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

export default async function fetchAllProducts() {
  const { setLoading, setProducts } = useGetProductsStore()
  const toast = useToast()
  const router = useRouter()

  const jwtToken = localStorage.getItem('jwt')
  if (!jwtToken) {
    toast.error('Could not get your session! Please log in.')
    router.push('/')
  }

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

    setProducts(doc as ProductType[])
    setLoading(false)
  } catch (error) {
    toast.error('Oop, something went wrong!')
    console.log(error)
    setLoading(false)
  }
}
