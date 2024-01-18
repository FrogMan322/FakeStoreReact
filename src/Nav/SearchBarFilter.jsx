import React, { useState } from "react";
import { Fragment } from "react";
import classes from "./SearchBarFilter.module.css";
import { useDispatch } from "react-redux";
import { storeItemsActions } from "../Store/store";
import { motion } from "framer-motion";
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
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 110, delay: 0.7, duration: 1 }}
    >
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
    </motion.div>
  );

  return <Fragment>{formData}</Fragment>;
}
export default React.memo(SearchBarFilter);
