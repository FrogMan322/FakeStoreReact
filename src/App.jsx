import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";
import Details, { getProduct } from "./pages/Details";
import Comments from "./pages/Comments";
import SingUp from "./pages/SingIn/SingUp";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "details/:prodId", element: <Details />, loader: getProduct },
      { path: "comments", element: <Comments /> },
      { path: "signup", element: <SingUp /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
