import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "./logo.png";
import style from "./style.module.css";
import routes from "@/routes/index";
import { useAuth } from "@/context/Auth";

import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from "@mui/material";

const SideBar = () => {
  const location = useLocation();
  const {logout}= useAuth()

  const [isOpen, setIsOpen] = useState(false); // Додано стан для відкриття/закриття сайдбару

  const toggleSidebar = () => setIsOpen(!isOpen); // Функція для переключення стану



  const getLinkClass = (path:string) => {
    return location.pathname === path ? `${style.link} ${style.link_active}` : style.link;
  };


  return (
    <div className={`${style.sidebar} ${isOpen ? style.open : style.closed}`}>
<Button onClick={toggleSidebar} className={style.toggleButton}>
  {isOpen ? <CloseIcon /> : <MenuIcon />}
</Button>
      <div className={style.top}>
        <div className={style.logo}>
          <Link to={routes.index}>
            <img className={style.img} src={logo} alt="Logo" />
          </Link>
        </div>
      </div>
      <hr className={style.hr}></hr>
      <div className={style.main}>
        <Link className={getLinkClass(routes.createOrder)} to={routes.createOrder}>
          <ShoppingCartIcon className={style.icon} />Замовити
        </Link>
        <Link className={getLinkClass(routes.index)} to={routes.index}>
          <HomeIcon className={style.icon} />Головна
        </Link>
        <Link className={getLinkClass(routes.userProfile)} to={routes.userProfile}>
          <AccountCircleIcon className={style.icon} />Профіль
        </Link>
      </div>
      <div className={style.bottom}>
        <Link className={style.bottom_button} to={routes.auth} onClick={logout}>
          <ExitToAppIcon className={style.icon} />Вийти
        </Link>
      </div>
    </div>
  );
};


export default SideBar;
