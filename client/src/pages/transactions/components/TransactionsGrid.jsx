import { useEffect, useMemo, useState } from 'react'
import { axiosInstance } from '../../../config';
import Grid from '../../../components/basic/Grid/Grid';
import toast from '../../../utils/toast';

const TransactionsGrid = ({ transactions, setTransactions }) => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchCategories = async () => {
            axiosInstance.get('/category')
                .then(res => setCategories(res.data))
                .catch(err => console.log(err))
        }
        fetchCategories();
    }, [])

    const columnDefs = useMemo(() => ([
        {
            field: "email",
            hide: true
        },
        {
            field: "description",
            editable: true,
            filter: 'agTextColumnFilter'
        },
        {
            field: "value",
            editable: true,
            filter: 'agNumberColumnFilter',
            cellStyle: params => (params.data.value > 0) ? { 'color': 'green' } : { 'color': 'red' },
            valueFormatter: params => `$${Math.abs(params.data.value).toLocaleString('en-US', { minimumFractionDigits: 2 })}`
        },
        {
            field: "currency",
            editable: true,
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: ['CAD', 'USD']
            }
        },
        {
            field: "transactionDate",
            cellEditor: 'agDateInput',
            sort: 'desc',
            sortingOrder: ['desc', 'asc'],
            valueGetter: params => new Date(params.data.transactionDate),
            valueFormatter: params => new Date(params.data.transactionDate).toDateString(),
        },
        {
            field: "categories",
            editable: true,
            valueGetter: params => params?.data?.categories?.map(cat => cat.name).join(', ') || params.data.categories,
            valueSetter: params => {
                let newCategory = categories.find(category => category.name === params.newValue) || null
                params.data.categories = [newCategory]
                params.newValue = [newCategory]
                return true
            },
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: ['', ...categories.map(x => x.name)],
            }
        },
        {
            field: "delete",
            cellClass: "fa fa-trash",
            headerClass: "fa fa-trash",
            cellStyle: { cursor: "pointer" },
            width: 50,
            headerName: ''
        }
    ]), [categories])

    const onDelete = async (id) => {
        if (!id) return;
        axiosInstance.delete(`/transaction/${id}`)
            .then(res => {
                setTransactions(transactions.filter((transaction) => transaction._id !== id))
                toast.success('Transaction Deleted');
            })
            .catch(err => toast.error('Unable to delete Transaction'))
    }

    const onCellUpdate = async (id, column, value) => {
        if (!id || !column || !value) return;
        let newData = { id }
        if (column === 'categories') {
            newData = {
                'categories': categories.find(category => category.name === value) || [],
                ...newData
            }
        } else {
            newData[column] = value;
        }
        console.log(newData)
        axiosInstance.put('/transaction', newData)
            .then(res => toast.success('Transaction Updated'))
            .catch(err => toast.error('Unable to update Transaction'))
    }

    const onGridReady = e => {
        e.api.sizeColumnsToFit();
    }

    const onCellClicked = e => {
        if (e?.column?.colId === 'delete') onDelete(e?.data?._id)
    }

    return (
        <div style={{ flex: "9", height: 'calc(100vh - 50px)' }}>
            <Grid
                columnDefs={columnDefs}
                rowData={transactions}
                onGridReady={onGridReady}
                onCellClicked={onCellClicked}
                onCellValueChanged={e => onCellUpdate(e.data._id, e.column.colId, e.newValue)}
            />
        </div>
    )
}

export default TransactionsGrid