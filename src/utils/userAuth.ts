import axios, { AxiosResponse } from "axios";
import { API_ROUTES } from "./constant";
import { ILoginCredential, ISignupCredential, IUser } from "../types/user";

export const createUserAtDb = async (userData: ISignupCredential) => {
  try {
    const response: AxiosResponse<{ data: IUser }> = await axios.post(
      `${API_ROUTES.SIGN_UP}`,
      userData
    );
    return response.data;
  } catch (error) {
    throw new Error();
  }
};

export const loginUserAtDb = async (loginData: ILoginCredential) => {
  try {
    const response: AxiosResponse<{ data: { accessToken: string } }> =
      await axios.post(`${API_ROUTES.SIGN_IN}`, loginData);
    return response.data;
  } catch (error) {
    throw new Error();
  }
};

export async function getUserByToken() {
  const defaultReturnObject = { data: null };
  try {
    const token = getToken();
    if (!token) {
      return defaultReturnObject;
    }
    const response: AxiosResponse<{ data: IUser }> = await axios({
      method: "GET",
      url: API_ROUTES.GET_USER,
      headers: {
        authorization: token,
      },
    });
    return response.data;
  } catch (err) {
    return defaultReturnObject;
  }
}

export function storeToken(token: string) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function removeToken() {
  localStorage.removeItem("token");
}
