import React, { useState } from "react";
import { Fragment } from "react";
import classes from "./SearchBarFilter.module.css";
import { useDispatch } from "react-redux";
import { storeItemsActions } from "../Store/store";
function SearchBarFilter(props) {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  function onSubmitHandler(e) {
    e.preventDefault();
    dispatch(storeItemsActions.searchValueForm(value));
  }
  function inputValueHandler(e) {
    setValue(e.target.value);
  }
  const formData = (
    <form className={classes["form__style"]} onSubmit={onSubmitHandler}>
      <input
        onChange={inputValueHandler}
        type="search"
        name="search"
        id="search"
      />
      <button type="submit" className={classes["submit__btn"]}>
        Search
      </button>
    </form>
  );

  return <Fragment>{formData}</Fragment>;
}
export default React.memo(SearchBarFilter);
