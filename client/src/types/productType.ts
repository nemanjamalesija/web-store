export type productType = {
  id: string
  name: string
  price: number
  image: string
  nutriSore: number
  summary: string
  rating: number
  labels: string[]
  calories: number
  reviews: string[]
  reviewsNumber: number

  description?: string
  ingredients?: {
    bases: string[]
    proteins: string[]
    mixinsAndToppings: string[]
    sauces: string[]
  }
}
