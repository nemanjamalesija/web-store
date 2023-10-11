import { useToast } from 'vue-toastification'
import useGetJWT from '../composables/useGetToken'
import { baseUrl } from '../constants/baseUrl'
import { ReviewType } from '../types/productType'

export default async function submitReviewHandler(
  productId: string,
  reviewRating: number,
  reviewMessage: string
) {
  const jwtToken = useGetJWT()
  const toast = useToast()

  try {
    const response = await fetch(`${baseUrl}/api/v1${productId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwtToken
      },
      body: JSON.stringify({
        rating: reviewRating,
        review: reviewMessage
      })
    })

    if (!response.ok) {
      // if token manipulated
      if (response.status === 400) {
        toast.error('Could not validate your jason web token')
        return
      }

      const error = await response.json()
      toast.error(error.message)
      return
    } else {
      const {
        data: { doc }
      } = await response.json()
      toast.success('Review sucessfully submited. Thank you!')
      return doc as ReviewType
    }
  } catch (error) {
    toast.error('Oops, something went wrong!')
    console.log(error)
  }
}
