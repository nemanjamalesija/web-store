<script setup lang="ts">
import { baseUrl } from '@/constants/baseUrl'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

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

    if (data.status === 'success') router.push('/')
    else if (data.status === 'fail') toast.error(data.message)
  } catch (error) {
    console.error('Error during login:', error)
  }
}
</script>

<template>
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
          class="btn py-3 px-6 bg-orange-500 text-sm lg:text-base hover:bg-orange-600 active:bg-orange-800"
          type="submit"
          @click.prevent="loginUserHandler"
        >
          Log in
        </button>
      </div>
    </form>
  </div>
</template>

<style></style>
