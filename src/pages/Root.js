import Nav from "../Nav/Nav";
import { Outlet } from "react-router-dom";
function RootLayout() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

export default RootLayout;
