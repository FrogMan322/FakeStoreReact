import Nav from "../Nav/Nav";
import { Outlet } from "react-bootstrap-icons";
function RootLayout() {
  return (
    <>
      <Nav></Nav>
      <Outlet />
    </>
  );
}

export default RootLayout;
