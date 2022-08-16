import * as setCookie from "set-cookie-parser";
import * as cookie from "cookie";
import axiosZoho from "./axiosZoho";
import {
  fetchAccessToken,
  reset,
  updateAccessToken,
} from "src/state/slices/zoho";
import { wrapper } from "src/state/store";

export const authorize = async ({ signature, store, callback }) => {
  const { req, res, query } = signature;
  const { dispatch, getState } = store;
  const { accessToken } = getState().authReducer;

  if (req) {
    axiosZoho.defaults.headers.cookie = req.headers.cookie || null;

    if (accessToken)
      axiosZoho.defaults.headers.Authorization = `Zoho-oauthtoken ${accessToken}`;

    if (!accessToken) {
      try {
        const response = await axiosZoho.get("/api/zoho/refresh");

        const newAccessToken = response.data.access_token;
        axiosZoho.defaults.headers.Authorization = `Zoho-oauthtoken ${newAccessToken}`;
        dispatch(updateAccessToken({ token: newAccessToken }));
      } catch (error) {
        dispatch(reset());
        return null;
      }
    }

    try {
      const cbResponse = await callback(accessToken, store, query);
      dispatch(
        updateAccessToken({
          token: axiosZoho.defaults.headers.Authorization.split(" ")[1],
        })
      );
      return cbResponse;
    } catch (e) {
      dispatch(reset());
      return null;
    }
  }
};

export const zoho = ({ callback }) =>
  wrapper.getServerSideProps((store) => (signature) => {
    const { dispatch, getState } = store;

    return authorize({
      signature,
      store,
      callback: async (...props) => {
        if (!getState().authReducer.accessToken)
          await dispatch(fetchAccessToken());
        return callback(...props);
      },
    });
  });
