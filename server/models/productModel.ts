import mongoose from 'mongoose';
import { productType } from '../types/productType.ts';

const productSchema = new mongoose.Schema<productType>({
  name: {
    type: String,
    unique: true,
    trim: true,
    maxlength: [
      40,
      'A product name must be equal or greater then 40 characters',
    ],
    minlength: [
      10,
      'A product name must be equal or greater then 10 characters',
    ],
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
    trim: true,
    maxlength: [
      110,
      'A product summary must be equal or greater then 110 characters',
    ],
    minlength: [
      10,
      'A product summary must be equal or greater then 10 characters',
    ],
    required: [true, 'A product must have a summary'],
  },
  description: {
    type: String,
    trim: true,
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
    bases: [String],
    proteins: [String],
    mixinsAndToppings: [String],
    sauces: [String],
  },
  labels: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  reviews: [String],
});

const Product = mongoose.model<productType>('Product', productSchema);

export default Product;
