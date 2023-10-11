import { useToast } from 'vue-toastification'
import { z } from 'zod'
import { baseUrl } from '../constants/baseUrl'
import { UserType } from '../types/userType'
import formatZodErrors from '../helpers/formatZodErrors'

export default async function logIn(tryUser: { email: string; password: string }) {
  const toast = useToast()
  try {
    const response = await fetch(`${baseUrl}/api/v1/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tryUser)
    })

    const data = await response.json()

    // throw error from the backend
    if (!response.ok) {
      toast.error(data.message)
      return
    } else {
      // get token and current user from the response
      const { token } = data
      const {
        data: { user }
      } = data

      // set jwt in the local storage
      localStorage.setItem('jwt', token)
      return user as UserType
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      toast.error(formatZodErrors(error))
      return
    } else {
      toast.error('Oop, something went wrong!')
    }
  }
}
