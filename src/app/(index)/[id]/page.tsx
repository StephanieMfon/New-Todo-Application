"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { addTodo, deleteTodo, getTodos, updateTodo } from "@/app/redux/actions";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { usePathname } from "next/navigation";

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

  const idAsString = String(params.id);

  const dispatch = useDispatch();
  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    const singleTodo = todos.filter((todo) => String(todo.id) === idAsString);
    setInputValue(singleTodo[0]?.title);
  }, [todos]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleUpdateClick = (id: number) => {
    const singleTodo = todos.filter((todo) => String(todo.id) === idAsString);

    const updatedTodo = {
      id: singleTodo[0].id,
      title: inputValue,
      completed: singleTodo[0].completed,
    };
    updateTodo(updatedTodo);
    // );

    localStorage.setItem(
      "todos",
      JSON.stringify(
        todos.map((todo) => {
          if (String(todo.id) === idAsString) {
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
  };

  const handleDeleteClick = (e: any) => {
    e.preventDefault();
    const idAsString = String(params.id);

    dispatch(deleteTodo(idAsString));
    const updatedTodos = todos.filter((todo) => String(todo.id) !== idAsString);
    setInputValue("");

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
