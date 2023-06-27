import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { UserType } from '../types/userType'

export const useAdminStore = defineStore('admin', () => {
  const loading = ref(false)
  const users = ref([] as UserType[])

  function setUsers(usersAPI: UserType[]) {
    users.value = usersAPI
  }

  function setLoading(value: boolean) {
    loading.value = value
  }

  // sorting
  const sortBy = ref<string>('Sort by')

  function sortUsersHandler() {
    if (sortBy.value === 'a-z') users.value.sort((a, b) => a.name.localeCompare(b.name))
    if (sortBy.value === 'z-a') users.value.sort((a, b) => b.name.localeCompare(a.name))
    if (sortBy.value === 'recent')
      users.value.sort((a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime())
    if (sortBy.value === 'latest')
      users.value.sort((a, b) => new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime())
  }

  //filtering
  const filterByNameValue = ref<string>('')

  const filteredUsers = computed(() => {
    if (filterByNameValue.value) {
      const filterValue = filterByNameValue.value.toLowerCase()
      return users.value.filter((user) => user.name.toLowerCase().includes(filterValue))
    }
    return users.value
  })

  // edit related
  const isEditing = ref<boolean>(false)
  function setIsEditing(value: boolean) {
    isEditing.value = value
  }

  return {
    loading,
    setLoading,
    users,
    setUsers,
    sortBy,
    sortUsersHandler,
    filterByNameValue,
    filteredUsers,
    isEditing,
    setIsEditing
  }
})
