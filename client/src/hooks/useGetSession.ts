import { baseUrl } from '../constants/baseUrl'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import acceptUser from '../helpers/acceptUser'
import useGetUser from './useGetUser'

export default async function useGetSession() {
  const toast = useToast()
  const router = useRouter()
  const jwtToken = localStorage.getItem('jwt')
  const { setCurrentUser, currentUser } = useGetUser()

  if (!jwtToken) {
    router.push('/') // login

    return undefined
  } else {
    try {
      const response = await fetch(`${baseUrl}/api/v1/users/getUserWithToken`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwtToken
        }
      })

      if (!response.ok) {
        const error = await response.json()
        toast.error(error.message)
        router.push('/')
        return undefined
      }

      const data = await response.json()

      if (data.status === 'success') {
        const {
          data: { user }
        } = data

        if (!currentUser.value.name) setCurrentUser(acceptUser(user))

        return { user, jwtToken }
      }
    } catch (error) {
      console.log(error)
      toast.error('Sorry, could not get your session! Please try again... ')
      return undefined
    }
  }
}
