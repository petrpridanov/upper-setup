import styles from "./header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <img src="./assets/logo.png" />
      </div>
      <div className={styles.inputWrapper}>
        <input className={styles.input} type="text" placeholder="Search" id="search"></input>
      </div>
    </header>
  );
};
