import './Transaction.css'

const Transaction = () => {
  return (
      <div className="transaction">
          transaction
        <div className="transactionInfo">
          <div className="transactionCategorires">
            <span className="transactionCategory">Mortgage</span>
            <span className="transactionCategory">Bills</span>
          </div>
          <span className="title">
            Lorem ipsum dolor sit.
          </span>
          <hr />
          <span className="transactionDate">1 hour ago</span>
        </div>
      </div>
  )
};

export default Transaction;
