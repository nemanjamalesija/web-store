import { baseUrl } from '../constants/baseUrl'
import { UserType } from '../types/userType'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

export default async function useGetSession() {
  const toast = useToast()
  const router = useRouter()
  const jwtToken = localStorage.getItem('jwt')

  if (!jwtToken) {
    toast.error('You are not logged in! Please log in to get access')
    router.push('/login')
    return undefined
  }

  try {
    const response = await fetch(`${baseUrl}/api/v1/users/getUserWithToken`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwtToken
      }
    })

    if (!jwtToken) {
      const error = await response.json()
      toast.error(error.message)
      router.push('/login')
      return undefined
    }

    const data = await response.json()

    if (data.status === 'success') {
      const {
        data: { user }
      } = data

      return user as UserType
    }
  } catch (error) {
    return undefined
  }
}
