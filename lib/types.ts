export type Ingredient = {
  id: number;
  name: string;
  measure?: string | null;
  description: string | null;
  alcohol: boolean | null;
  percentage: number | null;
  type: string | null;
  imageUrl: string | null;
}

export type Cocktail = {
  id: number;
  name: string;
  imageUrl: string;
  category: string;
  alcoholic: boolean;
  glass: string;
  instructions: string;
  ingredients?: Ingredient[];
}
