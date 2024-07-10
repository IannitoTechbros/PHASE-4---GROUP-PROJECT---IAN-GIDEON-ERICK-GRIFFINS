import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Events({ user }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5555/api/events")
      .then(response => response.json())
      .then(data => setEvents(data));
  }, []);

  return (
    <div>
      <h1>Events</h1>
      {user && user.is_admin && <Link to="/events/new">Create New Event</Link>}
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <Link to={`/events/${event.id}`}>{event.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Events;
