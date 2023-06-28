import { z } from 'zod'
export const changeUserSchema = z.object({
  name: z.string(),
  email: z.string().email()
})

export type ChangeUserType = z.infer<typeof changeUserSchema>
