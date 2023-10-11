<script setup lang="ts">
import useGetAdminStore from '../composables/useGetAdminStore'
import CloseModalButton from './ui/CloseModalButton.vue'
import deleteUserAPI from '../api/deleteUser'

const { setIsDeleting, userToEdit, deleteUser } = useGetAdminStore()

async function deleteUserHandler() {
  const res = await deleteUserAPI(userToEdit.value._id as string)
  if (res == 'fail') return

  deleteUser(userToEdit.value._id as string)
  setIsDeleting(false)
}
</script>

<template>
  <div>
    <h2 class="text-base lg:text-lg font-semibold text-center mb-9">
      Are you sure you want to delete this user ?
    </h2>
    <form>
      <div class="flex items-center justify-center gap-5">
        <button
          type="button"
          class="btn text-sm lg:text-base py-3 px-5 flex items-center gap-2 bg-red-500 hover:bg-red-600"
          @click.prevent="deleteUserHandler"
        >
          Delete
        </button>
        <button
          type="button"
          class="btn text-sm lg:text-base py-3 px-7 flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600"
          @click.prevent="setIsDeleting(false)"
        >
          back
        </button>
      </div>
    </form>
    <CloseModalButton @close-modal="setIsDeleting(false)" />
  </div>
</template>
