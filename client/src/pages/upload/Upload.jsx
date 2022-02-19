import './Upload.css'
import { useContext, useEffect, useState } from "react"
import { Context } from '../../context/Context'
import { axiosInstance } from "../../config"
import { toastInstance } from "../../helpers/toast"
import dateFormat from 'dateformat'
import UploadComponent from "../../components/upload/UploadComponent"

const Upload = () => {
  const [transactions, setTransactions] = useState([]);
  const {user} = useContext(Context)
  
  useEffect(() => {
    let storage = JSON.parse(localStorage.getItem('uploadTransactions'))
    if(!storage) return
    setTransactions(storage)
  }, [])

  useEffect(() => {
    let storage = JSON.stringify(transactions)
    if(!storage) return
    localStorage.setItem('uploadTransactions', storage)
  }, [transactions])

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

  const updateTransaction = (key, newTransaction) => {
    setTransactions(transactions.map((transaction) => {
      if(transaction.key === key) return {...transaction, ...newTransaction}
      return transaction
    }))
  }

  const createTransaction = () => {
    let newTransaction = { 
      key: getLargest() + 1,
      description: '',
      currency: user.currency || 'CAD',
      value: 0,
      categories: [],
      transactionDate: dateFormat(new Date(), 'yyyy-mm-dd') 
    }
    setTransactions([...transactions, newTransaction])
  } 

  const saveTransactions = async () => {
    axiosInstance.post('/transactions', { data: transactions })
      .then((transactions) => {
        setTransactions([])
        toastInstance.success("Transactions Created")
      })
      .catch((err) => toastInstance.error(err))
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '5px' }}>
        {transactions.map((transaction) => <UploadComponent key={transaction.key} transaction={transaction} onDelete={deleteTransaction} onUpdate={updateTransaction} />)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', marginTop: '1rem', gap: '5px' }}>
        <button className='uploadButton'>
          <i className="fa-solid fa-upload"></i>
        </button>
        <button className='uploadButton' onClick={() => saveTransactions()}>
          <i className="fa-solid fa-floppy-disk"></i>
        </button>
        <button className='uploadButton' onClick={createTransaction} >
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
  )
}

export default Upload