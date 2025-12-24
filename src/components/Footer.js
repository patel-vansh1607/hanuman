import React, { useState, useEffect } from 'react';
import '../styles/Footer.css';
const Footer = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const footerStyle = {
    backgroundColor: '#8B0000',
    color: 'white',
    textAlign: 'center',
    padding: isMobile ? '10px 5px' : '12px 20px', // Responsive padding
    fontFamily: "'Poppins', sans-serif",
    fontSize: isMobile ? '12px' : '14px',        // Responsive font
    borderTop: '2px solid #f5c518',
    width: '100%',
    marginTop: '20px'
  };

  return (
    <footer style={footerStyle}>
      © Website designed by <a href="mailto:pvansh830@gmail.com" style={{ color: '#f5d07e' }}>Vansh Patel</a>
    </footer>
  );
};

export default Footer;