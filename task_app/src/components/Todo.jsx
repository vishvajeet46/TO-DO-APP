// import React from "react"; (we do not need to write this here because we are using react vite.)
import { use, useState } from "react";
import TodoCss from "./todo.module.css";
import toast from "react-hot-toast";

const Todo = () => {
  const taskData = [
    { task: "Buy Bike", complete: true },
    { task: "Buy Iphone", complete: false },
    { task: "Buy Car", complete: true },
  ];

  const [allData, setAllData] = useState(taskData);
  const [toDoTask, setToDoTask] = useState(""); // This useState is to get the input task passed by the user.

  function handleForm(e) {
    e.preventDefault();
    const myTask = toDoTask.trim(); // removed spaces
    if (!myTask) {
      toast.error("Please Add Task...✋"); // explore toast
    } else {
      // some((value,index)=>{}) method is used to compare the values in the array. (Checks if at least one element satisfies the condition. Returns true or false.)
      const isVerified = allData.some((value) => {
        return value.task.toLowerCase() === toDoTask.toLowerCase();
      });

      if (isVerified) {
        toast.error("Task Already Exist...😒");
        setToDoTask("")
      } else {
        setAllData([...allData, { task: toDoTask, complete: false }]); // yaha spread operator isliye lagaya hai kiyuki bina iske naya task add toh ho jayega par purane wale sare delete ho jayenge.
        toast.success("Task Added...😃");
        setToDoTask(""); // this will blank the input:text field after task is added.
      }
    }
  }

  return (
    <div className={TodoCss.main}>
      <div>
        <h1>MY TO-DO APP 📋</h1>
        <div className={TodoCss.task}>
          <form action="" onSubmit={handleForm}>
            {/* Task add */}
            <input
              type="text"
              name=""
              id=""
              placeholder="Add Task Here...📋"
              className="form-control"
              value={toDoTask}
              onChange={(e) => {
                setToDoTask(e.target.value);
              }}
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
          {
            // map ka syntax in react :- variable_name.map(()=>())
            allData.map((items, index) => (
              <div className={TodoCss.alltask} key={index}>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={items.complete}
                  className={TodoCss.checkbox}
                />
                <span>{items.task}</span>
                <i class="bi bi-trash3-fill text-danger float-end mx-2"></i>
                <i class="bi bi-pencil-square text-success float-end mx-2"></i>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Todo;
