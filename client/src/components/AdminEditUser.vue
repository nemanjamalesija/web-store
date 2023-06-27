<script setup lang="ts">
import useGetAdminStore from '@/hooks/useAdminStore'

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
    <button type="button" class="absolute top-0 right-0" @click="setIsEditing(false)">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 stroke-neutral-500"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </form>
</template>

<style>
.modal-enter-from .popup-modal,
.modal-leave-to .popup-modal {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.popup-modal {
  width: 600px;
  margin: auto;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}
</style>
