import "./Register.css";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config";
import { isValidPassword } from "../../utils/password";
import registerBackground from '../../assets/images/register-background.jpg'

const Register = () => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Username or Email already exists!");

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    if (
      !usernameRef.current.value ||
      !emailRef.current.value ||
      !passwordCheck()
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

  const passwordCheck = () => {
    setError(false);
    if (!passwordRef.current.value && !passwordConfirmationRef.current.value)
      return true;
    const { success, error = "" } = isValidPassword(passwordRef.current.value, passwordConfirmationRef.current.value);
    if (success) return true;
    setErrorMessage("* " + error);
    setError(true);
    return false;
  };

  return (
    <div className="register" style={{ backgroundImage: `url(${registerBackground})` }}>
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={onFormSubmit}>
        <label>Username</label>
        <input className="registerInput" type="text" placeholder="Username" ref={usernameRef} autoFocus />
        <label>Email</label>
        <input className="registerInput" type="text" placeholder="Email" ref={emailRef} />
        <label>Password</label>
        <input className="registerInput" type="password" placeholder="Password" ref={passwordRef} onChange={passwordCheck} />
        <label>Confirm Password</label>
        <input className="registerInput" type="password" placeholder="Password" ref={passwordConfirmationRef} onChange={passwordCheck} />
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
