import { baseUrl } from '../constants/baseUrl'
import useGetProductsStore from '../hooks/useGetProductsStore'
import { productType } from '../types/productType'
import { useToast } from 'vue-toastification'

export default async function fetchAllProducts(jwtToken: string) {
  const { setLoading, setProducts } = useGetProductsStore()
  const toast = useToast()

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

    setProducts(doc as productType[])
    setLoading(false)
  } catch (error) {
    console.log(error)
    setLoading(false)
  }
}
