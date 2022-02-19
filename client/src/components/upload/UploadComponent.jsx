import './UploadComponent.css'
import { useEffect, useRef, useState } from "react"
import { axiosInstance } from '../../config'

const UploadComponent = ({ transaction = {}, onDelete, onUpdate }) => {
  const { key, description, currency, value = 0.0, categories, transactionDate } = transaction

  const [categoryList, setCategoryList] = useState([]);

  const descriptionRef = useRef();
  const currencyRef = useRef();
  const valueRef = useRef();
  const transactionDateRef = useRef();
  const categoriesRef = useRef();

  useEffect(() => {
    descriptionRef.current.value = description
    currencyRef.current.value = currency
    valueRef.current.value = value
    transactionDateRef.current.value = transactionDate
    categoriesRef.current.value = (categories.length >= 1 && categories[0]) || '';
  }, [transaction])

  useEffect(() => {
    axiosInstance.get('/category')
      .then((categories) => setCategoryList(categories.data))
      .catch((err) => console.log(err))
  }, [])

  const onChange = () => {
    console.log(descriptionRef.current.value)
    onUpdate(key, {
      ...transaction,
      description: descriptionRef.current.value,
      currency: currencyRef.current.value,
      value: valueRef.current.value,
      transactionDate: transactionDateRef.current.value,
      categories: [categoriesRef.current.value]
    })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
      <input type="text" placeholder="Description" ref={descriptionRef} onChange={onChange} />
      <input type="text" placeholder="Currency" ref={currencyRef} onChange={onChange} />
      <input type="number" placeholder="Value" ref={valueRef} onChange={onChange} />
      <input type="date" placeholder="Date" ref={transactionDateRef} onChange={onChange} />
      <input list="categoryList" type="text" ref={categoriesRef} onChange={onChange} />
      <datalist id="categoryList">
        {categoryList.map((cat) => <option key={cat?._id} value={cat?.name} />)}
      </datalist>
      <button className='deleteButton' onClick={() => onDelete(key)}><i className="fa-solid fa-multiply"></i></button>
    </div>
  )
}

export default UploadComponent