import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: StateType = {
  loading: false,
  words: [],
  result: [],
  error: undefined,
};

const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    getWordRequest: (state) => {
      state.loading = true;
    },
    getSuccessRequest: (state, action: PayloadAction<WordType[]>) => {
      state.loading = false;

      state.words = action.payload;
    },
    getWordFailureRequest: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    saveResult: (state, action: PayloadAction<string[]>) => {
      state.loading = true;
      state.result = action.payload;
    },
    clearResult: (state) => {
      state.loading = false;
      state.result = [];
      state.words = [];
      state.error = undefined;
    },
  },
});

export const {
  getSuccessRequest,
  getWordFailureRequest,
  getWordRequest,
  saveResult,
  clearResult,
} = rootSlice.actions;

export default rootSlice.reducer;
