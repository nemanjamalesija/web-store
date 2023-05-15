import mongoose, { Types } from 'mongoose';

type ObjectRefType = {
  type: Types.ObjectId;
  ref: String;
  required: boolean;
};

export type reviewType = mongoose.Document & {
  review: string;
  rating: number;
  createdAt: Date;
  product: ObjectRefType;
  user: ObjectRefType;
  r?: undefined | reviewType;
  calcAverageRatings(tourId: string): void;
};
