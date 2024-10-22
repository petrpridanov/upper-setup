import { RootState } from "../../store";

const getIsLoading = (state: RootState) => state.app.isLoading;
const getError = (state: RootState) => state.app.error;
const getIsSearch = (state: RootState) => state.app.isSearch;
const getSearchData = (state: RootState) => state.app.data;
const getSearchString = (state: RootState) => state.app.searchString;
const getSearchPage = (state: RootState) => state.app.page;

export { getError, getIsLoading, getIsSearch, getSearchPage, getSearchData, getSearchString };
