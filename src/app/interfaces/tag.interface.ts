export interface ITagResponse {
  total: number;
  page: number;
  limit: number;
  data: Tag[];
}

export interface Tag {
  id: number;
  description: string;
  icon: string;
  checked?: boolean;
}