import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from "next-redux-cookie-wrapper";
import { createWrapper, MakeStore, HYDRATE } from "next-redux-wrapper";

import { notificationsSlice } from "../../modules/notifications/slice/NotificationSlice";
import { contactSlice } from "../slices/contact";
import { contactsSlice } from "../slices/contacts";
import { invoiceSlice } from "../slices/invoice";
import { invoicesSlice } from "../slices/invoices";
import { authSlice } from "../slices/zoho";

const combinedReducers = combineReducers({
  notificationsReducer: notificationsSlice.reducer,
  authReducer: authSlice.reducer,
  invoicesReducer: invoicesSlice.reducer,
  invoiceReducer: invoiceSlice.reducer,
  contactReducer: contactSlice.reducer,
  contactsReducer: contactsSlice.reducer,
});

const rootReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  }
  return combinedReducers(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      nextReduxCookieMiddleware({
        subtrees: ["contactReducer.userClaims"],
      })
    ),
});

const makeStore = wrapMakeStore(() => store);

export const wrapper = createWrapper(makeStore, { storeKey: "key" });
