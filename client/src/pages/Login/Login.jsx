import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, TrendingUp, Shield, Zap } from 'lucide-react';

const features = [
  { icon: TrendingUp, text: 'Track income & expenses effortlessly' },
  { icon: Shield,     text: 'Set budgets and stay in control' },
  { icon: Zap,        text: 'Visual insights into your finances' },
];

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#f8fafc' }}>
      {/* Left panel */}
      <div style={{
        width: '420px', flexShrink: 0,
        background: 'linear-gradient(145deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)',
        padding: '48px 40px', display: 'flex', flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '48px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={20} color="white" />
          </div>
          <span style={{ fontSize: '20px', fontWeight: 700, color: 'white', letterSpacing: '-0.3px' }}>BudgetFlow</span>
        </div>
        <h2 style={{ margin: '0 0 12px', fontSize: '30px', fontWeight: 800, color: 'white', lineHeight: 1.2, letterSpacing: '-0.5px' }}>
          Take control of your finances
        </h2>
        <p style={{ margin: '0 0 40px', fontSize: '15px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>
          Your smart personal finance manager — track, budget, and grow.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {features.map(({ icon: Icon, text }, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={16} color="white" />
              </div>
              <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.88)', fontWeight: 500 }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
        <div style={{ width: '100%', maxWidth: '380px' }}>
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ margin: '0 0 6px', fontSize: '26px', fontWeight: 700, color: '#0f172a', letterSpacing: '-0.4px' }}>
              Welcome back
            </h1>
            <p style={{ margin: 0, fontSize: '15px', color: '#64748b' }}>
              Sign in to your account to continue
            </p>
          </div>

          {error && (
            <div style={{ padding: '12px 16px', borderRadius: '10px', background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: '13px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>⚠</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={labelStyle}>Email address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={15} style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
                <input id="login-email" type="email" value={form.email}
                  onChange={e => { setForm({ ...form, email: e.target.value }); setError(''); }}
                  required placeholder="you@example.com"
                  style={{ ...inputStyle, paddingLeft: '38px', width: '100%' }}
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={15} style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
                <input id="login-password" type={showPassword ? 'text' : 'password'} value={form.password}
                  onChange={e => { setForm({ ...form, password: e.target.value }); setError(''); }}
                  required placeholder="Your password"
                  style={{ ...inputStyle, paddingLeft: '38px', paddingRight: '42px', width: '100%' }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '13px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 0, display: 'flex' }}>
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button id="login-submit" type="submit" disabled={loading} style={{
              ...btnPrimary, width: '100%', justifyContent: 'center', marginTop: '4px',
              opacity: loading ? 0.7 : 1,
            }}>
              {loading ? <Spinner /> : <><span>Sign in</span><ArrowRight size={15} /></>}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#64748b' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: 600 }}>Create one →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ width: '15px', height: '15px', border: '2px solid rgba(255,255,255,0.35)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
      Signing in...
    </span>
  );
}

const labelStyle = { display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' };
const inputStyle = { padding: '11px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '14px', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.18s, box-shadow 0.18s', color: '#0f172a', background: '#ffffff' };
const btnPrimary = { display: 'flex', alignItems: 'center', gap: '7px', padding: '12px 20px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', fontSize: '14px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 14px rgba(99,102,241,0.4)', transition: 'all 0.2s' };
