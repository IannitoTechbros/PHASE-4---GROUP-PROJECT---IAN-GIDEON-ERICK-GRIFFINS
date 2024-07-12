import React, { useEffect, useState } from "react";
import axios from "axios";

function EventManagement() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageEventId, setMessageEventId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get("/events");
        setEvents(response.data);
        setFilteredEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }
    fetchEvents();
  }, []);

  useEffect(() => {
    const results = events.filter(
      (event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEvents(results);
  }, [searchQuery, events]);

  const handleRegister = async (eventId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(`/events/register/${eventId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.message === "Already registered for the event") {
        setMessage("You have already registered for this event.");
        setTimeout(() => {
          setMessage(null);
          setMessageEventId(null);
        }, 1000);
      } else {
        setMessage("Registered for the event!");
        setMessageEventId(eventId);
        setTimeout(() => {
          setMessage(null);
          setMessageEventId(null);
        }, 2000);

        const updatedEvents = events.map((event) =>
          event.id === eventId ? { ...event, registered: true } : event
        );
        setEvents(updatedEvents);
        setFilteredEvents(updatedEvents);
      }
    } catch (error) {
      console.error("Error registering for event:", error);

      if (error.response) {
        console.log("Response data:", error.response.data);
        if (
          error.response.data.message === "Already registered for the event"
        ) {
          setMessage("You have already registered for this event.");
          setMessageEventId(eventId);
          setTimeout(() => {
            setMessage(null);
            setMessageEventId(null);
          }, 2000);
        } else {
          setMessage("An error occurred. Please try again.");
          setMessageEventId(eventId);
          setTimeout(() => {
            setMessage(null);
            setMessageEventId(null);
          }, 1000);
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
      <div className="max-w-3xl w-full mb-4">
        <input
          type="text"
          placeholder="Search for events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      <div className="max-w-3xl w-full">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-indigo-200 shadow-md rounded-lg px-8 py-6 mb-4"
          >
            {messageEventId === event.id && (
              <p className="text-red-600 text-center">{message}</p>
            )}
            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
            <p className="text-gray-700 mb-2">{event.description}</p>
            <p className="text-gray-700 mb-2">
              Date: {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="text-gray-700 mb-2">Location: {event.location}</p>
            {event.registered ? (
              <p className="text-green-500 mb-2">Registered for this event</p>
            ) : (
              <div className="flex items-center justify-center">
                <button
                  className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleRegister(event.id)}
                >
                  Register
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventManagement;
