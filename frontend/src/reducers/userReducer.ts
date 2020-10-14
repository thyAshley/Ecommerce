import * as actions from "../constants/userConstant";
import { Iuser } from "../store/types";

const initialState: Iuser = {
  userInfo: null,
};
export const userReducer = (
  state = initialState,
  action: actions.userActions
): Iuser => {
  switch (action.type) {
    case actions.USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case actions.USER_LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case actions.USER_LOGIN_SUCCESS:
      return { ...state, loading: true, userInfo: action.payload };
    case actions.USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};
