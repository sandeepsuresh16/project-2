import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/LoginPage';
import SideMenu from './components/side-menu/SideMenu';
import Header from './components/header/Header';
import { useContext } from 'react';
import { BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import AdminDashboard from './pages/AdminDashboard';
import HR from './pages/admin/HR';
import Class from './pages/admin/Class';
import AuthContext from './context/AuthContext';
import axios from 'axios'

axios.defaults.withCredentials=true

function App() {
  const {adminLoggedIn} = useContext(AuthContext)
  
  return (
    <div className="App">
         
     
     <BrowserRouter>   
        <Routes>
          <Route path='/' element = {adminLoggedIn ? <Navigate to='/admin/'/>:<LoginPage />} />
          <Route path="/admin/" element={adminLoggedIn ? <AdminDashboard/> : <Navigate to='/' />}/>
          <Route path="/admin/hr" element={<HR />} />
          <Route path="/admin/class" element={<Class /> } />
          <Route path="/hr" element={<HR />} />
        </Routes>
      </BrowserRouter>
     
     
    </div>
  );
}

export default App;
