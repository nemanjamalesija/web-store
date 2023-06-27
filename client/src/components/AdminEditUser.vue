<script setup lang="ts">
import useGetAdminStore from '@/hooks/useAdminStore'
import CloseModalButton from './ui/CloseModalButton.vue'

const { isEditing, setIsEditing } = useGetAdminStore()
</script>
<template>
  <form class="form">
    <!-- user name -->
    <div class="form__group">
      <label class="form__label" for="name">Name</label>
      <input id="name" class="form__input" type="text" />
    </div>
    <!-- user email -->
    <div class="form__group">
      <label class="form__label" for="email">Email address</label>
      <input id="email" class="form__input" type="email" />
    </div>

    <!-- user role -->
    <div class="form__group">
      <label class="form__label" for="role">Role</label>
      <select
        class="inline-block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-[#f8f9fa;] focus:ring-emerald-500 focus:border-emerald-500 cursor-pointer"
      >
        <option value="user">user</option>
        <option value="admin">admin</option>
      </select>
    </div>

    <div class="flex items-center mb-4">
      <input
        id="user-active"
        type="checkbox"
        value=""
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label for="user-active" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Active</label
      >
    </div>

    <!-- close modal -->
    <CloseModalButton @close-modal="setIsEditing(false)" />
  </form>
</template>
