import Nav from "../Nav/Nav";
import { Outlet } from "react-router-dom";
import Modal from "../Cart/Modal";
import { motion, useScroll } from "framer-motion";
import classes from "./Root.module.css";
function RootLayout() {
  const { scrollYProgress } = useScroll();
  return (
    <>
      <motion.div
        className={classes.line}
        style={{ scaleX: scrollYProgress }}
      />
      <Nav />
      <Modal />
      <Outlet />
    </>
  );
}

export default RootLayout;
