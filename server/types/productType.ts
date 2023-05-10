export type productType = {
  name: string;
  price: number;
  image: string;
  calories: number;
  nutriScore: number;
  summary: string;
  description: string;
  rating: number;
  ingredients: {
    bases: string[];
    proteins: string[];
    mixinsAndToppings: string[];
    sauces: string[];
  };
  labels: string[];
  reviews: string[];
};
