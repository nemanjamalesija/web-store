<script setup lang="ts">
import useGetAdminStore from '@/hooks/useGetAdminStore'
import CloseModalButton from './ui/CloseModalButton.vue'
import { baseUrl } from '@/constants/baseUrl'
import useAppNavigation from '@/composables/useAppNavigation'

const { setIsEditing, userToEdit } = useGetAdminStore()
const { toast, router } = useAppNavigation()

async function patchUserHandler() {
  // No need to usegetSession because of protect middleware on the backend
  const jwtToken = localStorage.getItem('jwt')

  try {
    const response = await fetch(`${baseUrl}/api/v1/users/${userToEdit.value._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwtToken
      },
      body: JSON.stringify({
        ...userToEdit.value
      })
    })

    if (!response.ok) {
      const data = await response.json()
      toast.error(data.message)
      setIsEditing(false)
      router.push('/products')
    } else {
      toast.success('User sucessfully updated')
      setIsEditing(false)
    }
  } catch (error) {
    console.log(error)
  }
}
</script>
<template>
  <form class="form">
    <!-- user name -->
    <div class="form__group">
      <label class="form__label" for="name">Name</label>
      <input id="name" class="form__input" type="text" v-model="userToEdit.name" />
    </div>
    <!-- user email -->
    <div class="form__group">
      <label class="form__label" for="email">Email address</label>
      <input id="email" class="form__input" type="email" v-model="userToEdit.email" />
    </div>

    <!-- user role -->
    <div class="form__group">
      <label class="form__label" for="role">Role</label>
      <select
        class="inline-block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-[#f8f9fa;] focus:ring-emerald-500 focus:border-emerald-500 cursor-pointer"
        v-model="userToEdit.role"
      >
        <option value="user">user</option>
        <option value="admin">admin</option>
      </select>
    </div>

    <!-- user checkbox active -->
    <div class="flex items-center mb-6">
      <input
        id="user-active"
        type="checkbox"
        class="w-4 h-4 bg-gray-100 border-gray-300 rounded"
        v-model="userToEdit.active"
      />
      <label for="user-active" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Active</label
      >
    </div>

    <!-- close modal -->
    <CloseModalButton @close-modal="setIsEditing(false)" />
    <div class="flex justify-end">
      <button
        type="submit"
        class="btn bg-orange-500 py-3 px-6 text-sm lg:text-base hover:bg-orange-600 inline-block"
        @click.prevent="patchUserHandler"
      >
        Submit
      </button>
    </div>
  </form>
</template>
