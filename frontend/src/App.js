import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import EventManagement from './components/EventManagement';
import AdminEvent from './components/AdminEvent'; 
import ContactUs from './components/ContactUs';
import Navbar from './components/NavBar';
import AboutUs from './components/AboutUs';
import Home from './components/Home';
import Footer from './components/Footer';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/events' element={<EventManagement />} />
        <Route path='/adminevents' element={<AdminEvent />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path="/about" element={<AboutUs/>} />
      </Routes>
      <Footer />
    </Router>

  );
}

export default App;
