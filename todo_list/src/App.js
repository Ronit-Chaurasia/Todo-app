import React, { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import "./App.css";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="App">
      <h1>What's the Plan for Today? 🚀 </h1>

      <form>
        <FormControl>
          <div>
            <InputLabel className="label">✅ Write a Todo</InputLabel>
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="input"
            />
            <Button
              className="btn"
              disabled={!input}
              type="submit"
              onClick={addTodo}
              variant="contained"
              color="primary"
            >
              Add Todo
            </Button>
          </div>
        </FormControl>
      </form>

      <ul>
        {todos.map((todo) => {
          return <Todo todo={todo} />;
        })}
      </ul>
    </div>
  );
}

export default App;
