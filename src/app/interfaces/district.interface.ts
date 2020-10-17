export interface IDistrictResponse {
  total: number;
  page: number;
  limit: number;
  data: District[];
}

export interface District {
  id: number;
  district: string;
}