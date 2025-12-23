import React from 'react'
import Navbar from './Navbar'
import '../styles/Days.css'
import { useEffect } from 'react';
import NewsTicker from './NewsTicker';


const Day1 = () => {
    useEffect(() => {
    document.title = 'Day 1 | Hanuman Murti Inauguration';
  }, []);
  return (
    <div className='main-divv'>
    <NewsTicker />
    <Navbar />
    <div className="video-wrapper">
    <iframe
    src="https://www.youtube.com/embed/Nh7oLI0438A?autoplay=1&mute=1&playsinline=1&rel=0"
    title="Hanuman Murti Live"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>
    </div>

    </div>
  )
}

export default Day1
