import './SideBar.css'
import Social from '../social/Social'

const SideBar = () => {
  return (
    <div className="sidebar">
        <div className="sidebarItem">
          <div className="sidebarTitle">CATEGORIES</div>
          <div className="sidebarList">
            <li className="sidebarListItem">Mortage</li>
            <li className="sidebarListItem">Groceries</li>
            <li className="sidebarListItem">Bills</li>
            <li className="sidebarListItem">Gas</li>
            <li className="sidebarListItem">Subscriptions</li>
          </div>
        </div>
        <div className="sidebarItem">
          <div className="sidebarTitle">FOLLOW US</div>
          <div className="sidebarSocial">
            <Social />
          </div>
        </div>
    </div>
  )
};

export default SideBar;
