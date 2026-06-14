import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { User, ShoppingBag, LogOut, Settings, Shield } from 'lucide-react';
import { useAuth } from '../../context/AppContext';
import '../../pages/admin/Admin.css'; // Reuse dashboard styles

const menu = [
  { name: 'حسابي', path: '/customer', icon: User },
  { name: 'طلباتي', path: '/customer/orders', icon: ShoppingBag },
  { name: 'الملف الشخصي', path: '/customer/profile', icon: Settings },
];

export default function CustomerLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const currentTitle = (() => {
    const found = menu.find(item => item.path === location.pathname);
    return found ? found.name : 'حساب العميل';
  })();

  const avatarUrl = currentUser?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.gender === 'girl' ? 'Aneka' : 'Felix'}&backgroundColor=${currentUser?.gender === 'girl' ? 'ffdfbf' : 'b6e3f4'}`;

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar" style={{ transform: 'none' }}>
        <div className="admin-sidebar__header">
          <Link to="/" className="admin-sidebar__logo">
            <img src="/company-icon.png" alt="Sub4Links Icon" className="admin-sidebar__logo-icon-img" />
            <img src="/company-logo.png" alt="Sub4Links Logo" className="admin-sidebar__logo-text-img" />
          </Link>
          <span className="admin-sidebar__badge" style={{ borderColor: 'rgba(59,130,246,0.3)', color: '#3b82f6' }}>
            <User size={10} style={{ display: 'inline', verticalAlign: 'middle' }} /> عميل
          </span>
        </div>

        <nav className="admin-sidebar__nav">
          <p className="admin-sidebar__group-label">الخدمات الذاتية</p>
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`admin-nav-link ${isActive ? 'active' : ''}`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="admin-sidebar__footer">
          <div style={{ padding: '0.75rem 1rem', marginBottom: '0.5rem', borderRadius: '0.875rem', background: 'rgba(255,255,255,0.03)' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--fg)' }}>
              {currentUser?.name || 'العميل'}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--fg-muted)' }}>{currentUser?.email || 'user@sup4links.com'}</div>
          </div>
          <button className="admin-logout-btn" onClick={handleLogout}>
            <LogOut size={18} /> تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="admin-main">
        {/* Top Bar */}
        <div className="admin-topbar">
          <span className="admin-topbar__title">{currentTitle}</span>
          <div className="admin-topbar__user">
            <span>{currentUser?.name || 'العميل'}</span>
            <div className="admin-avatar" style={{ overflow: 'hidden', padding: '2px' }}>
              <img src={avatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
