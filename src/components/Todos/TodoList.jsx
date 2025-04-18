import {useDispatch, useSelector} from "react-redux";
import TodoItem from "./TodoItem";
import { useEffect } from "react";
import { getTodos } from "../../features/todo/todoSlice";

const TodoList = () => {
  const {todos,loading,error} = useSelector((state) => state.todos);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTodos())
  },[])
  return (
    <div>
      <h2>TodoList</h2>
      {loading ? (
        <p>loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className="list-group">
          {todos.map((todo) => (
            <TodoItem key={todo.id} {...todo} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
