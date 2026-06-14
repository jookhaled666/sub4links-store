import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Shield, User } from 'lucide-react';
import { useAuth } from '../../context/AppContext';
import './Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, authError, setAuthError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(email, password);
    if (result.ok) {
      navigate(result.role === 'admin' ? '/admin' : '/customer');
    }
  };

  const fillDemo = (role) => {
    if (role === 'admin') {
      setEmail('admin@sup4links.com');
      setPassword('admin123');
    } else {
      setEmail('user@sup4links.com');
      setPassword('user123');
    }
    setAuthError('');
  };

  return (
    <div className="auth-page">
      <div className="auth-container animate-scale-in">
        <div className="auth-header">
          <Link to="/" className="auth-logo">
            <img src="/company-icon.png" alt="Sub4Links Icon" className="auth-logo-icon-img" />
            <img src="/company-logo.png" alt="Sub4Links Logo" className="auth-logo-text-img" />
          </Link>
          <h1 className="auth-title">تسجيل الدخول</h1>
          <p className="auth-subtitle">مرحباً بعودتك! يرجى إدخال بياناتك للمتابعة.</p>
        </div>

        {/* Demo Credentials */}
        <div style={{ display: 'flex', gap: '0.625rem', marginBottom: '1.25rem' }}>
          <button
            type="button"
            className="btn btn-ghost"
            style={{ flex: 1, fontSize: '0.8125rem', display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center', padding: '0.5rem' }}
            onClick={() => fillDemo('admin')}
          >
            <Shield size={14} style={{ color: 'var(--s4l-accent-cyan)' }} /> دخول كمدير
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            style={{ flex: 1, fontSize: '0.8125rem', display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center', padding: '0.5rem' }}
            onClick={() => fillDemo('customer')}
          >
            <User size={14} style={{ color: '#8B5CF6' }} /> دخول كعميل
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {authError && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: '#ef4444', fontSize: '0.875rem', marginBottom: '1rem', textAlign: 'center' }}>
              {authError}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">البريد الإلكتروني</label>
            <div className="input-with-icon">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                id="email"
                placeholder="أدخل بريدك الإلكتروني"
                value={email}
                onChange={e => { setEmail(e.target.value); setAuthError(''); }}
                required
                dir="ltr"
              />
            </div>
          </div>

          <div className="form-group">
            <div className="form-group-header">
              <label htmlFor="password">كلمة المرور</label>
              <a href="#" className="forgot-password">نسيت كلمة المرور؟</a>
            </div>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                id="password"
                placeholder="أدخل كلمة المرور"
                value={password}
                onChange={e => { setPassword(e.target.value); setAuthError(''); }}
                required
                dir="ltr"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block auth-submit">
            دخول <ArrowRight size={18} />
          </button>
        </form>

        <div className="auth-footer">
          <p>ليس لديك حساب؟ <Link to="/register">سجل الآن</Link></p>
        </div>

        {/* Hint */}
        <div style={{ marginTop: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '0.75rem', padding: '0.875rem 1rem', fontSize: '0.8125rem', color: 'var(--fg-muted)', lineHeight: '1.8' }}>
          <strong style={{ color: 'var(--s4l-accent-cyan)' }}>بيانات الدخول التجريبية:</strong><br/>
          🔐 المدير: admin@sup4links.com / admin123<br/>
          👤 العميل: user@sup4links.com / user123
        </div>
      </div>
    </div>
  );
}
