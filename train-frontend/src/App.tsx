import { MainSite } from './pages/MainSite';
import './css/App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Registration } from './pages/Registration';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Registration/>}/>
        <Route path='/home' element={<MainSite/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
