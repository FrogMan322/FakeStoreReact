import Nav from "../Nav/Nav";
import { Outlet } from "react-router-dom";
import Modal from "../Cart/Modal";
function RootLayout() {
  return (
    <>
      <Nav />
      <Modal />
      <Outlet />
    </>
  );
}

export default RootLayout;
