import React from 'react'
import '../styles/Navbar.css' 


const Navbar = () => {
  return (
    <div className='main-div'>
      <div className='img'>
        <img className = "image"src="https://res.cloudinary.com/dbsm7cstc/image/upload/v1766394595/hmi22_qxyuks.png" alt="Hanuman" />
      </div>
      <div className='text'>
        <p className='text1'>Hanuman Murti Inauguration</p>
        <p className='text2'>On the occasion of the 110<sup>th</sup> Anniversary of Krishna Temple Nakuru</p>
      </div>
      <div className='img'>
        <img className = "image"src="https://res.cloudinary.com/dbsm7cstc/image/upload/v1766394595/hmi22_qxyuks.png" alt="Hanuman" />
      </div>
    </div>
  )
}

export default Navbar
