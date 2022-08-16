import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const AuthStates = {
  IDLE: "idle",
  LOADING: "loading",
};

export const fetchAccessToken = createAsyncThunk(
  "auth/zoho",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("api/zoho/refresh");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const internalInitialState = {
  accessToken: "",
  loading: AuthStates.IDLE,
  error: null,
};

export const authSlice = createSlice({
  name: "zoho",
  initialState: internalInitialState,
  reducers: {
    updateAccessToken(state, action) {
      state.accessToken = action.payload.token;
    },
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAccessToken.rejected, (state, action) => {
      state = { ...internalInitialState, error: action.error };
      throw new Error(action.error.message);
    });
    builder.addCase(fetchAccessToken.fulfilled, (state, action) => {
      state.me = action.payload;
    });
  },
});

export const { updateAccessToken, reset } = authSlice.actions;
