import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Notices from './pages/Notice';
import LoginPage from './pages/Login';
import GeneralLogin from './pages/GeneralLogin';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>

         <Route path='/' element={<GeneralLogin/>}/>
         <Route path='/admin' element={<Notices/>}/>
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
