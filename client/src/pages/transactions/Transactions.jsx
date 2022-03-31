import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { axiosInstance } from "../../config";
import { Context } from "../../context/user/Context";
import SideBar from "../../components/sidebar/SideBar";
import TransactionsGrid from "./components/TransactionsGrid";

const Transaction = () => {
  const [transactions, setTransactions] = useState([])
  const [fetchedTransactions, setFetchedTransactions] = useState(false)
  const [categories, setCategories] = useState([])
  const [fetchedCategories, setFetchedCategories] = useState(false)
  const { search } = useLocation()
  const { user } = useContext(Context)

  useEffect(() => {
    let isMounted = true
    const fetchTransactions = async () => {
      setFetchedTransactions(false)
      if (!user) {
        setTransactions([]);
        return;
      }
      let newSearch = search ? search + "&" : "?";
      newSearch += "email=" + user.email;
      axiosInstance
        .get("/transaction" + newSearch)
        .then(res => isMounted && setTransactions(res.data))
        .then(() => isMounted && setFetchedTransactions(true))
        .catch((err) => console.log(err));
    };
    fetchTransactions();

    const fetchCategories = async () => {
      setFetchedCategories(false)
      axiosInstance.get('/category')
        .then(res => isMounted && setCategories(res.data))
        .then(() => isMounted && setFetchedCategories(true))
        .catch(err => console.log(err))
    }
    fetchCategories();

    return () => isMounted = false;
  }, [search, user]);

  return (
    <div style={{ display: "flex" }}>
      {fetchedCategories && fetchedTransactions ?
        <TransactionsGrid transactions={[...transactions]} setTransactions={setTransactions} categories={[...categories]} /> :
        <div style={{ flex: '9' }}>
          <h1 style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>Loading...</h1>
        </div>
      }
      <div style={{ flex: '3', height: 'calc(100vh-50px)', margin: '10px' }}>
        <SideBar />
      </div>
    </div>
  )
};

export default Transaction;
