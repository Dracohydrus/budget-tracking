import Header from "../../components/header/Header";
import { DeleteConfirmation } from '../../components/basic/Popup';

const Home = () => {
  const deletePopup = () => {
    DeleteConfirmation()
      .then(() => alert('success'))
      .catch(() => alert('fail'))
  }

  return (
    <>
      <Header />
      <button onClick={deletePopup}>Test</button>
    </>
  );
};

export default Home;