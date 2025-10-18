import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Profile from './components/Profile/Profile';
import Checkout from './pages/Checkout/Checkout';
import NotFound from './components/NotFound/NotFound';

import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Cart from './pages/Cart/Cart';
import Pizza from './pages/Pizza';

import { CartProvider } from "./context/CartContext";
import { PizzaProvider } from "./context/PizzaContext";
import { UserProvider, useUser } from "./context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { token } = useUser();
  return token ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  const { token } = useUser();

  return (
    <Routes className="app-content">
      <Route path="/" element={<Home />}/>
      <Route 
        path="/Register" 
        element={token ? <Navigate to="/" replace /> : <Register />}
      />
      <Route 
        path="/Login" 
        element={token ? <Navigate to="/" replace /> : <Login />}
      />
      <Route path="/Cart" element={<Cart />}/>
      <Route path="/Pizza/:id" element={<Pizza />}/>

      <Route 
        path="/Profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />

            <Route 
        path="/Checkout" 
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        } 
      />

      <Route path="*" element={<NotFound />}/>
    </Routes>
  );
};

const App =()=> {
  
  return (
    <UserProvider>
      <PizzaProvider>
        <CartProvider>
          <BrowserRouter>
            <Navbar />
            <AppRoutes />
            <Footer />
          </BrowserRouter>
        </CartProvider>
      </PizzaProvider>
    </UserProvider>
  );
}

export default App;
