import TopBar from "./components/topbar/TopBar";
import Home from './pages/home/Home';
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Settings from "./pages/settings/Settings";
import Hailey from "./pages/Hailey/Hailey";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
