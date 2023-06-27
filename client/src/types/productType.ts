import { UserType } from './userType'

type IngredientsType = {
  bases: string[]
  proteins: string[]
  mixinsAndToppings: string[]
  sauces: string[]
}

export type ReviewType = {
  createdAt: string
  id: string
  product: string
  rating: number
  review: string
  user: UserType
  __v: number
  _id: string
}

export type ProductType = {
  id: string
  name: string
  price: number
  image: string
  nutriScore: number
  summary: string
  rating: number
  labels: string[]
  calories: number
  reviews: ReviewType[]
  reviewsNumber: number

  description?: string
  ingredients?: IngredientsType
  ingredientsImages?: IngredientsType
}
