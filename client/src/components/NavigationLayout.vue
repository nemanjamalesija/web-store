<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { baseUrl } from '../constants/baseUrl'
import logo from '../assets/img/logo.png'
import useGetUserStore from '@/hooks/useGetUserStore'
import { onMounted, ref } from 'vue'
import useAppNavigation from '@/composables/useAppNavigation'

const { currentUser, setCurrentUser } = useGetUserStore()
const { router } = useAppNavigation()

async function logoutHandler() {
  try {
    await fetch(`${baseUrl}/api/v1/users/logout`)

    router.push('/')
    localStorage.removeItem('jwt')
    setCurrentUser({
      id: '',
      name: '',
      email: '',
      photo: '',
      role: '',
      joinedAt: '',
      active: false
    })
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  const navRef = ref(document.querySelector('.header-nav'))

  const handleStickyNav = function () {
    if (!navRef.value) return

    if (window.scrollY > 50) navRef.value.classList.add('sticky')
    else navRef.value.classList.remove('sticky')
  }

  window.addEventListener('scroll', handleStickyNav)

  return () => window.removeEventListener('scroll', handleStickyNav)
})
</script>
<template>
  <header class="header-nav absolute top-0 left-0 w-full z-40">
    <nav
      class="nav pb-3 relative h-full px-14 flex items-center justify-between text-base lg:text-lg font-medium"
    >
      <!-- Logo and page navigation -->
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

      <!-- User related -->
      <div class="flex items-center gap-10">
        <RouterLink class="font-semibold" v-if="!currentUser.name" to="/">Log in</RouterLink>
        <RouterLink
          v-if="!currentUser.name"
          to="/signup"
          class="py-2 px-6 rounded-full transition-all duration-300 hover:-translate-y-[3px] flex items-center justify-center text-base lg:text-lg bg-white hover:bg-[#f8f9fa] font-semibold text-orange-900"
          >Sign up</RouterLink
        >

        <!-- User info -->
        <div v-if="currentUser.name" class="user flex flex-col items-center gap-3 font-bold">
          <div class="user__photo-box flex gap-4 items-center">
            <img
              class="card__picture-img object-cover h-12 w-12 inline-block rounded-full"
              :src="currentUser.photo"
              :alt="currentUser.photo + ' image'"
            />
            <span class="username inline-block font-semibold cursor-pointer">{{
              currentUser.name
            }}</span>
          </div>

          <!-- Drop down modal -->
          <div class="account bg-white flex flex-col text-base gap-2 rounded-md w-max">
            <RouterLink v-if="currentUser.role === 'admin'" class="nav__link" to="/dashboard"
              >Dashboard</RouterLink
            >
            <RouterLink class="nav__link" to="/me"> Account </RouterLink>
            <RouterLink class="nav__link" to="/reviews"> My reviews </RouterLink>
            <RouterLink class="nav__link" to="/products"> Help & support </RouterLink>
            <RouterLink class="nav__link" to="/products"> Display & accesibility </RouterLink>
            <RouterLink class="nav__link" to="/products"> Give feedback</RouterLink>
            <button
              v-if="currentUser.name"
              class="nav__link text-start"
              @click.prevent="logoutHandler"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.user {
  position: absolute;
  right: 5%;
  top: 6.5%;
  padding-bottom: 2rem;
}

.account {
  -webkit-box-shadow: 0 1rem 2.5rem rgba(0, 0, 0, 0.1);
  box-shadow: 0 1rem 2.5rem rgba(0, 0, 0, 0.1);
  max-height: 0;
  visibility: hidden;
  transition: max-height 0.3s;
  overflow: hidden;
}

.account {
  position: absolute;
  top: 78%;
  right: 0.3%;
}

.user:hover > .account {
  visibility: visible;
  transform-origin: top;
  padding: 1rem;
  max-height: 300px;
}

.nav__link:hover {
  transition: all 0.2s;
  color: rgba(234 88 12 / 1);
}
</style>
