<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { baseUrl } from '../constants/baseUrl'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/userStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const { setCurrentUser } = useUserStore()
const { currentUser } = storeToRefs(userStore)
const router = useRouter()

async function logoutHandler() {
  try {
    const response = await fetch(`${baseUrl}/api/v1/users/logout`)
    console.log(response)

    router.push('/login')
    localStorage.removeItem('jwt')
    setCurrentUser({ id: '', name: '', email: '', photo: '', role: '' })
  } catch (error) {
    console.log(error)
  }
}
</script>
<template>
  <header class="h-20 bg-orange-950 text-slate-100">
    <nav
      class="h-full px-10 flex items-center justify-between text-base lg:text-lg text-orange-50 font-medium text-inherit"
    >
      <h1 class="text-xl lg:text-xl uppercase text-center font-medium">Mambo jumbo bowls</h1>
      <div class="flex items-center gap-6">
        <RouterLink to="/"> Home</RouterLink>
        <RouterLink v-if="!currentUser.name" to="/login">Log in</RouterLink>
        <RouterLink
          v-if="!currentUser.name"
          to="/signup"
          class="signup border border-orange-50 hover:bg-orange-50 hover:text-orange-950 py-2 px-6 rounded-full transition-all duration-300 hover:-translate-y-[3px]"
          >Sign up</RouterLink
        >

        <div v-if="currentUser.name" class="user flex items-center gap-3">
          <div class="user__photo-box">
            <img
              class="card__picture-img object-cover h-12 w-12 inline-block rounded-full"
              :src="currentUser.photo"
              :alt="currentUser.photo + ' image'"
            />
          </div>
          <span class="text-base lg:text-lg font-medium text-orange-50">{{
            currentUser.name
          }}</span>
        </div>
        <button
          class="border border-orange-50 hover:bg-orange-50 hover:text-orange-950 py-2 px-6 rounded-full transition-all duration-300 hover:-translate-y-[3px]"
          @click.prevent="logoutHandler"
        >
          Log out
        </button>
      </div>
    </nav>
  </header>
</template>
