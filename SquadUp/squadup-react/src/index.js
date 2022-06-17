import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import NavBar from './components/NavBar/NavBar';
import UserLogin from './components/UserLogIn/UserLogin'
import UserSignUp from './components/UserLogIn/UserSignUp'
import PlayersPage from './components/PlayersPage/PlayersPage'
import IndividualPlayersPage from './components/IndPlayerPage/IndividualPlayersPage'
import MySquad from './components/MySquad/MySquad';
import EditProfile from './components/EditProfile/EditProfile';
import { ToastProvider } from "./components/Toast/ToastService";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastProvider>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<App />}></Route>
        <Route path='/login' element={<UserLogin />}></Route>
        <Route path="/signup" element={<UserSignUp />}></Route>
        <Route path="/players/" element={<PlayersPage />}></Route>
        <Route path="/players/:id" element={<PlayersPage />}></Route>
        <Route path='/mysquad' element={<MySquad />}></Route>
        <Route path="/editinfo" element={<EditProfile />}></Route>
        <Route path="/player/:username" element={<IndividualPlayersPage />}></Route>
        <Route path="*" element={<div>404 - page does not exist</div>}></Route>
      </Routes>
    </BrowserRouter>
    </ToastProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
