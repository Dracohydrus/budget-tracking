import { useContext, useRef, useState } from "react";
import Link from "../../components/basic/Link";
import { axiosInstance } from "../../config";
import { Context } from "../../context/user/Context";
import { LoginStart, LoginSuccessful, LoginFailure } from "../../context/user/Actions";
import loginBackground from '../../assets/images/login-background.jpg'
import styled from 'styled-components';
import { Button } from '../../components/basic/Button';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(false);
  const { dispatch, isFetching } = useContext(Context);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    dispatch(LoginStart());
    axiosInstance
      .post("/auth/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      .then((res) => dispatch(LoginSuccessful(res.data)))
      .catch((err) => {
        setError(true);
        dispatch(LoginFailure())
      });
  };

  return (
    <LoginDiv style={{ backgroundImage: `url(${loginBackground})` }}>
      <LoginTitle>Login</LoginTitle>
      <ErrorMessage>{error && "Invalid Credentials"}</ErrorMessage>
      <Form onSubmit={onSubmit}>
        <LoginInputDiv>
          <LoginLabel>Email</LoginLabel>
          <Input type="text" placeholder="Email" ref={emailRef} data-cy="email" autoFocus />
        </LoginInputDiv>
        <LoginInputDiv>
          <LoginLabel>Password</LoginLabel>
          <Input type="password" placeholder="Password" ref={passwordRef} data-cy="password" />
        </LoginInputDiv>
        <LoginButton type="submit" disabled={isFetching} data-cy="login-button">Login</LoginButton>
      </Form>
      <RegisterButton>
        <Link to="/register">Register</Link>
      </RegisterButton>
    </LoginDiv>
  );
};

const LoginDiv = styled.div`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const LoginInputDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const LoginTitle = styled.span`
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #252525;
  text-shadow: 0 0 2px white;
`

const ErrorMessage = styled.span`
  color: red;
  font-size: 16pt;
  height: 20px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: lightgrey;
  border-radius: 5px;
  padding: 20px;
`
const LoginButton = styled(Button)`
  margin-top: 20px;
  color: white;
  background-color: darkgreen;
  padding: 10px;

  &:disabled {
    cursor: not-allowed;
  }
`

const RegisterButton = styled(Button)`
  position: absolute;
  top: 60px;
  right: 20px;
  background-color: teal;
  color: white;
  padding: 10px;
  width: 100px;
`

const LoginLabel = styled.label`
  font-size: 14pt;
`

const Input = styled.input`
  padding: 10px;
  background-color: white;
  border: 1px solid rgb(105, 105, 105);
  border-radius: 5px;
  width: 250px;
`

export default Login;
