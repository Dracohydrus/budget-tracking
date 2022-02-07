import "./TopBar.css";
import Social from "../social/Social";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

const TopBar = () => {
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="top">
      <div className="topLeft">
        <Social />
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">HOME</Link>
          </li>
          <li className="topListItem"><Link className="link" to="/categories">{user && "CATEGORIES"}</Link></li>
          <li className="topListItem"><Link className="link" to="/transactions">TRANSACTIONS</Link></li>
          {user?.username === "Hailstorm" && <li className="topListItem"><Link className="link" to="/hailey">HAILEY</Link></li>}
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <>
            <Link to="/settings" className="link">
              <img
                className="profileImage"
                src={user.profilePic || ""}
                alt=""
              />
            </Link>
            <i className="searchIcon fas fa-search"></i>
            <li className="topListItem" style={{ listStyle: "none", marginLeft: "10px" }} onClick={handleLogout}>
              {user && "LOGOUT"}
            </li>
          </>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
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
