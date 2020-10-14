import * as actions from "../constants/userConstant";

export const userReducer = (state = {}, action: actions.userActions) => {
  switch (action.type) {
    case actions.USER_LOGIN_REQUEST:
      return { loading: true };
    case actions.USER_LOGIN_FAILURE:
      return { loading: false, error: action.payload };
    case actions.USER_LOGIN_SUCCESS:
      return { loading: true, userInfo: action.payload };
    case actions.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
