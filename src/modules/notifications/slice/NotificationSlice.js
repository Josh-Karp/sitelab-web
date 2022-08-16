import { createSlice } from "@reduxjs/toolkit";

const internalInitialState = {
  notification: null,
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: internalInitialState,
  reducers: {
    notify: (state, param) => {
      const { payload } = param;
      state.notification = payload;
    },
  },
});

export const { notify } = notificationsSlice.actions;
