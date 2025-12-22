import React from 'react'
import Navbar from './Navbar'
import '../styles/Day1.css'
const Day1 = () => {
  return (
    <div className='main-divv'>
    <Navbar />
    <div className='img'>
        <img className = "image1"src="https://res.cloudinary.com/dxgkcyfrl/image/upload/v1766432264/Untitled-1-02_tjup5p.jpg" alt="Main_Banner" />
      </div>
    <div className="video-wrapper">
  <iframe
    src="https://www.youtube.com/embed/Nh7oLI0438A"
    title="Hanuman Murti Live"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
  ></iframe>
</div>

    </div>
  )
}

export default Day1
