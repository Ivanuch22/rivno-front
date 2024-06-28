// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../../common/Header/Header"
import style from './style.module.css'
import SideBar from "../../common/SideBar/SideBar"

const Layout: React.FC = () => {
  return (
    <div className={style.mainBlock}>
      <div  className={style.mainBlockFlex}>
        <SideBar />
        <div className={style.main}>
          <Header />
          <Outlet />
        </div>
      </div>
    </div>


  );
};

export default Layout;
