import './Header.css'
import { useContext } from 'react';
import { Context } from '../../context/Context';

const Header = () => {
  const {user} = useContext(Context);

  return (
      <div className="header">
          <div className="headerTitles">
            <span className='headerTitleSmall'>{user ? `Hello ${user.username}` : "React & Node"}</span>
            <span className='headerTitleLarge'>Budget App</span>
          </div>
          <img className='headerImage' src="https://wallsdesk.com/wp-content/uploads/2016/12/Rocky-Mountains-High-Definition-Wallpapers.jpg" alt="" />
      </div>
  )
};

export default Header;
