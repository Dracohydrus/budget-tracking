import { axiosInstance } from "../../config";
import toast from "../../utils/toast";
import Icon from '../basic/Icon';
import styled from 'styled-components';

const Category = ({ category }) => {
  const { _id: id, name } = category;

  const deleteCategory = async (id) => {
    axiosInstance
      .delete("/category/" + id)
      .then((res) => toast.success("Category Deleted"))
      .catch((err) => toast.error("Category Not Deleted"));
  };

  return (
    <CategoryDiv>
      <CategoryWrapperDiv>
        <CategoryLeftDiv>
          {name}
        </CategoryLeftDiv>
        <CategoryRightDiv>
          <DeleteIcon className="fas fa-trash-alt" onClick={() => deleteCategory(id)} />
        </CategoryRightDiv>
      </CategoryWrapperDiv>
    </CategoryDiv>
  );
};

const CategoryDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const CategoryWrapperDiv = styled.div`
  display: flex;
  border: 1px solid black;
  border-radius: 5px;
  margin: 5px 0;
  width: 100%;
`

const CategoryLeftDiv = styled.div`
  flex: 11;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CategoryRightDiv = styled.div`
  flex: 1;
  display: flex;
`

const DeleteIcon = styled(Icon)`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
  height: 100%;
  color: black;
  background-color: rgba(255, 0, 0, 0.596);
  height: 50px;
  width: 100%;
  margin: 0;
  padding: 0;

  &:hover {
    background-color: red;
  }
`
export default Category;
