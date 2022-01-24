import Header from '../../components/header/Header';
import SideBar from '../../components/sidebar/SideBar';
import Transactions from '../../components/transactions/Transactions';
import './Home.css'

const Home = () => {
  return (
    <>
      <Header />
      <div className="home">
        <Transactions />
        <SideBar />
      </div>
    </>
  )
};

export default Home;
