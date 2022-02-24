import './Transaction.css'

const Transaction = ({ transaction }) => {
  return (
    <div className='transaction'>
      <div>{transaction.description}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>${transaction.value} {transaction.currency}</div>
        <div>{new Date(transaction.createdAt).toDateString()}</div>
      </div>
      <div className="transactionCategories">
        {transaction.categories.map((category) => {
          return <span key={transaction._id + category.name} className="transactionCategory">{category.name}</span>
        })}
        <br />
      </div>
    </div>
  )
};

export default Transaction;
