<script setup lang="ts">
import useGetUserStore from '../hooks/useGetUserStore'
import formatDate from '../helpers/formatDate'
import { ref, computed } from 'vue'
import { baseUrl } from '../constants/baseUrl'
import acceptUser from '../helpers/acceptUser'
import useAppNavigation from '../composables/useAppNavigation'
import type { ChangeUserType } from '../types/changeUserType'
import { changeUserSchema } from '../types/changeUserType'
import DisableUserModal from '../components/DisableUserModal.vue'
import ModalCustom from '../components/ui/ModalCustom.vue'

const changeUser = ref<ChangeUserType>({
  name: '',
  email: ''
})

const photoFile = ref<File | null>()

const showDisableAccModal = ref<boolean>(false)

// For isable state of the submit button in the form
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

// Store new user photo from input type="file"
const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement | null

  if (!target) return
  if (!target.files) return

  photoFile.value = target.files[0]
}

// Update photo handler
async function updatePhoto() {
  const jwtToken = localStorage.getItem('jwt')
  if (!jwtToken) {
    toast.error('Could not get your session! Please log in.')
    router.push('/')
  }

  if (!photoFile.value) return
  const dataInput = new FormData()
  dataInput.append('photo', photoFile.value)

  try {
    const response = await fetch(`${baseUrl}/api/v1/users/updatePhoto`, {
      method: 'PATCH',
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
    <!-- About the user -->
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

    <!-- Update user info  -->
    <div class="user-settings mx-auto w-full">
      <div class="user-settings__forms">
        <h2 class="heading-gradient text-lg lg:text-xl uppercase font-semibold mb-9">
          Update your account settings
        </h2>
        <form class="form form--signup mb-16">
          <div class="form__group">
            <label class="form__label" for="name">Your new name</label>
            <input
              id="name"
              class="form__input"
              type="text"
              placeholder="John Doe"
              v-model="changeUser.name"
            />
          </div>
          <div class="form__group">
            <label class="form__label" for="email">Your new email address</label>
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

        <!-- Change user photo -->
        <div>
          <h2 class="heading-gradient text-lg lg:text-xl uppercase font-semibold mb-9">
            Update photo
          </h2>
          <form enctype="multipart/form-data">
            <div class="form-group">
              <input
                id="photo"
                type="file"
                name="photo"
                class="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 cursor-pointer bg-gray-50"
                @change="onChange"
              />

              <p
                class="mt-2 ml-2 mb-7 inline-block text-sm text-gray-500 dark:text-gray-300"
                id="file_input_help"
              >
                SVG, PNG, JPG or GIF.
              </p>

              <button
                class="block py-3 px-6 bg-orange-500 text-sm lg:text-base hover:bg-orange-60 cursor-pointer rounded-full text-white uppercase font-semibold disabled:bg-gray-500"
                @click.prevent="updatePhoto"
                :disabled="!photoFile"
              >
                submit
              </button>
            </div>
          </form>
        </div>
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

.custom-file-upload {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
}

.hidden-file {
  display: none;
}
</style>
