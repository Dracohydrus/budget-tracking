import './SideBar.css'
import Social from '../social/Social'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../config';

const SideBar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      axiosInstance.get('/category')
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err))
    }
    fetchCategories();
  }, []);
  

  return (
    <div className="sidebar">
        <div className="sidebarItem">
          <span className="sidebarTitle">ABOUT ME</span>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto officia amet soluta asperiores neque ullam aliquid eius dolorum mollitia et alias atque laboriosam ut vel, voluptates, dolorem distinctio sint corrupti?</p>
        </div>
        <div className="sidebarItem">
          <div className="sidebarTitle">CATEGORIES</div>
          <div className="sidebarList">
            {categories.map((c) =>
              <li key={c._id} className="sidebarListItem"><Link className='link' to={`/?cat=${c.name}`}>{c.name}</Link></li>
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
