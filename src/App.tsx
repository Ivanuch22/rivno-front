import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";


import routes from "./routes";

import {
  MainPage,

} from "./pages";

import { PrivateRoutes } from "./guard";
import { Layout } from "./components";
import Auth from "./components/Auth/Auth";
import { ResetPassword } from "./components/Auth/ResetPassword";


import "./App.module.css";
import UserProfile from "./pages/UserProfile/UserProfile";
import { CreateOrder } from "./pages/CreateOrder";



const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PrivateRoutes />}>
       <Route element={<Layout />} path={routes.index}>

          <Route element={<MainPage />} path={routes.index} />
          <Route element={<UserProfile  />} path={routes.userProfile} />
          <Route element={<CreateOrder />} path={routes.createOrder} />
          </Route>
      </Route>
      <Route element={<Auth />} path={routes.auth} />
      <Route element={<ResetPassword />} path={routes.resetPassword} />
    </>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
