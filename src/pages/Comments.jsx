import classes from "./Comments.module.css";
//Importovano dummy data
import { COMMENTS } from "../dummydata/dummy";
function Comments() {
  return (
    <div className={classes.container}>
      <div className={classes["comment__container"]}>
        <button>Add a Comment</button>
        {COMMENTS.map((el) => {
          //eslint-disable-next-line
          const { comment, name } = el;
          return (
            <div className={classes["comments"]}>
              <p className={classes["name__container__comments"]}>{name}</p>
              <p className={classes["text__container"]}>{comment}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Comments;
