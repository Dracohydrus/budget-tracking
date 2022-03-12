import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { axiosInstance } from "../../config";
import { Context } from "../../context/user/Context";
import SideBar from "../../components/sidebar/SideBar";
import TransactionsGrid from "./components/TransactionsGrid";

const Transaction = () => {
  const [transactions, setTransactions] = useState([])
  const [categories, setCategories] = useState([])
  const { search } = useLocation()
  const { user } = useContext(Context)

  useEffect(() => {
    let isMounted = true
    const fetchTransactions = async () => {
      if (!user) {
        setTransactions([]);
        return;
      }
      let newSearch = search ? search + "&" : "?";
      newSearch += "email=" + user.email;
      axiosInstance
        .get("/transaction" + newSearch)
        .then((res) => isMounted && setTransactions(res.data))
        .catch((err) => console.log(err));
    };
    fetchTransactions();

    const fetchCategories = async () => {
      axiosInstance.get('/category')
        .then(res => isMounted && setCategories(res.data))
        .catch(err => console.log(err))
    }
    fetchCategories();

    return () => isMounted = false;
  }, [search, user]);

  return (
    <div style={{ display: "flex" }}>
      {categories && categories.length > 0 && <TransactionsGrid transactions={transactions} setTransactions={setTransactions} categories={categories} />}
      <div style={{ flex: '3' }}>
        <SideBar />
      </div>
    </div>
  )
};

export default Transaction;
