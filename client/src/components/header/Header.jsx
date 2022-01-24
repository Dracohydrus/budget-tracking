import './Header.css'

const Header = () => {
  return (
      <div className="header">
          <div className="headerTitles">
            <span className='headerTitleSmall'>React & Node</span>
            <span className='headerTitleLarge'>Budget App</span>
          </div>
          <img className='headerImage' src="https://wallsdesk.com/wp-content/uploads/2016/12/Rocky-Mountains-High-Definition-Wallpapers.jpg" alt="" />
      </div>
  )
};

export default Header;
