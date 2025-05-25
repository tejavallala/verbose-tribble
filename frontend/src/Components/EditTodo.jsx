import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import "./TodoList.css";

function EditTodo() {
  const [arr, setArr] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://backend-todolist-ybbr.onrender.com/todoRoute")
      .then((res) => {
        if (res.status === 200) {
          setArr(res.data);
        } else {
          Promise.reject();
        }
      })
      .catch((err) => alert(err));
  };

  const handleDeleteTodo = (todoId) => {
    axios
      .delete(`https://backend-todolist-ybbr.onrender.com/todoRoute/delete-todo/${todoId}`)
      .then((res) => {
        if (res.status === 200) {
          alert("Todo deleted successfully!");
          fetchData();
        } else {
          Promise.reject();
        }
      })
      .catch((err) => alert(err));
  };

  // Helper function to format date and time
  const formatDateTime = (createdAt) => {
    if (!createdAt) {
      return "Date Not Available";
    }

    const dateObject = new Date(createdAt);

    // Get date in "YYYY-MM-DD" format
    const formattedDate = dateObject.toISOString().split("T")[0];

    // Get time in "HH:mm" format
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const formattedTime = `${hours}:${minutes}`;

    // Combine date and time
    const formattedDateTime = `${formattedDate} ${formattedTime}`;

    return formattedDateTime;
  };

  return (
    <div className="card-container">
      {arr.map((todo, index) => (
        <div
          className={`card ${index % 2 === 0 ? "even" : "odd"}`}
          key={todo._id}
        >
          <h2 className="todo-name">
            {todo.TodoName}
          </h2>
          <p
            className={`description ${
              index % 2 === 0 ? "light-bg" : "dark-bg"
            }`}
          >
            {todo.Description}
          </p>
          <div className="created-at">
            {console.log("Todo object:", todo)}
            Created At: {formatDateTime(todo.CreatedAt)}
          </div>

          <div className="button-container">
            <Link to={`/edit-todo/${todo._id}`} className="edit-button">
              Edit
            </Link>
            <button
              className="delete-button"
              onClick={() => handleDeleteTodo(todo._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EditTodo;
