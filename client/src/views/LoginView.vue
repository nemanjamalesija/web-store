<script setup lang="ts">
import { ref, watch } from 'vue'
import useGetUserStore from '../composables/useGetUserStore'
import acceptUser from '../helpers/acceptUser'
import useAppNavigation from '../composables/useAppNavigation'
import { loginSchema } from '../types/loginUserType'
import type { LoginUserType } from '../types/loginUserType'
import { computed } from 'vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import logIn from '../api/logIn'

const { setCurrentUser, currentUser, loading, setLoading } = useGetUserStore()
const { toast, router } = useAppNavigation()

const loginUser = ref<LoginUserType>({
  email: '',
  password: ''
})

// for disable state of the submit button in the form
const allFieldsCompleted = computed(() => {
  return loginSchema.safeParse(loginUser.value).success
})

async function loginUserHandler() {
  // if email or password missing
  if (!loginUser.value.email || !loginUser.value.password)
    return toast.error('Please provide both email and password')

  // zod validation
  const tryUser = loginSchema.parse({
    email: loginUser.value.email,
    password: loginUser.value.password
  })

  setLoading(true)
  const user = await logIn(tryUser)

  if (user) {
    // set user in the state
    setCurrentUser(acceptUser(user))

    // grant access
    router.push('/products')
  }
  setLoading(false)

  // clear input form
  loginUser.value.email = ''
  loginUser.value.password = ''
}

watch(currentUser, (newValue) => {
  if (newValue.name) router.push('/products')
})
</script>

<template>
  <section class="mt-28 px-5 lg:px-0 login">
    <LoadingSpinner v-if="loading" />
    <div v-else class="login-form">
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
            minlength="8"
            required
            v-model="loginUser.password"
          />
        </div>
        <div class="form__group">
          <button
            class="btn py-3 px-6 bg-orange-500 text-sm lg:text-base hover:bg-orange-600 disabled:bg-gray-500"
            type="submit"
            :disabled="!allFieldsCompleted"
            @click.prevent="loginUserHandler"
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
