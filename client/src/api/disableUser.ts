import { useToast } from 'vue-toastification'
import useGetJWT from '../composables/useGetToken'
import { baseUrl } from '../constants/baseUrl'

export default async function disableUser() {
  const jwtToken = useGetJWT()
  const toast = useToast()

  try {
    const response = await fetch(`${baseUrl}/api/v1/users/deleteMe`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwtToken
      },
      body: JSON.stringify({
        active: false
      })
    })

    if (!response.ok) {
      const data = await response.json()
      toast.error(data.message)
    }

    toast.success('Your have sucessfully disabled your account. See you next time!')
    return 'success'
  } catch (error) {
    toast.error('Oop, something went wrong!')
    console.log(error)
  }
}
