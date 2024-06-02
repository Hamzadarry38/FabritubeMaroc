import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Header from './Component/Header/Header';
import Hero from './Component/Content/Hero/Hero';
import Product from './Component/Content/Product/Product';
import About from './Component/Content/About/About';
import Footer from './Component/Footer/Footer';
import Order from './Component/Content/Product/Order/Order';
import Login from './Component/Content/Login/Login';
import DashBoard from './Component/DashBoard/DashBoard.jsx';
import NotFound from './Component/Not_Found/NotFound.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyContext from './ContextStateGlobal.jsx';
import VerifyToken from './utils/VerifyToken.js';
import "./App.css";

const Layout = ({ children }) => {
  const location = useLocation();
  const isNotFound = location.pathname === '*';

  return (
    <>
      {!isNotFound && <Header />}
      {children}
      {!isNotFound && <Footer />}
    </>
  );
};

const App = () => {
  const [authToken, setAuthToken] = useState(false);
  const [language, setLanguage] = useState('fr');
  const [loading, setLoading] = useState(true);  // Add loading state

  useEffect(() => {
    const fetchToken = async () => {
      if (localStorage.getItem('auth_token')) {
        const isAdmin = await VerifyToken(localStorage.getItem('auth_token'));
        setAuthToken(isAdmin);
      }
      setLoading(false);  // Set loading to false after verification
    };

    fetchToken();
    if (localStorage.getItem('language')) {
      setLanguage(localStorage.getItem('language'));
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;  // You can replace this with a better loading component
  }

  return (
    <MyContext.Provider value={{ authToken, setAuthToken, language, setLanguage }}>
      <Router>
        <ToastContainer position="top-center" />
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Hero />
                <Product />
                <About />
              </Layout>
            }
          />
          <Route path="/product/order/:id" element={<Layout><Order /></Layout>} />
          <Route path="/login" element={<Layout><Login /></Layout>} />

          {/* Redirect to homepage if not authenticated */}
          {!authToken && <Route path="/adminDashboard/*" element={<Navigate to="/" replace />} />}
          {/* Render dashboard if authenticated */}
          {authToken && <Route path="/adminDashboard/*" element={<Layout><DashBoard /></Layout>} />}
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </MyContext.Provider>
  );
};

export default App;
