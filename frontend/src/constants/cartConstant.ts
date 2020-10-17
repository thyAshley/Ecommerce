export const CART_ADD_ITEM = "CART_ADD_ITEM";
export const CART_REMOVE_ITEM = "CART_REMOVE_ITEM";
export const CART_SAVE_ADDRESS = "CART_SAVE_ADDRESS";
export const CART_SAVE_PAYMENT_METHOD = "CART_SAVE_PAYMENT_METHOD";

interface cartSaveAdress {
  type: typeof CART_SAVE_ADDRESS;
  payload: shippingDetails;
}
interface cartSavePayment {
  type: typeof CART_SAVE_PAYMENT_METHOD;
  payload: string;
}

interface Cart_Add {
  type: typeof CART_ADD_ITEM;
  payload: IcartItem;
}
interface Cart_Remove {
  type: typeof CART_REMOVE_ITEM;
  payload: string;
}

export type ICart = Cart_Add | Cart_Remove | cartSaveAdress | cartSavePayment;

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
