export interface IcartItem {
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
}

export interface Iuser {
  userInfo: string | null;
  loading?: boolean;
  error?: string;
}
