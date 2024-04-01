// reducers.ts
import { Todo } from "../(index)/[id]/page";
import { ADD_TODO, DELETE_TODO, UPDATE_TODO, GET_TODOS } from "./actions";

const initialState: Todo[] = [];

export const todoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];
    case DELETE_TODO:
      const updatedTodos = state.filter(
        (todo: Todo) => String(todo.id) !== String(action.payload)
      );
      return updatedTodos;

    case UPDATE_TODO:
      const updatedArray = state.map((todo) => {
        if (String(todo.id) === String(action.payload.id)) {
          return { ...todo, title: action.payload.title };
        }
        return todo;
      });
      return updatedArray;
    case GET_TODOS:
      const storedTodos = localStorage.getItem("todos");
      return storedTodos ? JSON.parse(storedTodos) : state;
    default:
      return state;
  }
};
