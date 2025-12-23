    import React from 'react';

const Footer = () => {
return (
    <footer style={{
      backgroundColor: '#8B0000', // dark red
      color: 'white',
      textAlign: 'center',
      padding: '12px 20px',
      fontFamily: "'Poppins', sans-serif",
      fontSize: '14px',
      borderTop: '2px solid #f5c518', // golden yellow
      bottom: 0,
      width: '100%',
    }}>
      © Website designed by <a href="mailto:pvansh830@gmail.com" style={{ color: '#f5d07e' }}>Vansh Patel</a>{' '}
    </footer>
  );
};

export default Footer;
