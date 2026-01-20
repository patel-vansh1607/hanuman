import React, { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  faLayerGroup, faShieldHalved, faArrowRightFromBracket, faCircleNotch, faUsers, faCheckCircle, 
  faBars, faChevronLeft, faKey, faXmark, faBullhorn, faTrash, faPaperPlane
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Reliable Font Import
import wanoFont from '../assets/wano-quin-wano-quin-regular-400.ttf';

const AdminPanel = () => {
  const [session, setSession] = useState(null);
  const [pageLoading, setPageLoading] = useState(true); 
  const [items, setItems] = useState([]);
  const [subscribers, setSubscribers] = useState([]); 
  const [announcements, setAnnouncements] = useState([]); // REPLACED: Ticker state
  const [maintMode, setMaintMode] = useState(false);
  const [activeTab, setActiveTab] = useState('streams'); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // AUTH & SECURITY
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [isGreeting, setIsGreeting] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  
  // LOCK LOGIC STATES
  const [isLocked, setIsLocked] = useState(false);
  const [lockPass, setLockPass] = useState('');
  const [verifying, setVerifying] = useState(false);
  const timeoutRef = useRef(null);

  // ACTION MODALS
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [showSecurity, setShowSecurity] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); 
  const [actionKey, setActionKey] = useState('');
  const [isSwitchArmed, setIsSwitchArmed] = useState(false);
  const [newAnnouncementText, setNewAnnouncementText] = useState('');

  // --- 30s INACTIVITY LOCK LOGIC ---
  const resetTimer = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (showDashboard && !isLocked) {
      timeoutRef.current = setTimeout(() => setIsLocked(true), 30000); 
    }
  }, [showDashboard, isLocked]);

  useEffect(() => {
    const events = ['mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(e => window.addEventListener(e, resetTimer));
    resetTimer();
    return () => events.forEach(e => window.removeEventListener(e, resetTimer));
  }, [resetTimer]);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session: activeSession } } = await supabase.auth.getSession();
      if (activeSession) {
        setSession(activeSession);
        setShowDashboard(true);
        loadDashboardData();
        fetchSubscribers();
        fetchAnnouncements();
      }
      setPageLoading(false);
    };
    checkSession();
  }, []);

  const triggerToast = (msg, type = 'success') => {
    setToast({ show: true, message: msg, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

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

  const fetchAnnouncements = async () => {
    const { data } = await supabase.from('ticker_messages').select('*').order('created_at', { ascending: false });
    setAnnouncements(data || []);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) {
      setLoginLoading(false);
      setIsGreeting(true); 
      setTimeout(() => {
        setSession(data.session);
        loadDashboardData();
        fetchSubscribers();
        fetchAnnouncements();
        setShowDashboard(true);
        setIsGreeting(false);
      }, 2000);
    } else {
      setLoginLoading(false);
      triggerToast("Unauthorized", "error");
    }
  };

  const handleUnlock = async (e) => {
    e.preventDefault();
    setVerifying(true);
    const { error } = await supabase.auth.signInWithPassword({ 
      email: session.user.email, 
      password: lockPass 
    });
    if (!error) { 
      setIsLocked(false); 
      setLockPass(''); 
      resetTimer(); 
    } else { 
      triggerToast("Invalid Password", "error"); 
    }
    setVerifying(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  const executeAction = async (e) => {
    e.preventDefault();
    setVerifying(true);
    const { data, error } = await supabase.from('system_secrets').select('key_value').eq('key_name', 'admin_action_key').single();
    if (!error && actionKey === data.key_value) {
      if (pendingAction.type === 'stream') {
        await supabase.from('programmes').update({ status: pendingAction.newStatus, is_live: pendingAction.newStatus === 'live' }).eq('id', pendingAction.id);
        triggerToast(`Updated to ${pendingAction.newStatus}`);
      } else if (pendingAction.type === 'system') {
        await supabase.from('site_settings').update({ maintenance_mode: pendingAction.newStatus }).eq('id', 'global_config');
        setIsSwitchArmed(false); setMaintMode(pendingAction.newStatus);
        triggerToast(pendingAction.newStatus ? "System Locked" : "System Restored");
      } else if (pendingAction.type === 'addAnnouncement') {
        await supabase.from('ticker_messages').insert([{ content: newAnnouncementText }]);
        setNewAnnouncementText('');
        fetchAnnouncements();
        triggerToast("Broadcast Sent Live");
      } else if (pendingAction.type === 'deleteAnnouncement') {
        await supabase.from('ticker_messages').delete().eq('id', pendingAction.id);
        fetchAnnouncements();
        triggerToast("Announcement Removed");
      }
      loadDashboardData();
      setShowSecurity(false); setActionKey(''); setPendingAction(null);
    } else { triggerToast("Invalid Master Key", "error"); }
    setVerifying(false);
  };

  const BrandHeader = ({ isSidebar = false }) => (
    <div className={`brand-container ${isSidebar ? 'sidebar-brand' : 'main-brand'}`}>
      <img
        className="brand-logo"
        src="https://res.cloudinary.com/dbsm7cstc/image/upload/v1766394595/hmi22_qxyuks.png"
        alt="Hanuman"
      />
      <div className="brand-text-wrapper">
        <p className="brand-title">Hanuman Dada Murti Inauguration</p>
        <p className="brand-subtitle">ADMIN PANEL</p>
      </div>
    </div>
  );

  if (pageLoading) return <div style={styles.loadingContainer}><FontAwesomeIcon icon={faCircleNotch} spin style={{ fontSize: '40px', color: '#2d0c01' }} /></div>;

  return (
    <div style={styles.layout}>
      <style>{`
        @font-face { font-family: 'WanoQuin'; src: url(${wanoFont}) format('truetype'); }
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        
        body { margin: 0; padding: 0; background: #e8d1b5; font-family: 'Poppins', sans-serif; overflow-x: hidden; color: #2d0c01; }
        .brand-container { display: flex; align-items: center; gap: 18px; }
        .brand-logo { height: 75px; width: auto; object-fit: contain; }
        .brand-title { margin: 0; font-size: 48px; font-family: 'WanoQuin', sans-serif; line-height: 0.9; color: #2d0c01; }
        .brand-subtitle { margin: 0; font-size: 16px; font-weight: 700; letter-spacing: 3px; color: #2d0c01; opacity: 0.8; }
        .sidebar-brand .brand-logo { height: 50px; }
        .sidebar-brand .brand-title { color: #F5D07E; font-size: 26px; }
        .sidebar-brand .brand-subtitle { color: #fff; font-size: 10px; letter-spacing: 2px; }

        @media (max-width: 991px) {
          .sidebar { transform: translateX(${isMobileMenuOpen ? '0' : '-100%'}); z-index: 9999; transition: 0.4s ease; width: 280px !important; }
          .main-content { margin-left: 0 !important; width: 100% !important; padding: 110px 20px 40px 20px !important; }
          .mobile-header { display: flex !important; background: #F5D07E !important; }
          .brand-logo { height: 45px; }
          .brand-title { font-size: 24px; }
          .brand-subtitle { font-size: 9px; }
        }
      `}</style>

      {!showDashboard && (
        <div style={styles.loginContainer}>
           <AnimatePresence mode="wait">
            {!isGreeting ? (
              <motion.div key="card" exit={{ opacity: 0, scale: 0.95 }} style={styles.loginCard}>
                <BrandHeader />
                <form onSubmit={handleLogin} style={{marginTop:'35px', display:'flex', flexDirection:'column', gap:'15px'}}>
                  <input type="email" placeholder="Email" style={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} required />
                  <input type="password" placeholder="Password" style={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <button type="submit" style={styles.loginBtn}>{loginLoading ? "..." : "Access Control Panel"}</button>
                </form>
              </motion.div>
            ) : (
              <motion.div key="hi" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{textAlign:'center'}}>
                <FontAwesomeIcon icon={faCheckCircle} style={{fontSize:'70px', color:'#2d0c01', marginBottom:'20px'}} />
                <h1 style={{fontFamily:'WanoQuin', fontSize:'52px', color:'#2d0c01', margin:0}}>Welcome</h1>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {showDashboard && (
        <>
          <div style={styles.mobileHeader} className="mobile-header">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={styles.menuToggle}>
              <FontAwesomeIcon icon={isMobileMenuOpen ? faXmark : faBars} />
            </button>
            <BrandHeader />
          </div>

          <nav style={styles.sidebar} className="sidebar">
            <div style={{marginBottom: '50px'}}><BrandHeader isSidebar={true} /></div>
            <div style={styles.menu}>
              <div onClick={() => {setActiveTab('streams'); setIsMobileMenuOpen(false)}} style={styles.menuItem(activeTab === 'streams')}><FontAwesomeIcon icon={faLayerGroup} style={{width:'20px'}} /> Live Status</div>
              <div onClick={() => {setActiveTab('broadcast'); setIsMobileMenuOpen(false)}} style={styles.menuItem(activeTab === 'broadcast')}><FontAwesomeIcon icon={faBullhorn} style={{width:'20px'}} /> Broadcasts</div>
              <div onClick={() => {setActiveTab('devotees'); setIsMobileMenuOpen(false)}} style={styles.menuItem(activeTab === 'devotees')}><FontAwesomeIcon icon={faUsers} style={{width:'20px'}} /> Devotees</div>
              <div onClick={() => {setActiveTab('website'); setIsMobileMenuOpen(false)}} style={styles.menuItem(activeTab === 'website')}><FontAwesomeIcon icon={faShieldHalved} style={{width:'20px'}} /> Safety</div>
            </div>
            <button onClick={handleSignOut} style={styles.logoutBtn}><FontAwesomeIcon icon={faArrowRightFromBracket} /> Logout</button>
          </nav>

          <main style={styles.main} className="main-content">
            <header style={styles.header}>
              <h1 style={{fontFamily:'WanoQuin', color:'#2d0c01', fontSize:'40px', margin:0}}>
                {activeTab === 'broadcast' ? 'Announcement Hub' : activeTab}
              </h1>
              <div style={styles.systemStatus(maintMode)}>
                <div style={styles.statusDot(maintMode)}></div>
                <span style={{fontSize: '12px', fontWeight: '800'}}>{maintMode ? 'SYSTEM LOCKED' : 'LIVE'}</span>
              </div>
            </header>

            {activeTab === 'streams' && (
              <div style={styles.grid}>
                {items.map(item => (
                  <div key={item.id} style={styles.card}>
                    <div style={styles.cardTop}><h3>{item.title}</h3><span style={styles.statusTag}>{item.status}</span></div>
                    <div style={styles.pillContainer}>
                      {['upcoming', 'live', 'completed'].map(s => (
                        <button key={s} onClick={() => {setPendingAction({type:'stream', id:item.id, newStatus:s}); setShowSecurity(true)}} style={styles.pillBtn(item.status === s, s === 'live')}>{s}</button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: BROADCAST HUB */}
            {activeTab === 'broadcast' && (
              <div style={{display:'flex', flexDirection:'column', gap:'30px'}}>
                <div style={styles.card}>
                  <h3 style={{marginTop:0}}>Push Live Announcement</h3>
                  <div style={{display:'flex', gap:'15px', flexDirection: 'column'}}>
                    <textarea 
                      style={{...styles.input, minHeight: '100px', resize: 'none'}} 
                      placeholder="Type your announcement here..." 
                      value={newAnnouncementText} 
                      onChange={(e)=>setNewAnnouncementText(e.target.value)} 
                    />
                    <button 
                      onClick={() => {setPendingAction({type:'addAnnouncement'}); setShowSecurity(true)}} 
                      style={{...styles.btn, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}
                    >
                      <FontAwesomeIcon icon={faPaperPlane} /> Broadcast to Website
                    </button>
                  </div>
                </div>

                <div style={styles.card}>
                  <h3 style={{marginTop:0}}>Active Announcements</h3>
                  {announcements.length === 0 ? (
                    <p style={{opacity: 0.5}}>No active announcements.</p>
                  ) : (
                    announcements.map(t => (
                      <div key={t.id} style={{display:'flex', justifyContent:'space-between', padding:'15px 0', borderBottom:'1px solid rgba(0,0,0,0.05)', alignItems: 'center'}}>
                        <span style={{maxWidth: '85%'}}>{t.content}</span>
                        <button onClick={() => {setPendingAction({type:'deleteAnnouncement', id:t.id}); setShowSecurity(true)}} style={{background:'rgba(239, 68, 68, 0.1)', border:'none', color:'#ef4444', width: '40px', height: '40px', borderRadius: '10px', cursor:'pointer'}}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'devotees' && (
              <div style={{...styles.card, overflowX:'auto'}}>
                <table style={{width:'100%', borderCollapse:'collapse'}}>
                  <thead><tr><th style={styles.th}>Registry Email</th><th style={styles.th}>Authorized On</th></tr></thead>
                  <tbody>{subscribers.map(sub => (<tr key={sub.id}><td style={styles.td}>{sub.email}</td><td style={styles.td}>{new Date(sub.created_at).toLocaleDateString()}</td></tr>))}</tbody>
                </table>
              </div>
            )}

            {activeTab === 'website' && (
              <div style={{...styles.card, maxWidth:'500px'}}>
                <h2 style={{fontFamily:'WanoQuin', fontSize:'32px', color:'#2d0c01'}}>Kill Switch</h2>
                <p>Redirect traffic to standby page.</p>
                {!isSwitchArmed ? (
                  <button onClick={() => setIsSwitchArmed(true)} style={styles.btn}>Unlock Controls</button>
                ) : (
                  <div style={{display:'flex', gap:'10px', flexDirection:'column'}}>
                    <button onClick={() => {setPendingAction({type:'system', newStatus: !maintMode}); setShowSecurity(true)}} style={{...styles.btn, background: maintMode ? '#10B981' : '#ef4444'}}>{maintMode ? "Enable Public" : "Emergency Lock"}</button>
                    <button onClick={() => setIsSwitchArmed(false)} style={{...styles.btn, background:'#fff', color:'#2d0c01'}}>Cancel</button>
                  </div>
                )}
              </div>
            )}
          </main>

          <AnimatePresence>
            {isLocked && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.lockOverlay}>
                <motion.div initial={{ y: 20 }} animate={{ y: 0 }} style={styles.lockCard}>
                  <BrandHeader />
                  <div style={{marginTop:'30px', width: '100%', boxSizing: 'border-box'}}>
                    <h2 style={{fontFamily:'WanoQuin', fontSize:'24px', color:'#2d0c01', marginBottom:'20px'}}>Session Locked</h2>
                    <form onSubmit={handleUnlock} style={{width:'100%'}}>
                      <div style={{width:'100%', boxSizing:'border-box', marginBottom:'15px'}}>
                        <input 
                          autoFocus 
                          type="password" 
                          placeholder="Password to Resume" 
                          style={styles.modalInput} 
                          value={lockPass} 
                          onChange={(e) => setLockPass(e.target.value)} 
                        />
                      </div>
                      <button type="submit" style={styles.continueBtn}>{verifying ? "Unlocking..." : "Resume Session"}</button>
                    </form>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showSecurity && (
              <div style={styles.overlay}>
                <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={styles.modal}>
                  <button onClick={() => setShowSecurity(false)} style={styles.backBtn}><FontAwesomeIcon icon={faChevronLeft} /></button>
                  <div style={{textAlign:'center', marginBottom:'30px'}}>
                      <h2 style={{fontFamily:'WanoQuin', fontSize:'36px', color: '#2d0c01', margin:0}}>Authorize</h2>
                  </div>
                  <form onSubmit={executeAction}>
                    <div style={styles.inputBox}>
                       <FontAwesomeIcon icon={faKey} style={{opacity:0.4}} />
                       <input autoFocus type="password" placeholder="Master Key" style={{...styles.modalInput, border:'none', marginBottom:0, background:'transparent'}} value={actionKey} onChange={(e) => setActionKey(e.target.value)} />
                    </div>
                    <button type="submit" style={styles.continueBtn}>Confirm Action</button>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          <AnimatePresence>{toast.show && <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 100, opacity: 0 }} style={styles.toast(toast.type)}>{toast.message}</motion.div>}</AnimatePresence>
        </>
      )}
    </div>
  );
};

const styles = {
  layout: { display: 'flex', minHeight: '100vh', background: '#e8d1b5' },
  sidebar: { position: 'fixed', width: '320px', height: '100vh', background: '#2d0c01', color: '#fff', padding: '50px 30px', boxSizing: 'border-box' },
  main: { flex: 1, marginLeft: '320px', padding: '60px', width: 'calc(100% - 320px)', boxSizing: 'border-box' },
  menuItem: (a) => ({ padding: '18px 22px', cursor: 'pointer', borderRadius: '15px', background: a ? '#F5D07E' : 'rgba(255,255,255,0.03)', color: a ? '#2d0c01' : '#fff', marginBottom: '12px', fontSize: '16px', fontWeight: '600', display:'flex', alignItems:'center', gap:'15px' }),
  logoutBtn: { background: 'none', border: '1px solid #F5D07E', color: '#F5D07E', padding:'14px', borderRadius:'12px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', position: 'absolute', bottom: '50px', width:'calc(100% - 60px)' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '25px' },
  card: { background: 'rgba(255, 255, 255, 0.45)', padding: '30px', borderRadius: '35px', border: '1px solid #F5D07E' },
  cardTop: { display: 'flex', justifyContent: 'space-between', marginBottom: '25px', alignItems:'center' },
  statusTag: { fontSize: '11px', padding: '5px 12px', borderRadius: '10px', background: '#fff', border: '1px solid #F5D07E', fontWeight:'800' },
  pillContainer: { display: 'flex', background: '#fff', borderRadius: '18px', padding: '6px', border: '1px solid rgba(245, 208, 126, 0.4)' },
  pillBtn: (a, live) => ({ flex: 1, padding: '12px 5px', borderRadius: '14px', border: 'none', background: a ? (live ? '#ef4444' : '#2d0c01') : 'transparent', color: a ? '#fff' : '#2d0c01', cursor: 'pointer', fontWeight: '700', fontSize:'12px' }),
  systemStatus: (m) => ({ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 20px', background: '#fff', borderRadius: '50px', border: '1px solid #F5D07E' }),
  statusDot: (m) => ({ width: '10px', height: '10px', borderRadius: '50%', background: m ? '#ef4444' : '#10b981' }),
  loginContainer: { height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e8d1b5' },
  loginCard: { background: 'rgba(255, 255, 255, 0.6)', padding: '50px', borderRadius: '50px', width: 'min(90%, 550px)', border: '1px solid #F5D07E', textAlign: 'center' },
  input: { width: '100%', boxSizing:'border-box', padding: '18px 22px', borderRadius: '18px', border: '1px solid rgba(45, 12, 1, 0.1)', fontSize:'16px' },
  loginBtn: { width: '100%', background: '#2d0c01', color: '#fff', border: 'none', padding: '18px', borderRadius: '18px', fontWeight: 'bold', cursor: 'pointer' },
  overlay: { position: 'fixed', inset: 0, background: 'rgba(45, 12, 1, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, backdropFilter: 'blur(10px)', padding:'20px' },
  modal: { background: '#fff', padding: '50px 35px', borderRadius: '45px', width: 'min(100%, 420px)', position:'relative' },
  backBtn: { position:'absolute', top:'30px', left:'30px', background:'#f5f5f5', border: 'none', width: '40px', height: '40px', borderRadius: '12px', cursor: 'pointer' },
  inputBox: { display:'flex', alignItems:'center', gap:'15px', background:'#f9f9f9', padding:'0 20px', borderRadius:'18px', border:'1px solid #eee', marginBottom:'25px' },
  modalInput: { width: '100%', boxSizing:'border-box', padding: '20px 15px', border: '1px solid #F5D07E', background: '#f9f9f9', outline:'none', fontSize:'18px', borderRadius:'18px' },
  continueBtn: { width: '100%', background: '#2d0c01', color: '#fff', border: 'none', padding: '20px', borderRadius: '18px', fontWeight: 'bold', cursor: 'pointer' },
  toast: (t) => ({ position:'fixed', bottom:'40px', right:'40px', padding:'18px 30px', background:t==='success'?'#2d0c01':'#ef4444', color:'#fff', borderRadius:'20px', zIndex:20000, fontWeight:'700' }),
  th: { textAlign: 'left', padding: '20px', borderBottom: '2px solid #F5D07E', fontSize: '12px', textTransform:'uppercase' },
  td: { padding: '20px', borderBottom: '1px solid rgba(45, 12, 1, 0.05)', fontSize: '15px' },
  lockOverlay: { position:'fixed', inset:0, background:'rgba(232, 209, 181, 0.8)', backdropFilter:'blur(20px)', zIndex:15000, display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' },
  lockCard: { background:'#fff', padding:'50px', borderRadius:'50px', width:'min(100%, 480px)', textAlign:'center', border: '1px solid #F5D07E', boxShadow:'0 20px 40px rgba(0,0,0,0.1)', boxSizing: 'border-box' },
  mobileHeader: { display: 'none', position: 'fixed', top: 0, left: 0, right: 0, height: '95px', background: '#F5D07E', alignItems: 'center', padding: '0 25px', zIndex: 1000, justifyContent: 'flex-start', gap: '20px' },
  menuToggle: { background: '#2d0c01', color: '#fff', border: 'none', width: '50px', height: '50px', borderRadius: '15px', cursor: 'pointer', fontSize: '20px' },
  loadingContainer: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e8d1b5' },
  btn: { background: '#2d0c01', color: '#fff', border: 'none', padding: '18px', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer' },
};

export default AdminPanel;