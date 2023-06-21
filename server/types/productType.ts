type ingredientsType = {
  bases: string[];
  proteins: string[];
  mixinsAndToppings: string[];
  sauces: string[];
};

type review = {
  createdAt: string;
  id: string;
  product: string;
  rating: number;
  review: string;
  user: {
    _id: string;
    name: string;
  };
  __v: number;
  _id: string;
};

export type productType = {
  name: string;
  price: number;
  image: string;
  calories: number;
  nutriScore: number;
  summary: string;
  description: string;
  rating: number;
  ingredients: ingredientsType;
  ingredientsImages: ingredientsType;
  labels: string[];
  createdAt: Date;
  reviews: review[];
};
