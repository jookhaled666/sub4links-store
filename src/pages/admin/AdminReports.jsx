import { useOrders } from '../../context/AppContext';
import { BarChart2, TrendingUp, DollarSign, ShoppingBag, Download } from 'lucide-react';

export default function AdminReports() {
  const { orders } = useOrders();
  const completed = orders.filter(o => o.status === 'completed');
  const revenue = completed.reduce((s, o) => s + o.total, 0);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 className="admin-section-title">التقارير والتحليلات</h1>
          <p style={{ color: 'var(--fg-muted)', fontSize: '0.875rem' }}>تقرير شامل عن مبيعات وأداء المتجر</p>
        </div>
        <button className="btn btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
          <Download size={16} /> تحميل التقرير (PDF)
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <div style={{ background: 'var(--s4l-bg-glass)', border: '1px solid rgba(255,255,255,0.07)', padding: '1.5rem', borderRadius: '1rem' }}>
          <DollarSign style={{ color: 'var(--s4l-accent-cyan)', marginBottom: '0.5rem' }} />
          <div style={{ color: 'var(--fg-muted)', fontSize: '0.875rem' }}>إجمالي الإيرادات المحققة</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--s4l-accent-cyan)', marginTop: '0.25rem' }}>
            {revenue.toLocaleString('ar-EG')} ج.م
          </div>
        </div>
        <div style={{ background: 'var(--s4l-bg-glass)', border: '1px solid rgba(255,255,255,0.07)', padding: '1.5rem', borderRadius: '1rem' }}>
          <ShoppingBag style={{ color: '#8B5CF6', marginBottom: '0.5rem' }} />
          <div style={{ color: 'var(--fg-muted)', fontSize: '0.875rem' }}>الطلبات المكتملة</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#8B5CF6', marginTop: '0.25rem' }}>
            {completed.length} طلب
          </div>
        </div>
        <div style={{ background: 'var(--s4l-bg-glass)', border: '1px solid rgba(255,255,255,0.07)', padding: '1.5rem', borderRadius: '1rem' }}>
          <TrendingUp style={{ color: '#10B981', marginBottom: '0.5rem' }} />
          <div style={{ color: 'var(--fg-muted)', fontSize: '0.875rem' }}>معدل التحويل</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#10B981', marginTop: '0.25rem' }}>
            4.8%
          </div>
        </div>
      </div>

      {/* Sales performance chart placeholder but styled beautifully with pure CSS */}
      <div style={{ background: 'var(--s4l-bg-glass)', border: '1px solid rgba(255,255,255,0.07)', padding: '2rem', borderRadius: '1.25rem', backdropFilter: 'blur(10px)' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BarChart2 size={18} style={{ color: 'var(--s4l-accent-cyan)' }} />
          مقارنة المبيعات الأسبوعية
        </h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '200px', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          {[
            { day: 'السبت', value: 30 },
            { day: 'الأحد', value: 45 },
            { day: 'الإثنين', value: 65 },
            { day: 'الثلاثاء', value: 50 },
            { day: 'الأربعاء', value: 85 },
            { day: 'الخميس', value: 95 },
            { day: 'الجمعة', value: 70 },
          ].map((d, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '0.5rem' }}>
              <div style={{
                width: '60%', maxWidth: '36px', height: `${d.value}%`,
                background: 'var(--gradient-accent)',
                borderRadius: '0.25rem 0.25rem 0 0',
                transition: 'height 1s ease',
                position: 'relative',
              }} title={`${d.value * 250} ج.م`}>
                <div style={{ position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.75rem', color: 'var(--s4l-accent-cyan)', fontWeight: 700 }}>
                  {d.value * 25}
                </div>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--fg-muted)' }}>{d.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
