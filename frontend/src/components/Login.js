import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:5555/api/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Invalid credentials');
        }
      })
      .then((user) => {
        setUser(user);
        navigate('/events'); // Redirect to events page on successful login
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Log In</button>
    </form>
  );
}

export default Login;
