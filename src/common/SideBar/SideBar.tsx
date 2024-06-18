import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "./logo.png";
import style from "./style.module.css";
import routes from "@/routes/index";
import { useAuth } from "@/context/Auth";

const SideBar = () => {
  const location = useLocation();
  const {logout}= useAuth()

  const getLinkClass = (path:string) => {
    return location.pathname === path ? `${style.link} ${style.link_active}` : style.link;
  };


  return (
    <div className={style.sidebar}>
      <div className={style.top}>
        <div className={style.logo}>
          <Link to={routes.index}>
            <img className={style.img} src={logo} alt="" />
          </Link>
        </div>
      </div>
      <hr className={style.hr}></hr>
      <div className={style.main}>
        <Link className={getLinkClass(routes.createOrder)} to={routes.createOrder}>Замовити</Link>
        <Link className={getLinkClass(routes.index)} to={routes.index}>Головна</Link>
        <Link className={getLinkClass(routes.userProfile)} to={routes.userProfile}>Профіль</Link>
      </div>
      <div className={style.bottom}>
        <Link  className={style.bottom_button} to={routes.auth} onClick={() => logout()}>
          Вийти
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
