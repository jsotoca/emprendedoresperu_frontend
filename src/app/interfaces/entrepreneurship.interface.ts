import { Category } from './category.interface';
import { Deal } from './deal.interface';

export interface IEntrepreneurshipResponse {
  total: number;
  page: number;
  limit: number;
  data: Entrepreneurship[];
}

export interface IEntrepreneurshipSearchResponse {
  ok: boolean;
  entrepreneurship: Entrepreneurship;
}

export interface Entrepreneurship {
  id?: number;
  name?: string;
  description?: string;
  slogan?: string;
  phone?: string;
  address?: any;
  location?: any;
  logo?: string;
  cover?: string;
  facebook?: any;
  twitter?: any;
  youtube?: any;
  instagram?: any;
  tiktok?: any;
  isVerified?: boolean;
  actived?: boolean;
  created_at?: string;
  updated_at?: string;
  deals?: Deal[];
  subcategory?: Subcategory;
  district?: District;
  tags?: Tag[];
}

export interface Tag {
  id: number;
  description: string;
  icon: string;
}

export interface District {
  id: number;
  district: string;
}

export interface Subcategory {
  id: number;
  name: string;
  icon: string;
  image: string;
  category?: Category;
}




