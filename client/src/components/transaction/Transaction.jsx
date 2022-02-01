import './Transaction.css'

const Transaction = ({transaction}) => {
  return (
      <div className="transaction">
        <div className="transactionInfo">
          <span className="title">{transaction.description}</span>
          <br />
          <span className="transactionSubtotal">${transaction.value} {transaction.currency}</span>
          <br />
          <span className="transactionUser">{transaction.email}</span>
          <br />
          <span className="transactionDate">{new Date(transaction.createdAt).toDateString()}</span>
          {transaction.categories.length > 0 && 
            <div className="transactionCategorires">
              {transaction.categories.map((c)=> {
                return <span key={transaction._id + c.name} className="transactionCategory">{c.name}</span>
              })}
              <br />
            </div>
          }
        </div>
      </div>
  )
};

export default Transaction;
