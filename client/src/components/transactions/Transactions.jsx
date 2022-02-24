import Transaction from '../transaction/Transaction';
import './Transactions.css'

const Transactions = ({ transactions }) => {
  return (
    <div className="transactions" style={{ gap: '20px' }}>
      {transactions.map((transaction) =>
        <Transaction key={transaction._id} transaction={transaction} />
      )}
    </div>
  );
};

export default Transactions;
