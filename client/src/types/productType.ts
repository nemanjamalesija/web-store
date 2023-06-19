export type singleProductType = {
  id: string
  name: string
  price: number
  image: string
  calories: number
  nutriScore: number
  summary: string
  description: string
  rating: number
  ingredients: {
    bases: string[]
    proteins: string[]
    mixinsAndToppings: string[]
    sauces: string[]
  }
  labels: string[]
  reviews: string[]
  createdAt: Date
}

export type productTypeAll = {
  id: string
  name: string
  price: number
  image: string
  nutriSore: number
  summary: string
  rating: number
  labels: string[]
}
