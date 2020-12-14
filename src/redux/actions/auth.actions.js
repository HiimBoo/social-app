import * as types from "../constants/auth.constants";
import api from "../../apiService";
import { toast } from "react-toastify";
import routeActions from "./route.actions";
// the middleware functions will be here

const loginRequest = ({ email, password }) => async (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST, payload: null });
  try {
    const response = await api.post(`/api/auth/login`, { email, password });
    dispatch({ type: types.LOGIN_SUCCESS, payload: response.data.data });
    localStorage.setItem("accessToken", `${response.data.data.accessToken}`);
    toast.success(`Welcome ${response.data.data.user.name}`);
    dispatch(routeActions.redirect("/"));
  } catch (error) {
    dispatch({ type: types.LOGIN_FAILURE, payload: null });
  }
};

const logout = () => (dispatch) => {
  delete api.defaults.headers.common["Authorization"];
  localStorage.setItem("accessToken", "");
  dispatch({ type: types.LOGOUT, payload: null });
};

const registerAccount = ({ avatarUrl, name, email, password }) => async (
  dispatch
) => {
  dispatch({ type: types.REGISTER_REQUEST, payload: null });
  try {
    const response = await api.post(`/api/users`, {
      avatarUrl,
      name,
      email,
      password,
    });
    dispatch({ type: types.REGISTER_SUCCESS, payload: response.data.data });
    dispatch(routeActions.redirect("/login"));
    toast.success(`Welcome ${response.data.data.user.name}, register success!`);
  } catch (error) {
    dispatch({ type: types.REGISTER_FAILURE, payload: null });
  }
};

const getCurrentUser = (accessToken) => async (dispatch) => {
  dispatch({ type: types.GET_CURRENT_USER_REQUEST, payload: null });
  if (accessToken) {
    const bearerToken = "Bearer " + accessToken;
    api.defaults.headers.common["Authorization"] = bearerToken;
  }
  try {
    const res = await api.get("api/users/me");
    dispatch({ type: types.GET_CURRENT_USER_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.GET_CURRENT_USER_FAILURE, payload: error });
  }
};

const authActions = {
  loginRequest,
  logout,
  registerAccount,
  getCurrentUser,
};
export default authActions;
