import React, { useState } from "react";
import Axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirm password do not match");
      return;
    }

    try {
      // Send request to update password
      const response = await Axios.put(
        "https://backend-todolist-ybbr.onrender.com/userRoute/update-password",
        {
          email,
          newPassword,
          confirmPassword,
        }
      );

      if (response.status === 200) {
        alert("Password updated successfully");
      } else {
        Promise.reject();
      }
    } catch (error) {
      console.error(error);
      alert("Error occurred while updating the password.");
    }
  };

  const handleReset = () => {
    setEmail("");
    setNewPassword("");
    setConfirmPassword("");
    setErrorMessage("");
  };

  return (
    <div className="container-fluid h-100 d-flex align-items-center justify-content-center mt-5">
      <div className="col-lg-6">
        <div className="card shadow-lg p-4" style={{ background: "#f8f9fa" }}>
          <h2 className="text-center mb-4 text-primary">
            Forgot Password
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {errorMessage && (
              <p className="text-danger">{errorMessage}</p>
            )}
            <div className="form-group d-flex justify-content-between">
              <button
                type="submit"
                className="btn btn-primary"
                style={{ background: "#007bff", borderColor: "#007bff" }}
              >
                Update Password
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
