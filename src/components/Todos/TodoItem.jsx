import {useDispatch, useSelector} from "react-redux";
import {deleteTodos, updateTodos} from "../../features/todo/todoSlice";

const TodoItem = ({id, title, completed}) => {
  const dispatch = useDispatch();
  const {loading} = useSelector((state) => state.todos);
  return (
    <li className={`list-group-item ${completed && "list-group-item-success"}`}>
      <div className="d-flex justify-content-between">
        <span className="d-flex align-items-center gap-1">
          <input
            onChange={() => dispatch(updateTodos({id,completed : !completed}))}
            type="checkbox"
            className="mr-3"
            checked={completed}
          ></input>
          <span>{title}</span>
        </span>
        <button onClick={() => dispatch(deleteTodos({id}))} className="btn btn-danger">
          {loading ? "loading..." : "Delete"}
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
