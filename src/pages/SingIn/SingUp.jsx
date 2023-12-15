import classes from "./SingUp.module.css";
function SingUp() {
  return (
    <div className={classes.container}>
      <form className={classes["form__container"]}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
        <label htmlFor="password">Confirme Password</label>
        <input type="password" id="password" />
        <button type="button">SingUp</button>
      </form>
    </div>
  );
}

export default SingUp;
