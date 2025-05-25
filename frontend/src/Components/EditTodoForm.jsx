import React, { useEffect, useState } from "react";
import axios from "axios";
import DesktopNotification from "./EditNotifcation"; // Import the DesktopNotification component
import "./EditTodoForm.css";

const EditTodoForm = ({ todoId, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    TodoName: "",
    Description: "",
  });

  useEffect(() => {
    axios
      .get(`https://backend-todolist-ybbr.onrender.com/todoRoute/update-todo/${todoId}`)
      .then((res) => {
        if (res.status === 200) {
          setFormData(res.data);
        } else {
          console.error("Failed to fetch todo details.");
        }
      })
      .catch((err) => {
        console.error("Error fetching todo details:", err);
      });
  }, [todoId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    axios
      .put(`https://backend-todolist-ybbr.onrender.com/todoRoute/update-todo/${todoId}`, formData)
      .then((res) => {
        if (res.status === 200) {
          
          DesktopNotification.showNotification("Todo Updated", "Your todo has been updated successfully!");

          alert("Todo updated successfully");
          onUpdate();
          onClose();
        } else {
          console.error("Failed to update todo details.");
        }
      })
      .catch((err) => {
        console.error("Error updating todo details:", err);
      });
  };

  return (
    <div className="edit-form-modal">
      <div className="edit-form-content">
        <h2>Edit Todo</h2>
        <form>
          <label>Todo Name:</label>
          <input
            type="text"
            name="TodoName"
            value={formData.TodoName}
            onChange={handleInputChange}
          />
          <label>Description:</label>
          <input
            type="text"
            name="Description"
            value={formData.Description}
            onChange={handleInputChange}
          />
          <div className="button-container">
            <button type="button" onClick={handleSubmit}>
              Update
            </button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTodoForm;
