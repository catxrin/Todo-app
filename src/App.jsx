import { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Loading from "./components/Loading";
import ErrorPage from "./components/ErrorPage";

const RegisterPage = lazy(() => import("./pages/Register"));
const LoginPage = lazy(() => import("./pages/Login"));
const HomePage = lazy(() => import("./pages/Home"));

function App() {
  function RestrictAccess() {
    const user = localStorage.getItem("loggedIn");
    return user ? <HomePage /> : <Navigate to="/" replace />;
  }

  const router = createBrowserRouter([
    {
      path: "/home",
      element: (
        <Suspense fallback={<Loading />}>
          <RestrictAccess />
        </Suspense>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/",
      element: (
        <Suspense fallback={<Loading />}>
          <LoginPage />
        </Suspense>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/register",
      element: (
        <Suspense fallback={<Loading />}>
          <RegisterPage />
        </Suspense>
      ),
      errorElement: <ErrorPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
