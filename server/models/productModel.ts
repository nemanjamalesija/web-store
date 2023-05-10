import mongoose from 'mongoose';
import { productType } from '../types/productType.ts';

const productSchema = new mongoose.Schema<productType>({
  name: {
    type: String,
    required: [true, 'A product must have a name'],
  },
  image: {
    type: String,
    required: [true, 'A product must have an image'],
  },
  price: {
    type: Number,
    required: [true, 'A product must have a price'],
  },

  rating: {
    type: Number,
    default: 4.5,
  },
  summary: {
    type: String,
    required: [true, 'A product must have a summary'],
  },
  description: {
    type: String,
  },

  calories: {
    type: Number,
    required: [true, 'Number of calories must be defined for the product'],
  },
  nutriScore: {
    type: Number,
    required: [true, 'Nutri-score of calories must be defined for the product'],
  },
  ingredients: {
    base: [String],
    proteins: [String],
    mixinsAndToppings: [String],
    sauces: [String],
  },
  labels: [String],
  reviews: [String],
});

const Product = mongoose.model<productType>('Product', productSchema);

export default Product;
