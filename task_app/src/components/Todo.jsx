// import React from "react"; (we do not need to write this here because we are using react vite.)
import { use, useEffect, useState } from "react";
import TodoCss from "./todo.module.css";
import toast from "react-hot-toast";

// Local storage is the storage that browser provides us. It is around 5MB.
// localStorage.setItem("key",value) :- It is used to store data in browsers storage.
// value can be any data. for example:- array, object, etc.
// localStorage.getItem("key") :- it is used to get data from the local storage.

const Todo = () => {
  // jab hum data store karwate hai toh JSON.stringify() karke karwate hai aur jab hum data read karte hai toh JSON.parse() karke karwate hai.
  // const taskData = [
  //   { task: "Buy Bike", complete: true },
  //   { task: "Buy Iphone", complete: false },
  //   { task: "Buy Car", complete: true },
  // ];

  const taskData = JSON.parse(localStorage.getItem("todo_task")) || [];

  const [allData, setAllData] = useState(taskData);
  const [toDoTask, setToDoTask] = useState(""); // This useState is to get the input task passed by the user.
  const [search, setSearch] = useState("");
  const [CTask, setCtask] = useState(0);
  const [RTask, setRtask] = useState(0);

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
        setToDoTask("");
      } else {
        setAllData([...allData, { task: toDoTask, complete: false }]); // yaha spread operator isliye lagaya hai kiyuki bina iske naya task add toh ho jayega par purane wale sare delete ho jayenge.
        toast.success("Task Added...😃");
        setToDoTask(""); // this will blank the input:text field after task is added.
      }
    }
  }

  function handleDelete(id) {
    const copyOfAllData = [...allData];
    const filteredValue = copyOfAllData.filter((value, index) => {
      return index !== id;
    });
    if (filteredValue) {
      const taskDelete = window.confirm(
        "Are you sure? You want to delete this task....🤔 ",
      );
      if (taskDelete) {
        setAllData(filteredValue);
      } else {
        setAllData(copyOfAllData);
      }
    }
  }

  function handleCheckbox(id) {
    const copyOfAllData = [...allData];
    copyOfAllData[id].complete = !copyOfAllData[id].complete;
    setAllData(copyOfAllData);

    // const completedTask = copyOfAllData.filter((value,index)=>{
    //   return value.complete
    // })

    // const remainingTask = copyOfAllData.filter((value,index)=>{
    //   return !value.complete
    // })
    // setCtask(completedTask.length)
    // setRtask(remainingTask.length)
  }

  function handleUpdate(id) {
    const copyOfAllData = [...allData];
    const oldTask = copyOfAllData[id].task;
    const newTask = prompt(`Update Task :- ${oldTask}`, oldTask); // comma ke baad oldTask likhne se ye prompt wale box me bhi likha hua aayega.
    const newTaskObj = { task: newTask, complete: false };
    copyOfAllData.splice(id, 1, newTaskObj); // revise this
    setAllData(copyOfAllData);
  }

  const filterTask = allData.filter((items) => {
    return items.task.toLowerCase().includes(search.toLowerCase());
  });

  useEffect(() => {
    const copyOfAllData = [...allData];

    const completedTask = copyOfAllData.filter((value) => {
      return value.complete;
    });
    setCtask(completedTask.length);

    const remainingTask = copyOfAllData.filter((value) => {
      return !value.complete;
    });
    setRtask(remainingTask.length);

    // data ko hum directly store nhi karwate hai. hum data ko stringify karke store karwate hai.
    localStorage.setItem("todo_task", JSON.stringify(copyOfAllData));
  }, [allData]);

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
            <button type="submit" className="form-control mt-3 btn btn-primary">
              Add Task ➕
            </button>
            {/* Search task */}
            <input
              type="search"
              name=""
              id=""
              placeholder="Search Task Here...🔍"
              className="form-control mt-3 mb-2"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </form>
          {
            // map ka syntax in react :- variable_name.map(()=>())
            // allData par map na chala ke hum filterTask par map chalayenge kiyu ki ye initial pura data show karega jab tak search box me kuch search nhi kiya jayega par search karne par ke sirf searched value hi show karega
            // allData.map((items, index) => (
            filterTask.length === 0 ? (
              <h5
                className="text-center"
                style={{ color: "rgba(255,0,0,0.6)" }}
              >
                No Matching result...🔍
              </h5>
            ) : (
              filterTask.map((items, index) => (
                <div className={TodoCss.alltask} key={index}>
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    checked={items.complete}
                    className={TodoCss.checkbox}
                    onClick={() => {
                      handleCheckbox(index);
                    }}
                  />
                  <span
                    style={{
                      textDecoration: items.complete
                        ? "line-through red 3px wavy"
                        : "",
                    }}
                  >
                    {items.task}
                  </span>
                  <i
                    className={`bi bi-trash3-fill text-danger float-end mx-2 ${TodoCss.icons}`}
                    title={"Delete"}
                    onClick={() => {
                      handleDelete(index);
                    }}
                  ></i>
                  {/* The title attribute is an HTML global attribute used to provide additional information about an element.When a user hovers their mouse over the button, most browsers display a tooltip: */}
                  <i
                    className={`bi bi-pencil-square text-success float-end mx-2 ${TodoCss.icons}`}
                    title={"Update"}
                    onClick={() => {
                      handleUpdate(index);
                    }}
                  ></i>
                </div>
              ))
            )
          }
        </div>
        <span className="fw-bold mt-2 d-block text-center">
          Completed Task :- {CTask}
        </span>
        <span className="fw-bold mt-2 d-block text-center">
          Remaining Task :- {RTask}
        </span>
      </div>
    </div>
  );
};

export default Todo;
