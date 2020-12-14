import * as types from "../constants/auth.constants";
const initialState = {
  user: {},
  isAuthenticated: null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    // LOGIN
    case types.LOGIN_REQUEST:
      return { ...state, loading: true, isAuthenticated: false };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload.user,
        accessToken: payload.accessToken,
        isAuthenticated: true,
        totalPageNum: payload.totalPages,
      };
    case types.LOGIN_FAILURE:
      return { ...state, loading: false, isAuthenticated: false };

    // LOG OUT
    case types.LOGOUT:
      return {
        ...state,
        user: null,
        accessToken: null,
        isAuthenticated: false,
        loading: false,
      };

    // REGISTER
    case types.REGISTER_REQUEST:
      return { ...state, loading: true };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload.user,
      };
    case types.REGISTER_FAILURE:
      return { ...state, loading: false };

    // GET CURRENT USER
    case types.GET_CURRENT_USER_REQUEST:
      return { ...state, loading: true };
    case types.GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
      };
    case types.GET_CURRENT_USER_FAILURE:
      return { ...state, loading: false, isAuthenticated: false };

    default:
      return state;
  }
};

export default authReducer;
