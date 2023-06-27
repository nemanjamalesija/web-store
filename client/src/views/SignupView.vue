<script setup lang="ts">
import { ref } from 'vue'
import { baseUrl } from '@/constants/baseUrl'
import useAppNavigation from '@/composables/useAppNavigation'

const { toast, router } = useAppNavigation()

const signUpUser = ref({
  name: '',
  email: '',
  password: '',
  passwordConfirm: ''
})

async function signUpHandler() {
  const tryUser = {
    name: signUpUser.value.name,
    email: signUpUser.value.email,
    password: signUpUser.value.password,
    passwordConfirm: signUpUser.value.passwordConfirm
  }

  try {
    const response = await fetch(`${baseUrl}/api/v1/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tryUser)
    })

    const data = await response.json()

    if (!response.ok) toast.error(data.message)
    else {
      toast.success('Account created! Feel free to log in')
      router.push('/')
    }

    signUpUser.value.name = ''
    signUpUser.value.email = ''
    signUpUser.value.password = ''
    signUpUser.value.passwordConfirm = ''
  } catch (error) {
    toast.error('Something went wrong! Please try again.')
  }
}
</script>

<template>
  <section class="mt-24">
    <div class="singup-form">
      <h2
        class="heading-secondary heading-gradient text-text-lg lg:text-2xl uppercase mb-5 font-semibold text-center"
      >
        Create your account
      </h2>
      <form class="form form--signup">
        <div class="form__group">
          <label class="form__label" for="name">Your name</label>
          <input
            id="name"
            class="form__input"
            type="text"
            placeholder="John"
            required
            v-model="signUpUser.name"
          />
        </div>
        <div class="form__group">
          <label class="form__label" for="email">Email address</label>
          <input
            id="email"
            class="form__input"
            type="email"
            placeholder="you@example.com"
            required
            v-model="signUpUser.email"
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
            v-model="signUpUser.password"
          />
        </div>
        <div class="form__group ma-bt-md">
          <label class="form__label" for="passwordConfirm">Confirm password</label>
          <input
            id="passwordConfirm"
            class="form__input"
            type="password"
            placeholder="••••••••"
            required
            minlength="8"
            v-model="signUpUser.passwordConfirm"
          />
        </div>
        <div class="form__group">
          <button
            class="btn py-3 px-6 bg-orange-500 text-sm lg:text-base hover:bg-orange-600 active:bg-orange-800"
            type="submit"
            @click.prevent="signUpHandler"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
