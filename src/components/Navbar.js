import React from "react";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <div className="divv">
      <header className="main-div">

        {/* LEFT NAV */}
        <nav className="header-nav">
          <a href="/">Home</a>
          <a href="/contact">Contact</a>
        </nav>

        {/* CENTER BRAND */}
        <div className="center-brand">
          <img
            className="image"
            src="https://res.cloudinary.com/dbsm7cstc/image/upload/v1766394595/hmi22_qxyuks.png"
            alt="Hanuman"
          />

          <div className="text">
            <p className="text1">Hanuman Murti Inauguration</p>
            <p className="text2">
              On the occasion of the 110<sup>th</sup> Anniversary of Krishna Temple Nakuru
            </p>
          </div>

          <img
            className="image"
            src="https://res.cloudinary.com/dbsm7cstc/image/upload/v1766394595/hmi22_qxyuks.png"
            alt="Hanuman"
          />
        </div>

      </header>
    </div>
  );
};

export default Navbar;
