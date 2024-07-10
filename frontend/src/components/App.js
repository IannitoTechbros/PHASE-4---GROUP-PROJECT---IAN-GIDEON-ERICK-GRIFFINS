import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Events from './Events';
import EventDetail from './EventDetail';
import NewEvent from './NewEvent';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5555/api/check_session")
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => setUser(user));
        }
      });
  }, []);

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<SignUp setUser={setUser} />} />
        <Route path="/events" element={<Events user={user} />} />
        <Route path="/events/:id" element={<EventDetail user={user} />} />
        <Route path="/events/new" element={<NewEvent />} />
      </Routes>
    </>
  );
}

export default App;
