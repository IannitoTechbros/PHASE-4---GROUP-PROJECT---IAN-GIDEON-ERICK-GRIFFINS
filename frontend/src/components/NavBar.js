import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBar({ user, setUser }) {
  const navigate = useNavigate();

  function handleLogoutClick() {
    fetch("http://localhost:5555/api/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
        navigate("/"); // Redirect to home page
      }
    });
  }

  return (
    <header>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        {user ? (
          <button onClick={handleLogoutClick}>Logout</button>
        ) : (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default NavBar;
