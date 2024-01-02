import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./ModalImage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { storeItemsActions } from "../Store/store";
import { motion } from "framer-motion";

function BackDrop(props) {
  const dispatch = useDispatch();
  const isVisible = (value) => {
    dispatch(storeItemsActions.modalVisible(value));
    setTimeout(() => {
      dispatch(storeItemsActions.getImageValue({ id: undefined, data: [] }));
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      onClick={() => {
        isVisible(false);
      }}
      className={classes.container}
    >
      {props.children}
    </motion.div>
  );
}
function ModalImage() {
  const imageValue = useSelector((state) => state.imageValue);
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.4 }}
      className={classes.imageContainer}
    >
      <img
        className={classes["imageContainerData"]}
        src={imageValue}
        alt="product"
      />
    </motion.div>
  );
}
function ImageBackdrop() {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <BackDrop />,
        document.getElementById("modal__backdrop")
      )}
      {ReactDOM.createPortal(
        <ModalImage />,
        document.getElementById("modal__image__container")
      )}
    </Fragment>
  );
}

export default ImageBackdrop;
