import React from 'react';

const Loader = () => {
  return (
    <div style={styles.container}>
      <div className="spinner"></div>
      <p style={styles.text}>Loading Content...</p>
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
    backgroundColor: '#e2ce8f', // Your background color
  },
  text: {
    marginTop: '20px',
    fontFamily: "'Poppins', sans-serif",
    color: '#a74620',
    fontWeight: '600'
  }
};

export default Loader;