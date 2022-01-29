import "./Register.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    axiosInstance
      .post("/auth/register", {
        username,
        email,
        password,
      })
      .then((res) => {
        window.location.replace("/login");
      })
      .catch((err) => setError(true));
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={onSubmit}>
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="registerButton">
          <Link to="/register" className="link">
            Register
          </Link>
        </button>
        <button className="registerLoginButton">
          <Link to="/login" className="link">
            Login
          </Link>
        </button>
        {error && <span style={{color:'red', marginTop:'10px', fontSize: '14pt'}}>Username or Email already exists!</span> }
      </form>
    </div>
  );
};

export default Register;
