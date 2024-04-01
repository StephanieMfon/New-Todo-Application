"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { addTodo, deleteTodo, getTodos, updateTodo } from "@/app/redux/actions";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const SingleTodo = ({
  params,
  addTodo,
  getTodos,
  todos,
  updateTodo,
}: {
  params: { id: number };
  addTodo: (todo: Todo) => void;
  getTodos: () => void;
  todos: Todo[];
  updateTodo: any;
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const dispatch = useDispatch();
  useEffect(() => {
    getTodos();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleUpdateClick = (id: number) => {
    const idAsString = String(params.id);

    const updatedTodo = todos.filter((todo) => String(todo.id) === idAsString);
    console.log(updatedTodo);
    // if (updatedTodo) {
    dispatch(
      updateTodo({
        ...updatedTodo,
        title: inputValue,
      })
    );

    // Update local storage
    localStorage.setItem(
      "todos",
      JSON.stringify(
        todos.map((todo) => {
          if (String(todo.id) === idAsString) {
            console.log("Updating todo with ID:", todo.id);
            return { ...todo, title: inputValue };
          }
          return todo;
        })
      )
    );
    // }
  };

  const handleSaveClick = (event: any) => {
    event.preventDefault();
    console.log(params.id);

    console.log(!isNaN(params.id));
    if (!isNaN(params.id)) {
      handleUpdateClick(params.id);
    } else {
      const newTodo: Todo = {
        id: Date.now(),
        title: inputValue,
        completed: false,
      };

      addTodo(newTodo);
      setInputValue("");

      localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
    }
    console.log(inputValue);
  };

  const handleDeleteClick = (e: any) => {
    e.preventDefault();
    console.log(params.id);
    // Convert params.id to string for comparison
    const idAsString = String(params.id);

    dispatch(deleteTodo(idAsString)); // Find all todos with the specified ID
    const updatedTodos = todos.filter((todo) => String(todo.id) !== idAsString);
    console.log("Updated Todos:", updatedTodos);

    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  return (
    <form className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <h3>Edit Task</h3>
        </div>

        <div className={styles.middle}>
          <p className={styles.task_name}>Task Name</p>
          <input
            className={styles.task}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type todo here"
          />
        </div>
      </div>

      <div className={styles.buttons}>
        <button onClick={(e) => handleDeleteClick(e)} className={styles.delete}>
          Delete
        </button>
        <button onClick={(e) => handleSaveClick(e)} className={styles.save}>
          Save
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = (state: Todo[]) => ({
  todos: state,
});
const mapDispatchToProps = {
  addTodo,
  deleteTodo,
  getTodos,
  updateTodo,
};
export default connect(mapStateToProps, mapDispatchToProps)(SingleTodo);
