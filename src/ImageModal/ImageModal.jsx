import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./ModalImage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { storeItemsActions } from "../Store/store";
function BackDrop(props) {
  const dispatch = useDispatch();
  const isVisible = (value) => {
    dispatch(storeItemsActions.modalVisible(value));
    dispatch(storeItemsActions.getImageValue(""));
  };
  return (
    <div
      onClick={() => {
        isVisible(false);
      }}
      className={classes.container}
    >
      {props.children}
    </div>
  );
}
function ModalImage() {
  const imageValue = useSelector((state) => state.imageValue);
  return (
    <div className={classes.imageContainer}>
      <img className={classes["imageContainerData"]} src={imageValue} alt="" />
    </div>
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
