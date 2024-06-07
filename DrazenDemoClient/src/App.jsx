import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/CommonPages/HomePage";
import RootLayout from "./components/RootLayout";
import ErrorPage from "./pages/CommonPages/ErrorPage";

import CountryPage from "./pages/Country/CountryPage";
import CityPage from "./pages/City/CityPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/countries",
        element: <CountryPage />,
      },
      {
        path: "/cities",
        element: <CityPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
