import React from 'react'
import '../styles/Navbar.css' 


const Navbar = () => {
  return (
    <div className="divv">
  <div className="main-div">

    {/* LEFT NAVBAR */}
    <nav className="header-nav">
      <a href="/">Home</a>  
      <a href="/contact">Contact</a>
    </nav>

    {/* LEFT IMAGE */}
    <div className="img">
      <img
        className="image"
        src="https://res.cloudinary.com/dbsm7cstc/image/upload/v1766394595/hmi22_qxyuks.png"
        alt="Hanuman"
      />
    </div>

    {/* CENTER TEXT */}
    <div className="text">
      <p className="text1">Hanuman Murti Inauguration</p>
      <p className="text2">
        On the occasion of the 110<sup>th</sup> Anniversary of Krishna Temple Nakuru
      </p>
    </div>

    {/* RIGHT IMAGE */}
    <div className="img">
      <img
        className="image"
        src="https://res.cloudinary.com/dbsm7cstc/image/upload/v1766394595/hmi22_qxyuks.png"
        alt="Hanuman"
      />
    </div>

  </div>
</div>

  )
}

export default Navbar
