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
                <a href="https://wa.me/254748660944" className="pill-btn wa">💬 WhatsApp</a>
                <a href="mailto:chairman@hanuman.com" className="pill-btn mail">✉️ Email</a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: DONATION / PAYBILL (NEW) */}
        <section className="donation-section">
          <div className="paybill-card">
            <div className="paybill-header">
              <span className="heart-icon">❤️</span>
              <h3>Sewa & Donations</h3>
            </div>
            <p>Support our community initiatives and temple maintenance.</p>
            
            <div className="mpesa-box">
              <div className="mpesa-logo">M-PESA</div>
              <div className="mpesa-details">
                <div className="detail">
                  <small>Business No.</small>
                  <strong>247247</strong>
                </div>
                <div className="detail">
                  <small>Account No.</small>
                  <strong>0748 660 944</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: GRID */}
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

        {/* SECTION 4: LOCATION BAR */}
        <div className="info-bar">
          <div className="info-item">
            <strong>Location</strong>
            <span>NAKURU, KENYA</span>
          </div>
          <div className="info-item border-left">
            <strong>Event Dates</strong>
            <span>23rd Jan - 25th Jan 2026</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;