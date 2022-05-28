import React from "react";
import styles from "./NotFoundBlock.module.scss";

function NotFoudBlock() {
  return (
    <div>
      <span className={styles.span}>😕</span>
      <h1 className={styles.root}>Ничего не найдено</h1>
      <p className={styles.description}>
        К сожалению такой страницы не существует.
      </p>
    </div>
  );
}

export default NotFoudBlock;
