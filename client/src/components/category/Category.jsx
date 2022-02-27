import { axiosInstance } from "../../config";
import { toastInstance } from "../../utils/toast";
import "./Category.css";

const Category = ({ category }) => {
  const { _id: id, name } = category;

  const deleteCategory = async (id) => {
    axiosInstance
      .delete("/category/" + id)
      .then((res) => {
        toastInstance.success("Category Deleted")
      })
      .catch((err) => toastInstance.error("Category Not Deleted"));
  };

  return (
    <div className="category">
      <div className="categoryWrapper">
        <div className="categoryLeft">
          <div className="categoryItem">{name}</div>
        </div>
        <div className="categoryRight">
          <i
            className="categoryDeleteIcon fas fa-trash-alt"
            onClick={() => deleteCategory(id)}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Category;
