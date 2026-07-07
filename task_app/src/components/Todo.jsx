// import React from "react"; (we do not need to write this here because we are using react vite.)
import TodoCss from "./todo.module.css";

const Todo = () => {
  return (
    <div className={TodoCss.main}>
      <div>
        <h1>MY TO-DO APP 📋</h1>
        <div className={TodoCss.task}>
          <form action="">
            {/* Task add */}
            <input
              type="text"
              name=""
              id=""
              placeholder="Add Task Here...📋"
              className="form-control"
            />
            {/* Search task */}
            <input
              type="search"
              name=""
              id=""
              placeholder="Search Task Here...🔍"
              className="form-control mt-3"
            />
            <button type="submit" className="form-control mt-3 btn btn-primary">
              Add Task ➕
            </button>
          </form>
          <div className={TodoCss.alltask}>
            <input type="checkbox" name="" id="" className={TodoCss.checkbox} />
            <span>Buy Bike </span>
            <i class="bi bi-trash3-fill text-danger float-end mx-2"></i>
            <i class="bi bi-pencil-square text-success float-end mx-2"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
