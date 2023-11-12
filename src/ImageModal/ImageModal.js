import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./ModalImage.module.css";
function BackDrop(props) {
  return (
    <div
      onClick={() => {
        props.setImageValue("");
        props.showImage(false);
      }}
      className={classes.container}
    >
      {props.children}
    </div>
  );
}
function ModalImage(props) {
  return (
    <div className={classes.imageContainer}>
      <img
        className={classes["imageContainerData"]}
        src={props.imageValue}
        alt=""
      />
    </div>
  );
}
function ImageBackdrop(props) {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <BackDrop
          showImage={props.showImage}
          setImageValue={props.setImageValue}
        />,
        document.getElementById("modal__backdrop")
      )}
      {ReactDOM.createPortal(
        <ModalImage imageValue={props.imageValue} />,
        document.getElementById("modal__image__container")
      )}
    </Fragment>
  );
}

export default ImageBackdrop;
