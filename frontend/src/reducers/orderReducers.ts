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
      return { ...state, loading: false, success: true, order: action.payload };
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
