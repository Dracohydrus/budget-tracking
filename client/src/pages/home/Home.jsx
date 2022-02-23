import "./Home.css";
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/SideBar";
import Transactions from "../../components/transactions/Transactions";
import { axiosInstance } from "../../config";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import { useLocation } from "react-router-dom";

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
      <div className="home">
        <div className="content">
          {transactions.length > 0 && <Transactions transactions={transactions} />}
          {transactions.length <= 0 && <p className="emptyMessage">No Transactions Found</p>}
        </div>
        <SideBar />
      </div>
    </>
  );
};

export default Home;
