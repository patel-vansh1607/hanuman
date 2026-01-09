import React, { useState, useEffect, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { supabase } from './supabaseClient';

// 1. CRITICAL: Lazy load your components so the initial load is tiny
const App = lazy(() => import('./App'));
const Day1 = lazy(() => import('./components/Day1'));
const Day2 = lazy(() => import('./components/Day2'));
const Day3 = lazy(() => import('./components/Day3'));
const Contact = lazy(() => import('./components/Contact'));
const Day2Morning = lazy(() => import('./components/Day2Morning'));
const Day2Evening = lazy(() => import('./components/Day2Evening'));
const AdminPanel = lazy(() => import('./components/Adminpanel'));
const Maintenance = lazy(() => import('./components/Maintainance'));
const NotFound = lazy(() => import('./components/NotFound'));

// Simple Loading Spinner for the lazy components
const PageLoader = () => (
  <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fdf6e3' }}>
    <p style={{ fontFamily: 'serif', color: '#8b0000' }}>Loading...</p>
  </div>
);

const MaintenanceGuard = ({ children }) => {
  const [dbStatus, setDbStatus] = useState(null);
  const [displayMode, setDisplayMode] = useState(null); 
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const fetchInitial = async () => {
      // Use .limit(1) instead of .single() to avoid the 406 error
      const { data, error } = await supabase
        .from('site_settings')
        .select('maintenance_mode')
        .eq('id', 'global_config')
        .limit(1);

      if (!error && data && data.length > 0) {
        const isMaint = data[0].maintenance_mode;
        setDbStatus(isMaint);
        setDisplayMode(isMaint ? 'maintenance' : 'live');
      } else {
        // Fallback if DB fails so site doesn't stay white forever
        setDisplayMode('live');
      }
    };
    fetchInitial();

    const channel = supabase.channel('global-gatekeeper')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'site_settings' }, 
      (payload) => {
        setDbStatus(payload.new.maintenance_mode);
        setIsTransitioning(true); 
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  // Show nothing until we know the status (prevents flicker)
  if (displayMode === null) return null;

  if (isTransitioning) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Maintenance 
          isStinger={true} 
          isResuming={!dbStatus} 
          onComplete={() => {
            setDisplayMode(dbStatus ? 'maintenance' : 'live');
            setIsTransitioning(false);
          }} 
        />
      </Suspense>
    );
  }

  if (displayMode === 'maintenance') {
    return (
      <Suspense fallback={<PageLoader />}>
        <Maintenance isStinger={false} />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<PageLoader />}>
      {children}
    </Suspense>
  );
};

const router = createBrowserRouter([
  { path: "/", element: <MaintenanceGuard><App /></MaintenanceGuard> },
  { path: "/live-day-1-hanuman-murti-inaugration", element: <MaintenanceGuard><Day1 /></MaintenanceGuard> },
  { path: "/live-day-2-hanuman-murti-inaugration", element: <MaintenanceGuard><Day2 /></MaintenanceGuard> },
  { path: "/live-day-3-hanuman-murti-inaugration", element: <MaintenanceGuard><Day3 /></MaintenanceGuard> },
  { path: "/contact", element: <MaintenanceGuard><Contact /></MaintenanceGuard  > },
  { path: "/live-day-2-hanuman-murti-inaugration/morning-program", element: <MaintenanceGuard><Day2Morning /></MaintenanceGuard> },
  { path: "/live-day-2-hanuman-murti-inaugration/evening-program", element: <MaintenanceGuard><Day2Evening /></MaintenanceGuard> },
  { path: "/admin", element: <AdminPanel /> }, // Admin doesn't need the guard
  { path: "*", element: <NotFound /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);