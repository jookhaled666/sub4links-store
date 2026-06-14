import { Package, Clock, Star, CreditCard } from 'lucide-react';
import { useAuth, useOrders } from '../../context/AppContext';

export default function CustomerOverview() {
  const { currentUser } = useAuth();
  const { orders } = useOrders();

  // Filter user orders
  const myOrders = orders.filter(o => o.userId === (currentUser?.id || 2));
  
  // Calculate dynamic stats
  const totalOrders = myOrders.length;
  const activeOrders = myOrders.filter(o => o.status === 'completed' || o.status === 'pending').length;
  const loyaltyPoints = totalOrders * 75; // 75 points per order
  const totalSpent = myOrders.reduce((sum, o) => o.status !== 'cancelled' ? sum + o.total : sum, 0);

  const stats = [
    { label: 'إجمالي الطلبات', value: totalOrders.toString(), icon: Package },
    { label: 'الاشتراكات والخدمات النشطة', value: activeOrders.toString(), icon: Clock },
    { label: 'نقاط الولاء المكتسبة', value: `${loyaltyPoints} نقطة`, icon: Star },
    { label: 'إجمالي المدفوعات', value: `${totalSpent.toLocaleString('ar-EG')} ج.م`, icon: CreditCard },
  ];

  // Get top 5 recent orders
  const recentOrders = [...myOrders]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const statusLabel = { completed: 'مكتمل', pending: 'قيد التنفيذ', cancelled: 'ملغي' };

  return (
    <div className="animate-fade-in" style={{ animation: 'fadeIn 0.5s ease-out forwards' }}>
      <div className="dashboard-header" style={{ marginBottom: '2rem' }}>
        <h1 className="dashboard-title" style={{ fontSize: '2rem', fontWeight: 'bold' }}>مرحباً بك، {currentUser?.name || 'أحمد'}!</h1>
        <p className="dashboard-subtitle" style={{ color: 'var(--fg-muted)', marginTop: '0.5rem' }}>هنا يمكنك إدارة اشتراكاتك الرقمية وخدماتك وتتبع طلباتك بسهولة.</p>
      </div>

      <div className="dashboard-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div className="stat-card" key={idx} style={{
              background: 'var(--s4l-bg-glass)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '1.25rem',
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              backdropFilter: 'blur(10px)',
            }}>
              <div className="stat-card__icon" style={{
                background: 'rgba(6,182,212,0.1)',
                color: 'var(--s4l-accent-cyan)',
                padding: '0.75rem',
                borderRadius: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Icon size={24} />
              </div>
              <div className="stat-card__info" style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="stat-card__label" style={{ fontSize: '0.8125rem', color: 'var(--fg-muted)' }}>{stat.label}</span>
                <span className="stat-card__value" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white', marginTop: '0.25rem' }}>{stat.value}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="dashboard-table-container" style={{
        background: 'var(--s4l-bg-glass)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '1.5rem',
        overflow: 'hidden',
        backdropFilter: 'blur(10px)',
      }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'white' }}>أحدث الطلبات والاشتراكات</h3>
          <span style={{ fontSize: '0.8125rem', color: 'var(--fg-muted)' }}>عرض آخر 5 طلبات</span>
        </div>
        
        {recentOrders.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--fg-muted)' }}>
            لا توجد طلبات مسجلة حالياً في حسابك.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="dashboard-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <th style={{ padding: '1rem 1.5rem', color: 'var(--fg-muted)', fontWeight: 600, fontSize: '0.875rem' }}>رقم الطلب</th>
                  <th style={{ padding: '1rem 1.5rem', color: 'var(--fg-muted)', fontWeight: 600, fontSize: '0.875rem' }}>الخدمة / المنتجات</th>
                  <th style={{ padding: '1rem 1.5rem', color: 'var(--fg-muted)', fontWeight: 600, fontSize: '0.875rem' }}>التاريخ</th>
                  <th style={{ padding: '1rem 1.5rem', color: 'var(--fg-muted)', fontWeight: 600, fontSize: '0.875rem' }}>المبلغ الإجمالي</th>
                  <th style={{ padding: '1rem 1.5rem', color: 'var(--fg-muted)', fontWeight: 600, fontSize: '0.875rem' }}>الحالة</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.2s' }} className="hover-row">
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 700, fontFamily: 'monospace', color: 'var(--s4l-accent-cyan)' }}>#{order.id}</td>
                    <td style={{ padding: '1rem 1.5rem', color: 'white', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {order.items.map(i => i.name).join(' + ')}
                    </td>
                    <td style={{ padding: '1rem 1.5rem', color: 'var(--fg-subtle)' }}>{order.date}</td>
                    <td style={{ padding: '1rem 1.5rem', fontWeight: 700, color: 'var(--s4l-accent-cyan)' }}>{order.total.toLocaleString('ar-EG')} ج.م</td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span className={`status-badge ${order.status}`}>
                        {statusLabel[order.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
