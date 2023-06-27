<script setup lang="ts">
import { baseUrl } from '@/constants/baseUrl'
import { ref, watch } from 'vue'
import useGetUserStore from '@/hooks/useGetUserStore'
import acceptUser from '@/helpers/acceptUser'
import useAppNavigation from '@/composables/useAppNavigation'

const { setCurrentUser, currentUser } = useGetUserStore()
const { toast, router } = useAppNavigation()

const loginUser = ref({
  email: '',
  password: ''
})

async function loginUserHandler() {
  try {
    const response = await fetch(`${baseUrl}/api/v1/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: loginUser.value.email,
        password: loginUser.value.password
      })
    })

    const data = await response.json()

    // throw error from the backend
    if (!response.ok) {
      toast.error(data.message)
      return
    } else {
      // get token and current user from the response
      const { token } = data
      const {
        data: { user }
      } = data

      // set user in the state
      setCurrentUser(acceptUser(user))

      // set jwt in the local storage
      localStorage.setItem('jwt', token)

      // grant access
      router.push('/products')
    }
  } catch (error) {
    console.log(error)
    toast.error('Oops, something went wrong!')
  } finally {
    // clear input form
    loginUser.value.email = ''
    loginUser.value.password = ''
  }
}

watch(currentUser, (newValue) => {
  if (newValue.name) router.push('/products')
})
</script>

<template>
  <section class="mt-28 px-5 lg:px-0">
    <div class="login-form">
      <h2
        class="heading-secondary heading-secondary heading-gradient text-text-lg lg:text-2xl uppercase mb-8 font-semibold text-center"
      >
        Log into your account
      </h2>
      <form class="form form--login">
        <div class="form__group">
          <label class="form__label" for="email">Email address</label>
          <input
            id="email"
            class="form__input"
            type="email"
            placeholder="you@example.com"
            required
            v-model="loginUser.email"
          />
        </div>
        <div class="form__group ma-bt-md">
          <label class="form__label" for="password">Password</label>
          <input
            id="password"
            class="form__input"
            type="password"
            placeholder="••••••••"
            required
            minlength="8"
            v-model="loginUser.password"
          />
        </div>
        <div class="form__group">
          <button
            class="btn py-3 px-6 bg-orange-500 text-sm lg:text-base hover:bg-orange-600"
            type="submit"
            @click.prevent="loginUserHandler"
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<style></style>
../hooks/useGetUserStore
