import styled from 'styled-components';
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config";
import { isValidPassword } from "../../utils/password";
import { Button } from "../../components/basic/Button";
import Input from "../../components/basic/Input";
import registerBackground from '../../assets/images/register-background.jpg'

const Register = () => {
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Username or Email already exists!");

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    if (!usernameRef.current.value || !emailRef.current.value) return;
    if (!passwordCheck()) return;

    axiosInstance
      .post("/auth/register", {
        username: usernameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      .then((res) => window.location.replace("/login"))
      .catch((err) => {
        setErrorMessage("Username or Email already exists!");
        setError(true);
        console.log(err);
      });
  };

  const passwordCheck = () => {
    setError(false);
    const password = passwordRef.current.value;
    const passwordConfirmation = passwordConfirmationRef.current.value;
    if (!password && !passwordConfirmation) return true;
    const { success, error = "" } = isValidPassword(password, passwordConfirmation);
    if (success) return true;
    setErrorMessage("* " + error);
    setError(true);
    return false;
  };

  return (
    <RegisterDiv style={{ backgroundImage: `url(${registerBackground})` }}>
      <Title>Register</Title>
      <StyledForm onSubmit={onFormSubmit}>
        <label>Username</label>
        <StyledInput type="text" placeholder="Username" ref={usernameRef} autoFocus />
        <label>Email</label>
        <StyledInput type="text" placeholder="Email" ref={emailRef} />
        <label>Password</label>
        <StyledInput type="password" placeholder="Password" ref={passwordRef} onChange={passwordCheck} />
        <label>Confirm Password</label>
        <StyledInput type="password" placeholder="Password" ref={passwordConfirmationRef} onChange={passwordCheck} />
        <RegisterButton type="submit">Register</RegisterButton>
      </StyledForm>
      <LoginButton>
        <Link to="/login" className="link">
          Login
        </Link>
      </LoginButton>
      {error && (
        <span style={{ color: "red", marginTop: "10px", fontSize: "14pt" }}>
          {errorMessage}
        </span>
      )}
    </RegisterDiv>
  );
};

const Title = styled.span`
  font-size: 50px;
  font-weight: bold;
  color:rgb(22, 22, 22);
`

const RegisterDiv = styled.div`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(rgb(255, 255, 255), rgb(110, 110, 110));
`

const StyledForm = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const StyledInput = styled(Input)`
  padding: 10px;
  background-color: white;
  border: 1px solid rgb(105, 105, 105);
  border-radius: 5px;
  width: 250px;
`

const LoginButton = styled(Button)`
  position: absolute;
  top: 60px;
  right: 20px;
  background-color: darkgreen;
  color: white;
  padding: 10px;
  width: 100px;
`

const RegisterButton = styled(Button)`
  margin-top: 20px;
  color: white;
  background-color: teal;
  padding: 10px;
`

export default Register;
