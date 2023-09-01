import React, { useEffect, useState } from "react";
import List from "./components/List";
import axios from "axios";
import { baseURL } from "./utils/constrait";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/get`).then((res) => {
      console.log(res.data);
      setTasks(res.data);
    });
  }, [updateUI]);

  const addTask = () => {
    axios.post(`${baseURL}/save`, { task: input }).then((res) => {
      console.log(">>save", res.data.msg);
      setInput("");
      setUpdateUI((prevState) => !prevState);
      res.status === 201 && toast.success(`${res.data.msg}`);
    });
  };

  const updateMode = (id, text) => {
    console.log(text);
    setInput(text);
    setUpdateId(id);
  };

  const updateTask = () => {
    axios.put(`${baseURL}/update/${updateId}`, { task: input }).then((res) => {
      console.log(res);
      setInput("");
      setUpdateId(null);
      setUpdateUI((prevState) => !prevState);
      res.status === 201 && toast.success(`${res.data.msg}`);
    });
  };

  return (
    <main>
      <h1 className="title">CRUD Operations</h1>
      <div className="input_holder"></div>
      <input
        type="text"
        onChange={(event) => setInput(event.target.value)}
        value={input}
      />
      <button type="button" onClick={updateId ? updateTask : addTask}>
        {updateId ? "Update Task" : "Add Task"}
      </button>
      <ul>
        {tasks.map((task, id) => (
          <List
            key={id}
            id={task._id}
            task={task.task}
            setUpdateUI={setUpdateUI}
            updateMode={updateMode}
          />
        ))}
      </ul>
      <ToastContainer />
    </main>
  );
};

export default App;
