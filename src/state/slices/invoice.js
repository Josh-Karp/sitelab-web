import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/zoho/axiosZoho";

export const InvoiceStates = {
  IDLE: "idle",
  LOADING: "loading",
};

export const fetchInvoice = createAsyncThunk(
  "api/zoho/invoice",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`api/zoho/invoice?id=${id}`);
      return response.data.invoice;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const internalInitialState = {
  loading: InvoiceStates.IDLE,
  invoice: [],
  error: null,
};

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState: internalInitialState,
  reducers: {
    reset: () => internalInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInvoice.fulfilled, (state, action) => {
      state.invoice = action.payload;
      state.loading = InvoiceStates.IDLE;
    });
    builder.addCase(fetchInvoice.rejected, (state, action) => {
      state = { ...internalInitialState, error: action.error };
      throw new Error(action.error.message);
    });
    builder.addCase(fetchInvoice.pending, (state) => {
      state.loading = InvoiceStates.LOADING;
    });
  },
});

export const { reset } = invoiceSlice.actions;
