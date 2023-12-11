import HomePage from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import RootLayout from "./pages/Root";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     children: [
//       { path: "", element: <HomePage /> },
//       { path: "products/:prodId", element: <ProductDetail /> },
//     ],
//   },
// ]);
const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "products/:prodId", element: <ProductDetail /> },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
