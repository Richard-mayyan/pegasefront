import { Client } from "@/logic/domain/entities";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ClientState = {
  clients: Client[];
  loading: boolean;
  error: string | null;
};

const initialState: ClientState = {
  clients: [],
  loading: false,
  error: null,
};

const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    createClientPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    createClientSuccess: (state, action: PayloadAction<Client>) => {
      state.clients.push(action.payload);
      state.loading = false;
    },
    createClientFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { createClientPending, createClientSuccess, createClientFailure } =
  clientSlice.actions;

export const clientReducer = clientSlice.reducer;
