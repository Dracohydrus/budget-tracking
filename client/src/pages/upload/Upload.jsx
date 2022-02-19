import './Upload.css'
import { useState } from "react"
import UploadComponent from "../../components/upload/UploadComponent"
import { axiosInstance } from "../../config"
import { toastInstance } from "../../helpers/toast"

const Upload = () => {
  const [transactions, setTransactions] = useState([]);

  const getLargest = () => {
    var highest = 0;
    transactions.forEach((x) => {
      if (highest == null || x.key > highest) return highest = x.key
    })
    return highest;
  }

  const deleteTransaction = (key) => {
    setTransactions(transactions.filter((transaction) => transaction.key !== key))
  }

  const saveTransactions = () => {
    console.log(transactions)
    // axiosInstance.post('/transactions', { data: transactions })
    //   .then((transactions) => {
    //     setTransactions([])
    //     toastInstance.success("Transactions Created")
    //   })
    //   .catch((err) => toastInstance.error(err))
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '5px' }}>
        {transactions.map((transaction) => <UploadComponent key={transaction.key} transaction={transaction} onDelete={deleteTransaction} />)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', marginTop: '1rem', gap: '5px' }}>
        <button className='uploadButton'>
          <i className="fa-solid fa-upload"></i>
        </button>
        <button className='uploadButton' onClick={() => saveTransactions()}>
          <i className="fa-solid fa-floppy-disk"></i>
        </button>
        <button className='uploadButton' onClick={() => {
          setTransactions([...transactions, { key: getLargest() + 1 }])
        }}>
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
  )
}

export default Upload