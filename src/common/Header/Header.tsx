import React from "react";
import { useLocation } from "react-router-dom";
import style from "./style.module.css";

const Header = () => {
  const location = useLocation();

  const getPageTitle = (path:string) => {
    switch (path) {
      case "/create-order":
        return "Замовити";
      case "/":
        return "Головна";
      case "/profile":
        return "Профіль";
      default:
        const orderMatch = path.match(/^\/order\/(\d+)$/);
        if (orderMatch) {
          const orderId = orderMatch[1];
          return `Замовлення № ${orderId}`;
        }
        return "Сторінка";
    }
  };

  const pageTitle = getPageTitle(location.pathname);

  return (
    <div className={style.header}>
      <div className={style.header_title}>
        {pageTitle}
      </div>
      <div className={style.header_right}>
      </div>
    </div>
  );
};

export default Header;
