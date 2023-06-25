import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/userStore'

export default function useGetUser() {
  const userStore = useUserStore()
  const { currentUser } = storeToRefs(userStore)
  const { setCurrentUser } = useUserStore()

  return { userStore, currentUser, setCurrentUser }
}
