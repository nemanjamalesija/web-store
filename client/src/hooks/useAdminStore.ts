import { storeToRefs } from 'pinia'
import { useAdminStore } from '../stores/adminStore'

export default function useGetAdminStore() {
  const userStore = useAdminStore()
  const { users, loading, filterByNameValue, filteredUsers, sortBy, isEditing } =
    storeToRefs(userStore)
  const { setUsers, setLoading, sortUsersHandler, setIsEditing } = useAdminStore()

  return {
    users,
    setUsers,
    userStore,
    loading,
    setLoading,
    sortBy,
    filterByNameValue,
    filteredUsers,
    sortUsersHandler,
    isEditing,
    setIsEditing
  }
}
