import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const Url = axios.create({
  baseURL: "https://67880174c4a42c9161090827.mockapi.io/api",
});

// Async Thunks
export const getTodos = createAsyncThunk("todos/getTodos", async (payload, {rejectWithValue}) => {
  try {
    const {data} = await Url.get("/todos");
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const postTodos = createAsyncThunk("todos/postTodos", async (payload, {rejectWithValue}) => {
  try {
    const {data} = await Url.post("/todos", {
      title: payload.title,
      id: Date.now(),
      completed: false,
    });
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteTodos = createAsyncThunk(
  "todos/deleteTodos",
  async (payload, {rejectWithValue}) => {
    try {
      const { data } = await Url.delete(`/todos/${payload.id}`);
      console.log(data)
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTodos = createAsyncThunk(
  "todos/updateTodos",
  async (payload, {rejectWithValue}) => {
    try {
      const {data} = await Url.put(`/todos/${payload.id}`, {
        completed: payload.completed,
      });
      return {id: payload.id, completed: data.completed};
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    loading: false,
    error: "",
  },
  // reducers: {
  //   addTodo: (state, action) => {
  //     const newTodo = {
  //       id: Date.now(),
  //       title: action.payload.title,
  //       completed: false,
  //     };
  //     state.todos.push(newTodo);
  //   },
  //   toggleTodo: (state, action) => {
  //     const selectedTodo = state.todos.find((t) => t.id === action.payload.id);
  //     if (selectedTodo) {
  //       selectedTodo.completed = !selectedTodo.completed;
  //     }
  //   },
  //   removeTodo: (state, action) => {
  //     state.todos = state.todos.filter((t) => t.id !== action.payload.id);
  //   },
  // },
  extraReducers: {
    // getTodos
    [getTodos.pending]: (state) => {
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

    // postTodos
    [postTodos.pending]: (state) => {
      state.loading = true;
    },
    [postTodos.fulfilled]: (state, action) => {
      state.loading = false;
      state.todos.push(action.payload);
    },
    [postTodos.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // deleteTodos
    [deleteTodos.pending]: (state) => {
      state.loading = true;
    },
    [deleteTodos.fulfilled]: (state, action) => {
      state.loading = false;
      state.todos = state.todos.filter((t) => t.id !== action.payload.id);
    },
    [deleteTodos.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // updateTodos
    [updateTodos.pending]: (state) => {
      state.loading = true;
    },
    [updateTodos.fulfilled]: (state, action) => {
      state.loading = false;
      const selectedTodo = state.todos.find((t) => t.id === action.payload.id);
      if (selectedTodo) {
        selectedTodo.completed = action.payload.completed;
      }
    },
    [updateTodos.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});



// Export Reducer
export default todosSlice.reducer;
