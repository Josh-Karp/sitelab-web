import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import * as cookie from "cookie";
import * as setCookie from "set-cookie-parser";

let store;

export const injectStore = (_store) => {
  store = _store;
};

const axiosZoho = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    Authorization: false,
  },
});

axiosZoho.interceptors.request.use((res) => {
  const accessToken = res.headers.Authorization;

  if (!accessToken) {
    const bearer = `Zoho-oauthtoken ${
      store.getState().authReducer.accessToken
    }`;
    res.headers.Authorization = bearer;
    return res;
  }
  
  return res;
});

createAuthRefreshInterceptor(
  axiosZoho,
  (failedRequest) =>
    axiosZoho.get("/api/zoho/refresh").then((resp) => {
      const { access_token } = resp.data;

      const bearer = `Zoho-oauthtoken ${access_token}`;
      axiosZoho.defaults.headers.Authorization = bearer;
      failedRequest.response.config.headers.Authorization = bearer;

      return Promise.resolve();
    }),
  { statusCodes: [401, 403] }
);

export default axiosZoho;
