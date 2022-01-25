import './Transaction.css'

const Transaction = ({transaction}) => {
  return (
      <div className="transaction">
        <div className="transactionInfo">
          <div className="transactionCategorires">
            <span className="transactionCategory">Mortgage, </span>
            <span className="transactionCategory">Bills</span>
            <br />
          </div>
          <span className="title">{transaction.description}</span>
          <br />
          <span className="transactionSubtotal">{transaction.currency} {transaction.value}</span>
          <hr />
          <span className="transactionDate">{transaction.createdAt}</span>
        </div>
      </div>
  )
};

export default Transaction;
