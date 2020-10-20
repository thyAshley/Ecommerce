import * as actions from "../constants/orderConstant";

const initialState: actions.IOrder = {
  loading: false,
  order: {
    createdOrder: {},
  },
  error: "",
  success: false,
};

export const orderReducer = (
  state = initialState,
  action: actions.orderActions
): actions.IOrder => {
  switch (action.type) {
    case actions.ORDER_CREATE_REQUEST:
      return { ...state, loading: true, success: false };
    case actions.ORDER_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        order: action.payload,
      };
    case actions.ORDER_CREATE_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const getOrderInitialState: actions.Iorder = {
  order: [],
  shippingAddress: {},
  loading: false,
  success: false,
  error: "",
};
export const getOrderReducer = (
  state = getOrderInitialState,
  action: actions.orderActions
): typeof getOrderInitialState => {
  switch (action.type) {
    case actions.ORDER_DETAILS_REQUEST:
      return { ...state, loading: true, success: false };
    case actions.ORDER_DETAILS_SUCCESS:
      return { ...state, loading: false, success: true, order: action.payload };
    case actions.ORDER_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const orderPayReducer = (
  state = {},
  action: actions.orderActions
): { loading?: boolean; success?: boolean; error?: string } => {
  switch (action.type) {
    case actions.ORDER_PAY_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case actions.ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case actions.ORDER_PAY_FAILURE:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case actions.ORDER_PAY_RESET:
      return {
        ...state,
        loading: false,
        success: false,
      };
    default:
      return state;
  }
};

export const userOrderReducer = (
  state = {},
  action: actions.orderActions
): {
  loading?: boolean;
  success?: boolean;
  error?: string;
  orders?: actions.Iorder[];
} => {
  switch (action.type) {
    case actions.ORDER_MYREQUEST_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case actions.ORDER_MYREQUEST_SUCCESS:
      return {
        loading: false,
        success: true,
        orders: action.payload,
      };
    case actions.ORDER_MYREQUEST_FAILURE:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
