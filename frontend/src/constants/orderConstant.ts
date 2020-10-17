export const ORDER_CREATE_REQUEST = "ORDER_CREATE_REQUEST";
export const ORDER_CREATE_SUCCESS = "ORDER_CREATE_SUCCESS";
export const ORDER_CREATE_FAILURE = "ORDER_CREATE_FAILURE";

interface orderCreateRequest {
  type: typeof ORDER_CREATE_REQUEST;
}

interface orderCreateSuccess {
  type: typeof ORDER_CREATE_SUCCESS;
  payload: {};
}

interface orderCreateFailure {
  type: typeof ORDER_CREATE_FAILURE;
  payload: string;
}
export type orderActions =
  | orderCreateRequest
  | orderCreateSuccess
  | orderCreateFailure;
