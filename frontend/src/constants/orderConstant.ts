export const ORDER_CREATE_REQUEST = "ORDER_CREATE_REQUEST";
export const ORDER_CREATE_SUCCESS = "ORDER_CREATE_SUCCESS";
export const ORDER_CREATE_FAILURE = "ORDER_CREATE_FAILURE";

export const ORDER_DETAILS_REQUEST = "ORDER_DETAILS_REQUEST";
export const ORDER_DETAILS_SUCCESS = "ORDER_DETAILS_SUCCESS";
export const ORDER_DETAILS_FAILURE = "ORDER_DETAILS_FAILURE";

export const ORDER_PAY_REQUEST = "ORDER_PAY_REQUEST";
export const ORDER_PAY_SUCCESS = "ORDER_PAY_SUCCESS";
export const ORDER_PAY_FAILURE = "ORDER_PAY_FAILURE";
export const ORDER_PAY_RESET = "ORDER_PAY_RESET";

interface orderPayRequest {
  type: typeof ORDER_PAY_REQUEST;
}

interface orderPaySuccess {
  type: typeof ORDER_PAY_SUCCESS;
}

interface orderPayFailure {
  type: typeof ORDER_PAY_FAILURE;
  payload: string;
}

interface orderPayReset {
  type: typeof ORDER_PAY_RESET;
}

interface orderDetailsRequest {
  type: typeof ORDER_DETAILS_REQUEST;
}

interface orderDetailsSuccess {
  type: typeof ORDER_DETAILS_SUCCESS;
  payload: order[];
}

interface orderDetailsFailure {
  type: typeof ORDER_DETAILS_FAILURE;
  payload: string;
}

interface orderCreateRequest {
  type: typeof ORDER_CREATE_REQUEST;
}

interface orderCreateSuccess {
  type: typeof ORDER_CREATE_SUCCESS;
  payload: {
    createdOrder: {
      _id: string;
    };
  };
}

interface orderCreateFailure {
  type: typeof ORDER_CREATE_FAILURE;
  payload: string;
}
export type orderActions =
  | orderCreateRequest
  | orderCreateSuccess
  | orderCreateFailure
  | orderDetailsRequest
  | orderDetailsSuccess
  | orderDetailsFailure
  | orderPayRequest
  | orderPayFailure
  | orderPayReset
  | orderPaySuccess;

export interface IOrder {
  loading: boolean;
  order: {
    createdOrder: {
      _id?: string;
    };
  };
  error: string;
  success: boolean;
}

interface order {
  id: string;
}
export interface Iorder {
  order: any;
  shippingAddress: {};
  loading: boolean;
  success: boolean;
  error: string;
}
