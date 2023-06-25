import mongoose, { Types, mongo } from 'mongoose';
import { reviewType } from '../types/reviewType.ts';
import Product from './productModel.ts';

const reviewSchema = new mongoose.Schema<reviewType>(
  {
    review: {
      type: String,
      required: [true, 'Please add a review'],
    },

    rating: {
      type: Number,
      required: [true, 'Please add a review'],
      min: 1,
      max: 5,
    },

    createdAt: {
      type: Date,
      default: Date.now(),
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Review must belong to a product'],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to an user'],
    },
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.pre('save', function (next) {
  console.log('save middleware running');

  this.populate({ path: 'product' });
  this.populate({ path: 'user' });
  next();
});

reviewSchema.pre(/^find/, function (next) {
  console.log('find middleware running');

  //@ts-ignore
  this.populate({
    path: 'user',
    select: 'name photo createdAt joinedAt',
  });

  next();
});

export const Review = mongoose.model<reviewType>('Review', reviewSchema);
