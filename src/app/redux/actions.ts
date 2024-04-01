import { Todo } from "../(index)/[id]/page";

// actions.ts
export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const GET_TODOS = "GET_TODOS";

export const addTodo = (todo: Todo) => ({
  type: ADD_TODO,
  payload: todo,
});

export const deleteTodo = (id: number | string) => ({
  type: DELETE_TODO,
  payload: id,
});

export const updateTodo = (todo: Todo) => ({
  type: UPDATE_TODO,
  payload: todo,
});

export const getTodos = () => ({
  type: GET_TODOS,
});
