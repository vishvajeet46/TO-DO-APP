import { use, useEffect, useRef, useState } from "react";
import TodoCss from "./todo.module.css";
import toast from "react-hot-toast";

const Todo = () => {

  const taskData = JSON.parse(localStorage.getItem("todo_task")) || [];

  const [allData, setAllData] = useState(taskData);
  const [toDoTask, setToDoTask] = useState(""); 
  const [search, setSearch] = useState("");
  const [CTask, setCtask] = useState(0);
  const [RTask, setRtask] = useState(0);
  const BgColor = useRef()


  function handleForm(e) {
    e.preventDefault();
    const myTask = toDoTask.trim();
    if (!myTask) {
      toast.error("Please Add Task...✋");
    } else {
      const isVerified = allData.some((value) => {
        return value.task.toLowerCase() === toDoTask.toLowerCase();
      });

      if (isVerified) {
        toast.error("Task Already Exist...😒");
        setToDoTask("");
      } else {
        setAllData([...allData, { task: toDoTask, complete: false }]);
        toast.success("Task Added...😃");
        setToDoTask("");
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
  }

  function handleUpdate(id) {
    const copyOfAllData = [...allData];
    const oldTask = copyOfAllData[id].task;
    const newTask = prompt(`Update Task :- ${oldTask}`, oldTask);

    if (newTask === null) {
      toast("Update Cancelled...❌");
      return;
    }

    let trimmedTask = newTask.trim();

    if (trimmedTask.toLowerCase() === oldTask.toLowerCase()) {
      toast("No Changes Detected...😑");
    }
    const newTaskObj = { task: trimmedTask, complete: false };
    copyOfAllData.splice(id, 1, newTaskObj);
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

    localStorage.setItem("todo_task", JSON.stringify(copyOfAllData));
  }, [allData]);

  function handleDarkMode(){
    const bodyBg = BgColor.current.style.backgroundColor
    
    if(bodyBg==="" || bodyBg==="white"){
      BgColor.current.style.backgroundColor = "black"
      BgColor.current.style.color = "white"
    }else{
      BgColor.current.style.backgroundColor = "white"
      BgColor.current.style.color = "black"
    }
  }

  return (
    <div className={TodoCss.main} ref={BgColor}>
      <div>
        <h1 className="fw-bolder">MY TO-DO APP 📋</h1>
        <div className="d-flex justify-content-center mt-1 mb-2">
          <i className={`bi bi-lightbulb fs-2 ${TodoCss.darkicon}`} onClick={handleDarkMode}><span className="fs-4 fw-bold"> Change Mode </span></i>
        </div>
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
