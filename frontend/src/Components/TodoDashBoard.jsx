import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineUnorderedList, AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import { FaSignOutAlt } from "react-icons/fa";

const TodoDashboard = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/todo-dashboard">
          <AiOutlineCheck className="mr-2" />
          Todo App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/add-todo">
                <AiOutlinePlus className="mr-1" />
                Add Todo
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/todo-list">
                <AiOutlineUnorderedList className="mr-1" />
                Todo List
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/log-out">
                
                <FaSignOutAlt className="me-1" /> Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container mt-3">
        
        <h1 style={{textAlign:'center',marginTop:'40px'}}>Welcome to the Todo Dashboard</h1>
        
      </div>
    </div>
  );
};

export default TodoDashboard;
