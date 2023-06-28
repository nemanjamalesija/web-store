<script setup lang="ts">
import CloseModalButton from '@/components/ui/CloseModalButton.vue'
import useAppNavigation from '@/composables/useAppNavigation'
import { baseUrl } from '@/constants/baseUrl'
import logoutHandler from '@/helpers/logoutHandler'
import useGetUserStore from '@/hooks/useGetUserStore'

const { setCurrentUser } = useGetUserStore()
const { toast, router } = useAppNavigation()
const emits = defineEmits(['close-modal'])

async function disableUserHandler() {
  const jwtToken = localStorage.getItem('jwt')
  if (!jwtToken) {
    toast.error('Could not get your session! Please log in.')
    router.push('/')
  }

  try {
    const response = await fetch(`${baseUrl}/api/v1/users/deleteMe`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwtToken
      },
      body: JSON.stringify({
        active: false
      })
    })

    if (!response.ok) {
      const data = await response.json()
      return toast.error(data.message)
    }

    toast.success('Your have sucessfully disabled your account. See you next time!')
    emits('close-modal')
    logoutHandler(router, toast, setCurrentUser)
    localStorage.removeItem('jwt')
    router.push('/')
  } catch (error) {
    toast.error('Oop, something went wrong!')
    console.log(error)
  }
}
</script>
<template>
  <div>
    <h2 class="text-base lg:text-lg font-semibold text-center mb-9">
      Are you sure you want to disable your account ?
    </h2>
    <form>
      <div class="flex items-center justify-center gap-5">
        <button
          type="button"
          class="btn text-sm lg:text-base py-3 px-5 flex items-center gap-2 bg-red-500 hover:bg-red-600"
          @click.prevent="disableUserHandler"
        >
          Disable
        </button>
        <button
          type="button"
          class="btn text-sm lg:text-base py-3 px-7 flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600"
          @click="emits('close-modal')"
        >
          Back
        </button>
      </div>
    </form>
    <CloseModalButton @close-modal="emits('close-modal')" />
  </div>
</template>
