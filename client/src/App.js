import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useContext } from "react";
import { Context } from "./context/Context";
import TopBar from "./components/topbar/TopBar";
import Home from './pages/home/Home';
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Settings from "./pages/settings/Settings";
import Hailey from "./pages/hailey/Hailey";
import Categories from './pages/categories/Categories';
import Transactions from './pages/transactions/Transactions';
import Upload from './pages/upload/Upload';

function App() {
  const {user} = useContext(Context);

  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/login' element={user ? <Home /> : <Login /> } />
        <Route path='/register' element={user ? <Home /> : <Register />} />
        <Route path='/settings' element={user ? <Settings /> : <Login />} />
        <Route path='/hailey' element={<Hailey />} />
        <Route path='/categories'element={user ? <Categories /> : <Login />} />
        <Route path='/transactions' element={user ? <Transactions /> : <Login />} />
        <Route path='/upload' element={user ? <Upload /> : <Login />} />
        <Route path='/*' element={<Home/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
