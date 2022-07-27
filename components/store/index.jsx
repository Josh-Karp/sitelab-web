import { combineReducers, configureStore } from "@reduxjs/toolkit";
import notificationsReducer from "../../modules/notifications/slice/NotificationSlice";

const rootReducer = combineReducers({
  notifications: notificationsReducer,
});

export const createStore = (preloadedState) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  return store;
};
