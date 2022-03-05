import "./TopBar.css";
import { useContext } from "react";
import { Context } from "../../context/user/Context";
import { Logout } from "../../context/user/Actions";
import Link from "../../components/basic/Link";

const TopBar = () => {
  const { user, dispatch } = useContext(Context);

  return (
    <div className="top">
      <div className="topLeft">
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link to="/">HOME</Link>
          </li>
          <li className="topListItem"><Link to="/categories">CATEGORIES</Link></li>
          <li className="topListItem"><Link to="/transactions">TRANSACTIONS</Link></li>
          <li className="topListItem"><Link to="/upload">UPLOAD</Link></li>
          {user?.username === "Hailstorm" && <li className="topListItem"><Link to="/hailey">HAILEY</Link></li>}
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <>
            <Link to="/settings">
              <img className="profileImage" src={user.profilePic || ""} alt=""
              />
            </Link>
            <i className="searchIcon fas fa-search"></i>
            <li data-cy="logout-button" className="topListItem" style={{ listStyle: "none", marginLeft: "10px" }} onClick={() => dispatch(Logout())}>
              {user && "LOGOUT"}
            </li>
          </>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default TopBar;
