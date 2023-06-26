<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { baseUrl } from '../constants/baseUrl'
import { useRouter } from 'vue-router'
import logo from '../assets/img/logo.png'
import useGetUser from '@/hooks/useGetUser'
import { onMounted, ref } from 'vue'

const { currentUser, setCurrentUser } = useGetUser()
const router = useRouter()

async function logoutHandler() {
  try {
    await fetch(`${baseUrl}/api/v1/users/logout`)

    router.push('/')
    localStorage.removeItem('jwt')
    setCurrentUser({ id: '', name: '', email: '', photo: '', role: '', joinedAt: '' })
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  const navRef = ref(document.querySelector('.header-nav'))

  window.addEventListener('scroll', function () {
    if (!navRef.value) return

    if (window.scrollY > 50) navRef.value.classList.add('sticky')
    else navRef.value.classList.remove('sticky')
  })
})
</script>
<template>
  <header class="header-nav absolute top-0 left-0 w-full z-50">
    <nav class="h-full px-14 flex items-center justify-between text-base lg:text-lg font-medium">
      <div class="flex items-center">
        <div class="logo flex items-center gap-2">
          <img :src="logo" alt="jumbo bowls logo" class="inline-block h-10 w-10 object-cover" />
          <h1 class="capitalize font-bold mr-20 text-xl lg:text-2xl">jumbo bowls</h1>
        </div>
        <div v-if="currentUser.name" class="flex gap-10">
          <RouterLink class="inline-block" to="/products"> Products</RouterLink>
          <RouterLink class="inline-block" to="/products"> About us</RouterLink>
          <RouterLink class="inline-block" to="/products"> How it works</RouterLink>
          <RouterLink class="inline-block" to="/products"> Bowls and pricing</RouterLink>
        </div>
      </div>
      <div class="flex items-center gap-10">
        <RouterLink class="font-semibold" v-if="!currentUser.name" to="/">Log in</RouterLink>
        <RouterLink
          v-if="!currentUser.name"
          to="/signup"
          class="py-2 px-6 rounded-full transition-all duration-300 hover:-translate-y-[3px] flex items-center justify-center text-base lg:text-lg bg-white hover:bg-[#f8f9fa] font-semibold"
          >Sign up</RouterLink
        >

        <!-- User info -->
        <div v-if="currentUser.name" class="user flex items-center gap-3 font-bold">
          <div class="user__photo-box">
            <img
              class="card__picture-img object-cover h-12 w-12 inline-block rounded-full"
              :src="currentUser.photo"
              :alt="currentUser.photo + ' image'"
            />
          </div>
          <span class="font-semibold">{{ currentUser.name }}</span>
        </div>

        <!-- Logout -->
        <button
          v-if="currentUser.name"
          class="py-2 px-6 rounded-full transition-all duration-300 hover:-translate-y-[3px] flex items-center justify-center text-base lg:text-lg bg-white hover:bg-[#f8f9fa] font-semibold"
          @click.prevent="logoutHandler"
        >
          Log out
        </button>
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
