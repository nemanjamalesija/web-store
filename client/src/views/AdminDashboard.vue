<script setup lang="ts">
import { baseUrl } from '../constants/baseUrl'
import type { UserType } from '../types/userType'
import { onMounted } from 'vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import SingleUser from '../components/SingleUser.vue'
import AdminEditUserModal from '../components/AdminEditUserModal.vue'
import useGetAdminStore from '../composables/useGetAdminStore'
import ModalCustom from '../components/ui/ModalCustom.vue'
import useAppNavigation from '../composables/useAppNavigation'
import DeleteUserModal from '../components/DeleteUserModal.vue'

const {
  loading,
  setLoading,
  users,
  setUsers,
  sortBy,
  sortUsersHandler,
  filterByNameValue,
  filteredUsers,
  isEditing,
  isDeleting
} = useGetAdminStore()
const { toast, router } = useAppNavigation()

async function fetchAllUsers() {
  const jwtToken = localStorage.getItem('jwt')
  if (!jwtToken) {
    toast.error('Could not get your session! Please log in.')
    router.push('/')
  }

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
  <div class="admin-dashboard mt-36 mb-28 mx-auto max-w-7xl rounded-md">
    <LoadingSpinner v-if="loading" />
    <section v-else class="users">
      <h2 class="heading-gradient text-lg lg:text-2xl uppercase font-semibold text-center mb-10">
        Dashboard
      </h2>

      <div class="info mb-10 flex justify-between items-center gap-10">
        <!-- total users -->
        <p>
          <span class="font-semibold text-base">{{ filteredUsers.length }}</span> total users.
        </p>

        <!-- search user by name -->
        <div class="flex-1">
          <input type="text" class="form__input" v-model="filterByNameValue" />
        </div>

        <!-- sort users -->
        <div>
          <select
            class="inline-block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-[#f8f9fa;] focus:ring-emerald-500 focus:border-emerald-500 cursor-pointer"
            v-model="sortBy"
            @change="sortUsersHandler"
          >
            <option selected>Sort by</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
            <option value="latest">Latest</option>
            <option value="earliest">Earliest</option>
          </select>
        </div>
      </div>

      <!-- dashobard sections -->
      <div class="control py-3 px-6 text-base">
        <h3>Name</h3>
        <h3>Email</h3>
        <h3>Join date</h3>
        <h3>Role</h3>
        <h3>Active</h3>
        <h3>Edit</h3>
        <h3>Delete</h3>
      </div>

      <!-- users -->
      <ul class="list-none flex flex-col gap-3">
        <SingleUser
          v-for="user in filteredUsers"
          :key="user.id"
          :user="user"
          :totalUsers="users.length"
        />
      </ul>

      <!-- edit form -->
      <ModalCustom :isVisible="isEditing">
        <AdminEditUserModal />
      </ModalCustom>

      <!-- delete modal -->
      <ModalCustom :isVisible="isDeleting">
        <DeleteUserModal />
      </ModalCustom>
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
