import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Info, Shield, Truck, Utensils, Music, Paintbrush, HelpCircle } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import '../styles/Contact.css';

const Contact = () => {
  const wa = (num, name) => `https://wa.me/254${num.substring(1)}?text=Namaste%20${name},%20I%20am%20reaching%20out%20regarding%20the%20Hanuman%20Mahotsav.`;

  const ContactRow = ({ label, name, phone }) => (
    <div className="premium-contact-row">
      <div className="contact-info">
        <small>{label}</small>
        <span className="name-text">{name}</span>
        <span className="phone-subtext">{phone}</span>
      </div>
      <div className="contact-actions">
        <a href={`tel:${phone}`} className="icon-btn call-style" title="Call">
          <Phone size={16} />
        </a>
        <a href={wa(phone, name)} target="_blank" rel="noreferrer" className="icon-btn wa-style" title="WhatsApp">
          <MessageCircle size={16} />
        </a>
      </div>
    </div>
  );

  return (
    <div className="contact-page-wrapper">
      <Navbar />
      
      <main className="contact-main-content">
        
        {/* CHAIRMAN HERO */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="human-hero">
          <div className="hero-flex">
            <div className="portrait-side">
              <div className="organic-blob">🙏</div>
            </div>
            <div className="content-side">
              <span className="cursive-text">A message from the Chairman</span>
              <h1>Shaileshbhai Sheth</h1>
              <p className="philosophy-text">"Our doors are always open, and our hearts are always ready to serve."</p>
              <a href={wa('0733638311', 'Shailesh%20Sheth')} target="_blank" rel="noreferrer" className="main-wa-btn">
                <MessageCircle size={20} style={{marginRight: '8px'}} />
                Connect on WhatsApp
              </a>
            </div>
          </div>
        </motion.section>

        <div className="bento-grid">
          
          {/* TECHNICAL DESK */}
          <motion.div whileHover={{ scale: 1.01 }} className="bento-item tech-card">
            <div className="badge"><HelpCircle size={12} /> LIVE HELP</div>
            <span className="cursive-small">Need a hand?</span>
            <h3>Technical Desk</h3>
            <p>Issues with the Stream or Website?</p>
            <ContactRow label="IT Support" name="Vanshbhai" phone="0748660944" /><br></br>
            <p>Issues with the Audio?</p>
            <ContactRow label="Music" name="Mishaalbhai" phone="0728687000" />
          </motion.div>

          {/* SEWA CARD */}
          <motion.div whileHover={{ scale: 1.01 }} className="bento-item sewa-card">
            <div className="card-icon-top"><Info size={24} color="#f5c518" /></div>
            <span className="cursive-small gold">Support</span>
            <h3>Sewa & Contributions</h3>
            <div className="mpesa-glass-card">
              <div className="mpesa-line"><span>PAYBILL</span><strong>982800</strong></div>
              <div className="mpesa-line"><span>ACC</span><strong>2000158651</strong></div>
              <div className="mpesa-sub">Prime Bank Nakuru • Cutchi Gujrati Hindu Union</div>
            </div>
          </motion.div>

          {/* ACCOMMODATION & TRANSPORT */}
          <motion.div className="bento-item standard-card">
            <h4><Truck size={18} /> Logistics & Stay</h4>
            <ContactRow label="Accommodation" name="Jigneshbhai" phone="0733711525" />
            <ContactRow label="Transport" name="Samratbhai" phone="0780230020" />
            <ContactRow label="Transport" name="Urmishbhai" phone="0700641528" />
          </motion.div>

          {/* KITCHEN TEAM */}
          <motion.div className="bento-item standard-card">
            <h4><Utensils size={18} /> Kitchen & Serving</h4>
            <ContactRow label="Kitchen" name="Bhaviniben" phone="0733736010" />
            <ContactRow label="Serving" name="Swatiben" phone="0738717481" />
            <ContactRow label="Serving" name="Hirenbhai" phone="0719333284" />
          </motion.div>

          {/* STAGE & DECOR */}
          <motion.div className="bento-item standard-card span-2">
            <div className="title-row">
                <h4><Paintbrush size={18} /> Drama & Decor</h4>
                <Music size={18} color="#8B0000" />
            </div>
            <div className="split-grid">
              <div>
                <ContactRow label="Drama/Stage" name="Bhavikaben" phone="0735109880" />
                <ContactRow label="Drama/Stage" name="Jaybhai" phone="0784066033" />
              </div>
              <div>
                <ContactRow label="Decor" name="Dipakbhai" phone="0724919700" />
              </div>
            </div>
          </motion.div>

          {/* SECURITY & EMERGENCY */}
          <motion.div className="bento-item emergency-card">
            <h4><Shield size={18} /> Security & Safety</h4>
            <ContactRow label="Security" name="Maulikbhai" phone="0721222616" />
            <div className="emergency-divider"></div>
            <small>AMBULANCE (NW Hospital)</small>
            <a href="tel:0709667000" className="eme-btn">0709 667000</a>
          </motion.div>

        </div>

        {/* FOOTER ANCHOR */}
        <div className="location-anchor">
            <div className="anchor-content">
                <div><label>LOCATION</label><h3>Nakuru, Kenya</h3></div>
                <div className="v-sep"></div>
                <div><label>DATES</label><h3>23 - 25 Jan 2026</h3></div>
            </div>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default Contact;