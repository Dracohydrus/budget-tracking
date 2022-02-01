import "./Register.css";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config";

const Register = () => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Username or Email already exists!"
  );

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    if (
      !usernameRef.current.value ||
      !emailRef.current.value ||
      !isValidPassword(passwordRef.current.value)
    ) {
      return;
    }

    axiosInstance
      .post("/auth/register", {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      .then((res) => {
        window.location.replace("/login");
      })
      .catch((err) => {
        setErrorMessage("Username or Email already exists!");
        setError(true);
        console.log(err);
      });
  };

  const isValidPassword = (password) => {
    if (!password) return false;
    if (password.length < 7) {
      setErrorMessage("Please input a password with more than 7 characters");
      setError(true);
      return false;
    }
    return true;
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={onFormSubmit}>
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Username"
          ref={usernameRef}
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Email"
          ref={emailRef}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Password"
          ref={passwordRef}
        />
        <button type="submit" className="registerButton">
          Register
        </button>
      </form>
      <button className="registerLoginButton">
        <Link to="/login" className="link">
          Login
        </Link>
      </button>
      {error && (
        <span style={{ color: "red", marginTop: "10px", fontSize: "14pt" }}>
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default Register;
