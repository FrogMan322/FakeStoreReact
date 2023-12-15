import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";
import Details from "./pages/Details";
import Comments from "./pages/Comments";
import SingUp from "./pages/SingIn/SingUp";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "details/:prodId", element: <Details /> },
      { path: "/comments", element: <Comments /> },
      { path: "/signup", element: <SingUp /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
