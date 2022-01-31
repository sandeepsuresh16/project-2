import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from "react-router-dom"
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route exact path ="/" element={<LoginPage />} />
        </Routes>
    </div>
  );
}

export default App;
