import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewEvent() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:5555/api/events/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, description, date })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => navigate('/events'))
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        alert('Failed to create event. Please try again.');
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={e => setDescription(e.target.value)}></textarea>
      </label>
      <label>
        Date:
        <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} />
      </label>
      <button type="submit">Create Event</button>
    </form>
  );
}

export default NewEvent;
