import { useState } from 'react';
import { CheckCircle, Clock, X, Eye, ChevronDown, Search, Trash2 } from 'lucide-react';
import { useOrders } from '../../context/AppContext';

const statusLabel = { completed: 'مكتمل ومفعّل', pending: 'قيد التفعيل', cancelled: 'ملغي' };

export default function AdminOrders() {
  const { orders, updateOrderStatus, updateOrderDelivery, deleteOrder, allUsers } = useOrders();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewOrder, setViewOrder] = useState(null);

  // Form states for modal editing
  const [orderStatus, setOrderStatus] = useState('pending');
  const [deliveryForm, setDeliveryForm] = useState({
    licenseKey: '',
    username: '',
    password: '',
    loginUrl: '',
    notes: '',
  });

  const handleOpenModal = (order) => {
    setViewOrder(order);
    setOrderStatus(order.status);
    setDeliveryForm({
      licenseKey: order.deliveryDetails?.licenseKey || '',
      username: order.deliveryDetails?.username || '',
      password: order.deliveryDetails?.password || '',
      loginUrl: order.deliveryDetails?.loginUrl || '',
      notes: order.deliveryDetails?.notes || '',
    });
  };

  const handleSaveOrderSettings = (e) => {
    e.preventDefault();
    updateOrderStatus(viewOrder.id, orderStatus);
    updateOrderDelivery(viewOrder.id, deliveryForm);
    
    // update local state so changes reflect immediately in current modal session
    setViewOrder(prev => ({
      ...prev,
      status: orderStatus,
      deliveryDetails: deliveryForm
    }));

    alert('تم حفظ وتحديث بيانات الاشتراك والتسجيل بنجاح! سيتم إخطار العميل فوراً.');
  };

  const filtered = orders.filter(o => {
    const user = allUsers.find(u => u.id === o.userId);
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    const matchSearch = o.id.includes(search) || 
                       (user?.name || '').includes(search) || 
                       (o.buyerName || '').includes(search);
    return matchStatus && matchSearch;
  });

  const getPayMethodLabel = (method) => {
    const methods = {
      card: 'بطاقة بنكية',
      instapay: 'InstaPay',
      vodafone: 'فودافون كاش',
      fawry: 'فوري'
    };
    return methods[method] || method || 'غير محدد';
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="admin-section-title">إدارة الطلبات والاشتراكات</h1>
          <p style={{ color: 'var(--fg-muted)', fontSize: '0.875rem' }}>{orders.length} طلب اشتراك رقمي إجمالي</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <Search size={16} style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--fg-muted)' }} />
          <input
            className="admin-search-input"
            style={{ paddingRight: '2.5rem', width: '100%' }}
            placeholder="ابحث برقم الطلب أو اسم العميل..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['all', 'pending', 'completed', 'cancelled'].map(s => (
            <button key={s} className={`shop-tab ${statusFilter === s ? 'active' : ''}`} onClick={() => setStatusFilter(s)}>
              {s === 'all' ? 'الكل' : statusLabel[s]}
            </button>
          ))}
        </div>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr><th>رقم الطلب</th><th>العميل / بريد التسليم</th><th>المنتجات</th><th>المبلغ</th><th>طريقة الدفع</th><th>التاريخ</th><th>الحالة</th><th>إجراءات</th></tr>
          </thead>
          <tbody>
            {filtered.map(order => {
              const user = allUsers.find(u => u.id === order.userId);
              return (
                <tr key={order.id}>
                  <td><span style={{ color: 'var(--s4l-accent-cyan)', fontWeight: 700, fontFamily: 'monospace' }}>#{order.id}</span></td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{order.buyerName || user?.name || 'عميل'}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--fg-muted)' }}>{order.buyerEmail || user?.email}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--s4l-accent-cyan)' }}>{order.buyerPhone || user?.phone}</div>
                  </td>
                  <td style={{ color: 'var(--fg-muted)', fontSize: '0.875rem' }}>{order.items.length} منتج / خدمة</td>
                  <td><strong style={{ color: 'var(--s4l-accent-cyan)' }}>{order.total.toLocaleString('ar-EG')} ج.م</strong></td>
                  <td style={{ fontSize: '0.85rem' }}>{getPayMethodLabel(order.payMethod)}</td>
                  <td style={{ color: 'var(--fg-muted)', fontSize: '0.875rem' }}>{order.date}</td>
                  <td>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.25rem 0.6rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      background: order.status === 'completed' ? 'rgba(16,185,129,0.15)' : order.status === 'pending' ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)',
                      color: order.status === 'completed' ? '#10B981' : order.status === 'pending' ? '#F59E0B' : '#EF4444',
                    }}>
                      {statusLabel[order.status]}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button className="admin-btn-icon" onClick={() => handleOpenModal(order)} title="تفعيل وتسليم الحساب">
                        <Eye size={15} />
                      </button>
                      <button className="admin-btn-icon danger" onClick={() => deleteOrder(order.id)} title="حذف">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="admin-empty"><p>لا توجد طلبات</p></div>}
      </div>

      {/* View & Edit Order Modal */}
      {viewOrder && (
        <div className="admin-modal-overlay" onClick={() => setViewOrder(null)}>
          <div className="admin-modal" style={{ maxWidth: '650px', width: '90%' }} onClick={e => e.stopPropagation()}>
            <div className="admin-modal__title">
              <Eye size={20} /> إدارة وتفعيل الطلب الرقمي #{viewOrder.id}
              <button style={{ marginRight: 'auto', background: 'none', border: 'none', color: 'var(--fg-muted)', cursor: 'pointer' }} onClick={() => setViewOrder(null)}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSaveOrderSettings} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '0.75rem', padding: '0.875rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--fg-muted)', marginBottom: '4px' }}>العميل</div>
                  <div style={{ fontWeight: 700 }}>{viewOrder.buyerName || 'أحمد'}</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '0.75rem', padding: '0.875rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--fg-muted)', marginBottom: '4px' }}>بريد التسليم الرقمي</div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{viewOrder.buyerEmail}</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '0.75rem', padding: '0.875rem' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--fg-muted)', marginBottom: '4px' }}>الهاتف / واتساب</div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{viewOrder.buyerPhone}</div>
                </div>
              </div>

              {/* Status Manager */}
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                <label style={{ fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>حالة التفعيل والطلب</label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {['pending', 'completed', 'cancelled'].map(s => (
                    <label key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                      <input type="radio" name="modalStatus" value={s} checked={orderStatus === s} onChange={e => setOrderStatus(e.target.value)} />
                      <span style={{
                        color: s === 'completed' ? '#10B981' : s === 'pending' ? '#F59E0B' : '#EF4444',
                        fontWeight: 700
                      }}>
                        {statusLabel[s]}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Digital Products Info */}
              <div>
                <div style={{ fontWeight: 700, marginBottom: '0.75rem', color: 'var(--fg)' }}>المنتجات المطلوبة</div>
                {viewOrder.items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: '0.75rem', marginBottom: '0.5rem' }}>
                    <img src={item.image} alt={item.name} style={{ width: '44px', height: '44px', borderRadius: '0.5rem', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--fg-muted)' }}>الكمية: {item.qty}</div>
                    </div>
                    <div style={{ color: 'var(--s4l-accent-cyan)', fontWeight: 700 }}>{(item.price * item.qty).toLocaleString('ar-EG')} ج.م</div>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0 0', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: '1.05rem', fontWeight: 800 }}>
                  <span>الإجمالي المدفوع ({getPayMethodLabel(viewOrder.payMethod)})</span>
                  <span style={{ color: 'var(--s4l-accent-cyan)' }}>{viewOrder.total.toLocaleString('ar-EG')} ج.م</span>
                </div>
              </div>

              {/* Digital Delivery Fields */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem' }}>
                <h4 style={{ fontWeight: 700, color: 'var(--s4l-accent-cyan)', marginBottom: '0.75rem' }}>بيانات الحساب وتفعيل الخدمة الرقمية</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div className="co-field" style={{ margin: 0 }}>
                    <label>اسم المستخدم / بريد الحساب</label>
                    <input
                      style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.5rem', padding: '0.5rem', color: 'white', width: '100%' }}
                      placeholder="account@email.com"
                      value={deliveryForm.username}
                      onChange={e => setDeliveryForm(prev => ({ ...prev, username: e.target.value }))}
                    />
                  </div>
                  <div className="co-field" style={{ margin: 0 }}>
                    <label>كلمة المرور / كود الدخول</label>
                    <input
                      style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.5rem', padding: '0.5rem', color: 'white', width: '100%' }}
                      placeholder="كلمة المرور المؤقتة"
                      value={deliveryForm.password}
                      onChange={e => setDeliveryForm(prev => ({ ...prev, password: e.target.value }))}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div className="co-field" style={{ margin: 0 }}>
                    <label>مفتاح الترخيص / كود التفعيل (License Key)</label>
                    <input
                      style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.5rem', padding: '0.5rem', color: 'white', width: '100%' }}
                      placeholder="LNC-XXXX-XXXX-XXXX"
                      value={deliveryForm.licenseKey}
                      onChange={e => setDeliveryForm(prev => ({ ...prev, licenseKey: e.target.value }))}
                    />
                  </div>
                  <div className="co-field" style={{ margin: 0 }}>
                    <label>رابط الدخول / تسجيل التفعيل</label>
                    <input
                      style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.5rem', padding: '0.5rem', color: 'white', width: '100%' }}
                      placeholder="https://..."
                      value={deliveryForm.loginUrl}
                      onChange={e => setDeliveryForm(prev => ({ ...prev, loginUrl: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="co-field" style={{ margin: 0 }}>
                  <label>إرشادات الاستخدام والتفعيل للعميل</label>
                  <textarea
                    style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.5rem', padding: '0.5rem', color: 'white', width: '100%', minHeight: '60px', resize: 'vertical', fontFamily: 'inherit' }}
                    placeholder="اكتب هنا خطوات تفعيل الاشتراك للعميل..."
                    value={deliveryForm.notes}
                    onChange={e => setDeliveryForm(prev => ({ ...prev, notes: e.target.value }))}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-ghost" onClick={() => setViewOrder(null)}>
                  إلغاء
                </button>
                <button type="submit" className="btn btn-primary" style={{ padding: '0.6rem 2rem' }}>
                  حفظ وتحديث الاشتراك
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
