import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';

const Maintenance = ({ isStinger, isResuming, onComplete }) => {
  const [count, setCount] = useState(5);
  const [email, setEmail] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    if (isStinger && count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isStinger && count === 0) onComplete();
  }, [count, isStinger, onComplete]);

  const triggerToast = (msg, type = 'success') => {
    setToast({ show: true, message: msg, type });
    setTimeout(() => setToast({ ...toast, show: false }), 4500);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('subscribers').insert([{ email: email }]);
    
    if (error) {
      if (error.code === '23505') {
        triggerToast('You are already on the invitation list!', 'info');
      } else {
        triggerToast('System busy. Please try again later.', 'error');
      }
    } else {
      triggerToast('Success! We will notify you once the website in running', 'success');
      setEmail('');
    }
  };

  return (
    <div style={isStinger ? styles.stingerBg : styles.staticBg}>
      <style>
        {`
          @font-face {
            font-family: 'Vantely';
            src: url('/fonts/Vantely.woff2') format('woff2');
          }
          .main-container {
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            width: 100vw; height: 100vh; padding: 20px; box-sizing: border-box; text-align: center;
          }
          .img-wrapper { width: 120px; margin-bottom: 25px; filter: drop-shadow(0 20px 30px rgba(0,0,0,0.1)); }
          
          /* Mobile Toast Adjustments */
          @media (max-width: 768px) {
            .toast-container { 
              bottom: 30px !important; 
              top: auto !important; 
              width: 90% !important;
              left: 5% !important;
              transform: none !important;
            }
          }

          @media (min-width: 768px) {
            .main-container { flex-direction: row; gap: 80px; text-align: left; }
            .img-wrapper { width: 340px; margin-bottom: 0; }
          }
          .notify-btn { transition: all 0.3s ease; }
          .notify-btn:hover { background: #331d0d !important; transform: scale(1.02); }
        `}
      </style>

      {/* Enhanced Responsive Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="toast-container"
            style={{
              ...styles.toast,
              backgroundColor: toast.type === 'success' ? '#4a2c1a' : '#8b4513',
              borderColor: toast.type === 'success' ? '#d4a373' : '#a67c52'
            }}
          >
            <div style={styles.toastIcon}>
              {toast.type === 'success' ? '✓' : '!'}
            </div>
            <div style={{ color: '#e8d1b5' }}>
               <span style={{ fontSize: '14px', fontWeight: 'bold', display: 'block' }}>
                 {toast.type === 'success' ? 'Jai Shri Ram | Jai Hanuman' : 'NOTE'}
               </span>
               <span style={{ fontSize: '13px', opacity: 0.9 }}>{toast.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="main-container">
        <div className="img-wrapper">
          <img src="https://res.cloudinary.com/dxgkcyfrl/image/upload/v1767887119/hmi22_kstgzm.png" style={styles.hanumanImg} alt="Hanuman" />
        </div>

        <div className="text-content" style={styles.textContent}>
          <p style={styles.soonText}>STAY TUNED</p>
          <h1 style={styles.title}>Hanuman Murti <br /> <span style={styles.light}>Inauguration</span></h1>
          
          <div style={styles.formContainer}>
            <p style={styles.instruction}>
              Our digital doors are temporarily closed as we prepare. <br/>
              Drop your email to receive an invitation when we open:
            </p>
            
            <form onSubmit={handleSubscribe} style={styles.form}>
              <input 
                type="email" placeholder="your@email.com" style={styles.input} 
                value={email} onChange={(e) => setEmail(e.target.value)} required 
              />
              <button type="submit" className="notify-btn" style={styles.btn}>NOTIFY ME</button>
            </form>
          </div>

          <div style={styles.footer}>
            <p style={styles.jai}>Jai Shri Ram | Jai Hanuman</p>
            <p style={styles.date}>Whole event broadcast will be available in this site</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  staticBg: { position: 'fixed', inset: 0, background: '#e8d1b5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Vantely", serif', overflow: 'hidden' },
  stingerBg: { position: 'fixed', inset: 0, background: '#2d1a0a', zIndex: 100 },
  hanumanImg: { width: '100%', height: 'auto' },
  textContent: { display: 'flex', flexDirection: 'column' },
  soonText: { fontSize: '13px', letterSpacing: '5px', color: '#8b4513', marginBottom: '10px', fontWeight: '700' },
  title: { fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)', color: '#4a2c1a', margin: '0 0 18px 0', lineHeight: '0.9', fontWeight: 'normal' },
  light: { fontStyle: 'italic', opacity: 0.8 },
  formContainer: { width: '100%', maxWidth: '440px' },
  instruction: { fontSize: '14px', color: '#5d3a1a', marginBottom: '18px', lineHeight: '1.5' },
  form: { display: 'flex', background: '#fff', borderRadius: '50px', padding: '5px', border: '1px solid #d4a373', boxShadow: '0 10px 25px rgba(139, 69, 19, 0.1)' },
  input: { flex: 1, padding: '12px 20px', border: 'none', outline: 'none', background: 'transparent', fontSize: '15px', color: '#4a2c1a' },
  btn: { background: '#4a2c1a', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '50px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' },
  footer: { marginTop: '45px', borderTop: '1px solid rgba(139, 19, 19, 0.15)', paddingTop: '20px' },
  jai: { fontSize: '1.5rem', color: '#4a2c1a', margin: 0, fontWeight: '900' },
  date: { fontSize: '13px', color: '#8b4513', fontWeight: 'bold', marginTop: '6px' },
  
  // Responsive Toast Styling
  toast: {
    position: 'fixed',
    top: '30px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 9999,
    width: 'auto',
    minWidth: '280px',
    padding: '16px 24px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    boxShadow: '0 15px 40px rgba(0,0,0,0.25)',
    border: '1px solid'
  },
  toastIcon: {
    background: '#e8d1b5',
    color: '#4a2c1a',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '900',
    fontSize: '16px',
    flexShrink: 0
  }
};

export default Maintenance;