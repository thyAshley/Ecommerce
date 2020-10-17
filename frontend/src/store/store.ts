import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  productReducer,
  productDetailsReducer,
} from "../reducers/productReducers";
import { cartReducer } from "../reducers/cartReducers";
import { userReducer, userDetailReducer } from "../reducers/userReducer";

const reducer = combineReducers({
  productList: productReducer,
  productDetail: productDetailsReducer,
  cart: cartReducer,
  user: userReducer,
  userProfile: userDetailReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItem")
  ? JSON.parse(localStorage.getItem("cartItem")!)
  : [];

const userDetailFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")!)
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress")!)
  : null;

const initialState = {
  cart: {
    cartItem: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  user: {
    userInfo: userDetailFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
export type RootState = ReturnType<typeof reducer>;
