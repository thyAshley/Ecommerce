import { ProductProps } from "../types/app_types";

interface requestProduct {
  type: typeof PRODUCT_LIST_REQUEST;
}

interface requestProductSuccess {
  type: typeof PRODUCT_LIST_SUCCESS;
  payload: ProductProps[];
}

interface requestProductFail {
  type: typeof PRODUCT_LIST_FAIL;
  payload: string;
}

export type productAction =
  | requestProduct
  | requestProductSuccess
  | requestProductFail;

export const PRODUCT_LIST_REQUEST = "PRODUCT_LIST_REQUEST";
export const PRODUCT_LIST_SUCCESS = "PRODUCT_LIST_SUCCESS";
export const PRODUCT_LIST_FAIL = "PRODUCT_LIST_FAIL";
