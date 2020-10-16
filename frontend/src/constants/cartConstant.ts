export const CART_ADD_ITEM = "CART_ADD_ITEM";
export const CART_REMOVE_ITEM = "CART_REMOVE_ITEM";
export const CART_SAVE_ADDRESS = "CART_SAVE_ADDRESS";

interface cartSaveAdress {
  type: typeof CART_SAVE_ADDRESS;
  payload: shippingDetails;
}

interface Cart_Add {
  type: typeof CART_ADD_ITEM;
  payload: IcartItem;
}
interface Cart_Remove {
  type: typeof CART_REMOVE_ITEM;
  payload: string;
}

export type ICart = Cart_Add | Cart_Remove | cartSaveAdress;

export interface IcartItem {
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
}

export interface shippingDetails {
  country: string;
  city: string;
  postalCode: string;
  address: string;
}
