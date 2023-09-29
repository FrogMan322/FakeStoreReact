import React, { useState } from "react";
import { Fragment } from "react";
import classes from "./SearchBarFilter.module.css";

function SearchBarFilter(props) {
  const [value, setValue] = useState("");
  function onSubmitHandler(e) {
    e.preventDefault();
    props.onSubmit(value);
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
export default SearchBarFilter;
