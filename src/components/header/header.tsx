import { ChangeEvent, FC, FormEvent, useCallback, useState } from "react";
import styles from "./header.module.css";

interface HeaderProps {
  onSubmit: (string: string) => void;
}

export const Header: FC<HeaderProps> = ({ onSubmit }) => {
  const [searchString, setSearchString] = useState("");

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setSearchString(value);
  }, []);

  const handlerOnSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(searchString);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logoWrapper}>
          <img src="./assets/logo.png" />
        </div>
        <div className={styles.signIn}>
          <img src="./assets/svg/user.svg" alt="user icon" />
          <p className={`txt-14-normal ${styles.signInName}`}>Your Name</p>
        </div>
      </div>

      <div className={styles.inputWrapper}>
        <form id="searchForm" onSubmit={handlerOnSubmitForm}>
          <input
            onChange={onChange}
            className={`txt-14-normal ${styles.input}`}
            type="text"
            placeholder="Search"
            id="search"
            value={searchString}
          ></input>
          <button className={styles.button} type="submit">
            <img src="./assets/svg/search.svg" alt="search icon" />
          </button>
        </form>
      </div>
    </header>
  );
};
