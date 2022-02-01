import "./Login.css";
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config";
import { Context } from "../../context/Context";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(false);
  const { dispatch, isFetching } = useContext(Context);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    dispatch({ type: "LOGIN_START" });
    axiosInstance
      .post("/auth/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      .then((res) => {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      })
      .catch((err) => {
        setError(true);
        dispatch({ type: "LOGIN_FAILURE" });
      });
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <span
        className="loginError"
        style={{
          color: "red",
          fontSize: "16pt",
          fontWeight: "bold",
          marginTop: "5px",
        }}
      >
        {error && "Invalid Credentials"}
      </span>
      <form onSubmit={onSubmit} className="loginForm">
        <label>Email</label>
        <input
          className="loginInput"
          type="text"
          placeholder="Email"
          ref={emailRef}
        />
        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          placeholder="Password"
          ref={passwordRef}
        />
        <button type="submit" className="loginButton" disabled={isFetching}>
          Login
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link to="/register" className="link">
          Register
        </Link>
      </button>
    </div>
  );
};

export default Login;
