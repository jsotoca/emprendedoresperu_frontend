export interface IAdsResponse {
  total: number;
  page: number;
  limit: number;
  data: Ads[];
}

export interface Ads {
  id: number;
  name: string;
  image: string;
  position: number;
  actived: boolean;
  created_at: string;
  updated_at: string;
}