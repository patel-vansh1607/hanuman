import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  faLayerGroup, faShieldHalved, faArrowRightFromBracket, 
  faLock, faFingerprint, faXmark, faBolt, faServer, faCircleNotch,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AdminPanel = () => {
  // --- ALL ORIGINAL STATES RESTORED ---
  const [session, setSession] = useState(null);
  const [pageLoading, setPageLoading] = useState(true); 
  const [authError, setAuthError] = useState('');
  const [items, setItems] = useState([]);
  const [subscribers, setSubscribers] = useState([]); 
  const [maintMode, setMaintMode] = useState(false);
  const [activeTab, setActiveTab] = useState('streams'); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); 
  const [actionKey, setActionKey] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [isSwitchArmed, setIsSwitchArmed] = useState(false);

  // --- SESSION & DATA LOGIC ---
  useEffect(() => {
    const checkInitialSession = async () => {
      try {
        const { data: { session: activeSession } } = await supabase.auth.getSession();
        setSession(activeSession);
        if (activeSession) {
           await loadDashboardData();
           await fetchSubscribers();
        }
      } catch (err) { console.error(err); } 
      finally { setPageLoading(false); }
    };
    checkInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
      if (currentSession) { loadDashboardData(); fetchSubscribers(); }
    });
    return () => subscription.unsubscribe();
  }, []);

  const loadDashboardData = async () => {
    const { data: streams } = await supabase.from('programmes').select('*').order('id');
    setItems(streams || []);
    const { data: settings } = await supabase.from('site_settings').select('maintenance_mode').eq('id', 'global_config').limit(1);
    if (settings && settings.length > 0) setMaintMode(settings[0].maintenance_mode);
  };

  const fetchSubscribers = async () => {
    const { data } = await supabase.from('subscribers').select('*').order('created_at', { ascending: false });
    setSubscribers(data || []);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError('Access Denied: Invalid Credentials');
    setLoginLoading(false);
  };

const executeAction = async (e) => {
  e.preventDefault();
  setVerifying(true);
  const { data, error } = await supabase.from('system_secrets').select('key_value').eq('key_name', 'admin_action_key').single();
  
  if (!error && actionKey === data.key_value) {
    if (pendingAction.type === 'stream') {
      await supabase.from('programmes').update({ status: pendingAction.newStatus, is_live: pendingAction.newStatus === 'live' }).eq('id', pendingAction.id);
    } else if (pendingAction.type === 'system') {
      await supabase.from('site_settings').update({ maintenance_mode: pendingAction.newStatus }).eq('id', 'global_config');
      setIsSwitchArmed(false);
      
      // Added Alert for confirmation
      alert(`SYSTEM ${pendingAction.newStatus ? 'LOCKED (Maintenance Active)' : 'RESTORED (Online)'}`);
    }
    await loadDashboardData();
    setShowSecurity(false); setActionKey(''); setPendingAction(null);
  } else { 
    alert("Invalid Security Key"); 
  }
  setVerifying(false);
};

  if (pageLoading) return (
    <div style={styles.loadingContainer}>
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
        <FontAwesomeIcon icon={faCircleNotch} style={{ fontSize: '40px', color: '#4a2c1a' }} />
      </motion.div>
    </div>
  );

  if (!session) return (
    <div style={styles.loginContainer}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Armata&family=Playfair+Display:ital,wght@0,400;1,700&display=swap');
        body, html { background-color: #e8d1b5 !important; margin: 0; padding: 0; height: 100%; width: 100%; }
      `}</style>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={styles.loginCard}>
        <div style={styles.loginHeader}>
          <div style={styles.iconCircle}><FontAwesomeIcon icon={faFingerprint} /></div>
          <h2 style={styles.title}>System <span style={styles.light}>Access</span></h2>
        </div>
        {authError && <div style={styles.errorMsg}>{authError}</div>}
        <form onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
          <input type="email" placeholder="Identity" style={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Passphrase" style={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" style={styles.btn} disabled={loginLoading}>{loginLoading ? 'Verifying...' : 'Authenticate'}</button>
        </form>
      </motion.div>
    </div>
  );

  return (
    <div style={styles.layout}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Armata&family=Playfair+Display:ital,wght@0,400;1,700&display=swap');
        body, html { background-color: #e8d1b5 !important; margin: 0; padding: 0; height: 100%; width: 100%; }
      `}</style>

      <nav style={styles.sidebar}>
        <div style={styles.brand}><FontAwesomeIcon icon={faBolt} /> Master <span style={styles.light}>Panel</span></div>
        <div style={styles.menu}>
          <div onClick={() => setActiveTab('streams')} style={styles.menuItem(activeTab === 'streams')}><FontAwesomeIcon icon={faLayerGroup} /> Broadcasts</div>
          <div onClick={() => setActiveTab('devotees')} style={styles.menuItem(activeTab === 'devotees')}><FontAwesomeIcon icon={faUsers} /> Devotees</div>
          <div onClick={() => setActiveTab('website')} style={styles.menuItem(activeTab === 'website')}><FontAwesomeIcon icon={faShieldHalved} /> Safety</div>
        </div>
        <button onClick={() => supabase.auth.signOut()} style={styles.logoutBtn}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} /> Sign Out
        </button>
      </nav>

      <main style={styles.main}>
        <header style={styles.header}>
          <h1 style={styles.title}>
            {activeTab === 'streams' ? 'Stream' : activeTab === 'devotees' ? 'Subscriber' : 'System'} <span style={styles.light}>Registry</span>
          </h1>
          <div style={styles.systemStatus(maintMode)}>
            <div style={styles.statusDot(maintMode)}></div>
            {maintMode ? 'SYSTEM LOCKED' : 'SYSTEM ONLINE'}
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'streams' && (
            <motion.div key="streams" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={styles.grid}>
              {items.map(item => (
                <div key={item.id} style={styles.card}>
                  <div style={styles.cardTop}>
                    <h3 style={styles.cardTitle}>{item.title}</h3>
                    <span style={styles.statusTag(item.status)}>{item.status}</span>
                  </div>
                  <div style={styles.pillContainer}>
                    <button onClick={() => {setPendingAction({type:'stream', id:item.id, newStatus:'upcoming'}); setShowSecurity(true)}} style={styles.pillBtn(item.status === 'upcoming')}>Upcoming</button>
                    <button onClick={() => {setPendingAction({type:'stream', id:item.id, newStatus:'live'}); setShowSecurity(true)}} style={styles.pillBtn(item.status === 'live', true)}>LIVE</button>
                    <button onClick={() => {setPendingAction({type:'stream', id:item.id, newStatus:'completed'}); setShowSecurity(true)}} style={styles.pillBtn(item.status === 'completed')}>Ended</button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'devotees' && (
            <motion.div key="devotees" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={styles.card}>
              <h3 style={{...styles.cardTitle, marginBottom: '20px'}}>Notifications Requested ({subscribers.length})</h3>
              <table style={styles.table}>
                <thead>
                  <tr><th style={styles.th}>Email Address</th><th style={styles.th}>Subscription Date</th></tr>
                </thead>
                <tbody>
                  {subscribers.map((sub) => (
                    <tr key={sub.id}><td style={styles.td}>{sub.email}</td><td style={styles.td}>{new Date(sub.created_at).toLocaleDateString()}</td></tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}

          {activeTab === 'website' && (
            <motion.div key="safety" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={styles.safetyPanel}>
              <div style={styles.safetyHeader}>
                <div style={styles.safetyIconWrapper(maintMode)}><FontAwesomeIcon icon={faServer} /></div>
                <div>
                  <h2 style={styles.title}>Global <span style={styles.light}>Kill Switch</span></h2>
                  <p style={styles.instruction}>Immediately toggle maintenance mode across the platform.</p>
                </div>
              </div>
              {!isSwitchArmed ? (
                <button onClick={() => setIsSwitchArmed(true)} style={styles.btn}>Unlock Safety Switch</button>
              ) : (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => {setPendingAction({type:'system', newStatus: !maintMode}); setShowSecurity(true)}} style={{...styles.btn, background: maintMode ? '#10B981' : '#ef4444', flex: 2}}>
                    {maintMode ? "Restore Site" : "ACTIVATE KILL SWITCH"}
                  </button>
                  <button onClick={() => setIsSwitchArmed(false)} style={{...styles.btn, background: '#fff', color: '#4a2c1a', flex: 1}}>Cancel</button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {showSecurity && (
          <div style={styles.overlay}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} style={styles.modal}>
              <button onClick={() => setShowSecurity(false)} style={styles.closeModal}><FontAwesomeIcon icon={faXmark} /></button>
              <FontAwesomeIcon icon={faLock} style={{fontSize: '32px', color: '#4a2c1a', marginBottom: '20px'}} />
              <h3 style={styles.title}>Master <span style={styles.light}>Key</span></h3>
              <form onSubmit={executeAction}>
                <input autoFocus type="password" placeholder="••••••" style={styles.modalInput} value={actionKey} onChange={(e) => setActionKey(e.target.value)} />
                <button type="submit" style={styles.btn}>{verifying ? 'Authorizing...' : 'Confirm Action'}</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- STYLE OBJECT (Restored & Enhanced) ---
const styles = {
  layout: { display: 'flex', minHeight: '100vh', background: '#e8d1b5', fontFamily: '"Armata", sans-serif', color: '#4a2c1a' },
  sidebar: { width: '280px', background: 'rgba(74, 44, 26, 0.05)', borderRight: '1px solid rgba(74, 44, 26, 0.1)', padding: '50px 30px' },
  brand: { fontSize: '24px', color: '#4a2c1a', marginBottom: '50px', fontFamily: '"Playfair Display", serif', fontWeight: 'bold' },
  menuItem: (a) => ({ padding: '14px 20px', cursor: 'pointer', borderRadius: '50px', background: a ? '#4a2c1a' : 'transparent', color: a ? '#fff' : '#4a2c1a', marginBottom: '10px', fontSize: '13px', fontWeight: 'bold' }),
  logoutBtn: { background: 'none', border: 'none', color: '#8b4513', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' },
  main: { flex: 1, padding: '60px', background: '#e8d1b5' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' },
  title: { fontSize: '32px', color: '#4a2c1a', fontFamily: '"Playfair Display", serif', margin: 0 },
  light: { fontStyle: 'italic', opacity: 0.7 },
  card: { background: 'rgba(255, 255, 255, 0.4)', borderRadius: '35px', padding: '30px', border: '1px solid #d4a373', boxShadow: '0 10px 30px rgba(74, 44, 26, 0.05)' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' },
  cardTitle: { fontFamily: '"Playfair Display", serif', fontSize: '18px', margin: 0 },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  statusTag: (s) => ({ fontSize: '10px', padding: '4px 10px', borderRadius: '50px', background: s === 'live' ? '#8b4513' : '#fff', color: s === 'live' ? '#fff' : '#4a2c1a', fontWeight: 'bold' }),
  pillContainer: { display: 'flex', background: '#fff', borderRadius: '50px', padding: '5px', border: '1px solid #d4a373' },
  pillBtn: (a, live) => ({ flex: 1, padding: '10px', borderRadius: '50px', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold', background: a ? (live ? '#8b4513' : '#4a2c1a') : 'transparent', color: a ? '#fff' : '#4a2c1a' }),
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '15px', fontSize: '11px', color: '#8b4513', borderBottom: '1px solid #d4a373' },
  td: { padding: '15px', color: '#4a2c1a', fontSize: '14px', borderBottom: '1px solid rgba(139, 69, 19, 0.1)' },
  loginContainer: { height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e8d1b5' },
  loginCard: { background: 'rgba(255, 255, 255, 0.5)', padding: '50px', borderRadius: '40px', width: '360px', textAlign: 'center', border: '1px solid #d4a373' },
  input: { width: '100%', padding: '16px 25px', borderRadius: '50px', border: '1px solid #d4a373', outline: 'none', background: '#fff', fontSize: '15px', boxSizing: 'border-box' },
  btn: { background: '#4a2c1a', color: '#fff', border: 'none', padding: '16px 32px', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '1px' },
  overlay: { position: 'fixed', inset: 0, background: 'rgba(45, 26, 10, 0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modal: { background: '#e8d1b5', padding: '40px', borderRadius: '40px', width: '320px', textAlign: 'center', position: 'relative', border: '2px solid #4a2c1a' },
  modalInput: { width: '100%', padding: '15px', borderRadius: '50px', border: '1px solid #4a2c1a', textAlign: 'center', fontSize: '18px', marginBottom: '20px', outline: 'none' },
  systemStatus: (m) => ({ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '50px', background: m ? '#FEF2F2' : '#ECFDF5', fontSize: '11px', fontWeight: 'bold' }),
  statusDot: (m) => ({ width: '8px', height: '8px', borderRadius: '50%', background: m ? '#ef4444' : '#10B981' }),
  loadingContainer: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e8d1b5' },
  safetyPanel: { background: 'rgba(255, 255, 255, 0.4)', padding: '40px', borderRadius: '40px', maxWidth: '600px', margin: '0 auto', border: '1px solid #d4a373' },
  safetyHeader: { display: 'flex', gap: '20px', marginBottom: '30px' },
  safetyIconWrapper: (m) => ({ width: '50px', height: '50px', borderRadius: '15px', background: m ? '#ef4444' : '#4a2c1a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }),
  closeModal: { position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#8b4513' }
};

export default AdminPanel;