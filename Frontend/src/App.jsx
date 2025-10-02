import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Profile from './components/Profile/Profile';
import NotFound from './components/NotFound/NotFound';

import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Cart from './pages/Cart/Cart';
import Pizza from './pages/Pizza';


const App =()=> {
  
  return (
    <BrowserRouter>
      <Navbar />
      <Routes className="app-content">
        <Route path="/" element={<Home />}/>
        <Route path="/Register" element={<Register />}/>
        <Route path="/Login" element={<Login />}/>
        <Route path="/Cart" element={<Cart />}/>
        <Route path="/Pizza/p001" element={<Pizza />}/>
        <Route path="/Profile" element={<Profile />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
      <Footer />
      </BrowserRouter>
  );
}

export default App;
