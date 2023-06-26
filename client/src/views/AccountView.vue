<script setup lang="ts">
import useGetUser from '../hooks/useGetUser'
import formatDate from '../helpers/formatDate'
import { ref } from 'vue'
import { baseUrl } from '@/constants/baseUrl'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

const changeUser = ref({
  name: '',
  email: ''
})

const toast = useToast()
const router = useRouter()

async function updateUserHandler() {
  const jwtToken = localStorage.getItem('jwt')

  try {
    const response = await fetch(`${baseUrl}/api/v1/users/updateMe`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwtToken
      },
      body: JSON.stringify({
        name: changeUser.value.name || undefined,
        email: changeUser.value.email || undefined
      })
    })

    if (!response.ok) {
      const data = await response.json()
      return toast.error(data.message)
    }

    toast.success('Your account information has been sucessfully updated!')
    return router.push('/products')
  } catch (error) {
    console.log(error)
  }
}

const { currentUser } = useGetUser()
</script>
<template>
  <div class="user-account mt-36 mx-auto max-w-6xl flex flex-col lg:gap-32 lg:grid rounded-md">
    <div class="user">
      <img
        class="block h-40 w- object-cover rounded-sm mb-6"
        :src="currentUser.photo"
        :alt="currentUser.name + 'image'"
      />

      <div class="user__info text-gray-600">
        <h2 class="heading-gradient text-lg lg:text-xl uppercase font-semibold mb-3">About you</h2>
        <div>
          <div class="user__info-control">
            <span>Name&nbsp;</span>
            <p>{{ currentUser.name }}</p>
          </div>
          <div class="user__info-control">
            <span>Email&nbsp;</span>
            <p>{{ currentUser.email }}</p>
          </div>
          <div class="user__info-control">
            <span>Member since&nbsp;</span>
            <p>{{ formatDate(currentUser.joinedAt) }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="user-settings mx-auto w-full">
      <div class="user-settings__forms">
        <h2 class="heading-gradient text-lg lg:text-xl uppercase font-semibold mb-3">
          Your account settings
        </h2>
        <form class="form form--signup mb-16">
          <div class="form__group">
            <label class="form__label" for="name">Your name</label>
            <input
              id="name"
              class="form__input"
              type="text"
              placeholder="John Doe"
              v-model="changeUser.name"
            />
          </div>
          <div class="form__group">
            <label class="form__label" for="email">Email address</label>
            <input
              id="email"
              class="form__input"
              type="email"
              placeholder="you@example.com"
              v-model="changeUser.email"
            />
          </div>
          <div class="form__group">
            <button
              type="submit"
              class="btn py-3 px-6 bg-orange-500 text-sm lg:text-base hover:bg-orange-600 active:bg-orange-800"
              @click.prevent="updateUserHandler"
            >
              Change settings
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user__info-control {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.user__info-control:not(:last-child) {
  margin-bottom: 0.5rem;
}

.user__info-control span {
  font-weight: 600;
}

.user-account {
  grid-template-columns: auto 1fr;
}
</style>
