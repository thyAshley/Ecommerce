export interface IcartItem {
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
}

export type Iuserinfo = {
  name: string;
  _id: string;
  email: string;
  isAdmin: boolean;
  token: string;
} | null;

export interface Iuser {
  userInfo: Iuserinfo;
  loading?: boolean;
  error?: string;
}
