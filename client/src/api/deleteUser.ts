import { useToast } from 'vue-toastification'
import useGetJWT from '../composables/useGetToken'
import { baseUrl } from '../constants/baseUrl'

export default async function deleteUserHandler(editUserId: string) {
  const jwtToken = useGetJWT()
  const toast = useToast()

  try {
    const response = await fetch(`${baseUrl}/api/v1/users/${editUserId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwtToken
      }
    })

    if (!response.ok) {
      const data = await response.json()
      toast.error(data.message)
      return 'fail'
    } else {
      toast.success('You have successfully deleted a user')
      return 'success'
    }
  } catch (error) {
    toast.error('Oops, something went wrong!')
    console.log(error)
  }
}
