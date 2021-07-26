import Axios from "axios";
import Cookie from 'js-cookie';
import user from "../constants/userConstants";
import domainType from "../../components/utils";

const backDomain = domainType();

const update = ({ userId, name, email, password }) => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  dispatch({ type: user.USER_UPDATE_REQUEST, payload: { userId, name, email, password } });
  try {
    const { data } = await Axios.put(backDomain+"/api/users/" + userId,
      { name, email, password }, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    dispatch({ type: user.USER_UPDATE_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: user.USER_UPDATE_FAIL, payload: error.message });
  }
}

const signin = (email, password) => async (dispatch) => {
  dispatch({ type: user.USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post(backDomain+"/api/users/signin", { email, password });
    dispatch({ type: user.USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: user.USER_SIGNIN_FAIL, payload: error.message });
  }
}

const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: user.USER_REGISTER_REQUEST, payload: { name, email, password } });
  try {
    const { data } = await Axios.post(backDomain+"/api/users/register", { name, email, password });
    dispatch({ type: user.USER_REGISTER_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: user.USER_REGISTER_FAIL, payload: error.message });
  }
}

const logout = () => (dispatch) => {
  Cookie.remove("userInfo");
  dispatch({ type: user.USER_LOGOUT })
}
export { signin, register, logout, update };