import Nav from "../Nav/Nav";
import classes from "./ErrorPage.module.css";
import { useRouteError } from "react-router-dom";
function ErrorPage() {
  const error = useRouteError();
  let message = "ERROR PAGE NOT FOUND!!!";

  if (error.status === 500) {
    message = error.data.message;
  }
  return (
    <>
      <Nav />
      <div className={classes.container}>
        <h1>{message}</h1>
      </div>
    </>
  );
}

export default ErrorPage;
