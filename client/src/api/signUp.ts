import { baseUrl } from '../constants/baseUrl'
import { z } from 'zod'
import formatZodErrors from '../helpers/formatZodErrors'
import { useToast } from 'vue-toastification'

export default async function signUp(tryUser: {
  name: string
  email: string
  password: string
  passwordConfirm: string
}) {
  const toast = useToast()
  try {
    const response = await fetch(`${baseUrl}/api/v1/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tryUser)
    })

    const data = await response.json()

    if (!response.ok) {
      toast.error(data.message)
      return 'fail'
    } else {
      toast.success('Account created! Feel free to log in')
      return 'success'
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      toast.error(formatZodErrors(error))
    } else {
      toast.error('Oop, something went wrong!')
    }
  }
}
