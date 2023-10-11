import { useToast } from 'vue-toastification'
import { baseUrl } from '../constants/baseUrl'
import useGetJWT from '../composables/useGetToken'

export default async function patchUser(
  userToEdit: {
    _id?: string | undefined
    id: string
    name: string
    email: string
    photo: string
    role: string
    active: boolean
    joinedAt: string
  },
  userId: string
) {
  const toast = useToast()

  // No need to usegetSession because of protect middleware on the backend
  const jwtToken = useGetJWT()
  try {
    const response = await fetch(`${baseUrl}/api/v1/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwtToken
      },
      body: JSON.stringify({
        ...userToEdit
      })
    })

    if (!response.ok) {
      const data = await response.json()
      toast.error(data.message)
      return 'fail'
    } else {
      toast.success('User sucessfully updated')
      return 'success'
    }
  } catch (error) {
    toast.error('Oop, something went wrong!')
    console.log(error)
  }
}
