import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard, Receipt, TrendingUp,
  Wallet, UserCircle, LogOut, ChevronLeft,
  ChevronRight, Sparkles,
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/expenses',  icon: Receipt,          label: 'Expenses' },
  { to: '/income',    icon: TrendingUp,        label: 'Income' },
  { to: '/budgets',   icon: Wallet,            label: 'Budgets' },
  { to: '/profile',   icon: UserCircle,        label: 'Profile' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <aside style={{
      width: collapsed ? '68px' : '232px',
      minHeight: '100vh',
      background: '#ffffff',
      borderRight: '1px solid #e2e8f0',
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 0.28s cubic-bezier(0.4,0,0.2,1)',
      position: 'relative',
      flexShrink: 0,
      zIndex: 10,
    }}>

      {/* Logo */}
      <div style={{
        padding: collapsed ? '20px 0' : '20px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        justifyContent: collapsed ? 'center' : 'flex-start',
        borderBottom: '1px solid #f1f5f9',
        minHeight: '68px',
      }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '10px',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, boxShadow: '0 4px 12px rgba(99,102,241,0.3)',
        }}>
          <Sparkles size={17} color="white" />
        </div>
        {!collapsed && (
          <div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', letterSpacing: '-0.3px' }}>
              BudgetFlow
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '-1px' }}>Smart Finance</div>
          </div>
        )}
      </div>

      {/* Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          position: 'absolute', top: '24px', right: '-12px',
          width: '24px', height: '24px', borderRadius: '50%',
          background: '#ffffff', border: '1.5px solid #e2e8f0',
          cursor: 'pointer', display: 'flex', alignItems: 'center',
          justifyContent: 'center', color: '#64748b',
          boxShadow: '0 2px 8px rgba(15,23,42,0.1)', zIndex: 20,
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#6366f1'; e.currentTarget.style.color = '#6366f1'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#64748b'; }}
      >
        {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
      </button>

      {/* Nav label */}
      {!collapsed && (
        <div style={{ padding: '16px 16px 6px', fontSize: '10px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
          Menu
        </div>
      )}

      {/* Nav */}
      <nav style={{ flex: 1, padding: collapsed ? '12px 8px' : '4px 8px', overflowY: 'auto' }}>
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} style={({ isActive }) => ({
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: collapsed ? '10px 0' : '10px 12px',
            justifyContent: collapsed ? 'center' : 'flex-start',
            textDecoration: 'none',
            color: isActive ? '#6366f1' : '#64748b',
            background: isActive ? '#eef2ff' : 'transparent',
            borderRadius: '10px',
            margin: '2px 0',
            fontSize: '14px',
            fontWeight: isActive ? 600 : 450,
            transition: 'all 0.15s',
            position: 'relative',
          })}>
            {({ isActive }) => (
              <>
                {isActive && (
                  <div style={{
                    position: 'absolute', left: 0, top: '20%', bottom: '20%',
                    width: '3px', borderRadius: '0 3px 3px 0',
                    background: 'linear-gradient(180deg,#6366f1,#8b5cf6)',
                    marginLeft: '-8px',
                  }} />
                )}
                <Icon size={18} style={{ color: isActive ? '#6366f1' : '#94a3b8', flexShrink: 0 }} />
                {!collapsed && <span>{label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div style={{ padding: collapsed ? '12px 8px' : '12px', borderTop: '1px solid #f1f5f9' }}>
        {!collapsed && user && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '10px 12px', borderRadius: '10px',
            background: '#f8fafc', marginBottom: '6px',
          }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '13px', fontWeight: 700, color: 'white', flexShrink: 0,
            }}>
              {(user.name || user.email || 'U').charAt(0).toUpperCase()}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user.name || 'User'}
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user.email}
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => { logout(); navigate('/login'); }}
          style={{
            display: 'flex', alignItems: 'center', gap: '9px',
            width: '100%', padding: collapsed ? '10px 0' : '9px 12px',
            justifyContent: collapsed ? 'center' : 'flex-start',
            borderRadius: '10px', border: 'none',
            background: 'transparent', color: '#94a3b8',
            fontSize: '14px', transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.color = '#ef4444'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#94a3b8'; }}
        >
          <LogOut size={17} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
