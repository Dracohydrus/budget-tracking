import { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { axiosInstance } from '../../../config';
import { DeleteConfirmation } from '../../../components/basic/Popup';
import DatePicker from '../../../components/basic/DatePicker';
import Grid from '../../../components/basic/Grid/Grid';
import toast from '../../../utils/toast';

const TransactionsGrid = ({ transactions, setTransactions, categories }) => {
    const gridRef = useRef()
    const [columnDefs, setColumnDefs] = useState([
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
            hide: true,
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: ['CAD', 'USD']
            }
        },
        {
            field: "transactionDate",
            editable: true,
            filter: 'agDateColumnFilter',
            sort: 'desc',
            sortingOrder: ['desc', 'asc'],
            cellEditor: MyDatePicker,
            cellEditorPopup: true,
            valueGetter: params => new Date(params.data.transactionDate),
            valueFormatter: params => new Date(params.data.transactionDate).toDateString(),
        },
        {
            field: "categories",
            editable: true,
            valueGetter: params => params?.data?.categories?.map(cat => cat.name).join(', ') || params.data.categories,
            valueSetter: params => {
                let newCategory = categories.find(category => category.name === params.newValue) || []
                params.data.categories = [newCategory]
                params.newValue = [newCategory]
                return true
            },
            cellEditor: 'agSelectCellEditor',
            cellEditorParams: {
                values: ['', ...categories.map(cat => cat.name)],
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
    ])

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
        axiosInstance.put('/transaction', newData)
            .then(res => toast.success('Transaction Updated'))
            .catch(err => toast.error('Unable to update Transaction'))
    }

    const onCellClicked = params => {
        if (params?.column?.colId === 'delete') {
            DeleteConfirmation()
                .then(() => onDelete(params?.data?._id))
        }
    }

    return (
        <div style={{ flex: "9", height: 'calc(100vh - 50px)' }}>
            <Grid
                ref={gridRef}
                columnDefs={columnDefs} setColumnDefs={setColumnDefs}
                rowData={transactions}
                onCellClicked={onCellClicked}
                onCellValueChanged={e => onCellUpdate(e.data._id, e.column.colId, e.newValue)}
                onGridReady={params => {
                    let columnState = JSON.parse(localStorage.getItem('transactionGridColumnState'))
                    if (columnState) params.columnApi.applyColumnState({ state: columnState, applyOrder: true })
                }}
                onDragStopped={params => {
                    let columnState = JSON.stringify(params.columnApi.getColumnState())
                    localStorage.setItem('transactionGridColumnState', columnState)
                }}
                onFilterChanged={params => {
                    let filterModel = JSON.stringify(params.api.getFilterModel())
                    localStorage.setItem('transactionGridFilterModel', filterModel)
                }}
                onFirstDataRendered={params => {
                    let filterModel = JSON.parse(localStorage.getItem('transactionGridFilterModel'))
                    if (filterModel) params.api.setFilterModel(filterModel)
                }}
                onRowDataChanged={params => {
                    let filterModel = JSON.parse(localStorage.getItem('transactionGridFilterModel'))
                    if (filterModel) params.api.setFilterModel(filterModel)
                }}
            />
        </div>
    )
}

const MyDatePicker = forwardRef((props, ref) => {
    const { data } = props
    const [date, setDate] = useState(new Date(data.transactionDate))

    useImperativeHandle(ref, () => ({
        getValue() {
            return date;
        },
        setValue(date) {
            setDate(date);
        },
    }));

    return <DatePicker
        portalId="root"
        selected={date}
        onChange={date => setDate(date)}
    />
})

export default TransactionsGrid