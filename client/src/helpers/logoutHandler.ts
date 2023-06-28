import { baseUrl } from '../constants/baseUrl'
import { Router } from 'vue-router'
import { ToastInterface } from 'vue-toastification'
import { UserType } from '../types/userType'

export default async function logoutHandler(
  router: Router,
  toast: ToastInterface,
  setCurrentUser: (user: UserType) => void
) {
  try {
    await fetch(`${baseUrl}/api/v1/users/logout`)

    router.push('/')
    localStorage.removeItem('jwt')
    setCurrentUser({
      id: '',
      name: '',
      email: '',
      photo: '',
      role: '',
      joinedAt: '',
      active: false
    })
  } catch (error) {
    toast.error('Oops, something went wrong!')
    console.log(error)
  }
}
