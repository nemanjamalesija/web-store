import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/userStore'

export default function useGetUser() {
  const userStore = useUserStore()
  const { users, currentUser, loading } = storeToRefs(userStore)
  const { setCurrentUser, setUsers, setLoading } = useUserStore()

  return { users, setUsers, userStore, currentUser, setCurrentUser, loading, setLoading }
}
