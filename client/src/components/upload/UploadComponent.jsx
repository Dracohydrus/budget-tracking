import './UploadComponent.css'
import { useEffect, useRef } from "react"

const UploadComponent = ({ transaction = {}, onDelete, onUpdate, categoryList }) => {
  const { key, description, currency, value = 0.0, categories, transactionDate } = transaction

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
    categoriesRef.current.value = categories[0]?.name || '';
  }, [description, currency, value, transactionDate, categories])

  const onChange = () => {
    onUpdate(key, {
      ...transaction,
      description: descriptionRef.current.value,
      currency: currencyRef.current.value,
      value: valueRef.current.value,
      transactionDate: transactionDateRef.current.value,
      categories: [{ name: categoriesRef.current.value }]
    })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
      <input type="text" placeholder="Description" ref={descriptionRef} onChange={onChange} />
      <input type="text" placeholder="Currency" ref={currencyRef} onChange={onChange} />
      <input type="number" step="0.1" placeholder="Value" ref={valueRef} onChange={onChange} onBlur={(e) => valueRef.current.value = parseFloat(valueRef.current.value)?.toFixed(2)} />
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