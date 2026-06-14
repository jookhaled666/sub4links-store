import { useState } from 'react';
import {
  DollarSign, ShoppingCart, Users, Package,
  TrendingUp, TrendingDown, Eye, ArrowLeft, Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useOrders } from '../../context/AppContext';

const catLabel = { subscriptions: 'الاشتراكات', services: 'الخدمات', courses: 'الدورات' };

export default function AdminOverview() {
  const { orders, managedProducts, allUsers } = useOrders();

  const totalRevenue = orders.filter(o => o.status === 'completed')
    .reduce((s, o) => s + o.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const customers = allUsers.filter(u => u.role === 'customer').length;
  const totalProducts = managedProducts.length;

  const stats = [
    {
      label: 'إجمالي الإيرادات',
      value: `${totalRevenue.toLocaleString('ar-EG')} ج.م`,
      icon: DollarSign,
      trend: '+12%',
      up: true,
      color: '#06B6D4',
      bg: 'rgba(6,182,212,0.1)',
    },
    {
      label: 'الطلبات المعلقة',
      value: pendingOrders,
      icon: ShoppingCart,
      trend: `${orders.length} إجمالي`,
      up: null,
      color: '#F59E0B',
      bg: 'rgba(245,158,11,0.1)',
    },
    {
      label: 'العملاء',
      value: customers,
      icon: Users,
      trend: '+18%',
      up: true,
      color: '#8B5CF6',
      bg: 'rgba(139,92,246,0.1)',
    },
    {
      label: 'المنتجات والخدمات',
      value: totalProducts,
      icon: Package,
      trend: 'نشط',
      up: null,
      color: '#10B981',
      bg: 'rgba(16,185,129,0.1)',
    },
  ];

  const recentOrders = [...orders].slice(0, 5);

  return (
    <div>
      <div className="dashboard-header" style={{ marginBottom: '1.5rem' }}>
        <h1 className="admin-section-title" style={{ fontSize: '1.5rem' }}>
          نظرة عامة على المتجر
        </h1>
        <p style={{ color: 'var(--fg-muted)', fontSize: '0.9rem' }}>
          مرحباً بك في لوحة تحكم Sub4Links
        </p>
      </div>

      {/* Stats */}
      <div className="admin-stats">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="admin-stat-card">
              <div className="admin-stat-icon" style={{ background: stat.bg, color: stat.color }}>
                <Icon size={22} />
              </div>
              <div className="admin-stat-info">
                <div className="admin-stat-label">{stat.label}</div>
                <div className="admin-stat-value" style={{ color: stat.color }}>{stat.value}</div>
                {stat.trend && (
                  <div className={`admin-stat-trend ${stat.up === false ? 'down' : ''}`}>
                    {stat.up === true && <TrendingUp size={14} />}
                    {stat.up === false && <TrendingDown size={14} />}
                    {stat.trend}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="admin-table-wrap" style={{ marginBottom: '1.5rem' }}>
        <div className="admin-table-header">
          <span className="admin-table-title">
            <Clock size={16} style={{ display: 'inline', marginLeft: '6px' }} />
            آخر الطلبات
          </span>
          <Link to="/admin/orders" className="btn btn-ghost" style={{ fontSize: '0.875rem', padding: '0.4rem 0.875rem' }}>
            عرض الكل <ArrowLeft size={14} />
          </Link>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>رقم الطلب</th>
              <th>العميل</th>
              <th>المبلغ</th>
              <th>التاريخ</th>
              <th>الحالة</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map(order => {
              const user = allUsers.find(u => u.id === order.userId);
              return (
                <tr key={order.id}>
                  <td><span style={{ color: 'var(--s4l-accent-cyan)', fontWeight: 700, fontFamily: 'monospace' }}>#{order.id}</span></td>
                  <td>{user?.name || 'عميل'}</td>
                  <td><strong>{order.total.toLocaleString('ar-EG')} ج.م</strong></td>
                  <td style={{ color: 'var(--fg-muted)', fontSize: '0.875rem' }}>{order.date}</td>
                  <td>
                    <span className={`status-badge ${order.status}`}>
                      {order.status === 'completed' ? 'مكتمل' : order.status === 'pending' ? 'معلق' : 'ملغي'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Top Products */}
      <div className="admin-grid-2">
        <div className="admin-table-wrap">
          <div className="admin-table-header">
            <span className="admin-table-title">أكثر المنتجات مبيعاً</span>
          </div>
          <table className="admin-table">
            <thead>
              <tr><th>المنتج</th><th>السعر</th><th>التقييم</th></tr>
            </thead>
            <tbody>
              {managedProducts.slice(0, 5).map(p => (
                <tr key={p.id}>
                  <td>
                    <div className="admin-product-cell">
                      <img src={p.image} alt={p.name} className="admin-product-thumb" />
                      <span className="admin-product-cell-name" style={{ fontSize: '0.85rem' }}>{p.name}</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--s4l-accent-cyan)', fontWeight: 700 }}>{p.price.toLocaleString('ar-EG')} ج.م</td>
                  <td>⭐ {p.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="admin-table-wrap">
          <div className="admin-table-header">
            <span className="admin-table-title">الأقسام والإحصائيات</span>
          </div>
          <div style={{ padding: '1.25rem' }}>
            {['subscriptions', 'services', 'courses'].map(cat => {
              const count = managedProducts.filter(p => p.category === cat).length;
              const pct = Math.round((count / managedProducts.length) * 100);
              return (
                <div key={cat} style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{catLabel[cat]}</span>
                    <span style={{ color: 'var(--fg-muted)', fontSize: '0.875rem' }}>{count} منتج</span>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: 'var(--gradient-accent)', borderRadius: '999px', transition: 'width 1s ease' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
