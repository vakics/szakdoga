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
import { TrainById } from './pages/TrainById';
import { Favorites } from './pages/Favorites';
import { Game } from './pages/Game';
import 'bootstrap/dist/css/bootstrap.min.css'
import { OtherUserProfile } from './pages/OtherUserProfile';
import { AnswerPage } from './pages/AnswerPage';
import { LookAtAnsweredPage } from './pages/LookAtAnswerPage';
import { AllTrains } from './pages/AllTrains';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Registration/>}/>
        <Route path='/' element={<MainSite/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/diesel' element={<DieselTrains/>}/>
        <Route path='/electric' element={<ElectricTrains/>}/>
        <Route path='/munit' element={<MultipleUnitTrains/>}/>
        <Route path='/nostalgia' element={<NostalgiaTrains/>}/>
        <Route path='/traininfo' element={<TrainById/>}/>
        <Route path='/favorites' element={<Favorites/>}/>
        <Route path='/surprise' element={<Game/>}/>
        <Route path='/profiles' element={<OtherUserProfile/>}/>
        <Route path='/answer-comment' element={<AnswerPage/>}/>
        <Route path='/look-answered' element={<LookAtAnsweredPage/>}/>
        <Route path='/all-trains' element={<AllTrains/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
