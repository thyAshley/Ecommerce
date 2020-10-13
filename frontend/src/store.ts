import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productReducer,
  productDetailsReducer,
} from "./reducers/productReducers";

import { cartReducer } from "./reducers/cartReducers";

const reducer = combineReducers({
  productList: productReducer,
  productDetail: productDetailsReducer,
  cart: cartReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItem")
  ? JSON.parse(localStorage.getItem("cartItem")!)
  : [];

const initialState = {
  cart: {
    cartItem: cartItemsFromStorage,
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
