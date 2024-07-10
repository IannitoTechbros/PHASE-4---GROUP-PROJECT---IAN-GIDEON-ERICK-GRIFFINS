import React from "react";

function Home({ user }) {
  return (
    <div>
      {user ? (
        <h1>Welcome, {user.username}!</h1>
      ) : (
        <h1>WELCOME TO EVENTHUB. VUTA BANGI KWA SABABU UJANA NI MOSHI</h1>
      )}
    </div>
  );
}

export default Home;
