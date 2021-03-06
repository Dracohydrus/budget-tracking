import './SideBar.css'
import Social from '../social/Social'
import Link from '../../components/basic/Link';
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../config';

const SideBar = () => {
  const [categories, setCategories] = useState([]);
  const { pathname } = useLocation()

  useEffect(() => {
    let isMounted = true
    const fetchCategories = async () => {
      axiosInstance.get('/category')
        .then((res) => isMounted && setCategories(res.data))
        .catch((err) => console.log(err))
    }
    fetchCategories();
    return () => isMounted = false
  }, []);


  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <div className="sidebarTitle">CATEGORIES</div>
        <div className="sidebarList">
          {categories.map((c) =>
            <li key={c._id} className="sidebarListItem"><Link to={`${pathname}?cat=${c.name}`}>{c.name}</Link></li>
          )}
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
