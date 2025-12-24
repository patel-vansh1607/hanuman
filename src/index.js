import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Day1 from './components/Day1';
import NotFound from './components/NotFound';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, useNavigation } from 'react-router-dom';

// This component detects the actual route transitions
const RootLayout = () => {
  const navigation = useNavigation();
  
  // navigation.state will be "loading" when a route is being fetched
  const isActualLoading = navigation.state === "loading";

  return (
    <>
      {isActualLoading && (
        <div className="loader-overlay">
          <div className="spinner"></div>
          <h2 style={{ color: '#f5c518', marginTop: '20px' }}>Jai Shree Ram...</h2>
        </div>
      )}
      {/* This renders your current page */}
      <div className={isActualLoading ? "content-hidden" : "content-visible"}>
         {/* If you are using a Layout/Outlet approach, put it here. 
             Since you are using direct elements in the router, 
             the Loader needs to be handled inside the Router scope. */}
      </div>
    </>
  );
};

// Define Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/live-day-1-hanuman-murti-inaugration",
    element: <Day1 />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();