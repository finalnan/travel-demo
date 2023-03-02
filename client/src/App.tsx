import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Create from './components/create/Create';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Type from './components/type/Type';
import Detail from './components/detail/Detail';
import Footer from './components/footer/Footer';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/types/:type" element={<Type />} />
        <Route path="/typeDetail/:id" element={<Detail />} />
      </Routes>
      <Footer />
    </>
  );
}
export default App;
