import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EventDetail({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    fetch("http://localhost:5555/api/events/${id}")
      .then(response => response.json())
      .then(data => {
        setEvent(data);
        setName(data.name);
        setDescription(data.description);
        setDate(data.date);
      });
  }, [id]);

  function handleDelete() {
    fetch(`/api/events/${id}`, {
      method: 'DELETE'
    }).then(() => navigate('/events'));
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`/api/events/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, description, date })
    }).then(() => navigate('/events'));
  }

  function handleRegister() {
    fetch('/api/registrations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ event_id: id })
    });
  }

  if (!event) return <div>Loading...</div>;

  return (
    <div>
      <h1>{event.name}</h1>
      <p>{event.description}</p>
      <p>{event.date}</p>
      {user && user.is_admin && (
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
          <button type="submit">Update Event</button>
          <button type="button" onClick={handleDelete}>Delete Event</button>
        </form>
      )}
      {user && !user.is_admin && <button onClick={handleRegister}>Register</button>}
    </div>
  );
}

export default EventDetail;
