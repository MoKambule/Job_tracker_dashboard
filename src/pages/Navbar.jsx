import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <h1 className="logo">Job Tracker</h1>

        <nav className="nav-links">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>

          <NavLink to="/create" className="nav-link">
            Add Job
          </NavLink>

          <NavLink to="/analytics" className="nav-link">
            Analytics
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;