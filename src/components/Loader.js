import React, { createContext, useState, useContext } from 'react';

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {loading && (
        <div style={loaderOverlayStyle}>
          <div className="spinner"></div> 
          <p style={{ marginTop: '10px', color: '#f5c518' }}>Loading Blessings...</p>
        </div>
      )}
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => useContext(LoaderContext);

const loaderOverlayStyle = {
  position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
  backgroundColor: 'rgba(139, 0, 0, 0.9)', // Matches your footer dark red
  display: 'flex', flexDirection: 'column', justifyContent: 'center',
  alignItems: 'center', zIndex: 9999, color: 'white'
};w