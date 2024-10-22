import { FC, memo } from "react";
import styles from "./info.module.css";

interface InfoProps {
  searchString: string;
  totalResults: string;
}

export const Info: FC<InfoProps> = memo(({ searchString, totalResults }) => {
  if (!searchString) {
    return null;
  }
  return (
    <div className={styles.resultInfo}>
      <p className="txt-22-normal">
        You searched for: <u>{searchString}</u>
      </p>
      {totalResults && <p className={`${styles.resultCount} txt-14-normal`}>{totalResults} results</p>}
    </div>
  );
});
