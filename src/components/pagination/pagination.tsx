import { FC, memo, useEffect, useMemo, useState } from "react";
import styles from "./pagination.module.css";
import { createSiblings, getTotalPage, range } from "../../services/helpers";
import { DEFAULT_COUNT_SIBLINGS } from "../../services/constants";
import { ISiblings, PaginationTypes } from "../../types";

interface PaginationProps {
  totalResults: string;
  activePage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = memo(({ totalResults, activePage, onPageChange }) => {
  const totalPages = getTotalPage(+totalResults);
  const [siblings, setSiblings] = useState<ISiblings[]>([]);

  const handlePageChange = (page: number) => {
    if (activePage === page) {
      return;
    }
    onPageChange(page);
  };

  const newSiblings = useMemo(() => createSiblings(activePage, totalPages), [activePage, totalPages]);

  useEffect(() => {
    if (totalPages <= DEFAULT_COUNT_SIBLINGS) {
      const pages = range(1, totalPages).map((page) => ({ type: PaginationTypes.page, page }));
      setSiblings(pages);
    } else {
      setSiblings(newSiblings);
    }
  }, [totalPages, activePage, newSiblings]);

  return (
    <div className={styles.pagination}>
      <button
        className={`${styles.buttonPrev} ${styles.button}`}
        onClick={() => handlePageChange(activePage - 1)}
        disabled={activePage === 1}
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.69185 10.6011C8.02379 10.9331 8.56198 10.9331 8.89393 10.6011C9.22587 10.2692 9.22587 9.731 8.89393 9.39905L5.99497 6.5001L8.89393 3.60114C9.22587 3.26919 9.22587 2.731 8.89393 2.39902C8.56198 2.06712 8.02379 2.06712 7.69184 2.39902L4.5454 5.5455C4.01819 6.07271 4.01819 6.92748 4.5454 7.45469L7.69185 10.6011Z"
            fill="#929BBC"
          />
        </svg>
      </button>
      {siblings.map(({ page, type }, idx) => (
        <button
          key={idx}
          className={`${styles.button} ${page === activePage ? styles.buttonActive : ""}`}
          onClick={() => handlePageChange(page)}
        >
          {type === PaginationTypes.page ? page : "..."}
        </button>
      ))}
      <button
        className={`${styles.buttonNext} ${styles.button}`}
        onClick={() => handlePageChange(activePage + 1)}
        disabled={activePage === totalPages}
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.60103 10.6011C5.26909 10.9331 4.7309 10.9331 4.39895 10.6011C4.06701 10.2692 4.06701 9.731 4.39895 9.39905L7.29791 6.5001L4.39895 3.60114C4.06701 3.26919 4.06701 2.731 4.39895 2.39902C4.7309 2.06712 5.26909 2.06712 5.60104 2.39902L8.74748 5.5455C9.27469 6.07271 9.27469 6.92748 8.74748 7.45469L5.60103 10.6011Z"
            fill="#929BBC"
          />
        </svg>
      </button>
    </div>
  );
});
