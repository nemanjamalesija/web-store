import { productType } from '../types/productType'

export default function calculateAverageRating(product: productType) {
  const reviews = product.reviews.map((rev) => {
    return rev
  })

  const ratings = reviews.map((r) => r.rating)

  const sum = ratings.reduce((acc, rating) => acc + rating, 0)
  const average = sum / ratings.length
  return average.toFixed(1)
}
