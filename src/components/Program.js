import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faOm, faGlobe, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import './Program.css';
import Footer from './Footer';
import Navbar from './Navbar';
import NewsTicker from './NewsTicker';

dayjs.extend(utc);
dayjs.extend(timezone);

const Program = () => {
  const navigate = useNavigate();
  const [useLocalTime, setUseLocalTime] = useState(false);
  const [userZone, setUserZone] = useState("Africa/Nairobi");

  useEffect(() => {
    setUserZone(dayjs.tz.guess());
  }, []);

  const schedule = [
    {
      date: "2026-01-23",
      dayTitle: "Friday, 23rd January 2026 - Day 1",
      events: [
        { time: "18:30", title: "Cake Cutting Ceremony" },
        { time: "19:00", title: "Aarti" },
        { time: "19:15", title: "Bairagi Team Live - Bhajan Reciting" },
        { time: "21:15", title: "Mahaprasadi" },
      ]
    },
    {
      date: "2026-01-24",
      dayTitle: "Saturday, 24th January 2026 - Day 2",
      events: [
        { time: "10:00", title: "Havan" },
        { time: "12:00", title: "Mahaprasadi" },
        { time: "19:15", title: "Hanuman Dada Jivan Charitra Play" },
        { time: "21:00", title: "Mahaprasadi" },
      ]
    },
    {
      date: "2026-01-25",
      dayTitle: "Sunday, 25th January 2026 - Day 3",
      events: [
        { time: "07:30", title: "Breakfast" },
        { time: "08:30", title: "Shri Krishna & ISCON Temple Blessings" },
        { time: "09:00", title: "Raath Yatra Starts (Bank of Baroda)" },
        { time: "12:00", title: "Unveiling of Murti & Official Program" },
        { time: "1:00", title: "Mahaprasadi" },
      ]
    }
  ];

  const getDisplayTime = (date, time) => {
    const kenyaTime = dayjs.tz(`${date} ${time}`, "Africa/Nairobi");
    if (!useLocalTime) {
      return { 
        time: kenyaTime.format('hh:mm A'), 
        date: "JAN " + kenyaTime.format('DD'),
        zoneName: "Kenya" 
      };
    }
    const local = kenyaTime.tz(userZone);
    const cityName = userZone.split('/').pop().replace('_', ' ');
    return { 
      time: local.format('hh:mm A'), 
      date: local.format('MMM DD'),
      zoneName: cityName
    };
  };

  return (
    <div className="program-page-root">
      <NewsTicker />
      <Navbar />
      <div className="program-container">
        <button className="back-btn" onClick={() => navigate('/')}>
          <FontAwesomeIcon icon={faArrowLeft} /> BACK
        </button>

        <header className="program-header">
          <h1>Event Programme</h1>
          <p className="subtitle">Hanuman Dada Murti Inauguration</p>
          
          <div className="tool-instruction">
            <FontAwesomeIcon icon={faInfoCircle} className="info-icon" />
            <span>Switch to see the schedule in your local time</span>
          </div>

          <div className="time-switcher">
            <button className={!useLocalTime ? 'active' : ''} onClick={() => setUseLocalTime(false)}>
              <FontAwesomeIcon icon={faOm} /> KENYA (EAT)
            </button>
            <button className={useLocalTime ? 'active' : ''} onClick={() => setUseLocalTime(true)}>
              <FontAwesomeIcon icon={faGlobe} /> MY LOCAL TIME
            </button>
          </div>
        </header>

        <div className="program-grid">
          {schedule.map((dayData, index) => (
            <div key={index} className="program-card">
              <h2 className="day-title">{dayData.dayTitle}</h2>
              <div className="event-list">
                {dayData.events.map((event, i) => {
                  const display = getDisplayTime(dayData.date, event.time);
                  return (
                    <div key={i} className="event-item">
                      <div className="time-box">
                        <span className="converted-time">{display.time}</span>
                        <div className="time-meta">
                          <span className="converted-date">{display.date}</span>
                          <span className="timezone-tag">{display.zoneName}</span>
                        </div>
                      </div>
                      <div className="event-details">{event.title}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Program;