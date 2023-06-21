type ingredientsType = {
  bases: string[];
  proteins: string[];
  mixinsAndToppings: string[];
  sauces: string[];
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
  reviews: string[];
};
