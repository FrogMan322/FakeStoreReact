import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";

import RootLayout from "./pages/Root";
import Details, { getProduct } from "./pages/Details";
import Checkout from "./pages/Checkout";
import SingUp from "./pages/SingIn/SingUp";
import ErrorPage from "./pages/ErrorPage";
import CheckOutForm from "./pages/CheckOutForm";
import Complete from "./pages/Complete";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "details/:prodId", element: <Details />, loader: getProduct },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "order-data",
        element: <CheckOutForm />,
      },
      { path: "signup", element: <SingUp /> },
      { path: "complete", element: <Complete /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
