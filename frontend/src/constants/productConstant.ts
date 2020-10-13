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

interface requestDetail {
  type: typeof PRODUCT_DETAILS_REQUEST;
}

interface requestDetailSuccess {
  type: typeof PRODUCT_DETAILS_SUCCESS;
  payload: ProductProps;
}

interface requestDetailFail {
  type: typeof PRODUCT_DETAILS_FAIL;
  payload: string;
}

export type productAction =
  | requestProduct
  | requestProductSuccess
  | requestProductFail;

export type productDetailAction =
  | requestDetail
  | requestDetailSuccess
  | requestDetailFail;

export const PRODUCT_LIST_REQUEST = "PRODUCT_LIST_REQUEST";
export const PRODUCT_LIST_SUCCESS = "PRODUCT_LIST_SUCCESS";
export const PRODUCT_LIST_FAIL = "PRODUCT_LIST_FAIL";

export const PRODUCT_DETAILS_REQUEST = "PRODUCT_DETAILS_REQUEST";
export const PRODUCT_DETAILS_SUCCESS = "PRODUCT_DETAILS_SUCCESS";
export const PRODUCT_DETAILS_FAIL = "PRODUCT_DETAILS_FAIL";
