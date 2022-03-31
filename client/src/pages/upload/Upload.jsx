import { useContext, useEffect, useState } from "react"
import { Context } from '../../context/user/Context'

import styled from 'styled-components'
import { axiosInstance } from "../../config"
import { Button } from '../../components/basic/Button'
import toast from "../../utils/toast"
import dateFormat from 'dateformat'
import UploadComponent from "./components/Uploader"
import Icon from '../../components/basic/Icon'
import Popup from '../../components/basic/Popup'
import UploadPopup from './components/UploadPopup'

import { csvFileProcess } from './utils/csvHelper'

const Upload = () => {
  const [transactions, setTransactions] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [open, setOpen] = useState(false)
  const [popupData, setPopupData] = useState([])
  const { user } = useContext(Context);

  useEffect(() => {
    axiosInstance.get('/category')
      .then((categories) => setCategoryList(categories.data))
      .catch((err) => console.log(err))
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
        toast.success("Transactions Created")
      })
      .catch((err) => toast.error(err))
  }

  const uploadFile = (e) => {
    var fileToRead = e.target.files[0];
    var fileReader = new FileReader();
    fileReader.onload = (fileLoadedEvent) => {
      processFile(fileLoadedEvent.target.result)
    }
    fileReader.readAsText(fileToRead, "UTF-8")
  }

  const processFile = (string) => {
    let lines = string.split(/\n|\r\n|\r/gi)
    let data = lines.length >= 5 ? lines.splice(0, 5) : lines
    setPopupData(data)
    setOpen(true)
    // let array = lines[0].split(',')
    // console.log(`Columns ${array.length}`)
    // console.log('Preview Data')
    // for (let i = 0; i < 5; i++) {
    //   let newArray = lines[i].split(',')
    //   console.log(newArray)
    // }
    // let newTransactions = csvFileProcess(string, user.currency, getLargest())
    // console.table(newTransactions)
    // setTransactions([...transactions, ...newTransactions])
  }

  return (
    <>
      <UploadPopup open={open} setOpen={setOpen} popupData={popupData} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '5px' }}>
        {transactions.map((transaction) =>
          <UploadComponent key={transaction.key} transaction={transaction} categoryList={categoryList} onDelete={deleteUploadTransaction} onUpdate={updateUploadTransaction} />)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', marginTop: '1rem', gap: '5px' }}>
        <UploadLabel htmlFor='transactionFileUpload' className='uploadButton'>
          <Icon className="fa-solid fa-upload" />
        </UploadLabel>
        <input id='transactionFileUpload' type="file" style={{ display: 'none' }} onChange={uploadFile} />
        <UploadButton id='saveButton' onClick={() => saveTransactions()}>
          <Icon className="fa-solid fa-floppy-disk" />
        </UploadButton>
        <UploadButton id='addButton' onClick={createUploadTransaction} >
          <Icon className="fa-solid fa-plus" />
        </UploadButton>
        <UploadButton onClick={() => setTransactions([])}>Clear</UploadButton>
      </div>
    </>
  )
}

const UploadButton = styled(Button)`
  background-color: rgb(3, 190, 190);
  padding: 10px 20px;
`

const UploadLabel = styled.label`
  background-color: rgb(3, 190, 190);
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`

export default Upload