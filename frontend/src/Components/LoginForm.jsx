import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { BiHome } from "react-icons/bi";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await Axios.post(
        "https://backend-todolist-ybbr.onrender.com/userRoute/login",
        { email, password }
      );

      if (response.status === 200) {
        alert("Login successful")
        navigate("/Dashboard", { state: { userEmail: email } });
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      alert("Error occurred while logging in.");
    }
  };

  return (
    <div>
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "#333",
          display: "flex",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <div
          style={{
            borderRadius: "50%",
            overflow: "hidden",
            width: "40px",
            height: "40px",
            backgroundColor: "#ddd",
            marginRight: "10px",
          }}
        >
          <BiHome size={30} style={{ margin: "5px", color: "#555" }} />
        </div>
        <span style={{ fontSize: "18px", fontWeight: "bold" }}>Home</span>
      </Link>

      <div
        className="container-fluid"
        style={{
          backgroundColor: "#B8BFD8",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="col-lg-6" style={{ backgroundColor: "#FFF0F5" }}>
          <div className="row p-5 bg-white shadow rounded">
            <div className="col-lg-6 text-center mb-4">
              <img
                src="https://t3.ftcdn.net/jpg/02/59/31/70/360_F_259317013_nJJaBgGGzvXMd6cAyLd6yMJtbdnd61wk.jpg"
                alt=""
                height={300}
                width={270}
              />
            </div>
            <div className="col-lg-6 d-flex flex-column justify-content-center">
              <form className="mb-4 text-center" onSubmit={handleLogin}>
                <h2
                  className="mb-4"
                  style={{ fontFamily: "Arial, sans-serif" }}
                >
                  Login
                </h2>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <br></br>
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember Me
                  </label>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Log In
                </button>
                <div className="or_divider position-relative text-center my-3">
                  <span className="bg-white d-inline-block px-3 position-relative"></span>
                </div>

                <div className="mt-3">
                  <p className="mb-2" style={{ color: "grey" }}>
                    New user?{" "}
                    <Link to="/user-registration" className="text-primary">
                      Create an account
                    </Link>
                  </p>
                  <p className="mb-0" style={{ color: "grey" }}>
                    <Link to="/forgot-password" className="text-primary">
                      Forgot Password?
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
