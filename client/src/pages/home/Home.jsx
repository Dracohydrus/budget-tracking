import { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import SideBar from '../../components/sidebar/SideBar';
import Transactions from '../../components/transactions/Transactions';
import { axiosInstance } from '../../config';
import './Home.css'

const Home = () => {
  const [transactions, setTransactions] = useState([])
  useEffect(() => {
    const getTransactions = async() => {
        axiosInstance.get('/transaction')
        .then((res) => setTransactions(res.data))
        .catch((err) => console.log(err))
    }
    getTransactions()
  }, [])

  return (
    <>
      <Header />
      <div className="home">
        <Transactions transactions={transactions} />
        <SideBar />
      </div>
    </>
  )
};

export default Home;
