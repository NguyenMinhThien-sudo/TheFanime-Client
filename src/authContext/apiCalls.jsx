import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";
import { endpointApi } from "../Endpoint";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${endpointApi}/api/auth/login`, user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
