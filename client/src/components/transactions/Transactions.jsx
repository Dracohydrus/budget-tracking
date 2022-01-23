import Transaction from '../transaction/Transaction';
import './Transactions.css'

const Transactions = () => {
  return (
    <div className="transcations">
       <Transaction />
       <Transaction />
       <Transaction />
       <Transaction />
    </div>
  );
};

export default Transactions;
