import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, ShoppingCart, Users,
  LogOut, Settings, BarChart2, MessageSquare, Shield
} from 'lucide-react';
import { useAuth, useOrders } from '../../context/AppContext';
import '../../pages/admin/Admin.css';

const navGroups = [
  {
    label: 'الإدارة الرئيسية',
    items: [
      { name: 'نظرة عامة', path: '/admin', icon: LayoutDashboard },
      { name: 'إدارة الطلبات', path: '/admin/orders', icon: ShoppingCart },
      { name: 'الخدمات والاشتراكات', path: '/admin/products', icon: Package },
      { name: 'إدارة العملاء', path: '/admin/customers', icon: Users },
    ]
  },
  {
    label: 'التحليلات',
    items: [
      { name: 'التقارير', path: '/admin/reports', icon: BarChart2 },
      { name: 'الرسائل', path: '/admin/messages', icon: MessageSquare },
    ]
  },
  {
    label: 'النظام',
    items: [
      { name: 'الإعدادات', path: '/admin/settings', icon: Settings },
    ]
  },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { orders } = useOrders();
  const pendingCount = orders.filter(o => o.status === 'pending').length;

  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const currentTitle = (() => {
    for (const g of navGroups) {
      const found = g.items.find(i => i.path === location.pathname);
      if (found) return found.name;
    }
    return 'لوحة الإدارة';
  })();

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar__header">
          <Link to="/" className="admin-sidebar__logo">
            <img src="/company-icon.png" alt="Sub4Links Icon" className="admin-sidebar__logo-icon-img" />
            <img src="/company-logo.png" alt="Sub4Links Logo" className="admin-sidebar__logo-text-img" />
          </Link>
          <span className="admin-sidebar__badge">
            <Shield size={10} style={{ display: 'inline', verticalAlign: 'middle' }} /> Admin
          </span>
        </div>

        <nav className="admin-sidebar__nav">
          {navGroups.map(group => (
            <div key={group.label}>
              <p className="admin-sidebar__group-label">{group.label}</p>
              {group.items.map(item => {
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
                    {item.path === '/admin/orders' && pendingCount > 0 && (
                      <span className="admin-nav-link__badge">{pendingCount}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <div style={{ padding: '0.75rem 1rem', marginBottom: '0.5rem', borderRadius: '0.875rem', background: 'rgba(255,255,255,0.03)' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--fg)' }}>
              {currentUser?.name || 'المدير'}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--fg-muted)' }}>{currentUser?.email || 'admin@sup4links.com'}</div>
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
            <span>{currentUser?.name || 'المدير'}</span>
            <div className="admin-avatar" style={{ overflow: 'hidden', padding: currentUser?.avatar ? '2px' : '0' }}>
              {currentUser?.avatar ? (
                <img src={currentUser.avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              ) : (
                currentUser?.name?.charAt(0) || 'A'
              )}
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
