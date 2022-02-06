import './Home.css'
import Header from '../../components/header/Header';
import SideBar from '../../components/sidebar/SideBar';
import Transactions from '../../components/transactions/Transactions';
import { axiosInstance } from '../../config';
import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';

const Home = () => {
  const [transactions, setTransactions] = useState([])
  const { search } = useLocation();

  useEffect(() => {
    const fetchTransactions = async() => {
        axiosInstance.get('/transaction' + search)
        .then((res) => setTransactions(res.data))
        .catch((err) => console.log(err))
    }
    fetchTransactions()
  }, [search])

  return (
    <>
      <Header />
      <div className="home">
        <div className="content">
          {transactions.length > 0 ? <Transactions transactions={transactions} /> : <p className='emptyMessage'>No Transactions Found</p>}
        </div>
        <SideBar />
      </div>
    </>
  )
};

export default Home;
