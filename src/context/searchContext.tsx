import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
import { IData } from "../types";

export interface ImagesState {
  [key: string]: HTMLImageElement;
}

interface SearchContextType {
  page: number;
  searchString: string;
  isLoading: boolean;
  isError: boolean;
  isSearch: boolean;
  data: IData | undefined;
  setPage: Dispatch<SetStateAction<number>>;
  setSearchString: Dispatch<SetStateAction<string>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setIsError: Dispatch<SetStateAction<boolean>>;
  setIsSearch: Dispatch<SetStateAction<boolean>>;
  setData: Dispatch<SetStateAction<IData | undefined>>;
}

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchContext = createContext<SearchContextType | undefined>(undefined);

const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [page, setPage] = useState<number>(1);
  const [searchString, setSearchString] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [data, setData] = useState<IData>();
  return (
    <SearchContext.Provider
      value={{
        page,
        setPage,
        searchString,
        setSearchString,
        isLoading,
        setIsLoading,
        isError,
        setIsError,
        isSearch,
        setIsSearch,
        data,
        setData,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("Что то не так с контекстом");
  }
  return context;
};

export { SearchProvider, useSearch };
