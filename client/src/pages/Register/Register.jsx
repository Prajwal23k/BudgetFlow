import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await register(form.name, form.email, form.password);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1800);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '10px 20px', borderRadius: '16px', background: '#ffffff', boxShadow: '0 2px 12px rgba(15,23,42,0.08)', border: '1px solid #f1f5f9' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '9px', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={16} color="white" />
            </div>
            <span style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a' }}>BudgetFlow</span>
          </div>
        </div>

        {/* Card */}
        <div style={{ background: '#ffffff', borderRadius: '20px', padding: '36px', boxShadow: '0 4px 24px rgba(15,23,42,0.08)', border: '1px solid #f1f5f9' }}>
          <div style={{ marginBottom: '28px' }}>
            <h1 style={{ margin: '0 0 6px', fontSize: '22px', fontWeight: 700, color: '#0f172a', letterSpacing: '-0.3px' }}>Create your account</h1>
            <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>Start managing your finances for free</p>
          </div>

          {success && (
            <div style={{ padding: '12px 16px', borderRadius: '10px', background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#059669', fontSize: '13px', marginBottom: '20px' }}>
              ✓ Account created! Redirecting to login…
            </div>
          )}
          {error && (
            <div style={{ padding: '12px 16px', borderRadius: '10px', background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: '13px', marginBottom: '20px' }}>
              ⚠ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { id: 'register-name', label: 'Full name', type: 'text', name: 'name', icon: User, placeholder: 'John Doe' },
              { id: 'register-email', label: 'Email address', type: 'email', name: 'email', icon: Mail, placeholder: 'you@example.com' },
            ].map(({ id, label, type, name, icon: Icon, placeholder }) => (
              <div key={name}>
                <label style={labelStyle}>{label}</label>
                <div style={{ position: 'relative' }}>
                  <Icon size={15} style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
                  <input id={id} type={type} value={form[name]}
                    onChange={e => { setForm({ ...form, [name]: e.target.value }); setError(''); }}
                    required placeholder={placeholder}
                    style={{ ...inputStyle, paddingLeft: '38px', width: '100%' }}
                  />
                </div>
              </div>
            ))}

            <div>
              <label style={labelStyle}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={15} style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
                <input id="register-password" type={showPassword ? 'text' : 'password'} value={form.password}
                  onChange={e => { setForm({ ...form, password: e.target.value }); setError(''); }}
                  required placeholder="Create a password"
                  style={{ ...inputStyle, paddingLeft: '38px', paddingRight: '42px', width: '100%' }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '13px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 0, display: 'flex' }}>
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button id="register-submit" type="submit" disabled={loading || success}
              style={{ ...btnPrimary, width: '100%', justifyContent: 'center', marginTop: '4px', opacity: (loading || success) ? 0.7 : 1 }}>
              {loading
                ? <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ width: '15px', height: '15px', border: '2px solid rgba(255,255,255,0.35)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} /> Creating...</span>
                : <><span>Create account</span><ArrowRight size={15} /></>
              }
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#64748b' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: 600 }}>Sign in →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const labelStyle = { display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' };
const inputStyle = { padding: '11px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '14px', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.18s, box-shadow 0.18s', color: '#0f172a', background: '#ffffff' };
const btnPrimary = { display: 'flex', alignItems: 'center', gap: '7px', padding: '12px 20px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', fontSize: '14px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 14px rgba(99,102,241,0.35)', transition: 'all 0.2s' };
