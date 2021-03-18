import React, { useState } from "react";
import { List, ListItem, ListItemText, Modal, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import db from "./firebase";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Todo = (props) => {
  const classes = useStyles();

  const [open, setopen] = useState(false);
  const [input, setInput] = useState("");

  const updateTodo = () => {
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setopen(false);
  };
  return (
    <>
      <Modal open={open} onClose={(e) => setopen(false)} className="modal">
        <div className={classes.paper}>
          <h1>Edit Todo</h1>
          <input
            type="text"
            placeholder={props.todo.todo}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={updateTodo} color="primary" variant="contained">
            Update
          </Button>
        </div>
      </Modal>
      <List className="todo_list">
        <div className="container">
          <ListItem>
            <ListItemText primary={props.todo.todo} className="text" />
          </ListItem>

          <Button
            color="primary"
            variant="contained"
            onClick={(e) => setopen(true)}
          >
            Edit
          </Button>

          <img
            src="https://img.icons8.com/nolan/64/delete-forever.png"
            alt="delete"
            onClick={() => db.collection("todos").doc(props.todo.id).delete()}
            className="del"
          />
        </div>
      </List>
    </>
  );
};

export default Todo;
