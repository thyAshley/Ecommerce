import * as actions from "../constants/userConstant";
import { Iuser, Iuserinfo } from "../store/types";

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
): { success?: boolean } & Iuser => {
  switch (action.type) {
    case actions.USER_DETAILS_REQUEST:
    case actions.USER_UPDATE_REQUEST:
      return { ...state, loading: true, success: false };
    case actions.USER_DETAILS_FAILURE:
    case actions.USER_UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case actions.USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
    case actions.USER_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        userInfo: action.payload,
      };
    case actions.USER_DETAILS_RESET:
      return { ...state, loading: false, success: false, userInfo: null };
    default:
      return state;
  }
};

export const userListReducer = (
  state = {},
  action: actions.userActions
): { loading?: boolean; users?: Iuserinfo[]; error?: string } => {
  switch (action.type) {
    case actions.USER_LIST_REQUEST:
      return {
        loading: true,
      };

    case actions.USER_LIST_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };
    case actions.USER_LIST_FAILURE:
      return { loading: false, error: action.payload };
    case actions.USER_LIST_RESET:
      return {};
    default:
      return state;
  }
};

export const userDeleteReducer = (
  state = {},
  action: actions.userActions
): { success?: boolean; loading?: boolean; error?: string } => {
  switch (action.type) {
    case actions.USER_DELETE_REQUEST:
      return { loading: true };
    case actions.USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case actions.USER_DETAILS_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
