import { useRef } from "react";
import { axiosInstance } from "../../../../config";
import { toastInstance } from "../../../../utils/toast";
import "./AddCategory.css";

const AddCategory = () => {
  const addCategoryRef = useRef();

  const createCategory = async (e) => {
    e.preventDefault();
    if (!addCategoryRef.current.value) return;
    axiosInstance
      .post("/category", {
        name: addCategoryRef.current.value,
      })
      .then((res) => {
        toastInstance.success("Category Created");
        addCategoryRef.current.value = "";
      })
      .catch((err) => toastInstance.error(err));
  };

  return (
    <form className="addCategory" onSubmit={createCategory}>
      <div className="addCategoryLeft">
        <input
          className="addCategoryTextField"
          type="text"
          placeholder="Enter New Category Name"
          ref={addCategoryRef}
          autoFocus
        ></input>
      </div>
      <div className="addCategoryRight">
        <i className="addCategoryIcon fas fa-plus" onClick={createCategory}></i>
      </div>
    </form>
  );
};

export default AddCategory;
