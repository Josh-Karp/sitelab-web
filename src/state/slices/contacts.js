import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/zoho/axiosZoho";

export const ContactsStates = {
  IDLE: "idle",
  LOADING: "loading",
};

export const fetchContacts = createAsyncThunk(
  "api/zoho/contacts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("api/zoho/contacts");
      return response.data?.contacts;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const internalInitialState = {
  loading: ContactsStates.IDLE,
  contacts: {},
  error: null,
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState: internalInitialState,
  reducers: {
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.contacts = [...action.payload];
      state.loading = ContactsStates.IDLE;
    });
    builder.addCase(fetchContacts.rejected, (state, action) => {
      state = { ...internalInitialState, error: action.error };
      throw new Error(action.error.message);
    });
    builder.addCase(fetchContacts.pending, (state) => {
      state.loading = ContactsStates.LOADING;
    });
  },
});

export const { reset } = contactsSlice.actions;
