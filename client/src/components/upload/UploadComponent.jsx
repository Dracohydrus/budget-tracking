import './UploadComponent.css'
import { useRef } from "react"

const UploadComponent = ({ transaction = {}, onDelete }) => {
  const { key, description, currency, value, categories, transactionDate } = transaction
  const descriptionRef = useRef();
  const currencyRef = useRef();
  const valueRef = useRef();
  const calendarRef = useRef();
  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
      <input type="text" placeholder="Description" ref={descriptionRef} />
      <input type="text" placeholder="Currency" ref={currencyRef} />
      <input type="number" placeholder="Value" ref={valueRef} />
      <input type="date" placeholder="Date" ref={calendarRef} />
      <button className='deleteButton' onClick={() => onDelete(key)}><i className="fa-solid fa-multiply"></i></button>
    </div>
  )
}

export default UploadComponent