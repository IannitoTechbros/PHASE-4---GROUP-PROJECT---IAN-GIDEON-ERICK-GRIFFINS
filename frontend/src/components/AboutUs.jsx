import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gray-100 text-gray-800">
      <header className="relative h-64 bg-cover bg-center" style={{ backgroundImage: `url('/back-view-crowd-fans-watching-live-performance-music-concert-night-copy-space_637285-544.jpg')` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl text-white font-bold">About Event Hub</h1>
        </div>
      </header>

      <section className="py-12 px-6 flex flex-col md:flex-row items-center md:items-start">
        <div className="md:w-1/2 mr-9">
          <img src="/energetic-dance-floor-with-people-celebrating-birthday.jpg" alt="Dance Floor" className="rounded-lg mb-6 md:mb-0 md:ml-6" />
        </div>
        <div className="md:w-1/2 ml-5">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="mb-6">At Event Hub, our mission is to bring people together through the power of events. Whether it's a concert, a conference, or a community gathering, we believe in the transformative potential of shared experiences. Our platform provides the tools and resources to make event management and participation seamless and enjoyable.</p>
        </div>
      </section>

      <section className="py-12 px-6 bg-gray-200 flex flex-col md:flex-row items-center md:items-start">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
          <p className="mb-6">Our vision is to be the leading platform for event management worldwide. We aim to innovate continuously, leveraging technology to enhance the way people plan and experience events. We envision a future where everyone, everywhere, can easily connect, celebrate, and create unforgettable memories.</p>
        </div>
        <div className="md:w-1/2">
          <img src="/person-close-up-recording-video-with-smartphone-concert.jpg" alt="Recording Concert" className="rounded-lg mb-6 md:mb-0 md:ml-6" />
        </div>
      </section>

      <section className="py-12 px-6 flex flex-col md:flex-row items-center md:items-start">
        <div className="md:w-1/2 mr-9">
          <img src="/tropical-paradise-pool-party-kids-complete-with-palm-trees-tropical-drinks-beach-ball-game.jpg" alt="Pool Party" className="rounded-lg mb-6 md:mb-0 md:ml-6" />
        </div>
        <div className="md:w-1/2 ml-5">
          <h2 className="text-3xl font-bold mb-4">Join Us</h2>
          <p className="mb-6">Join the Event Hub community and be a part of the next big thing. Whether you're an event organizer or an attendee, we have something for you. Together, let's make every event a memorable one.</p>
        </div>
      </section>

      <footer className="py-6 bg-gray-800 text-gray-100 text-center">
        <p>&copy; 2024 Event Hub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUs;
