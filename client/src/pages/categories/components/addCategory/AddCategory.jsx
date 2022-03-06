import { useRef } from "react";
import { axiosInstance } from "../../../../config";
import toast from "../../../../utils/toast";
import Icon from '../../../../components/basic/Icon';
import styled from 'styled-components';

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
        toast.success("Category Created");
        addCategoryRef.current.value = "";
      })
      .catch((err) => toast.error(err));
  };

  return (
    <Form onSubmit={createCategory}>
      <DivLeft>
        <Input type="text" placeholder="Enter New Category Name" ref={addCategoryRef} autoFocus />
      </DivLeft>
      <DivRight>
        <AddIcon className="fas fa-plus" onClick={createCategory} />
      </DivRight>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  border: 1px solid black;
  border-radius: 5px;
  width: 100%;
`

const DivLeft = styled.div`
  display: flex;
  flex: 11;
  justify-content: center;
  align-items: center;
`

const DivRight = styled.div`
  display: flex;
  flex: 1;
`

const Input = styled.input`
  width: 100%;
  height: 45px;
  display: flex;
  font-size: 12pt;
  outline: none;
  border: none;
  text-align: center;
`

const AddIcon = styled(Icon)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(48, 214, 104);
  height: 50px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: rgb(7, 187, 67);
  }
`

export default AddCategory;
