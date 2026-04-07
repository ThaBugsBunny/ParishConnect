import { Link } from "react-router-dom";
import "./Home.css";

function HomePage() {
  return (
    <div className="home">

      {/* NAVBAR */}
      <div className="navbar">
        <div className="logo">ParishConnect</div>

        <div className="nav-links">
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        </div>
      </div>


      {/* HERO */}
      <div className="hero">
  <h1>Strengthening Our Parish Community</h1>

  <p>
    Welcome to ParishConnect, our centralized platform for administration,
    sacrament records, and community engagement. Connect with your parish today.
  </p>

  {/* ACTION BUTTONS */}
  <div className="hero-actions">

    <Link to="/mass-booking">
      <button className="hero-btn">
        Book a Mass
      </button>
    </Link>

    <Link to="/donate">
      <button className="hero-btn secondary">
        Donate
      </button>
    </Link>

  </div>
</div>


      {/* MAIN CONTENT */}
      <div className="content">

        {/* ANNOUNCEMENTS */}
        <div className="announcements">

          <h2>Latest Announcements</h2>

          <div className="card">
            <h3>Easter Sunday Mass Schedule</h3>
            <p className="date">3/20/2024</p>
            <p>Masses at 8:00 AM and 10:30 AM.</p>
          </div>

          <div className="card">
            <h3>New Altar Server Training</h3>
            <p className="date">3/22/2024</p>
            <p>Training for new recruits this Saturday.</p>
          </div>

        </div>


        {/* SIDEBAR */}
        <div className="sidebar">

          <div className="mass-card">
            <h3>Mass Timings</h3>

            <div className="mass-item">
              <span>Saturday</span>
              <span>5:30 PM</span>
            </div>

            <div className="mass-item">
              <span>Sunday</span>
              <span>6:30 AM</span>
            </div>

            <div className="mass-item">
              <span>Sunday</span>
              <span>8:00 AM</span>
            </div>

            <div className="mass-item">
              <span>Sunday</span>
              <span>10:30 AM</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default HomePage;