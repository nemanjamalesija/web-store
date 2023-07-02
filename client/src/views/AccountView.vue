<script setup lang="ts">
import useGetUserStore from '../hooks/useGetUserStore'
import formatDate from '../helpers/formatDate'
import { ref, computed } from 'vue'
import { baseUrl } from '@/constants/baseUrl'
import acceptUser from '@/helpers/acceptUser'
import useAppNavigation from '@/composables/useAppNavigation'
import type { ChangeUserType } from '@/types/changeUserType'
import { changeUserSchema } from '@/types/changeUserType'
import DisableUserModal from '../components/DisableUserModal.vue'
import ModalCustom from '@/components/ui/ModalCustom.vue'

const changeUser = ref<ChangeUserType>({
  name: '',
  email: ''
})

const file = ref<File | null>()

const showDisableAccModal = ref<boolean>(false)

// for disable state of the submit button in the form
const allFieldsCompleted = computed(() => {
  return changeUserSchema.safeParse(changeUser.value).success
})

const { currentUser, setCurrentUser } = useGetUserStore()
const { toast, router } = useAppNavigation()

async function updateUserHandler() {
  // if no input return
  if (!changeUser.value.name && !changeUser.value.email)
    return toast.error('Provide at least name or password for update')

  const jwtToken = localStorage.getItem('jwt')
  if (!jwtToken) {
    toast.error('Could not get your session! Please log in.')
    router.push('/')
  }

  try {
    const response = await fetch(`${baseUrl}/api/v1/users/updateMe`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwtToken
      },
      body: JSON.stringify({
        name: changeUser.value.name || undefined,
        email: changeUser.value.email || undefined
      })
    })

    if (!response.ok) {
      const data = await response.json()

      return toast.error(data.message)
    }

    const newCurrentUser = {
      ...currentUser.value,
      name: changeUser.value.name ? changeUser.value.name : currentUser.value.name,
      email: changeUser.value.email ? changeUser.value.email : currentUser.value.email
    }

    setCurrentUser(acceptUser(newCurrentUser))

    toast.success('Your account information has been sucessfully updated!')
  } catch (error) {
    toast.error('Oop, something went wrong!')
    console.log(error)
  } finally {
    changeUser.value.name = ''
    changeUser.value.email = ''
  }
}

// store new user photo from input type="file"
const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement | null

  if (!target) return
  if (!target.files) return

  file.value = target.files[0]
}

// update photo handler
async function updatePhoto() {
  const jwtToken = localStorage.getItem('jwt')
  if (!jwtToken) {
    toast.error('Could not get your session! Please log in.')
    router.push('/')
  }

  if (!file.value) return
  const dataInput = new FormData()
  dataInput.append('photo', file.value)

  try {
    const response = await fetch(`${baseUrl}/api/v1/users/updatePhoto`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + jwtToken
      },
      body: dataInput
    })

    if (!response.ok) {
      return toast.error('Could not upload your image! Please try again.')
    } else {
      toast.success('Your account information has been sucessfully updated!')
      const {
        data: { updatedUser }
      } = await response.json()

      setCurrentUser({ ...currentUser.value, photo: updatedUser.photo })
    }
  } catch (error) {
    toast.error('Oop, something went wrong!')
    console.log(error)
  }
}
</script>
<template>
  <section
    class="user-account mt-36 mx-auto max-w-6xl flex flex-col gap-12 lg:gap-32 lg:grid rounded-md"
  >
    <div class="user">
      <img
        class="block h-40 w- object-cover rounded-sm mb-6"
        :src="currentUser.photo"
        :alt="currentUser.name + 'image'"
      />

      <div class="user__info text-gray-600">
        <h2 class="heading-gradient text-lg lg:text-xl uppercase font-semibold mb-3">About you</h2>
        <div>
          <div class="user__info-control">
            <span>Name&nbsp;</span>
            <p>{{ currentUser.name }}</p>
          </div>
          <div class="user__info-control">
            <span>Email&nbsp;</span>
            <p>{{ currentUser.email }}</p>
          </div>
          <div class="user__info-control">
            <span>Member since&nbsp;</span>
            <p>{{ formatDate(currentUser.joinedAt) }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="user-settings mx-auto w-full">
      <div class="user-settings__forms">
        <h2 class="heading-gradient text-lg lg:text-xl uppercase font-semibold mb-9">
          Your account settings
        </h2>
        <form class="form form--signup mb-16">
          <div class="form__group">
            <label class="form__label" for="name">Your name</label>
            <input
              id="name"
              class="form__input"
              type="text"
              placeholder="John Doe"
              v-model="changeUser.name"
            />
          </div>
          <div class="form__group">
            <label class="form__label" for="email">Email address</label>
            <input
              id="email"
              class="form__input"
              type="email"
              placeholder="you@example.com"
              v-model="changeUser.email"
            />
          </div>
          <div class="flex items-center gap-5">
            <button
              type="submit"
              class="btn py-3 px-6 bg-orange-500 text-sm lg:text-base hover:bg-orange-600 disabled:bg-gray-500"
              :disabled="!allFieldsCompleted"
              @click.prevent="updateUserHandler"
            >
              Change settings
            </button>
            <button
              type="button"
              class="btn py-3 px-6 bg-red-500 text-sm lg:text-base hover:bg-red-600 disabled:bg-gray-500"
              @click="showDisableAccModal = true"
            >
              Disable account
            </button>
          </div>
        </form>
        <form enctype="multipart/form-data" method="post">
          <div class="form-group">
            <input type="file" name="photo" class="form-control-file" @change="onChange" />
            <button @click.prevent="updatePhoto">Update Photo</button>
          </div>
        </form>
        <ModalCustom :isVisible="showDisableAccModal">
          <DisableUserModal @close-modal="showDisableAccModal = false" />
        </ModalCustom>
      </div>
    </div>
  </section>
</template>

<style scoped>
.user__info-control {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.user__info-control:not(:last-child) {
  margin-bottom: 0.5rem;
}

.user__info-control span {
  font-weight: 600;
}

.user-account {
  grid-template-columns: auto 1fr;
}
</style>
../hooks/useGetUserStore
