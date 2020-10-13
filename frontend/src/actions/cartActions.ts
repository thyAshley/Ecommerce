import axios from "axios";
import { Dispatch } from "redux";
import * as actions from "../constants/cartConstant";
import { RootState } from "../store";

export const addToCart = (id: string, qty: number) => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  console.log(qty);
  try {
    const {
      data: { result },
    } = await axios.get(`/api/v1/products/${id}?qty=${qty}`);
    dispatch({
      type: actions.CART_ADD_ITEM,
      payload: {
        product: result._id,
        name: result.name,
        image: result.image,
        price: result.price,
        countInStock: result.countInStock,
        qty: qty,
      },
    });
    localStorage.setItem("cartItem", JSON.stringify(getState().cart.cartItem));
  } catch (error) {
    console.log(error);
  }
};
