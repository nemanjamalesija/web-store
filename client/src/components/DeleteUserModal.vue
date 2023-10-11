<script setup lang="ts">
import useGetAdminStore from '../composables/useGetAdminStore'
import CloseModalButton from './ui/CloseModalButton.vue'
import useAppNavigation from '../composables/useAppNavigation'
import { baseUrl } from '../constants/baseUrl'

const { users, setIsDeleting, userToEdit } = useGetAdminStore()
const { toast, router } = useAppNavigation()

async function deleteUserHandler() {
  const jwtToken = localStorage.getItem('jwt')

  if (!jwtToken) {
    toast.error('Could not get your session! Please log in.')
    router.push('/')
  }

  try {
    const response = await fetch(`${baseUrl}/api/v1/users/${userToEdit.value._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwtToken
      }
    })

    if (!response.ok) {
      const data = await response.json()
      toast.error(data.message)
      setIsDeleting(false)
    } else {
      console.log(userToEdit.value._id)
      const indexToUpdate = users.value.findIndex((user) => user._id === userToEdit.value._id)

      if (indexToUpdate !== -1) {
        // Remove the old object
        users.value.splice(indexToUpdate, 1)
      }
      toast.success('You have successfully deleted a user')
    }
  } catch (error) {
    toast.error('Oops, something went wrong!')
    console.log(error)
  } finally {
    setIsDeleting(false)
  }
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
