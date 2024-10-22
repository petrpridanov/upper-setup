import { FC } from "react";
import styles from "./item.module.css";
import { TSearchItem } from "../../../types";

export const Item: FC<TSearchItem> = ({ Poster, Title, Type, Year, imdbID }) => {
  const isHavePoster = Poster !== "N/A";
  return (
    <article className={styles.card}>
      <div className={styles.cardPosterWrapper}>
        <img
          className={`${styles.cardPoster} ${isHavePoster ? "" : styles.cardCoverPoster}`}
          src={isHavePoster ? Poster : "./assets/placeholder.png"}
          alt="poster"
        />
      </div>
      <div className={styles.cardInfo}>
        <p className={`${styles.cardTitle} txt-16-normal`} title={Title}>
          Name: {Title}
        </p>
        <p className="txt-16-normal">Year: {Year}</p>
        <p className="txt-16-normal">imdbID: {imdbID}</p>
        <p className="txt-16-normal">Type: {Type}</p>
      </div>
    </article>
  );
};
