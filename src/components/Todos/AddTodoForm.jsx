import {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {postTodos} from "../../features/todo/todoSlice";

const AddTodoForm = () => {
  const [value, setValue] = useState("");
  const {loading } = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const ref = useRef()
  const handelsubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    dispatch(postTodos({title: value}));
    setValue("");
    ref.current.focus()

  };

  return (
    <form
      className={`form-inline mt-3 mb-4 ${loading ? "opacity-50" : "opacity-100"}`}
      onSubmit={handelsubmit}
    >
      <label htmlFor="name" className="mb-1">
        Name
      </label>
      <input
        autoComplete="off"
        id="name"
        type="text"
        className="form-control mb-2 mr-sm-2"
        placeholder="Add todo..."
        value={value}
        ref={ref}
        onChange={(event) => setValue(event.target.value)}
      />
      <button disabled={loading} type="submit" className="btn btn-primary mt-1">
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default AddTodoForm;
