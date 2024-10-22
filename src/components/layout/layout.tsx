import { FC, ReactNode } from "react";
import styles from "./layout.module.css";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return <div className={styles.layout}>{children}</div>;
};
