import Transaction from '../transaction/Transaction';
import './Transactions.css'

const Transactions = ({transactions}) => {
  return (
    <div className="transactions">
      {transactions.map((t) => 
        <Transaction key={t._id} transaction={t} />
      )}
    </div>
  );
};

export default Transactions;
