import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';

const Maintenance = ({ isStinger, isResuming, onComplete }) => {
  const [count, setCount] = useState(5);
  const [email, setEmail] = useState('');

  const isTransitioning = isStinger || isResuming;

  useEffect(() => {
    setCount(5);
  }, [isStinger, isResuming]);

  useEffect(() => {
    if (isTransitioning && count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isTransitioning && count === 0) {
      onComplete();
    }
  }, [count, isTransitioning, onComplete]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    await supabase.from('subscribers').insert([{ email }]);
    setEmail('');
  };

  return (
    <div style={{
      ...styles.staticBg,
      background: isTransitioning ? 'transparent' : '#e8d1b5',
      backdropFilter: isTransitioning ? 'blur(2px)' : 'none',
      pointerEvents: isTransitioning ? 'none' : 'auto'
    }}>
      <style>
        {`
          @keyframes pulse-green {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
          }
          @keyframes pulse-red {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
          }
          .pulse-dot-red { width: 10px; height: 10px; background: #ef4444; border-radius: 50%; animation: pulse-red 2s infinite; }
          .pulse-dot-green { width: 10px; height: 10px; background: #10b981; border-radius: 50%; animation: pulse-green 2s infinite; }
          
          /* BASE CONTAINER */
          .main-container { display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100vw; height: 100vh; padding: 20px; box-sizing: border-box; text-align: center; overflow: hidden; }
          
          /* MOBILE ONLY CHANGES */
          @media (max-width: 767px) {
            .img-wrapper { width: 150px !important; margin-bottom: 10px !important; }
            .text-content h1 { font-size: 1.8rem !important; margin-bottom: 8px !important; }
            .instruction-text { font-size: 12px !important; margin-bottom: 10px !important; }
            .footer-section { marginTop: 15px !important; padding-top: 10px !important; }
            .jai-text { font-size: 1.1rem !important; }
            .support-text { font-size: 11px !important; margin-top: 8px !important; }
          }

          /* LAPTOP VERSION REMAINS EXACTLY AS YOU HAD IT */
          @media (min-width: 768px) { 
            .main-container { flex-direction: row; gap: 80px; text-align: left; } 
            .img-wrapper { width: 340px; } 
          }
        `}
      </style>

      <AnimatePresence>
        {isTransitioning && (
          <motion.div 
            initial={{ y: -100, opacity: 0, x: '-50%' }}
            animate={{ y: 0, opacity: 1, x: '-50%' }}
            exit={{ y: -100, opacity: 0, x: '-50%' }}
            style={{
              ...styles.statusBanner,
              backgroundColor: isResuming ? '#064e3b' : '#4a2c1a',
              borderColor: isResuming ? '#10b981' : '#d4a373',
              pointerEvents: 'auto'
            }}
          >
            <div className={isResuming ? "pulse-dot-green" : "pulse-dot-red"}></div>
            <span style={styles.bannerText}>
              {isResuming ? `SITE GOING LIVE IN ` : `MAINTENANCE STARTING IN `}
              <strong style={styles.counterText}>{count}s</strong>
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {!isTransitioning && (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="main-container">
          <div className="img-wrapper" style={styles.imgWrapperBase}>
            <img src="https://res.cloudinary.com/dxgkcyfrl/image/upload/v1767887119/hmi22_kstgzm.png" style={styles.hanumanImg} alt="Hanuman" />
          </div>

          <div className="text-content">
            <p style={styles.soonText}>STAY TUNED</p>
            <h1 style={styles.title}>Hanuman Dada Murti <br /> <span style={styles.light}>Inauguration</span></h1>
            
            <div style={styles.formContainer}>
              <p className="instruction-text" style={styles.instruction}>
                Our digital doors are temporarily closed as we prepare. <br/>
                Drop your email to receive an invitation when we open:
              </p>
              <form onSubmit={handleSubscribe} style={styles.form}>
                <input type="email" placeholder="your@email.com" style={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} required />
                <button type="submit" style={styles.btn}>NOTIFY ME</button>
              </form>
              
              <p className="support-text" style={styles.supportText}>
                Any questions? Send<a href="mailto:support@hanuamandada.live" style={styles.emailLink}>support@hanuamandada.live</a>
              </p>
            </div>

            <div className="footer-section" style={styles.footer}>
              <p className="jai-text" style={styles.jai}>Jai Shri Ram | Jai Hanuman</p>
              <p style={styles.date}>Broadcast link for all days can be found on this website.</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const styles = {
  staticBg: { position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'serif', overflow: 'hidden', zIndex: 9000 },
  statusBanner: {
    position: 'fixed', top: '20px', left: '50%', width: 'max-content', maxWidth: '90vw',
    zIndex: 10000, padding: 'clamp(10px, 2vh, 16px) clamp(20px, 4vw, 35px)', borderRadius: '50px', 
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', 
    boxShadow: '0 10px 40px rgba(0,0,0,0.4)', border: '2px solid', whiteSpace: 'nowrap'
  },
  bannerText: { color: '#fff', fontSize: 'clamp(12px, 2.5vw, 16px)', fontWeight: 'bold' },
  counterText: { fontSize: 'clamp(14px, 3vw, 20px)', marginLeft: '5px', color: '#fff' },
  imgWrapperBase: { marginBottom: '25px' },
  hanumanImg: { width: '100%', height: 'auto' },
  soonText: { fontSize: '13px', letterSpacing: '5px', color: '#8b4513', marginBottom: '10px', fontWeight: '700' },
  title: { fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)', color: '#4a2c1a', margin: '0 0 18px 0', lineHeight: '0.9' },
  light: { fontStyle: 'italic', opacity: 0.8 },
  formContainer: { width: '100%', maxWidth: '440px' },
  instruction: { fontSize: '14px', color: '#5d3a1a', marginBottom: '18px', lineHeight: '1.5' },
  form: { display: 'flex', background: '#fff', borderRadius: '50px', padding: '5px', border: '1px solid #d4a373' },
  input: { flex: 1, padding: '12px 20px', border: 'none', outline: 'none', background: 'transparent', width: '100%' },
  btn: { background: '#4a2c1a', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' },
  supportText: { marginTop: '15px', fontSize: '13px', color: '#8b4513', opacity: 0.9 },
  emailLink: { color: '#4a2c1a', fontWeight: 'bold', textDecoration: 'none', marginLeft: '4px' },
  footer: { marginTop: '45px', borderTop: '1px solid rgba(139, 19, 19, 0.15)', paddingTop: '20px' },
  jai: { fontSize: '1.5rem', color: '#4a2c1a', margin: 0, fontWeight: '900' },
  date: { fontSize: '13px', color: '#8b4513', fontWeight: 'bold' }
};

export default Maintenance;