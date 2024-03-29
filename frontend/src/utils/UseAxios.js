import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

let baseURL = "";

console.log();
if (process.env.NODE_ENV === "development") {
  baseURL = "http://weblog.127.0.0.1:8000/api/v1";
} else if (process.env.NODE_ENV === "production") {
  baseURL = "http://weblog.alizabetpour.ir/api/v1";
}

const useAxios = () => {
  const { authToken, setUser, setAuthToken, logoutUser } =
    useContext(AuthContext);
  const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: { Authorization: `Bearer ${authToken?.access}` },
  });
  axiosInstance.interceptors.request.use(async (req) => {
    if (!authToken) {
      req.headers.Authorization = "";
      return req;
    }
    const user = jwt_decode(authToken.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    if (!isExpired) {
      return req;
    }
    try {
      const response = await axios.post(`${baseURL}/auth/jwt/refresh/`, {
        refresh: authToken.refresh,
      });
      localStorage.setItem("authTokens", JSON.stringify(response.data));
      setAuthToken(response.data);
      setUser(jwt_decode(response.data.access));
      req.headers.Authorization = `Bearer ${response.data.access}`;
    } catch (error) {
      const { response } = error;
      const { request, ...errorObject } = response; // take everything but 'request'
      if (errorObject.status === 401) {
        logoutUser();
      }
    }

    return req;
  });

  return axiosInstance;
};

export default useAxios;
