import { createSlice } from "@reduxjs/toolkit";
import { IData, ResponseTypes } from "../../../types";

export interface AppState {
  isSearch: boolean;
  isLoading: boolean;
  error: {
    isError: boolean;
    message: string;
  };
  data: IData;
  searchString: string;
  page: number;
}

export interface Payload {
  name: keyof AppState;
  value: boolean;
}

const initialState: AppState = {
  isSearch: false,
  isLoading: false,
  error: {
    isError: false,
    message: "",
  },
  data: { Response: ResponseTypes.false, Search: [], totalResults: "" },
  searchString: "",
  page: 1,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsSearch(state) {
      state.isSearch = true;
    },
    setIsLoading(state) {
      state.isLoading = true;
      state.error = initialState.error;
    },
    setIsError(state, { payload }) {
      state.error.isError = true;
      state.isLoading = false;
      state.error.message = payload;
    },
    setData(state, { payload }) {
      state.data = payload;
      state.isLoading = false;
      state.isSearch = true;
      state.error = initialState.error;
    },
    setPage(state, { payload }) {
      state.page = payload;
    },
    setSearchString(state, { payload }) {
      state.searchString = payload;
    },
    clearData(state) {
      state.data = initialState.data;
      state.isSearch = false;
      state.page = 1;
    },
  },
});

export const { setData, setIsError, setIsLoading, setIsSearch, setPage, setSearchString, clearData } = appSlice.actions;

export default appSlice.reducer;
