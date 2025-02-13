import React from "react";
import style from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={style.container}>
      <h1 className={style.errorCode}>404</h1>
      <p className={style.errorMessage}>страница не найдена</p>
    </div>
  );
};

export default NotFoundPage;
