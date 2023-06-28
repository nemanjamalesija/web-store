import { z } from 'zod'

export const signUpUserSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    passwordConfirm: z.string()
  })
  .refine((data) => data.password.length >= 8, {
    message: 'Passwords must be at least 8 characters long.',
    path: ['passTooShort']
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ['confirm']
  })

export type SignUpUserType = z.infer<typeof signUpUserSchema>
