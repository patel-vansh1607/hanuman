import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.errorCode}>404</h1>
      <div style={styles.divider}></div>
      <h2 style={styles.message}>Sankat Mochan Mahabali Hanuman</h2>
      <p style={styles.subtext}>
        "The path you seek is not in this direction. Even the sun was mistaken for a fruit, but this page is truly not here!"
      </p>
      <button onClick={() => navigate('/')} style={styles.button}>
        Return to Main Gate
      </button>
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
    backgroundColor: '#8B0000',
    color: 'white',
    textAlign: 'center',
    fontFamily: "'Poppins', sans-serif",
    padding: '20px'
  },
  errorCode: { fontSize: '120px', margin: 0, color: 'rgba(245, 197, 24, 0.2)' },
  divider: { width: '100px', height: '4px', backgroundColor: '#f5c518', margin: '10px 0' },
  message: { color: '#f5c518', fontSize: '28px', textTransform: 'uppercase' },
  subtext: { maxWidth: '500px', fontSize: '16px', lineHeight: '1.6', marginBottom: '30px' },
  button: {
    padding: '12px 30px',
    backgroundColor: '#f5c518',
    color: '#8B0000',
    border: 'none',
    borderRadius: '50px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0px 4px 15px rgba(0,0,0,0.3)'
  }
};

export default NotFound;