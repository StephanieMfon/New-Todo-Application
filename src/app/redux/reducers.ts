// reducers.ts
import { Todo } from "../(index)/[id]/page";
import { ADD_TODO, DELETE_TODO, UPDATE_TODO, GET_TODOS } from "./actions";

const initialState: Todo[] = [];

export const todoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];
    case DELETE_TODO:
      console.log("helloce");
      const updatedTodos = state.filter(
        (todo: Todo) => String(todo.id) !== String(action.payload)
      );
      console.log(updatedTodos);
      return updatedTodos;

    // case UPDATE_TODO:
    //   return state.map((todo: Todo) =>
    //     todo.id === action.payload.id ? action.payload : todo
    //   );
    case UPDATE_TODO:
      console.log("helloewlkfn");
      console.log(action.payload);
      const updatedArray = state.map((todo) => {
        if (String(todo.id) === String(action.payload.id)) {
          console.log("Updating todo with ID:", todo.id);
          console.log(action.payload.title);
          return { ...todo, title: action.payload.title };
        }
        return todo;
      });
      console.log(updatedArray);
      return updatedArray;
    case GET_TODOS:
      const storedTodos = localStorage.getItem("todos");
      return storedTodos ? JSON.parse(storedTodos) : state;
    default:
      return state;
  }
};
