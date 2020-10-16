import * as actions from "../constants/userConstant";
import { Iuser } from "../store/types";

const initialState: Iuser = {
  userInfo: null,
};

const initialUserState: Iuser = {
  userInfo: null,
};

export const userReducer = (
  state = initialState,
  action: actions.userActions
): Iuser => {
  switch (action.type) {
    case actions.USER_LOGIN_REQUEST:
    case actions.USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case actions.USER_LOGIN_FAILURE:
    case actions.USER_REGISTER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case actions.USER_LOGIN_SUCCESS:
    case actions.USER_REGISTER_SUCCESS:
      return { ...state, loading: false, userInfo: action.payload };
    case actions.USER_LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export const userDetailReducer = (
  state = initialUserState,
  action: actions.userActions
) => {
  switch (action.type) {
    case actions.USER_DETAILS_REQUEST:
    case actions.USER_UPDATE_REQUEST:
      return { ...state, loading: true };
    case actions.USER_DETAILS_FAILURE:
    case actions.USER_UPDATE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case actions.USER_DETAILS_SUCCESS:
    case actions.USER_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        userInfo: action.payload,
      };
    default:
      return state;
  }
};
