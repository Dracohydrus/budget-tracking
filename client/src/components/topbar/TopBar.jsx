import './TopBar.css'
import Social from '../social/Social';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const TopBar = () => {
  const [isHailey, setIsHailey] = useState(false)
  const user = false;

  const switchIsHailey = () => {
    setIsHailey(!isHailey)
  }

  return <div className='top'>
      <div className="topLeft">
        <Social />
      </div>
      <div className="topCenter">
          <ul className="topList">
              <li className="topListItem" onClick={switchIsHailey}><Link className='link' to={isHailey ? '/' : '/hailey'}>HOME</Link></li>
              <li className="topListItem"><Link className='link' to='/login'>{!user && 'LOGIN'}</Link></li>
          </ul>
      </div>
      <div className="topRight">
        {
          user ? (
            <>
              <img className='profileImage' src="https://github.com/Dracohydrus.png" alt=""/>
              <i class="searchIcon fas fa-search"></i>
            </>
          ) : (
            <ul className='topList'>
              <li className="topListItem"><Link className='link' to='/login'>LOGIN</Link></li>
              <li className="topListItem"><Link className='link' to='/register'>REGISTER</Link></li>
            </ul>
          )
        }
      </div>
  </div>
};

export default TopBar;
