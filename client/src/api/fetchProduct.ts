import { useToast } from 'vue-toastification'
import useGetJWT from '../composables/useGetToken'
import { baseUrl } from '../constants/baseUrl'
import { ProductType } from '../types/productType'

export default async function fetchProduct(productId: string) {
  const jwtToken = useGetJWT()
  const toast = useToast()

  try {
    const response = await fetch(`${baseUrl}/api/v1/products/${productId}`, {
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
    } else {
      const {
        data: { doc }
      } = await response.json()

      return doc as ProductType
    }
  } catch (error) {
    toast.error('Oop, something went wrong!')
    console.log(error)
  }
}
