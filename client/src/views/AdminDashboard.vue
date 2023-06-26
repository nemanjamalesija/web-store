<script setup lang="ts">
import useGetSession from '@/hooks/useGetSession'
import useGetUser from '../hooks/useGetUser'
import { baseUrl } from '@/constants/baseUrl'
import { useToast } from 'vue-toastification'
import type { UserType } from '@/types/userType'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import SingleUser from '@/components/SingleUser.vue'

const { loading, setLoading, users, setUsers } = useGetUser()
const toast = useToast()
const router = useRouter()

async function fetchAllUsers() {
  const session = await useGetSession()
  if (!session) return

  const { jwtToken } = session

  setLoading(true)
  try {
    const response = await fetch(`${baseUrl}/api/v1/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwtToken
      }
    })

    if (!response.ok) {
      const error = await response.json()
      toast.error(error.message)
      return router.push('/products')
    }

    const {
      data: { doc }
    } = await response.json()

    setUsers(doc as UserType[])
    setLoading(false)
  } catch (error) {
    console.log(error)
    setLoading(false)
  }
}

onMounted(async () => {
  await fetchAllUsers()
})
</script>
<template>
  <div class="admin-dashboard mt-36 mx-auto max-w-6xl rounded-md">
    <LoadingSpinner v-if="loading" />
    <section class="users">
      <h2 class="heading-gradient text-lg lg:text-2xl uppercase font-semibold text-center mb-9">
        Dashboard
      </h2>
      <div class="info mb-10 flex justify-between items-center gap-10">
        <p>
          <span class="font-semibold">{{ users.length }}</span> total users.
        </p>

        <div class="flex-1">
          <input type="text" class="form__input" />
        </div>

        <div class="flex items-center gap-2">
          <p class="font-semibold">Sort by</p>
          <select>
            <option>A - Z</option>
            <option>Z - A</option>
            <option>Role</option>
            <option>Active</option>
          </select>
        </div>
      </div>
      <div class="control py-3 px-6 ml-6 text-base">
        <h3>Name</h3>
        <h3>Email</h3>
        <h3>Role</h3>
        <h3>Active</h3>
        <h3>Edit</h3>
        <h3 class="text-center">Delete</h3>
      </div>

      <ul class="list-none flex flex-col gap-3">
        <SingleUser v-for="user in users" :key="user.id" :user="user" :totalUsers="users.length" />
      </ul>
    </section>
  </div>
</template>

<style scoped>
.control {
  display: grid;
  grid-template-columns: minmax(220px, auto) minmax(220px, auto) repeat(4, auto);
  align-items: center;
  gap: 3.2rem;
}

h3 {
  font-weight: 600;
}
</style>
