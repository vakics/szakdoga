import { MainSite } from './pages/MainSite';
import './css/App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Registration } from './pages/Registration';
import React from 'react'
import { DieselTrains } from './pages/DieselTrains';
import { ElectricTrains } from './pages/ElectricTrains';
import { MultipleUnitTrains } from './pages/MultipleUnitTrains';
import { NostalgiaTrains } from './pages/NostalgiaTrains';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Registration/>}/>
        <Route path='/home' element={<MainSite/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/diesel' element={<DieselTrains/>}/>
        <Route path='/electric' element={<ElectricTrains/>}/>
        <Route path='/munit' element={<MultipleUnitTrains/>}/>
        <Route path='/nostalgia' element={<NostalgiaTrains/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
