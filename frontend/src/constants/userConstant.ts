import { Iuserinfo } from "../store/types";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";
export const USER_LOGOUT = "USER_LOGOUT";

interface userLoginRequest {
  type: typeof USER_LOGIN_REQUEST;
}
interface userLoginSuccess {
  type: typeof USER_LOGIN_SUCCESS;
  payload: Iuserinfo;
}
interface userLoginFailure {
  type: typeof USER_LOGIN_FAILURE;
  payload: string;
}
interface userLogout {
  type: typeof USER_LOGOUT;
}

export type userActions =
  | userLoginFailure
  | userLoginRequest
  | userLoginSuccess
  | userLogout;
