<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { baseUrl } from '../constants/baseUrl'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../stores/userStore'
import { useRouter } from 'vue-router'
import logo from '../assets/img/logo.png'

const userStore = useUserStore()
const { setCurrentUser } = useUserStore()
const { currentUser } = storeToRefs(userStore)
const router = useRouter()

async function logoutHandler() {
  try {
    const response = await fetch(`${baseUrl}/api/v1/users/logout`)
    console.log(response)

    router.push('/')
    localStorage.removeItem('jwt')
    setCurrentUser({ id: '', name: '', email: '', photo: '', role: '' })
  } catch (error) {
    console.log(error)
  }
}
</script>
<template>
  <header class="h-20 bg-orange-950">
    <nav class="h-full px-14 flex items-center justify-between text-base lg:text-lg font-semibold">
      <div class="flex items-center text-white">
        <div class="logo flex items-center gap-3">
          <img :src="logo" alt="jumbo bowls logo" class="inline-block h-10 w-10 object-cover" />
          <h1 class="capitalize font-bold mr-20 text-lg lg:text-xl">jumbo bowls</h1>
        </div>
        <div v-if="currentUser.name" class="font-medium flex gap-10">
          <RouterLink class="inline-block" to="/products"> Products</RouterLink>
          <RouterLink class="inline-block" to="/products"> About us</RouterLink>
          <RouterLink class="inline-block" to="/products"> How it works</RouterLink>
          <RouterLink class="inline-block" to="/products"> Bowls and pricing</RouterLink>
        </div>
      </div>
      <div class="flex items-center gap-10">
        <RouterLink class="text-white" v-if="!currentUser.name" to="/">Log in</RouterLink>
        <RouterLink
          v-if="!currentUser.name"
          to="/signup"
          class="signup py-2 px-6 rounded-full transition-all duration-300 hover:-translate-y-[3px] flex items-center justify-center text-base lg:text-lg font-semibold bg-transparent text-white border-2 border-white hover:bg-white hover:text-orange-950"
          >Sign up</RouterLink
        >

        <!-- User info -->
        <div v-if="currentUser.name" class="user flex items-center gap-3 text-white font-bold">
          <div class="user__photo-box">
            <img
              class="card__picture-img object-cover h-12 w-12 inline-block rounded-full"
              :src="currentUser.photo"
              :alt="currentUser.photo + ' image'"
            />
          </div>
          <span class="font-medium">{{ currentUser.name }}</span>
        </div>

        <!-- Logout -->
        <button
          v-if="currentUser.name"
          class="py-2 px-6 rounded-full transition-all duration-300 hover:-translate-y-[3px] flex items-center justify-center text-base lg:text-lg font-semibold bg-transparent text-white border-2 border-white hover:bg-white hover:text-orange-950"
          @click.prevent="logoutHandler"
        >
          Log out
        </button>
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
