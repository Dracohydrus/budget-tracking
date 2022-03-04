import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { axiosInstance } from "../../config";
import { Context } from "../../context/user/Context";
import { toastInstance } from "../../utils/toast";
import SideBar from "../../components/sidebar/SideBar";
import Grid from "../../components/basic/Grid";

const Transaction = () => {
  const [transactions, setTransactions] = useState([])
  const { search } = useLocation()
  const { user } = useContext(Context)
  const [columnDefs] = useState([
    {
      field: "email",
      hide: true
    },
    {
      field: "description",
    },
    {
      field: "value",
      cellStyle: params => (params.data.value > 0) ? { 'color': 'green' } : { 'color': 'red' },
      valueFormatter: params => params.data.value < 0 ? `$${Math.abs(Number(params.data.value)).toFixed(2)}` : params.data.value
    },
    {
      field: "currency",
    },
    {
      field: "transactionDate",
      valueFormatter: params => new Date(params.data.transactionDate).toDateString()
    },
    {
      field: "categories",
      valueGetter: params => params.data?.categories.map(x => x.name).join(', ')
    },
    {
      field: "delete",
      cellClass: "fa fa-trash",
      headerClass: "fa fa-trash",
      cellStyle: { cursor: "pointer" },
      width: 50,
      headerName: ''
    }
  ])

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

  const onDelete = async (id) => {
    if (!id) return;
    axiosInstance.delete(`/transaction/${id}`)
      .then(res => {
        setTransactions(transactions.filter((transaction) => transaction._id !== id))
        toastInstance.success('Transaction Deleted');
      })
      .catch(err => toastInstance.error('Unable to delete Transaction'))
  }

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: "9", height: 'calc(100vh - 50px)' }}>
        <Grid columnDefs={columnDefs} rowData={transactions} onCellClicked={e => {
          if (e?.column?.colId === 'delete') {
            onDelete(e?.data?._id)
          }
        }} />
      </div>
      <div style={{ flex: '3' }}>
        <SideBar />
      </div>
    </div>
  )
};

export default Transaction;
