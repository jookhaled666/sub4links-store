import { useState } from 'react';
import { Settings, Save, Bell, Shield, Landmark, Globe } from 'lucide-react';

export default function AdminSettings() {
  const [store, setStore] = useState({
    name: 'Sub4Links',
    email: 'support@sup4links.com',
    currency: 'EGP',
    tax: '14',
    notifyEmail: true,
    notifyOrder: true,
  });

  const [saved, setSaved] = useState(false);

  const save = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h1 className="admin-section-title">إعدادات النظام</h1>
      <p style={{ color: 'var(--fg-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>تعديل الإعدادات العامة وخيارات المتجر الإلكتروني</p>

      <form onSubmit={save} style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {saved && (
          <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: '#10b981', fontSize: '0.875rem', textAlign: 'center' }}>
            ✓ تم حفظ الإعدادات بنجاح
          </div>
        )}

        {/* General settings */}
        <div style={{ background: 'var(--s4l-bg-glass)', border: '1px solid rgba(255,255,255,0.07)', padding: '1.5rem', borderRadius: '1.25rem', backdropFilter: 'blur(10px)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Globe size={18} style={{ color: 'var(--s4l-accent-cyan)' }} /> إعدادات عامة
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="co-field" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>اسم المتجر</label>
              <input value={store.name} onChange={e => setStore({ ...store, name: e.target.value })} required />
            </div>
            <div className="co-field" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>بريد الدعم</label>
              <input type="email" value={store.email} onChange={e => setStore({ ...store, email: e.target.value })} required />
            </div>
          </div>
        </div>

        {/* Payments & Tax */}
        <div style={{ background: 'var(--s4l-bg-glass)', border: '1px solid rgba(255,255,255,0.07)', padding: '1.5rem', borderRadius: '1.25rem', backdropFilter: 'blur(10px)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Landmark size={18} style={{ color: '#8B5CF6' }} /> الضرائب والدفع
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="co-field" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>العملة الافتراضية</label>
              <select value={store.currency} onChange={e => setStore({ ...store, currency: e.target.value })}>
                <option value="EGP">جنيه مصري (EGP)</option>
                <option value="USD">دولار أمريكي (USD)</option>
                <option value="SAR">ريال سعودي (SAR)</option>
              </select>
            </div>
            <div className="co-field" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>ضريبة القيمة المضافة (%)</label>
              <input type="number" value={store.tax} onChange={e => setStore({ ...store, tax: e.target.value })} required />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div style={{ background: 'var(--s4l-bg-glass)', border: '1px solid rgba(255,255,255,0.07)', padding: '1.5rem', borderRadius: '1.25rem', backdropFilter: 'blur(10px)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bell size={18} style={{ color: '#F59E0B' }} /> الإشعارات والتنبيهات
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
              <input type="checkbox" checked={store.notifyEmail} onChange={e => setStore({ ...store, notifyEmail: e.target.checked })} />
              إرسال إيميل تأكيد تلقائي للعملاء عند الشراء
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
              <input type="checkbox" checked={store.notifyOrder} onChange={e => setStore({ ...store, notifyOrder: e.target.checked })} />
              إرسال تنبيه إيميل للمدير عند وجود طلب جديد
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', alignSelf: 'flex-start' }}>
          <Save size={18} /> حفظ الإعدادات
        </button>
      </form>
    </div>
  );
}
