import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,


} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


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
import { OrderPage } from "./pages/OrderPage";
import authAPI from "./http";

const queryClient = new QueryClient()
const ReactQueryDevtoolsProduction = React.lazy(() =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then(
    (d) => ({
      default: d.ReactQueryDevtools,
    }),
  ),
)

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PrivateRoutes />}>
        <Route element={<Layout />} path={routes.index}>

          <Route element={<MainPage />} path={routes.index}/>
          <Route element={<OrderPage /> }path="/order/:orderId"  />
          <Route element={<UserProfile />} path={routes.userProfile} />
          <Route element={<CreateOrder />} path={routes.createOrder} />
        </Route>
      </Route>
      <Route element={<Auth />} path={routes.auth} />
      <Route element={<ResetPassword />} path={routes.resetPassword} />
    </>
  )
);

function App() {
  const [showDevtools, setShowDevtools] = React.useState(false)

  React.useEffect(() => {
    // @ts-expect-error
    window.toggleDevtools = () => setShowDevtools((old) => !old)
  }, [])
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen />
        {false && (
          <React.Suspense fallback={null}>
            <ReactQueryDevtoolsProduction />
          </React.Suspense>
        )}

      </QueryClientProvider>
    </>
  );
}

export default App;
