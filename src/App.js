import React from "react";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import "./AppStyle.css";
import { BrowserRouter, Routes, Route, useLocation  } from "react-router-dom";
import Contactus from "./components/pages/ContactUs";
import HistoryLeav from "./components/pages/HistoryLeav";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Logout from "./components/Logout";

function Layout({ children }) {
  const location = useLocation();
  const isAuthPage = location.pathname === '/' || location.pathname === '/register';

  return (
    <>
      {!isAuthPage && <Header />}
      {!isAuthPage && <Sidebar />}
      <div>
        {children}
      </div>
      {!isAuthPage && <Footer />}
    </>
  );
}

function App() {
  
  return (
    <> 
      <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/contact" element={<Contactus/>}/>
          <Route path="/history" element={<HistoryLeav/>}/> 
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/logout" element={<Logout/>}/>
        </Routes>
      </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
