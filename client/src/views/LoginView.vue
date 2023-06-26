<script setup lang="ts">
import { baseUrl } from '@/constants/baseUrl'
import { ref, watch } from 'vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import useGetUser from '../hooks/useGetUser'
import acceptUser from '../helpers/acceptUser'

const { setCurrentUser, currentUser } = useGetUser()

const loginUser = ref({
  email: '',
  password: ''
})

const toast = useToast()
const router = useRouter()

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

    if (data.status === 'success') {
      const { token } = data
      const {
        data: { user }
      } = data

      setCurrentUser(acceptUser(user))

      localStorage.setItem('jwt', token)
      router.push('/products')
    } else if (data.status === 'fail') toast.error(data.message)
  } catch (error) {
    console.log(error)
  } finally {
    loginUser.value.email = ''
    loginUser.value.password = ''
  }
}

watch(currentUser, (newValue) => {
  if (newValue.name) router.push('/products')
})
</script>

<template>
  <div class="mt-28 px-5 lg:px-0">
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
  </div>
</template>

<style></style>
