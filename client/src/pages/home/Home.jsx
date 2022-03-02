import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import Transactions from "../../components/transactions/Transactions";
import { axiosInstance } from "../../config";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/user/Context";
import { useLocation } from "react-router-dom";
import styled from 'styled-components';

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const { user } = useContext(Context);
  const { search } = useLocation();

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user) {
        setTransactions([]);
        return;
      }
      let newSearch = search ? search + "&" : "?";
      newSearch += "email=" + user.email;
      axiosInstance
        .get("/transaction" + newSearch)
        .then((res) => setTransactions(res.data))
        .catch((err) => console.log(err));
    };
    fetchTransactions();
  }, [search, user]);

  return (
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '9' }}>
          {transactions.length > 0 && <Transactions transactions={transactions} />}
          {transactions.length <= 0 && <EmptyMessage>No Transactions Found</EmptyMessage>}
        </div>
        <SideBar />
      </div>
    </>
  );
};

const EmptyMessage = styled.p`
    text-align: center;
    margin-top: 20px;
    font-size: 16pt;
    font-family: "Lora", sans-serif;
    color: rgba(49, 49, 49, 0.87);
`

export default Home;
