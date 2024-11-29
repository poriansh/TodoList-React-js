import {createAsyncThunk, createSlice, isRejectedWithValue} from "@reduxjs/toolkit";
import axios from "axios";

const Url = axios.create({
  baseURL: "http://localhost:5000",
});
export const getTodos = createAsyncThunk("todos/getTodos", async (_, {}) => {
  try {
    const {data} = await Url.get("/todos");
    return data;
  } catch (error) {
    return isRejectedWithValue(error.massage);
  }
});
export const postTodos = createAsyncThunk("todos/postTodos", async (payload, {}) => {
  try {
    const {data} = await Url.post("/todos", {
      title: payload.title,
      id: Date.now(),
      completed: false,
    });
    return data;
  } catch (error) {
    return isRejectedWithValue(error.massage);
  }
});
export const deleteTodos = createAsyncThunk("todos/deleteTodos ", async (payload, {}) => {
  try {
    await Url.delete(`/todos/${payload.id}`);
    return {id: payload.id};
  } catch (error) {
    return isRejectedWithValue(error.massage);
  }
});
export const updateTodos = createAsyncThunk("todos/updateTodos ", async (payload, {}) => {
  try {
    const {data} = await Url.patch(`/todos/${payload.id}`);
    return data;
  } catch (error) {
    return isRejectedWithValue(error.massage);
  }
});

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    loading: false,
    error: "",
  },
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        completed: false,
      };
      state.todos.push(newTodo);
    },
    toggleTodo: (state, action) => {
      const selectedTodo = state.todos.find((t) => t.id === action.payload.id);
      selectedTodo.completed = !selectedTodo.completed;
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload.id);
    },
  },
  extraReducers: {
    [getTodos.pending]: (state, action) => {
      state.loading = true;
      state.todos = [];
      state.error = "";
    },
    [getTodos.fulfilled]: (state, action) => {
      state.loading = false;
      state.todos = action.payload;
      state.error = "";
    },
    [getTodos.rejected]: (state, action) => {
      state.loading = false;
      state.todos = [];
      state.error = action.payload;
    },
    [postTodos.pending]: (state, action) => {
      state.loading = true;
    },
    [postTodos.fulfilled]: (state, action) => {
      state.loading = false;
      state.todos.push(action.payload);
    },
    [deleteTodos.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteTodos.fulfilled]: (state, action) => {
      state.loading = false;
      state.todos = state.todos.filter((t) => t.id !== action.payload.id);
    },
    [updateTodos.fulfilled]: (state, action) => {
      const selectedTodo = state.todos.find((t) => t.id === action.payload.id);
      selectedTodo.completed = !selectedTodo.completed;
    },
  },
});

export const {addTodo, removeTodo, toggleTodo} = todosSlice.actions;
export default todosSlice.reducer;
