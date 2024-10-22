import { ISiblings, PaginationTypes } from "../types";
import { API_URL, DEFAULT_COUNT_SIBLINGS, RESULTS_PER_PAGE } from "./constants";

export const sendData = async (searchString: string, page: number = 1) => {
  return await fetch(`${API_URL}&s=${searchString}&page=${page}`);
};

export const getTotalPage = (countOfResults: number) => Math.ceil(countOfResults / RESULTS_PER_PAGE);

export const range = (start: number, end: number) => Array.from({ length: end - start + 1 }, (_, idx) => start + idx);

export const createSiblings = (active: number, total: number): ISiblings[] => {
  const isShowLeftDots = active > 3;
  const isShowRightDots = active < total - 2;

  const paginations = [];
  if (isShowLeftDots) {
    paginations.push({ type: PaginationTypes.page, page: 1 });
    paginations.push({ type: PaginationTypes.dots, page: Math.max(1, active - 2) });
  }

  if (active === 3) {
    paginations.push({ type: PaginationTypes.page, page: 1 });
  }

  if (active > 1 && active !== total) {
    const pages = range(active - 1, active + 1).map((page) => ({ type: PaginationTypes.page, page }));
    paginations.push(...pages);
  } else if (active <= 1) {
    const pages = range(active, active + 2).map((page) => ({ type: PaginationTypes.page, page }));
    paginations.push(...pages);
  } else if (active > 1 && active === total) {
    const pages = range(active - 2, active).map((page) => ({ type: PaginationTypes.page, page }));
    paginations.push(...pages);
  }

  if (isShowRightDots) {
    paginations.push({ type: PaginationTypes.dots, page: Math.min(total, active + 2) });
  }

  if (active < total - 1) {
    paginations.push({ type: PaginationTypes.page, page: total });
  }

  return paginations;
};

console.log(createSiblings(2, 12));
