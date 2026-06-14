import { useOrders } from '../../context/AppContext';
import { Users, Mail, Phone, MapPin, Briefcase } from 'lucide-react';

export default function AdminCustomers() {
  const { allUsers } = useOrders();
  const customers = allUsers.filter(u => u.role === 'customer');

  return (
    <div>
      <h1 className="admin-section-title">إدارة العملاء</h1>
      <p style={{ color: 'var(--fg-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>{customers.length} عميل مسجل</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '1.25rem' }}>
        {customers.map(user => (
          <div key={user.id} style={{
            background: 'var(--s4l-bg-glass)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '1.25rem',
            padding: '1.5rem',
            backdropFilter: 'blur(10px)',
            transition: 'border-color 0.3s, transform 0.3s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(6,182,212,0.3)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'none'; }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '52px', height: '52px', borderRadius: '50%',
                background: 'var(--gradient-accent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: 800, fontSize: '1.25rem',
              }}>
                {user.name.charAt(0)}
              </div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--fg)' }}>{user.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--fg-muted)' }}>عميل</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {[
                { icon: Mail, text: user.email },
                { icon: Phone, text: user.phone || 'غير محدد' },
                { icon: MapPin, text: user.address || 'غير محدد' },
                { icon: Briefcase, text: user.field || 'غير محدد' },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', color: 'var(--fg-muted)', fontSize: '0.875rem' }}>
                  <Icon size={15} style={{ flexShrink: 0, color: 'var(--s4l-accent-cyan)' }} />
                  {text}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
