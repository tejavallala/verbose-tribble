import React, { useState } from "react";
import Axios from "axios";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlinePhone,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom"; // For navigation
import "./App.css";

const NewUserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(""); // For displaying error messages
  const navigate = useNavigate(); // For navigation

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic client-side validation
    if (!name || !email || !password || !phoneNumber) {
      setError("All fields are required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await Axios.post(
        "http://localhost:4000/userRoute/register",
        {
          name,
          email,
          password,
          phoneNumber,
        }
      );

      if (response.status === 201) {
        const { token, user } = response.data;

        // Store the token and user ID in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("userId", user._id);

        alert("Registration successful! Redirecting to the todos page...");

        // Redirect to the todos page or login page
        navigate("/todos"); // Update the path as needed
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.error || "Error occurred while registering."
      );
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#fff0f5",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="col-lg-6">
        <div
          style={{
            padding: "20px",
            backgroundColor: "#F08080",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <div className="container d-flex justify-content-center align-items-center">
            <h2 className="mb-4">Register Here</h2>
            {error && (
              <div
                style={{
                  color: "red",
                  marginBottom: "15px",
                  textAlign: "center",
                }}
              >
                {error}
              </div>
            )}
            <form style={{ width: "100%" }} onSubmit={handleSubmit}>
              <div style={{ marginBottom: "15px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ marginRight: "10px" }}>
                    <AiOutlineUser />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </div>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ marginRight: "10px" }}>
                    <AiOutlineMail />
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ marginRight: "10px" }}>
                    <AiOutlineLock />
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    minLength={6}
                  />
                </div>
              </div>
              <div style={{ marginBottom: "15px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ marginRight: "10px" }}>
                    <AiOutlinePhone />
                  </span>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-success"
                style={{
                  backgroundColor: "#28a745",
                  color: "#fff",
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUserForm;