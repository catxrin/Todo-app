import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loading from "./components/Loading";
const RegisterPage = lazy(() => import("./pages/Register"));
const LoginPage = lazy(() => import("./pages/Login"));
const HomePage = lazy(() => import("./pages/Home"));

function App() {
  const router = createBrowserRouter([
    {
      path: "/home",
      element: (
        <Suspense fallback={<Loading />}>
          {/* {!sessionStorage.getItem("loggedIn") ? (
            <h1>You need to login first</h1>
          ) : ( */}
          <HomePage />
          {/* )} */}
        </Suspense>
      ),
    },
    {
      path: "/",
      element: (
        <Suspense fallback={<Loading />}>
          <LoginPage />
        </Suspense>
      ),
    },
    {
      path: "/register",
      element: (
        <Suspense fallback={<Loading />}>
          <RegisterPage />
        </Suspense>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
