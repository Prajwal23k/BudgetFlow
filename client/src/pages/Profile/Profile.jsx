import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import { LogOut, Mail, Shield, Sparkles, UserCircle } from 'lucide-react';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const initials = (user?.name || user?.email || 'U')
    .split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2);

  return (
    <div>
      <PageHeader title="Profile" subtitle="Your account information" />

      <div style={{ maxWidth: '520px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Avatar card */}
        <div style={{ background: '#ffffff', borderRadius: '20px', padding: '32px', boxShadow: '0 1px 3px rgba(15,23,42,0.07)', border: '1px solid #f1f5f9', textAlign: 'center' }}>
          {/* Gradient top strip */}
          <div style={{ position: 'relative' }}>
            <div style={{ height: '80px', borderRadius: '12px', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', marginBottom: '-40px' }} />
            <div style={{
              width: '76px', height: '76px', borderRadius: '50%',
              background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '26px', fontWeight: 800, color: 'white',
              margin: '0 auto', border: '4px solid white',
              boxShadow: '0 4px 16px rgba(99,102,241,0.3)',
              position: 'relative', zIndex: 1,
            }}>
              {initials}
            </div>
          </div>
          <h2 style={{ margin: '14px 0 4px', fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>
            {user?.name || 'User'}
          </h2>
          <p style={{ margin: 0, fontSize: '14px', color: '#94a3b8' }}>{user?.email || ''}</p>
        </div>

        {/* Info rows */}
        <div style={{ background: '#ffffff', borderRadius: '16px', boxShadow: '0 1px 3px rgba(15,23,42,0.07)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
          {[
            { icon: UserCircle, label: 'Full Name',  value: user?.name || '—',     color: '#6366f1', bg: '#eef2ff' },
            { icon: Mail,       label: 'Email',       value: user?.email || '—',    color: '#10b981', bg: '#ecfdf5' },
            { icon: Shield,     label: 'Account Type',value: 'Member',              color: '#f59e0b', bg: '#fffbeb' },
            { icon: Sparkles,   label: 'Plan',        value: 'BudgetFlow Free',     color: '#8b5cf6', bg: '#f5f3ff' },
          ].map(({ icon: Icon, label, value, color, bg }, i, arr) => (
            <div key={label} style={{
              display: 'flex', alignItems: 'center', gap: '14px',
              padding: '16px 20px',
              borderBottom: i < arr.length - 1 ? '1px solid #f8fafc' : 'none',
            }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={17} color={color} />
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '2px' }}>{label}</div>
                <div style={{ fontSize: '14px', color: '#1e293b', fontWeight: 500 }}>{value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Logout */}
        <button id="profile-logout-btn" onClick={() => { logout(); navigate('/login'); }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            width: '100%', padding: '13px', borderRadius: '12px',
            border: '1.5px solid #fecaca', background: '#ffffff',
            color: '#ef4444', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
            transition: 'all 0.18s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#fef2f2'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#ffffff'; }}
        >
          <LogOut size={16} /> Sign out of account
        </button>
      </div>
    </div>
  );
}
