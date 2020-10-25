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

interface productDeleteRequest {
  type: typeof PRODUCT_DELETE_REQUEST;
}

interface productDeleteSuccess {
  type: typeof PRODUCT_DELETE_SUCCESS;
}

interface productDeleteFailure {
  type: typeof PRODUCT_DELETE_FAIL;
  payload: string;
}
interface requestDetailFail {
  type: typeof PRODUCT_DETAILS_FAIL;
  payload: string;
}

interface productCreateRequest {
  type: typeof PRODUCT_CREATE_REQUEST;
}
interface productCreateSuccess {
  type: typeof PRODUCT_CREATE_SUCCESS;
  payload: {
    _id: string;
  };
}
interface productCreateFail {
  type: typeof PRODUCT_CREATE_FAIL;
  payload: string;
}
interface productCreateReset {
  type: typeof PRODUCT_CREATE_RESET;
}
export type createProductAction =
  | productCreateRequest
  | productCreateSuccess
  | productCreateFail
  | productCreateReset;

export type productAction =
  | requestProduct
  | requestProductSuccess
  | requestProductFail;

export type productDetailAction =
  | requestDetail
  | requestDetailSuccess
  | requestDetailFail;

export type productDeleteAction =
  | productDeleteRequest
  | productDeleteSuccess
  | productDeleteFailure;

export const PRODUCT_LIST_REQUEST = "PRODUCT_LIST_REQUEST";
export const PRODUCT_LIST_SUCCESS = "PRODUCT_LIST_SUCCESS";
export const PRODUCT_LIST_FAIL = "PRODUCT_LIST_FAIL";

export const PRODUCT_DETAILS_REQUEST = "PRODUCT_DETAILS_REQUEST";
export const PRODUCT_DETAILS_SUCCESS = "PRODUCT_DETAILS_SUCCESS";
export const PRODUCT_DETAILS_FAIL = "PRODUCT_DETAILS_FAIL";

export const PRODUCT_DELETE_REQUEST = "PRODUCT_DELETE_REQUEST";
export const PRODUCT_DELETE_SUCCESS = "PRODUCT_DELETE_SUCCESS";
export const PRODUCT_DELETE_FAIL = "PRODUCT_DELETE_FAIL";

export const PRODUCT_CREATE_REQUEST = "PRODUCT_CREATE_REQUEST";
export const PRODUCT_CREATE_SUCCESS = "PRODUCT_CREATE_SUCCESS";
export const PRODUCT_CREATE_FAIL = "PRODUCT_CREATE_FAIL";
export const PRODUCT_CREATE_RESET = "PRODUCT_CREATE_RESET";
