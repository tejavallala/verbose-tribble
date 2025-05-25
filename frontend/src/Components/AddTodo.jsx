import React, { useState } from "react";
import Axios from "axios";

const TodoAddForm = () => {
  const [TodoName, setTodoName] = useState("");
  const [Description, setDescription] = useState("");
  const [TaskDate, setTaskDate] = useState("");
  const [TaskTime, setTaskTime] = useState("");

  const handleAddTodo = async (event) => {
    event.preventDefault();

    try {
      const combinedDateTime = new Date(`${TaskDate}T${TaskTime}`);
      const response = await Axios.post("https://backend-todolist-ybbr.onrender.com/todoRoute/create-todo", {
        TodoName,
        Description,
        TaskDate: combinedDateTime,
        TaskTime: TaskTime,
      });

      if (response.status === 200) {
        // Include task name in the notification
        scheduleNotification("Task Reminder", { body: `Don't forget to complete your task: ${TodoName}` }, combinedDateTime);

        alert("Todo added successfully!");
        setTodoName("");
        setDescription("");
        setTaskDate("");
        setTaskTime("");
      } else {
        Promise.reject();
      }
    } catch (error) {
      console.error("Error adding todo: ", error);
    }
  };

  const scheduleNotification = (title, options, date) => {
    if (!Notification || Notification.permission !== 'granted') {
      console.error('Notifications not supported or permission not granted.');
      return;
    }

    const now = new Date();
    const timeUntilNotification = date - now;

    if (timeUntilNotification > 0) {
      setTimeout(() => {
        new Notification(title, options);
      }, timeUntilNotification);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={handleAddTodo} className="bg-light p-5 rounded shadow">
        <h2 className="text-center mb-4">Add New Todo</h2>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Todo Name"
            value={TodoName}
            onChange={(e) => setTodoName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            rows="3"
            placeholder="Todo Description"
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <input
            type="date"
            className="form-control"
            value={TaskDate}
            onChange={(e) => setTaskDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="time"
            className="form-control"
            value={TaskTime}
            onChange={(e) => setTaskTime(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default TodoAddForm;
