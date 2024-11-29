import "bootstrap/dist/css/bootstrap.min.css";
import AddTodoForm from "./components/Todos/AddTodoForm";
import TodoList from "./components/Todos/TodoList";
import { Provider, useSelector } from "react-redux";
import store from "./features/store";

function App() {
  const {todos} = useSelector((state) => state.todos)
  console.log(todos)
  return (
    <Provider store={store}>

    <div className="container pt-3">
      <h1 className="text-center">TodoApp with RTK</h1>
      <AddTodoForm />
      <TodoList />
    </div>
    </Provider>
  );
}

export default App;
