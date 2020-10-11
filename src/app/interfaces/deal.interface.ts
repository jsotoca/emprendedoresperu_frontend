export interface IDealResponse {
  total: number;
  page: number;
  limit: number;
  data: Deal[];
}

export interface Deal {
  id: number;
  name: string;
  description: string;
  image: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}