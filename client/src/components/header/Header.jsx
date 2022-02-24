import './Header.css'
import { useContext } from 'react';
import { Context } from '../../context/Context';
import bannerImage from '../../assets/images/money-growth.jpg';

const Header = () => {
  const {user} = useContext(Context);

  return (
      <div className="header">
          <div className="headerTitles">
            <span className='headerTitleSmall'>{user ? `Hello ${user.username}` : "React & Node"}</span>
            <span className='headerTitleLarge'>Budget App</span>
          </div>
          <img className='headerImage' src={bannerImage} alt="" />
          {/* <img className='headerImage' src="https://pixabay.com/get/g7574debd4a7b44f1e10e0b06bd9583c131233286d4fc89ae03009367fd5e08f49df6d78b2e92d4a911c5eaf3d1d16839a588d25ede7c13695548715e0273a32376baca2e8ddb7c74c6911f5b2f76195b_1920.jpg" alt="" /> */}
      </div>
  )
};

export default Header;
