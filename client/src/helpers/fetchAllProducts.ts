import { baseUrl } from '../constants/baseUrl'
import useGetProductsStore from '../hooks/useGetProductsStore'
import { ProductType } from '../types/productType'
import { useToast } from 'vue-toastification'

export default async function fetchAllProducts() {
  const { setLoading, setProducts } = useGetProductsStore()
  const toast = useToast()

  const jwtToken = localStorage.getItem('jwt')

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
