import * as actions from "../constants/orderConstant";

const initialState = {
  loading: false,
};

export const orderReducer = (
  state = initialState,
  action: actions.orderActions
) => {
  switch (action.type) {
    case actions.ORDER_CREATE_REQUEST:
      return { ...state, loading: true };
    case actions.ORDER_CREATE_SUCCESS:
      return { ...state, loading: false, order: action.payload };
    case actions.ORDER_CREATE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
