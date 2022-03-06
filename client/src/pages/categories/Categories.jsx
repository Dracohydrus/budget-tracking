import { useEffect, useState } from "react";
import { axiosInstance } from "../../config";
import Category from "../../components/category/Category"
import AddCategory from "./components/addCategory/AddCategory";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let isMounted = true
    const fetchCategories = async () => {
      axiosInstance
        .get("/category")
        .then((response) => isMounted && setCategories(response.data))
        .catch((err) => console.log("Unable to fetch categories"));
    };
    fetchCategories();
    return () => isMounted = false
  }, [categories]);

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <div style={{ margin: "0 10px" }}>
        <div style={{ marginBottom: "5px" }}><AddCategory /></div>
        {categories.map((category) => <Category key={category._id} category={category} />)}
      </div>
    </div>
  );
};

export default Categories;
