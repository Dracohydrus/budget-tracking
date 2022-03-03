import Category from "../../components/category/Category"
import { useEffect, useState } from "react";
import { axiosInstance } from "../../config";
import AddCategory from "./components/addCategory/AddCategory";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      axiosInstance
        .get("/category")
        .then((response) => setCategories(response.data))
        .catch((err) => console.log("Unable to fetch categories"));
    };
    fetchCategories();
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
