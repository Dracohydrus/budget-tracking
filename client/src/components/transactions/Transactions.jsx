import Transaction from '../transaction/Transaction';
import './Transactions.css'

const Transactions = ({transactions}) => {
  return (
    <div className="transactions">
      {transactions.map((transaction) => 
        <Transaction key={transaction._id} transaction={transaction} />
      )}
       {/* <Transaction />
       <Transaction />
       <Transaction />
       <Transaction /> */}
    </div>
  );
};

export default Transactions;
