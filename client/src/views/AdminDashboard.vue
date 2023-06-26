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
import { ref } from 'vue'

const sortBy = ref<string>('Sort by')
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

function sortUsersHandler() {
  if (sortBy.value === 'a-z') users.value.sort((a, b) => a.name.localeCompare(b.name))
  if (sortBy.value === 'z-a') users.value.sort((a, b) => b.name.localeCompare(a.name))
  if (sortBy.value === 'recent')
    users.value.sort((a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime())
  if (sortBy.value === 'latest')
    users.value.sort((a, b) => new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime())
}

onMounted(async () => {
  await fetchAllUsers()
})
</script>
<template>
  <div class="admin-dashboard mt-36 mx-auto max-w-7xl rounded-md">
    <LoadingSpinner v-if="loading" />
    <section class="users">
      <h2 class="heading-gradient text-lg lg:text-2xl uppercase font-semibold text-center mb-10">
        Dashboard
      </h2>
      <div class="info mb-10 flex justify-between items-center gap-10">
        <p>
          <span class="font-semibold">{{ users.length }}</span> total users.
        </p>

        <div class="flex-1">
          <input type="text" class="form__input" />
        </div>

        <div>
          <select
            class="inline-block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-emerald-500 focus:border-emerald-500 cursor-pointer"
            v-model="sortBy"
            @change="sortUsersHandler"
          >
            <option selected>Sort by</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
            <option value="recent">Recent</option>
            <option value="latest">Latest</option>
          </select>
        </div>
      </div>
      <div class="control py-3 px-6 text-base">
        <h3>Name</h3>
        <h3>Email</h3>
        <h3>Join date</h3>
        <h3>Role</h3>
        <h3>Active</h3>
        <h3>Edit</h3>
        <h3>Delete</h3>
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
  grid-template-columns: minmax(220px, auto) minmax(250px, auto) 180px repeat(4, 30px);
  align-items: center;
  gap: 3.2rem;
}

h3 {
  font-weight: 600;
  text-align: start;
}
</style>
