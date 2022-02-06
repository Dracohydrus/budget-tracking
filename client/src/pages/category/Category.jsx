import { useEffect, useState } from "react";
import { axiosInstance } from "../../config";
import "./Category.css";

const Category = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      axiosInstance.get('/category')
      .then((response) => setCategories(response.data))
      .catch((err) => console.log("Unable to fetch categories"))
    }
    fetchCategories();
  }, []);


  return (
    <div className="category">
      {categories.forEach((cat) => <p>cat</p>)}
    </div>
  )
};

export default Category;
