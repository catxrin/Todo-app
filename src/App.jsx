import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loading from "./components/Loading";
import PageNotFound from "./components/PageNotFound";
import ErrorPage from "./components/ErrorPage";
import PrivateRoute from "./components/PrivateRoute";
const RegisterPage = lazy(() => import("./pages/Register"));
const LoginPage = lazy(() => import("./pages/Login"));
const HomePage = lazy(() => import("./pages/Home"));

function App() {
  const router = createBrowserRouter([
    {
      path: "/home",
      element: (
        <Suspense fallback={<Loading />}>
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
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
    {
      path: "*",
      element: (
        <Suspense fallback={<Loading />}>
          <PageNotFound />
        </Suspense>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
