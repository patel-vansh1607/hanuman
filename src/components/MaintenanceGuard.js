import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient'; // Ensure path is correct

const MaintenanceGuard = ({ children }) => {
  const [isMaintenance, setIsMaintenance] = useState(null);

  useEffect(() => {
    // 1. Check initial status
    const fetchStatus = async () => {
      const { data } = await supabase.from('site_settings').select('maintenance_mode').single();
      if (data) setIsMaintenance(data.maintenance_mode);
    };
    fetchStatus();

    // 2. Real-time listener for the Kill Switch
    const channel = supabase.channel('global-gatekeeper')
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'site_settings' 
      }, (payload) => {
        setIsMaintenance(payload.new.maintenance_mode);
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  // While checking DB, show nothing or a small spinner
  if (isMaintenance === null) return null; 

  // If maintenance is ON, block all children and show Maintenance page
  if (isMaintenance) {
    return <Maintenance />;
  }

  // If maintenance is OFF, show the requested page
  return children;
};