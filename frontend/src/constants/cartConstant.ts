export const CART_ADD_ITEM = "CART_ADD_ITEM";
export const CART_REMOVE_ITEM = "CART_REMOVE_ITEM";

interface Cart_Add {
  type: typeof CART_ADD_ITEM;
  payload: IcartItem;
}
interface Cart_Remove {
  type: typeof CART_REMOVE_ITEM;
  payload: IcartItem;
}
export type ICart = Cart_Add | Cart_Remove;

export interface IcartItem {
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
}
