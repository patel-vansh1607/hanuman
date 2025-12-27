import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import '../styles/Contact.css';

const Contact = () => {
  return (
    <div className="contact-page-wrapper">
      <Navbar />
      
      <div className="contact-content">
        {/* --- SECTION 1: CHAIRMAN SPOTLIGHT --- */}
        <section className="chairman-section">
          <div className="chairman-card">
            <div className="chairman-image-area">
              <div className="gold-ring">
                {/* Replace with actual image of Chairman */}
                <div className="portrait-placeholder">🙏</div>
              </div>
            </div>
            <div className="chairman-info">
              <span className="rank-tag">Chairman</span>
              <h1>Shri Sailesh Seth</h1>
              <p className="chairman-quote">"Service to humanity is the highest form of worship. Our doors are always open for the devotees of Lord Hanuman."</p>
              <div className="chairman-contact-row">
                <a href="https://wa.me/0748660944" className="contact-pill">💬 WhatsApp</a>
                <a href="mailto:chairman@hanuman.com" className="contact-pill">✉️ Official Email</a>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECTION 2: SLEEK INTERACTION GRID --- */}
        <div className="interaction-grid">
          <div className="interaction-box tech">
            <div className="box-header">
               <span className="live-icon">●</span>
               <h3>Telecast Support</h3>
            </div>
            <p>Experiencing issues with the Live Stream or Audio?</p>
            <button className="action-btn">Report Issue</button>
          </div>

          <div className="interaction-box seva">
            <div className="box-header">
               <span className="seva-icon">🕉️</span>
               <h3>General Inquiries</h3>
            </div>
            <p>Questions regarding Prasad, Darshan timings, or Seva.</p>
            <button className="action-btn">Contact Desk</button>
          </div>
        </div>

        {/* --- SECTION 3: FLOATING FOOTER INFO --- */}
        <div className="floating-location">
          <div className="loc-item">
            <strong>Location</strong>
            <span>Main Temple Complex, Highway 44</span>
          </div>
          <div className="loc-divider"></div>
          <div className="loc-item">
            <strong>Inauguration Dates</strong>
            <span>March 15th - 20th, 2025</span>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;