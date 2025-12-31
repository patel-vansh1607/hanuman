import React from 'react';

const OfflinePage = () => {
  return (
    <div style={styles.container}>
      {/* A simple icon or illustration placeholder */}
      <div style={styles.iconCircle}>
        <span style={{ fontSize: '50px' }}>⚡</span>
      </div>
      
      <h2 style={styles.message}>Connection Lost</h2>
      
      <p style={styles.subtext}>
        "Just as Hanuman's strength was temporarily forgotten, your connection has drifted away. Please check your internet to continue the Darshan."
      </p>

      <button onClick={() => window.location.reload()} style={styles.button}>
        Try Reconnecting
      </button>
      
      <p style={styles.footerText}>Standing by... awaiting the light of the web.</p>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e2ce8f', // Matching your main site background
    color: '#a74620',
    textAlign: 'center',
    fontFamily: "'Poppins', sans-serif",
    padding: '20px'
  },
  iconCircle: {
    width: '100px',
    height: '100px',
    backgroundColor: '#a74620',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
    boxShadow: '0px 8px 20px rgba(167, 70, 32, 0.3)'
  },
  message: { 
    fontSize: '28px', 
    fontWeight: '700', 
    marginBottom: '10px',
    textTransform: 'uppercase' 
  },
  subtext: { 
    maxWidth: '450px', 
    fontSize: '16px', 
    lineHeight: '1.6', 
    marginBottom: '30px',
    color: '#5e2a14'
  },
  button: {
    padding: '14px 40px',
    backgroundColor: '#a74620',
    color: '#ffffff',
    border: '2px solid #f5c518',
    borderRadius: '12px',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    transition: '0.3s',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.2)'
  },
  footerText: {
    marginTop: '20px',
    fontSize: '12px',
    fontStyle: 'italic',
    opacity: 0.7
  }
};

export default OfflinePage;