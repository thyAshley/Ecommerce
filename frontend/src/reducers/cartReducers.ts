import * as actions from "../constants/cartConstant";

const initialState = {
  cartItem: [] as actions.IcartItem[],
  shippingAddress: {} as actions.shippingDetails,
};

export const cartReducer = (state = initialState, action: actions.ICart) => {
  switch (action.type) {
    case actions.CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItem.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItem: state.cartItem.map((cartitem) =>
            cartitem.product === existItem.product ? item : cartitem
          ),
        };
      } else {
        return {
          ...state,
          cartItem: [...state.cartItem, item],
        };
      }
    case actions.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItem: state.cartItem.filter(
          (item) => item.product !== action.payload
        ),
      };
    case actions.CART_SAVE_ADDRESS:
      return { ...state, shippingAddress: action.payload };

    default:
      return state;
  }
};
