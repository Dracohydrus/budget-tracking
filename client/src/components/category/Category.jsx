import { axiosInstance } from "../../config";
import { toastInstance } from "../../utils/toast";
import Icon from '../basic/Icon';
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
          <Icon className="categoryDeleteIcon fas fa-trash-alt" onClick={() => deleteCategory(id)} />
        </div>
      </div>
    </div>
  );
};

export default Category;
