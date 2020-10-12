import { ProductProps } from "../types/app_types";
import * as actions from "../constants/productConstant";

const initialState = {
  products: [] as ProductProps[],
  loading: false,
};

export const productReducer = (
  state = initialState,
  action: actions.productAction
) => {
  switch (action.type) {
    case actions.PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case actions.PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case actions.PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return { state };
  }
};
