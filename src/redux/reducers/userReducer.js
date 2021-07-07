import user from "../constants/userConstants";

function userSigninReducer(state = {}, action) {
  switch (action.type) {
    case user.USER_SIGNIN_REQUEST:
      return { loading: true };
    case user.USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case user.USER_SIGNIN_FAIL:
      return { loading: false, error: action.payload };
    case user.USER_LOGOUT:
      return {};
    default: return state;
  }
}

function userUpdateReducer(state = {}, action) {
  switch (action.type) {
    case user.USER_LOGOUT.USER_UPDATE_REQUEST:
      return { loading: true };
    case user.USER_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case user.USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function userRegisterReducer(state = {}, action) {
  switch (action.type) {
    case user.USER_REGISTER_REQUEST:
      return { loading: true };
    case user.USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case user.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}
export {
  userSigninReducer, userRegisterReducer, userUpdateReducer
}