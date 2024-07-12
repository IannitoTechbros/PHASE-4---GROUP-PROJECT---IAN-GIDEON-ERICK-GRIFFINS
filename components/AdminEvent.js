import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminEvent() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '', location: '' });
  const [editEvent, setEditEvent] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  const handleCreateEvent = async () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    const createdBy = user.id;

    try {
      const response = await axios.post('/events', {
        ...newEvent,
        created_by: createdBy
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setEvents([...events, response.data]);
      setMessage('Event created successfully');
      setTimeout(() => setMessage(null), 3000);
      setNewEvent({ title: '', description: '', date: '', location: '' });
    } catch (error) {
      console.error('Error creating event:', error);
      setMessage('Failed to create event');
    }
  };

  const handleDeleteEvent = async (eventId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(events.filter(event => event.id !== eventId));
      setMessage('Event deleted successfully');
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error deleting event:', error);
      setMessage('Failed to delete event');
    }
  };

  const handleEditEvent = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.patch(`/events/${editEvent.id}`, editEvent, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const updatedEventIndex = events.findIndex(event => event.id === editEvent.id);
      const updatedEvents = [...events];
      updatedEvents[updatedEventIndex] = response.data;
      setEvents(updatedEvents);
      setEditEvent(null);
      setMessage('Event updated successfully');
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error updating event:', error);
      setMessage('Failed to update event');
    }
  };

  const handleEditInputChange = (e, field) => {
    setEditEvent({
      ...editEvent,
      [field]: e.target.value
    });
  };

  const startEditEvent = (event) => {
    setEditEvent({
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date,
      location: event.location
    });
  };

  const cancelEditEvent = () => {
    setEditEvent(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Admin Event Management</h1>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <div className="bg-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-center">{editEvent ? 'Update Event' : 'Create New Event'}</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <input
              className="border rounded py-2 px-3 mb-2 w-full"
              type="text"
              placeholder="Title"
              value={editEvent ? editEvent.title : newEvent.title}
              onChange={e => editEvent ? handleEditInputChange(e, 'title') : setNewEvent({ ...newEvent, title: e.target.value })}
            />
            <input
              className="border rounded py-2 px-3 mb-2 w-full"
              type="text"
              placeholder="Description"
              value={editEvent ? editEvent.description : newEvent.description}
              onChange={e => editEvent ? handleEditInputChange(e, 'description') : setNewEvent({ ...newEvent, description: e.target.value })}
            />
            <input
              className="border rounded py-2 px-3 mb-2 w-full"
              type="date"
              value={editEvent ? editEvent.date : newEvent.date}
              onChange={e => editEvent ? handleEditInputChange(e, 'date') : setNewEvent({ ...newEvent, date: e.target.value })}
            />
            <input
              className="border rounded py-2 px-3 mb-2 w-full"
              type="text"
              placeholder="Location"
              value={editEvent ? editEvent.location : newEvent.location}
              onChange={e => editEvent ? handleEditInputChange(e, 'location') : setNewEvent({ ...newEvent, location: e.target.value })}
            />
          </div>
          {editEvent ? (
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
                onClick={handleEditEvent}
              >
                Update Event
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={cancelEditEvent}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex justify-center mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleCreateEvent}
              >
                Create Event
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-gray-200 px-6 py-4">
          <h2 className="text-2xl font-bold text-center">Events List</h2>
        </div>
        <ul>
          {events.map(event => (
            <li key={event.id} className="bg-gray-100 border-b px-4 py-3 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">{event.title}</h2>
                <p>{event.description}</p>
                <p>{event.date}</p>
                <p>{event.location}</p>
              </div>
              <div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                  onClick={() => startEditEvent(event)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminEvent;
