const MaintenanceGuard = ({ children }) => {
  const [dbStatus, setDbStatus] = useState(null);
  const [displayMode, setDisplayMode] = useState(null); 
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // 1. Initial Load
    const init = async () => {
      const { data } = await supabase.from('site_settings').select('maintenance_mode').eq('id', 'global_config').single();
      if (data) {
        setDbStatus(data.maintenance_mode);
        setDisplayMode(data.maintenance_mode ? 'maintenance' : 'live');
      }
    };
    init();

    // 2. Real-time Switch
    const channel = supabase.channel('gatekeeper')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'site_settings' }, (payload) => {
        setDbStatus(payload.new.maintenance_mode);
        setIsTransitioning(true); // This starts the countdown WITHOUT removing the site
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  if (displayMode === null) return null;

  const handleCountdownDone = () => {
    // ONLY change the display mode after the 5 seconds are up
    setDisplayMode(dbStatus ? 'maintenance' : 'live');
    setIsTransitioning(false);
  };

  return (
    <>
      {/* CRITICAL CHANGE: 
         We keep rendering {children} (your site) even if dbStatus is true, 
         as long as we are still in the "isTransitioning" (countdown) phase.
      */}
      {(displayMode === 'live' || (isTransitioning && dbStatus)) && (
        <div style={{ 
          opacity: (isTransitioning && dbStatus) ? 0.7 : 1, 
          transition: 'opacity 2s ease' 
        }}>
          {children}
        </div>
      )}

      {/* The Overlay (Banner + Full Page) */}
      {(displayMode === 'maintenance' || isTransitioning) && (
        <Maintenance 
          isStinger={isTransitioning && dbStatus} 
          isResuming={isTransitioning && !dbStatus} 
          onComplete={handleCountdownDone} 
        />
      )}
    </>
  );
};