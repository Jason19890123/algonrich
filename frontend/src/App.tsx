import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useTranslation } from "react-i18next";

import Home from 'pages/Home';
import ComingSoon from 'pages/ComingSoon';
import ContactUS from 'pages/ContactUS';
import 'App.scss';
import NavBar from 'components/NavBar';
import ScrollTopBtn from 'components/ScrollTobBtn';
import Swap from 'pages/Swap';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const { t, i18n, ready } = useTranslation();
  const changeLanguage = (lng: any) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar lngCh={changeLanguage} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/comingsoon" element={<ComingSoon />} />
          <Route path="/contactus" element={<ContactUS />} />
          <Route path="/swap" element={<Swap />} />
        </Routes>
        <ScrollTopBtn />
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
