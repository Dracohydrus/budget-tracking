import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config";
import { Context } from "../../context/Context";
import "./Login.css";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { user, dispatch, isFetching } = useContext(Context);

  const onSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });
    axiosInstance.post('/auth/login',{
      email: emailRef.current.value,
      password: passwordRef.current.value
    })
    .then((res) => {
      dispatch({type: "LOGIN_SUCCESS", payload: res.data})
    })
    .catch((err) => dispatch({type: "LOGIN_FAILURE"}))
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
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
          <Link to="/login" className="link">
            Login
          </Link>
        </button>
        <button className="loginRegisterButton">
          <Link to="/register" className="link">
            Register
          </Link>
        </button>
      </form>
    </div>
  );
};

export default Login;
