import { ref } from 'vue'
import { defineStore } from 'pinia'
import { UserType } from '../types/userType'

export const useUserStore = defineStore('user', () => {
  const currentUser = ref({} as UserType)

  function setCurrentUser(userAPI: UserType) {
    currentUser.value = userAPI
  }

  return { currentUser, setCurrentUser }
})
