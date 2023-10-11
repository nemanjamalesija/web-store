<script setup lang="ts">
import CloseModalButton from './ui/CloseModalButton.vue'
import useGetAdminStore from '../composables/useGetAdminStore'
import patchUser from '../api/patchUser'

const { setIsEditing, userToEdit } = useGetAdminStore()

async function patchUserHandler() {
  await patchUser(userToEdit.value, userToEdit.value._id as string)
  setIsEditing(false)
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
