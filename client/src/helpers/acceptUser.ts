import { UserType } from '../types/userType'

export default function acceptUser(user: UserType) {
  // In case user submits full name, keep only first name and capitalize first letter
  const currentUserName =
    user.name.split(' ')[0].charAt(0).toUpperCase() + user.name.split(' ')[0].slice(1)

  return {
    id: user.id,
    name: currentUserName,
    email: user.email,
    photo: user.photo,
    role: user.role
  }
}
