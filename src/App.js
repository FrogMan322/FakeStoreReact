import HomePage from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  { path: "products/:prodId", element: <ProductDetail /> },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
