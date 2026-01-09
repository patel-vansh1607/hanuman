import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import '../styles/Contact.css';

const Contact = () => {
  return (
    <div className="contact-page-wrapper">
      <Navbar />
      
      <main className="contact-main-content">
        
        {/* SECTION 1: PERSONAL HERO (CHAIRMAN) */}
        <motion.section 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="human-hero"
        >
          <div className="hero-flex">
            <div className="portrait-side">
              <div className="organic-blob">
                <div className="portrait-inner">🙏</div>
              </div>
            </div>
            
            <div className="content-side">
              <span className="handwritten">A message from the Chairman</span>
              <h1>Shri Shailesh Sheth</h1>
              <p className="philosophy-text">
                "Our doors are always open, and our hearts are always ready to serve. 
                Feel free to reach out to me directly or our team below."
              </p>
              <div className="personal-actions">
                <a 
  href="https://wa.me/254733638311?text=Namaste%20Shri%20Sailesh%20Seth,%20I%20am%20reaching%20out%20regarding%20the%20Hanuman%20Mahotsav." 
  target="_blank" 
  rel="noopener noreferrer"
  className="human-btn chairman-wa-link"
>
  <svg 
    className="wa-logo-unique" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
  <span>Connect on WhatsApp</span>
</a>
              </div>
            </div>
          </div>
        </motion.section>

        {/* SECTION 2: THE HUMAN GRID */}
        <div className="human-grid">
          
          {/* DONATION CARD: SEWA */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="sewa-card"
          >
            <div className="sewa-content">
              <div className="sewa-header">
                <span className="handwritten-small gold">Sewa and Contributions</span>
                <h3>Support the Mahotsav</h3>
              </div>

              {/* HIGH READABILITY MPESA CARD */}
              <div className="mpesa-vault-card">
                <div className="vault-top">
                  <span className="m-brand">PRIME BANK NAKURU</span>
                </div>
                <div className="vault-body">
                  <div className="vault-row">
                    <div className="vault-column">
                      <small>PAYBILL NUMBER</small>
                      <strong className="highlight-text">982800</strong>
                    </div>
                    <div className="vault-column">
                      <small>ACCOUNT NUMBER</small>
                      <strong className="highlight-text">2000158651</strong>
                    </div>
                  </div>
                </div>
                <div className="vault-footer">
                  Cutchi Gujarati Hindu Union
                </div>
              </div>
            </div>
          </motion.div>

          {/* SUPPORT CARD: TECHNICAL DESK */}
          <motion.div 
            whileHover={{ rotate: 1, y: -5 }}
            className="assistance-card"
          >
            <div className="card-ink-wrapper">
              <div className="card-top-row">
                <div className="avatar-stack">
                  <div className="mini-avatar">👨‍💻</div>
                  <div className="mini-avatar">👩‍🔧</div>
                </div>
                <span className="live-status">
                  <span className="pulse-dot"></span> Online Now
                </span>
              </div>

              <span className="handwritten-small maroon">Need a hand?</span>
              <h3 className="premium-title">Technical Desk</h3>
              
              <p className="human-description">
                Experiencing a lag in the Youtube stream? Or maybe you have questions about the website? Our team is live and ready to guide you.
              </p>

              <div className="support-actions">
                <a 
  href="https://wa.me/254748660944?text=Hello%20Technical%20Team,%20I%20need%20assistance%20regarding%20the%20live%20stream." 
  target="_blank" 
  rel="noopener noreferrer"
  className="human-link-btn whatsapp-style"
>
  <svg 
    className="wa-icon" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
  <span>Report an Issue</span>
  <span className="arrow">→</span>
</a>
                <div className="signature-mark">Seva Team</div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* SECTION 3: LOCATION ANCHOR (PUSHED DOWN) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="location-anchor"
        >
          <div className="anchor-content">
            <div className="info-block">
              <label>The Destination</label>
              <h3>Nakuru, Kenya</h3>
            </div>
            <div className="v-divider"></div>
            <div className="info-block">
              <label>The Celebration</label>
              <h3>23rd - 25th Jan 2026</h3>
            </div>
          </div>
        </motion.div>

      </main>

      <Footer />
    </div>
  );
};

export default Contact;