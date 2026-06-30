export default function StatCard({ title, value, icon: Icon, color, subtitle }) {
  const variants = {
    indigo:  { bg: '#eef2ff', icon: '#6366f1', border: '#c7d2fe', text: '#4338ca', bar: 'linear-gradient(135deg,#6366f1,#8b5cf6)' },
    emerald: { bg: '#ecfdf5', icon: '#10b981', border: '#a7f3d0', text: '#059669', bar: 'linear-gradient(135deg,#10b981,#34d399)' },
    rose:    { bg: '#fef2f2', icon: '#ef4444', border: '#fecaca', text: '#dc2626', bar: 'linear-gradient(135deg,#ef4444,#f87171)' },
    amber:   { bg: '#fffbeb', icon: '#f59e0b', border: '#fde68a', text: '#d97706', bar: 'linear-gradient(135deg,#f59e0b,#fbbf24)' },
    blue:    { bg: '#eff6ff', icon: '#3b82f6', border: '#bfdbfe', text: '#2563eb', bar: 'linear-gradient(135deg,#3b82f6,#60a5fa)' },
    violet:  { bg: '#f5f3ff', icon: '#8b5cf6', border: '#ddd6fe', text: '#7c3aed', bar: 'linear-gradient(135deg,#8b5cf6,#a78bfa)' },
  };
  const v = variants[color] || variants.indigo;

  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '16px',
      padding: '22px 24px',
      boxShadow: '0 1px 3px rgba(15,23,42,0.07), 0 1px 2px rgba(15,23,42,0.04)',
      border: '1px solid #f1f5f9',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'default',
      position: 'relative',
      overflow: 'hidden',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 8px 24px rgba(15,23,42,0.1)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 1px 3px rgba(15,23,42,0.07), 0 1px 2px rgba(15,23,42,0.04)';
    }}
    >
      {/* Top color bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: v.bar }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginTop: '4px' }}>
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
          {title}
        </span>
        <div style={{
          width: '38px', height: '38px', borderRadius: '10px',
          background: v.bg, border: `1px solid ${v.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {Icon && <Icon size={18} color={v.icon} />}
        </div>
      </div>

      <div>
        <div style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.8px', lineHeight: 1.1 }}>
          {value}
        </div>
        {subtitle && (
          <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>{subtitle}</div>
        )}
      </div>
    </div>
  );
}
