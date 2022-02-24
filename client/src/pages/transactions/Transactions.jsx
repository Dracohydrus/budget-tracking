import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { axiosInstance } from "../../config";
import { Context } from "../../context/Context";
import Transactions from "../../components/transactions/Transactions";
import SideBar from "../../components/sidebar/SideBar";

const Transaction = () => {
  const [transactions, setTransactions] = useState([])
  const { search } = useLocation()
  const { user } = useContext(Context)

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
    <div style={{ display: "flex" }}>
      <div style={{ flex: "9" }}>
        <Transactions transactions={transactions} />
      </div>
      <div style={{ flex: '3' }}>
        <SideBar />
      </div>
    </div>
  )
};

export default Transaction;
