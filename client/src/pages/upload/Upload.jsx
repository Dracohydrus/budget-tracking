import './Upload.css'
import { useContext, useEffect, useState } from "react"
import { Context } from '../../context/Context'
import { axiosInstance } from "../../config"
import { toastInstance } from "../../helpers/toast"
import dateFormat from 'dateformat'
import UploadComponent from "../../components/upload/UploadComponent"

const Upload = () => {
  const [transactions, setTransactions] = useState([]);
  const { user } = useContext(Context)

  useEffect(() => {
    let storage = JSON.parse(localStorage.getItem('uploadTransactions'))
    if (!storage) return
    setTransactions(storage)
  }, [])

  useEffect(() => {
    let storage = JSON.stringify(transactions)
    if (!storage) return
    localStorage.setItem('uploadTransactions', storage)
  }, [transactions])

  const getLargest = () => {
    var highest = 0;
    transactions.forEach((x) => {
      if (highest == null || x.key > highest) return highest = x.key
    })
    return highest;
  }

  const deleteUploadTransaction = (key) => {
    setTransactions(transactions.filter((transaction) => transaction.key !== key))
  }

  const updateUploadTransaction = (key, newTransaction) => {
    setTransactions(transactions.map((transaction) => {
      if (transaction.key === key) return { ...transaction, ...newTransaction }
      return transaction
    }))
  }

  const createUploadTransaction = () => {
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
    let newTransactions = transactions.map((trans) => {
      const { key, transactionDate, ...rest } = trans
      return { email: user.email, transactionDate: new Date(transactionDate), ...rest };
    })
    axiosInstance.post('/transaction', { data: newTransactions })
      .then((transactions) => {
        setTransactions([])
        toastInstance.success("Transactions Created")
      })
      .catch((err) => toastInstance.error(err))
  }

  const uploadFile = (e) => {
    console.log(e.target.files)
    var fileToRead = e.target.files[0];
    var fileReader = new FileReader();
    fileReader.onload = (fileLoadedEvent) => {
      // console.log(fileLoadedEvent.target.result)
      processFile(fileLoadedEvent.target.result)
    }
    fileReader.readAsText(fileToRead, "UTF-8")
  }

  const processFile = (string) => {
    let array = string.split(/\n|\r\n|\r/gi)
    for(var i in array) {
      let content = array[i].split(',')
      const [date, description, credit, debit, balance] = content;
      if(Number(credit) > 0) console.log(`${date} - ${description} - ${credit}`)
    } 
    // console.log(array)
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '5px' }}>
        {transactions.map((transaction) => <UploadComponent key={transaction.key} transaction={transaction} onDelete={deleteUploadTransaction} onUpdate={updateUploadTransaction} />)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', marginTop: '1rem', gap: '5px' }}>
        <label htmlFor='transactionFileUpload' className='uploadButton'>
          <i className="fa-solid fa-upload"></i>
        </label>
        <input id='transactionFileUpload' type="file" style={{display: 'none'}} onChange={uploadFile} />
        <button className='uploadButton' onClick={() => saveTransactions()}>
          <i className="fa-solid fa-floppy-disk"></i>
        </button>
        <button className='uploadButton' onClick={createUploadTransaction} >
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
  )
}

export default Upload