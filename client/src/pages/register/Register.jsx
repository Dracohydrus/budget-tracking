import { Link } from 'react-router-dom';
import './Register.css'

const Register = () => {
  return (
      <div className="register">
          <span className="registerTitle">Register</span>
          <form className="registerForm">
              <label>Username</label>
              <input className="registerInput" type="text" placeholder='Username' />
              <label>Email</label>
              <input className="registerInput" type="text" placeholder='Email' />
              <label>Password</label>
              <input className="registerInput" type="password" placeholder='Password' />
              <button className="registerButton"><Link to='/register' className='link'>Register</Link></button>
              <button className="registerLoginButton"><Link to='/login' className='link'>Login</Link></button>
          </form>
      </div>
  )
};

export default Register;
