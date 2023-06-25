import { UserType } from './userType'

type ingredientsType = {
  bases: string[]
  proteins: string[]
  mixinsAndToppings: string[]
  sauces: string[]
}

type review = {
  createdAt: string
  id: string
  product: string
  rating: number
  review: string
  user: UserType
  __v: number
  _id: string
}

export type productType = {
  id: string
  name: string
  price: number
  image: string
  nutriScore: number
  summary: string
  rating: number
  labels: string[]
  calories: number
  reviews: review[]
  reviewsNumber: number

  description?: string
  ingredients?: ingredientsType
  ingredientsImages?: ingredientsType
}
