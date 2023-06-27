<script setup lang="ts">
import formatDate from '@/helpers/formatDate'
import type { UserType } from '@/types/userType'
import useGetAdminStore from '@/hooks/useGetAdminStore'

type singleProductPropsType = {
  user: UserType
  totalUsers: number
}

const { setIsEditing, setUserToEdit } = useGetAdminStore()

const props = defineProps<singleProductPropsType>()
</script>
<template>
  <li class="users-list__item py-3 px-6 border-b border-2 border-gray-300 rounded-sm text-base">
    <div class="flex items-center gap-2">
      <!-- user photo -->
      <figure>
        <img
          class="card__picture-img object-cover h-12 w-12 rounded-full"
          :src="props.user.photo"
          :alt="props.user.name + ' image'"
        />
      </figure>

      <!-- user name -->
      <h3>{{ props.user.name }}</h3>
    </div>

    <!-- user email -->
    <div>
      <p>{{ props.user.email }}</p>
    </div>

    <!-- user date join -->
    <div>
      <p>{{ formatDate(props.user.joinedAt) }}</p>
    </div>

    <!-- user role-->
    <div>
      <p>{{ props.user.role }}</p>
    </div>

    <!-- user is active true icon-->
    <div v-if="props.user.active">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 stroke-emerald-500"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    </div>

    <!-- user is active false icon-->
    <div class="" v-if="!props.user.active">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 stroke-red-500"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>

    <!-- edit user -->
    <div>
      <button id="show-modal" @click="setIsEditing(true), setUserToEdit(props.user._id as string)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 stroke-orange-500"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </button>

      <!-- edit user -->
    </div>

    <!-- delete user -->
    <button class="flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 stroke-red-600 hover:stroke-red-700"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />
      </svg>
    </button>
  </li>
</template>

<style scoped>
.users-list__item {
  display: grid;
  grid-template-columns: minmax(220px, auto) minmax(250px, auto) 180px repeat(4, 30px);
  align-items: center;

  gap: 3.2rem;
}
</style>
