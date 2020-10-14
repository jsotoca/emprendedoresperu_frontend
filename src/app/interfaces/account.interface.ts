export interface IDetailResponse {
  user: IDetailUser;
  entrepreneurships?: IDetailEntrepreneurship[];
  deals?: IDetailDeal[];
}

export interface IDetailDeal {
  id: number;
  name: string;
  description: string;
  type: number;
  image: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  entrepreneurship?: IDetailEntrepreneurship;
}

export interface IDetailEntrepreneurship {
  id: number;
  name: string;
  description: string;
  slogan: string;
  phone: string;
  address?: any;
  location?: any;
  logo: string;
  cover: string;
  facebook?: any;
  twitter?: any;
  youtube?: any;
  instagram?: any;
  tiktok?: any;
  isVerified: boolean;
  actived: boolean;
  created_at: string;
  updated_at: string;
}

interface IDetailUser {
  id: number;
  fullname: string;
  phone: string;
  email: string;
  avatar?: string;
  role?: string;
  actived?: boolean;
  created_at?: string;
  updated_at?: string;
}