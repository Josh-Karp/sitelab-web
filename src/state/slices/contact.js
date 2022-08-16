import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosZoho from "src/utils/zoho/axiosZoho";

export const ContactStates = {
  IDLE: "idle",
  LOADING: "loading",
};

export const fetchContact = createAsyncThunk(
  "api/zoho/contact",
  async (company_id, thunkAPI) => {
    try {
      const response = await axiosZoho.get(`api/zoho/contact?id=${company_id}`);
      return response.data?.contact;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const internalInitialState = {
  loading: ContactStates.IDLE,
  userClaims: {},
  contact: {},
  error: null,
};

export const contactSlice = createSlice({
  name: "contact",
  initialState: internalInitialState,
  reducers: {
    reset: () => internalInitialState,
    setUserClaims: (state, action) => {
      state.userClaims = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContact.fulfilled, (state, action) => {
      state.contact = action.payload;
      state.loading = ContactStates.IDLE;
    });
    builder.addCase(fetchContact.rejected, (state, action) => {
      state = { ...internalInitialState, error: action.error };
      throw new Error(action.error.message);
    });
    builder.addCase(fetchContact.pending, (state) => {
      state.loading = ContactStates.LOADING;
    });
  },
});

export const { reset, setUserClaims } = contactSlice.actions;
