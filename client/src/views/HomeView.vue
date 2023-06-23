<script setup lang="ts">
import { useProductsStore } from '@/stores/productsStore'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import SingleProduct from '../components/SingleProduct.vue'
import type { productType } from '../types/productType'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const productsStore = useProductsStore()
const { products, loading } = storeToRefs(productsStore)
import { baseUrl } from '../constants/baseUrl'
import type { UserType } from '@/types/userType'
import { useUserStore } from '@/stores/userStore'

const { setLoading, setProducts } = useProductsStore()
const { setCurrentUser } = useUserStore()
const userStore = useUserStore()
const { currentUser } = storeToRefs(userStore)

async function getUserFromLocalStorage() {
  const jwtToken = localStorage.getItem('jwt')

  console.log('running')

  if (!jwtToken) return

  try {
    const response = await fetch(`${baseUrl}/api/v1/users/getUserWithToken`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwtToken
      }
    })
    const data = await response.json()

    if (data.status === 'success') {
      const {
        data: { user }
      } = data

      // In case user submits full name, keep only first name and capitalize first letter
      const currentUserName =
        user.name.split(' ')[0].charAt(0).toUpperCase() + user.name.split(' ')[0].slice(1)

      setCurrentUser({
        id: user.id,
        name: currentUserName,
        email: user.email,
        photo: user.photo,
        role: user.role
      } as UserType)
    }
  } catch (error) {
    console.log(error)
  }
}

async function fetchAllProducts() {
  setLoading(true)
  try {
    const response = await fetch(`${baseUrl}/api/v1/products`)
    const {
      data: { doc }
    } = await response.json()

    setProducts(doc as productType[])
    setLoading(false)
  } catch (error) {
    console.log(error)
    setLoading(false)
  }
}
onMounted(async () => {
  if (!currentUser.value.name) await getUserFromLocalStorage()
  await fetchAllProducts()
})
</script>

<template>
  <main>
    <div class="max-w-7xl mx-auto py-16 px-10 lg:px-0">
      <LoadingSpinner v-if="loading" />
      <div class="">
        <div class="flex flex-col lg:grid lg:grid-cols-3 gap-16 justify-between place-items-center">
          <SingleProduct v-for="product in products" :key="product.id" :product="product" />
        </div>
      </div>
    </div>
  </main>
</template>
