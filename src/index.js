import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Day1 from './components/Day1';
import Day2 from './components/Day2';
import Day3 from './components/Day3';
import NotFound from './components/NotFound';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, useNavigation } from 'react-router-dom';
import Contact from './components/Contact';
import Day2Morning from './components/Day2Morning';
import Day2Evening from './components/Day2Evening';
import Maintenance from './components/Maintainance';


const MaintenanceGuard = ({ children }) => {
  const IS_MAINTENANCE = false;
  if (IS_MAINTENANCE) {
    return <Maintenance />;
  }
  return children;
};

// This component detects the actual route transitions

// Define Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <MaintenanceGuard><App /></MaintenanceGuard>,
  },
    {
      path: "/live-day-1-hanuman-murti-inaugration",
      element: <MaintenanceGuard><Day1 /></MaintenanceGuard>,
    },
  {
    path: "/live-day-2-hanuman-murti-inaugration",
    element: <MaintenanceGuard><Day2 /></MaintenanceGuard>,
  },
  {
    path: "/live-day-3-hanuman-murti-inaugration",
    element: <MaintenanceGuard><Day3 /></MaintenanceGuard>,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/contact",
    element: <MaintenanceGuard><Contact /></MaintenanceGuard>,
  },
  {
    path: "/live-day-2-hanuman-murti-inaugration/morning-program",
    element: <MaintenanceGuard><Day2Morning /></MaintenanceGuard>,
  },
  {
    path: "/live-day-2-hanuman-murti-inaugration/evening-program",
    element: <MaintenanceGuard><Day2Evening /></MaintenanceGuard>,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();