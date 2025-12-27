import React from 'react';

const Maintenance = () => {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#e2ce8f', // Your theme color
      textAlign: 'center',
      padding: '20px'
    }}>
      <div style={{ fontSize: '70px', animation: 'spin 5s linear infinite' }}>🕉️</div>
      <h1 style={{ color: '#8B0000', fontFamily: 'Poppins', marginTop: '20px' }}>
        Divine Updates in Progress
      </h1>
      <p style={{ color: '#2d0c01', maxWidth: '500px', lineHeight: '1.6' }}>
        We are preparing the digital altar for the Hanuman Murti Inauguration. 
        Please visit us again shortly for the live telecast.
      </p>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default Maintenance;