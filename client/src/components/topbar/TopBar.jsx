import "./TopBar.css";
import Social from "../social/Social";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

const TopBar = () => {
  const path = useLocation().pathname;
  const isHailey = path === "/hailey";
  const isHome = path === "/";
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
            <Link className="link" to={isHome && !isHailey ? "/hailey" : "/"}>HOME</Link>
          </li>
          <li className="topListItem"><Link className="link" to="/category">{user && "CATEGORIES"}</Link></li>
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
