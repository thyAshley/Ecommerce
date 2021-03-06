import { ProductProps } from "../types/app_types";
import * as actions from "../constants/productConstant";

// const productsState = {
//   products: [] as ProductProps[],
//   loading: false,
//   error: "",
// };

export const productReducer = (
  state = {},
  action: actions.productAction
): {
  products?: ProductProps[];
  loading?: boolean;
  error?: string;
} => {
  switch (action.type) {
    case actions.PRODUCT_LIST_REQUEST:
      return { ...state, loading: true };
    case actions.PRODUCT_LIST_SUCCESS:
      return { ...state, loading: false, products: action.payload };
    case actions.PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = {},
  action: actions.productDetailAction
): { loading?: boolean; error?: string; product?: ProductProps } => {
  switch (action.type) {
    case actions.PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case actions.PRODUCT_DETAILS_SUCCESS:
      return { ...state, loading: false, product: action.payload };
    case actions.PRODUCT_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (
  state = {},
  action: actions.productDeleteAction
): { loading?: boolean; error?: string; success?: boolean } => {
  switch (action.type) {
    case actions.PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case actions.PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case actions.PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReducer = (
  state = {},
  action: actions.createProductAction
): {
  loading?: boolean;
  error?: string;
  success?: boolean;
  product?: { _id: string };
} => {
  switch (action.type) {
    case actions.PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case actions.PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case actions.PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case actions.PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productUpdatedReducer = (
  state = {},
  action: actions.updateProductAction
): {
  loading?: boolean;
  error?: string;
  success?: boolean;
  product?: { _id?: string };
} => {
  switch (action.type) {
    case actions.PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case actions.PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case actions.PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case actions.PRODUCT_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};
