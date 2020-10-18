import { Category } from "./category.interface";

export interface Subcategory {
  id: number;
  name: string;
  icon: string;
  image: string;
  category: Category;
}