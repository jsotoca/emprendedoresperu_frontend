export interface ICategoryResponse {
  total: number;
  page: number;
  limit: number;
  data: Category[];
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  image: string;
}