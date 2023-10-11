import { useToast } from 'vue-toastification'
import useGetJWT from '../composables/useGetToken'
import { baseUrl } from '../constants/baseUrl'

export default async function updatePhoto(dataInput: FormData) {
  const jwtToken = useGetJWT()
  const toast = useToast()

  try {
    const response = await fetch(`${baseUrl}/api/v1/users/updatePhoto`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + jwtToken
      },
      body: dataInput
    })

    if (!response.ok) {
      return toast.error('Could not upload your image! Please try again.')
    } else {
      toast.success('Your account information has been sucessfully updated!')
      const {
        data: { updatedUser }
      } = await response.json()

      return updatedUser
    }
  } catch (error) {
    toast.error('Oop, something went wrong!')
    console.log(error)
  }
}
