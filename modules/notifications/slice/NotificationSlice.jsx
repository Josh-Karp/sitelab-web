import { createSlice } from "@reduxjs/toolkit"

const NotificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    notification: null,
  },
  reducers: {
    notify: (state, param) => {
      const { payload } = param
      state.notification = payload
    },
  },
})

const { actions, reducer } = NotificationsSlice
export const { notify } = actions
export default reducer