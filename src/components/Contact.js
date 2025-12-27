import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import '../styles/Contact.css';

const Contact = () => {
  return (
    <div className="contact-page-wrapper">
      <Navbar />
      
      <main className="contact-main-content">
        {/* SECTION 1: CHAIRMAN */}
        <section className="chairman-hero">
          <div className="chairman-card">
            <div className="chairman-visual">
              <div className="gold-ring">
                <div className="portrait-box">🙏</div>
              </div>
            </div>
            
            <div className="chairman-details">
              <span className="rank-tag">Chairman</span>
              <h1>Shri Sailesh Seth</h1>
              <p className="chairman-quote">
                "Service to humanity is the highest form of worship. Our doors are always open for the devotees."
              </p>
              <div className="chairman-actions">
                <a href="https://wa.me/91748660944" className="pill-btn wa">💬 WhatsApp</a>
                <a href="mailto:chairman@hanuman.com" className="pill-btn mail">✉️ Email</a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: GRID */}
        <div className="interaction-grid">
          <div className="i-box">
            <div className="i-header">
               <span className="dot-live">●</span>
               <h3>Telecast Support</h3>
            </div>
            <p>Experiencing issues with the Live Stream or Audio?</p>
            <button className="action-link">Report Issue</button>
          </div>

          <div className="i-box">
            <div className="i-header">
               <span className="om-icon">🕉️</span>
               <h3>General Inquiries</h3>
            </div>
            <p>Questions regarding Prasad, Darshan, or Seva.</p>
            <button className="action-link">Contact Desk</button>
          </div>
        </div>

        {/* SECTION 3: LOCATION BAR */}
        <div className="info-bar">
          <div className="info-item">
            <strong>Location</strong>
            <span>Main Temple Complex, Highway 44</span>
          </div>
          <div className="info-item border-left">
            <strong>Dates</strong>
            <span>March 15th - 20th, 2025</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;