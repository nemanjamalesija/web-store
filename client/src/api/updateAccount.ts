import { useToast } from 'vue-toastification'
import useGetJWT from '../composables/useGetToken'
import { baseUrl } from '../constants/baseUrl'

export default async function updateAccount(changeUser: { name: string; email: string }) {
  const jwtToken = useGetJWT()
  const toast = useToast()

  try {
    const response = await fetch(`${baseUrl}/api/v1/users/updateMe`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwtToken
      },
      body: JSON.stringify({
        name: changeUser.name || undefined,
        email: changeUser.email || undefined
      })
    })

    if (!response.ok) {
      const data = await response.json()
      toast.error(data.message)
      return 'fail'
    }

    toast.success('Your account information has been sucessfully updated!')
    return 'success'
  } catch (error) {
    toast.error('Oop, something went wrong!')
    console.log(error)
  }
}
