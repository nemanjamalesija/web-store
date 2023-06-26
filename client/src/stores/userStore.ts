import { ref } from 'vue'
import { defineStore } from 'pinia'
import { UserType } from '../types/userType'

export const useUserStore = defineStore('user', () => {
  const loading = ref(false)
  const users = ref([] as UserType[])
  const currentUser = ref({} as UserType)

  function setUsers(usersAPI: UserType[]) {
    users.value = usersAPI
  }

  function setCurrentUser(userAPI: UserType) {
    currentUser.value = userAPI
  }

  function setLoading(value: boolean) {
    loading.value = value
  }

  return { loading, setLoading, users, setUsers, currentUser, setCurrentUser }
})
