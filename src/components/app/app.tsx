import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setData,
  setIsError,
  setSearchString,
  clearData,
  setPage,
  setIsLoading,
} from "../../store/slices/app/appSlice";
import {
  getError,
  getIsLoading,
  getIsSearch,
  getSearchData,
  getSearchPage,
  getSearchString,
} from "../../store/slices/app/selectors";
import { Content } from "../content/content";
import { Header } from "../header/header";
import { Info } from "../info/info";
import { sendData } from "../../services/helpers";
import { Pagination } from "../pagination/pagination";
import { IData, ResponseTypes } from "../../types";

import styles from "./app.module.css";

export const App = () => {
  const dispatch = useAppDispatch();

  const data = useAppSelector(getSearchData);
  const searchString = useAppSelector(getSearchString);
  const page = useAppSelector(getSearchPage);
  const error = useAppSelector(getError);
  const isLoading = useAppSelector(getIsLoading);
  const isSearch = useAppSelector(getIsSearch);

  const handlerOnFind = (string: string) => {
    if (!string) {
      dispatch(setIsError("Введите текст в поисковую строку"));
    }
    dispatch(setSearchString(string));
    dispatch(clearData());

    onSend(string);
  };

  const onSend = useCallback(
    async (string: string, page: number = 1) => {
      try {
        dispatch(setIsLoading());
        const res = await sendData(string, page);

        if (!res.ok) {
          throw new Error("Что то не так");
        }

        const result: IData = await res.json();
        if (result.Response === ResponseTypes.false) {
          throw new Error(result.Error);
        }
        dispatch(setData(result));
      } catch (e) {
        if (e instanceof Error) dispatch(setIsError(e.message));
      }
    },
    [dispatch]
  );

  const handlerOnChangePage = async (page: number) => {
    await dispatch(setPage(page));
    onSend(searchString, page);
  };

  return (
    <>
      <Header onSubmit={handlerOnFind} />
      {console.log(isLoading)}
      {error.isError && !isLoading && (
        <p className={`txt-22-normal ${styles.message} ${styles.error}`}>{error.message}</p>
      )}
      {data.totalResults && <Info searchString={searchString} totalResults={data.totalResults} />}
      {!error.isError && isLoading && (
        <p className={`txt-22-normal ${styles.message}`}>
          <span>Загрузка</span>
          <div className="loader"></div>
        </p>
      )}
      {!error.isError && !isLoading && isSearch && data.Search && data.Search.length > 0 && <Content data={data} />}
      {data.totalResults && (
        <Pagination totalResults={data.totalResults} activePage={page} onPageChange={handlerOnChangePage} />
      )}
      {!isSearch && !error.isError && !isLoading && (
        <p className={`txt-22-normal ${styles.message}`}>Для продолжения введите название фильма</p>
      )}
    </>
  );
};
