import styles from "./content.module.css";
import { Item } from "./item/item";
import { FC, memo } from "react";
import { IData } from "../../types";

interface ContentProps {
  data: IData;
}

export const Content: FC<ContentProps> = memo(({ data }) => (
  <div className={styles.content}>
    {data.Search.map((item) => (
      <Item {...item} />
    ))}
  </div>
));
