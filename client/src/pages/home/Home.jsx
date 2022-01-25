import { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import SideBar from '../../components/sidebar/SideBar';
import Transactions from '../../components/transactions/Transactions';
import { axiosInstance } from '../../config';
import './Home.css'

const Home = () => {
  const [temp, setTemp] = useState([])
  useEffect(() => {
    const fetchTemp = async() => {
        axiosInstance.get('/transaction')
        .then((res) => setTemp(JSON.stringify(res.data)))
        .catch((err) => console.log(err))
    }
    fetchTemp()
  }, [])

  return (
    <>
      <Header />
      <div className="home">
        <p>{temp}</p>
        <Transactions />
        <SideBar />
      </div>
    </>
  )
};

export default Home;
