import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/zoho/axiosZoho";

export const InvoicesStates = {
  IDLE: "idle",
  LOADING: "loading",
};

export const fetchInvoices = createAsyncThunk(
  "api/zoho/invoices",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`api/zoho/invoices?id=${id}`);
      return response.data?.invoices;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const internalInitialState = {
  loading: InvoicesStates.IDLE,
  invoices: [],
  error: null,
};

export const invoicesSlice = createSlice({
  name: "invoices",
  initialState: internalInitialState,
  reducers: {
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInvoices.fulfilled, (state, action) => {
      state.invoices = [...action.payload];
      state.loading = InvoicesStates.IDLE;
    });
    builder.addCase(fetchInvoices.rejected, (state, action) => {
      state = { ...internalInitialState, error: action.error };
      throw new Error(action.error.message);
    });
    builder.addCase(fetchInvoices.pending, (state) => {
      state.loading = InvoicesStates.LOADING;
    });
  },
});

export const { reset } = invoicesSlice.actions;
