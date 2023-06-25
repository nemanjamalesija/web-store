import { baseUrl } from '../constants/baseUrl'
import { UserType } from '../types/userType'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import acceptUser from '../helpers/acceptUser'
import { useUserStore } from '../stores/userStore'
import { storeToRefs } from 'pinia'

export default async function useGetSession() {
  const toast = useToast()
  const router = useRouter()
  const jwtToken = localStorage.getItem('jwt')
  const { setCurrentUser } = useUserStore()
  const userStore = useUserStore()
  const { currentUser } = storeToRefs(userStore)

  if (!jwtToken) {
    router.push('/')

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

        const userWithType = user as UserType

        if (!currentUser.value.name) {
          setCurrentUser(acceptUser(userWithType))
        }
        return { user: userWithType, jwtToken }
      }
    } catch (error) {
      return undefined
    }
  }
}
