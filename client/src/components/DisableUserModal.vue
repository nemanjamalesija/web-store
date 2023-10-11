<script setup lang="ts">
import CloseModalButton from '../components/ui/CloseModalButton.vue'
import useAppNavigation from '../composables/useAppNavigation'
import logoutHandler from '../helpers/logoutHandler'
import useGetUserStore from '../composables/useGetUserStore'
import disableUser from '../api/disableUser'

const { setCurrentUser } = useGetUserStore()
const { toast, router } = useAppNavigation()
const emits = defineEmits(['close-modal'])

async function disableUserHandler() {
  const res = await disableUser()

  if (res != 'success') return

  emits('close-modal')
  logoutHandler(router, toast, setCurrentUser)
  localStorage.removeItem('jwt')
  router.push('/')
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
