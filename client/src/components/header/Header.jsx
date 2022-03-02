import './Header.css'
import { useContext } from 'react';
import { Context } from '../../context/user/Context';
import bannerImage from '../../assets/images/money-growth.jpg';

const Header = () => {
  const { user } = useContext(Context);
  return (
    <div className="header">
      <div className="headerTitles">
        <span className='headerTitleSmall'>{user ? `Hello ${user.username}` : "React & Node"}</span>
        <span className='headerTitleLarge'>Budget App</span>
      </div>
      <img className='headerImage' src={bannerImage} alt="" />
    </div>
  )
};

export default Header;
