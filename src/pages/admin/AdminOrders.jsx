import { useState } from 'react';
import { CheckCircle, Clock, X, Eye, Search, Trash2, Save, Image, ZoomIn } from 'lucide-react';
import { useOrders } from '../../context/AppContext';

function Toast({ msg, type = 'success' }) {
  if (!msg) return null;
  return (
    <div style={{
      position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
      background: type === 'success' ? '#10B981' : '#EF4444',
      color: '#fff', padding: '0.75rem 1.75rem',
      borderRadius: '999px', fontWeight: 700, fontSize: '0.9rem',
      boxShadow: '0 4px 24px rgba(0,0,0,0.3)', zIndex: 9999,
      animation: 'fadeIn 0.3s ease', whiteSpace: 'nowrap',
    }}>
      {msg}
    </div>
  );
}

const statusLabel = { completed: 'مكتمل ومفعّل', pending: 'قيد التفعيل', cancelled: 'ملغي' };
const payStatusLabel = { pending_review: 'بانتظار التحقق', verified: 'تم التحقق', rejected: 'مرفوض' };
const payStatusColor = { pending_review: '#F59E0B', verified: '#10B981', rejected: '#EF4444' };
const payMethodLabel = { instapay: 'InstaPay', vodafone: 'فودافون كاش', whatsapp: 'واتساب', card: 'بطاقة بنكية' };

export default function AdminOrders() {
  const { orders, updateOrderStatus, updatePaymentStatus, updateOrderDelivery, deleteOrder, allUsers } = useOrders();
  const [search, setSearch]             = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewOrder, setViewOrder]       = useState(null);
  const [toastMsg, setToastMsg]         = useState('');
  const [toastType, setToastType]       = useState('success');
  const [zoomReceipt, setZoomReceipt]   = useState(false);

  // Form states for modal editing
  const [orderStatus, setOrderStatus]   = useState('pending');
  const [deliveryForm, setDeliveryForm] = useState({ licenseKey: '', username: '', password: '', loginUrl: '', notes: '' });

  const showToast = (msg, type = 'success') => {
    setToastMsg(msg); setToastType(type);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleOpenModal = (order) => {
    setViewOrder(order);
    setOrderStatus(order.status);
    setDeliveryForm({
      licenseKey: order.deliveryDetails?.licenseKey || '',
      username:   order.deliveryDetails?.username   || '',
      password:   order.deliveryDetails?.password   || '',
      loginUrl:   order.deliveryDetails?.loginUrl   || '',
      notes:      order.deliveryDetails?.notes      || '',
    });
  };

  const handleVerifyPayment = () => {
    updatePaymentStatus(viewOrder.id, 'verified');
    updateOrderStatus(viewOrder.id, 'pending'); // keep pending until delivery
    setViewOrder(prev => ({ ...prev, paymentStatus: 'verified' }));
    showToast('✅ تم التحقق من الدفع — يمكنك الآن إرسال بيانات التفعيل');
  };

  const handleRejectPayment = () => {
    updatePaymentStatus(viewOrder.id, 'rejected');
    updateOrderStatus(viewOrder.id, 'cancelled');
    setViewOrder(prev => ({ ...prev, paymentStatus: 'rejected', status: 'cancelled' }));
    showToast('❌ تم رفض الإيصال وإلغاء الطلب', 'error');
  };

  const handleSaveDelivery = (e) => {
    e.preventDefault();
    updateOrderStatus(viewOrder.id, orderStatus);
    updateOrderDelivery(viewOrder.id, deliveryForm);
    setViewOrder(prev => ({ ...prev, status: orderStatus, deliveryDetails: deliveryForm }));
    showToast('✅ تم حفظ بيانات التفعيل — العميل يراها الآن في حسابه!');
  };

  const filtered = orders.filter(o => {
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    const matchSearch = o.id.includes(search) || (o.buyerName || '').includes(search) || (o.buyerEmail || '').includes(search);
    return matchStatus && matchSearch;
  });

  // Stats
  const pendingReview = orders.filter(o => o.paymentStatus === 'pending_review').length;
  const todayOrders   = orders.filter(o => o.date === new Date().toISOString().split('T')[0]).length;

  return (
    <div>
      <Toast msg={toastMsg} type={toastType} />

      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 className="admin-section-title">إدارة الطلبات والمدفوعات</h1>
        <p style={{ color: 'var(--fg-muted)', fontSize: '0.875rem' }}>{orders.length} طلب إجمالي</p>
      </div>

      {/* Alert: pending reviews */}
      {pendingReview > 0 && (
        <div style={{
          background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)',
          borderRadius: '0.875rem', padding: '0.875rem 1.25rem', marginBottom: '1.25rem',
          display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#F59E0B', fontWeight: 700,
        }}>
          ⚠️ لديك {pendingReview} طلب{pendingReview > 1 ? 'ات' : ''} تحتاج مراجعة إيصال الدفع
        </div>
      )}

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'إجمالي الطلبات', val: orders.length, color: 'var(--s4l-accent-primary)' },
          { label: 'بانتظار التحقق', val: pendingReview, color: '#F59E0B' },
          { label: 'مكتملة', val: orders.filter(o => o.status === 'completed').length, color: '#10B981' },
          { label: 'طلبات اليوم', val: todayOrders, color: 'var(--s4l-accent-cyan)' },
        ].map(s => (
          <div key={s.label} style={{ background: 'var(--s4l-bg-surface)', border: '1px solid var(--border)', borderRadius: '0.875rem', padding: '1rem 1.25rem' }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: s.color }}>{s.val}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--fg-muted)', marginTop: '2px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
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
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['all', 'pending', 'completed', 'cancelled'].map(s => (
            <button key={s} className={`shop-tab ${statusFilter === s ? 'active' : ''}`} onClick={() => setStatusFilter(s)}>
              {s === 'all' ? 'الكل' : statusLabel[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>رقم الطلب</th>
              <th>العميل</th>
              <th>المنتجات</th>
              <th>المبلغ</th>
              <th>طريقة الدفع</th>
              <th>حالة الإيصال</th>
              <th>التاريخ</th>
              <th>الحالة</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(order => (
              <tr key={order.id} style={{ background: order.paymentStatus === 'pending_review' ? 'rgba(245,158,11,0.04)' : undefined }}>
                <td><span style={{ color: 'var(--s4l-accent-cyan)', fontWeight: 700, fontFamily: 'monospace' }}>#{order.id}</span></td>
                <td>
                  <div style={{ fontWeight: 600 }}>{order.buyerName || 'عميل'}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--fg-muted)' }}>{order.buyerEmail}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--s4l-accent-cyan)' }}>{order.buyerPhone}</div>
                </td>
                <td style={{ color: 'var(--fg-muted)', fontSize: '0.875rem' }}>{order.items.length} منتج</td>
                <td><strong style={{ color: 'var(--s4l-accent-cyan)' }}>{order.total.toLocaleString('ar-EG')} ج.م</strong></td>
                <td style={{ fontSize: '0.85rem' }}>{payMethodLabel[order.payMethod] || order.payMethod}</td>
                <td>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '4px',
                    padding: '0.2rem 0.55rem', borderRadius: '0.5rem',
                    fontSize: '0.72rem', fontWeight: 700,
                    background: `${payStatusColor[order.paymentStatus || 'pending_review']}18`,
                    color: payStatusColor[order.paymentStatus || 'pending_review'],
                  }}>
                    {order.paymentProof && <Image size={11} />}
                    {payStatusLabel[order.paymentStatus || 'pending_review']}
                  </span>
                </td>
                <td style={{ color: 'var(--fg-muted)', fontSize: '0.875rem' }}>{order.date}</td>
                <td>
                  <span style={{
                    display: 'inline-block', padding: '0.25rem 0.6rem', borderRadius: '0.5rem',
                    fontSize: '0.75rem', fontWeight: 700,
                    background: order.status === 'completed' ? 'rgba(16,185,129,0.15)' : order.status === 'pending' ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)',
                    color: order.status === 'completed' ? '#10B981' : order.status === 'pending' ? '#F59E0B' : '#EF4444',
                  }}>
                    {statusLabel[order.status]}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button className="admin-btn-icon" onClick={() => handleOpenModal(order)} title="عرض وتفعيل">
                      <Eye size={15} />
                    </button>
                    <button className="admin-btn-icon danger" onClick={() => deleteOrder(order.id)} title="حذف">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="admin-empty"><p>لا توجد طلبات</p></div>}
      </div>

      {/* ── ORDER DETAIL MODAL ── */}
      {viewOrder && (
        <div className="admin-modal-overlay" onClick={() => setViewOrder(null)}>
          <div className="admin-modal" style={{ maxWidth: '680px', width: '92%', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>

            {/* Modal Header */}
            <div className="admin-modal__title">
              <Eye size={20} /> إدارة الطلب #{viewOrder.id}
              <button style={{ marginRight: 'auto', background: 'none', border: 'none', color: 'var(--fg-muted)', cursor: 'pointer' }} onClick={() => setViewOrder(null)}>
                <X size={20} />
              </button>
            </div>

            {/* Buyer Info */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
              {[
                { label: 'الاسم', val: viewOrder.buyerName || 'عميل' },
                { label: 'البريد الإلكتروني', val: viewOrder.buyerEmail },
                { label: 'الهاتف / واتساب', val: viewOrder.buyerPhone },
                { label: 'طريقة الدفع', val: payMethodLabel[viewOrder.payMethod] || viewOrder.payMethod },
              ].map(f => (
                <div key={f.label} style={{ background: 'rgba(0,0,0,0.25)', borderRadius: '0.75rem', padding: '0.75rem 1rem' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--fg-muted)', marginBottom: '3px' }}>{f.label}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', wordBreak: 'break-all' }}>{f.val}</div>
                </div>
              ))}
            </div>

            {/* ── RECEIPT SECTION ── */}
            <div style={{
              background: 'rgba(0,0,0,0.2)', borderRadius: '1rem', padding: '1.25rem',
              marginBottom: '1.25rem',
              border: `1px solid ${viewOrder.paymentStatus === 'pending_review' ? 'rgba(245,158,11,0.3)' : viewOrder.paymentStatus === 'verified' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
            }}>
              <div style={{ fontWeight: 700, marginBottom: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Image size={16} />
                إيصال الدفع
                <span style={{
                  marginRight: 'auto', fontSize: '0.75rem', fontWeight: 700,
                  color: payStatusColor[viewOrder.paymentStatus || 'pending_review'],
                  background: `${payStatusColor[viewOrder.paymentStatus || 'pending_review']}18`,
                  padding: '0.2rem 0.6rem', borderRadius: '0.4rem',
                }}>
                  {payStatusLabel[viewOrder.paymentStatus || 'pending_review']}
                </span>
              </div>

              {viewOrder.paymentProof ? (
                <>
                  {/* Receipt image preview */}
                  <div style={{ position: 'relative', marginBottom: '1rem', borderRadius: '0.75rem', overflow: 'hidden', cursor: 'zoom-in' }} onClick={() => setZoomReceipt(true)}>
                    <img
                      src={viewOrder.paymentProof}
                      alt="إيصال الدفع"
                      style={{ width: '100%', maxHeight: '260px', objectFit: 'contain', background: '#000', display: 'block' }}
                    />
                    <div style={{
                      position: 'absolute', bottom: '0.5rem', left: '0.5rem',
                      background: 'rgba(0,0,0,0.6)', borderRadius: '0.5rem', padding: '0.3rem 0.6rem',
                      color: 'white', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px',
                    }}>
                      <ZoomIn size={13} /> تكبير
                    </div>
                  </div>

                  {/* Action buttons for receipt */}
                  {viewOrder.paymentStatus === 'pending_review' && (
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button
                        type="button"
                        onClick={handleVerifyPayment}
                        style={{
                          flex: 1, padding: '0.6rem', borderRadius: '0.75rem', border: 'none', cursor: 'pointer',
                          background: 'rgba(16,185,129,0.15)', color: '#10B981', fontWeight: 700, fontSize: '0.875rem',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                          transition: 'background 0.2s',
                        }}
                      >
                        <CheckCircle size={16} /> ✅ تأكيد استلام الدفع
                      </button>
                      <button
                        type="button"
                        onClick={handleRejectPayment}
                        style={{
                          flex: 1, padding: '0.6rem', borderRadius: '0.75rem', border: 'none', cursor: 'pointer',
                          background: 'rgba(239,68,68,0.12)', color: '#EF4444', fontWeight: 700, fontSize: '0.875rem',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                        }}
                      >
                        <X size={16} /> ❌ رفض الإيصال
                      </button>
                    </div>
                  )}
                  {viewOrder.paymentStatus === 'verified' && (
                    <div style={{ color: '#10B981', fontWeight: 700, textAlign: 'center', padding: '0.5rem', fontSize: '0.9rem' }}>
                      ✅ تم التحقق من الدفع — يمكنك إرسال بيانات التفعيل
                    </div>
                  )}
                  {viewOrder.paymentStatus === 'rejected' && (
                    <div style={{ color: '#EF4444', fontWeight: 700, textAlign: 'center', padding: '0.5rem', fontSize: '0.9rem' }}>
                      ❌ تم رفض هذا الإيصال وإلغاء الطلب
                    </div>
                  )}
                </>
              ) : (
                <div style={{ textAlign: 'center', color: 'var(--fg-muted)', padding: '1.5rem', fontSize: '0.875rem' }}>
                  لم يرفع العميل صورة إيصال بعد
                </div>
              )}
            </div>

            {/* Products */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontWeight: 700, marginBottom: '0.75rem' }}>المنتجات المطلوبة</div>
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
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0 0', borderTop: '1px solid rgba(255,255,255,0.06)', fontWeight: 800 }}>
                <span>الإجمالي</span>
                <span style={{ color: 'var(--s4l-accent-cyan)' }}>{viewOrder.total.toLocaleString('ar-EG')} ج.م</span>
              </div>
            </div>

            {/* Delivery form — only show if payment verified or already completed */}
            {(viewOrder.paymentStatus === 'verified' || viewOrder.status === 'completed') && (
              <form onSubmit={handleSaveDelivery} style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.25rem' }}>
                <h4 style={{ fontWeight: 700, color: 'var(--s4l-accent-cyan)', marginBottom: '1rem' }}>
                  🔑 إرسال بيانات التفعيل للعميل
                </h4>

                {/* Status selector */}
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>حالة الطلب</label>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    {['pending', 'completed', 'cancelled'].map(s => (
                      <label key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                        <input type="radio" name="modalStatus" value={s} checked={orderStatus === s} onChange={e => setOrderStatus(e.target.value)} />
                        <span style={{ color: s === 'completed' ? '#10B981' : s === 'pending' ? '#F59E0B' : '#EF4444', fontWeight: 700 }}>
                          {statusLabel[s]}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  {[
                    { key: 'username', label: 'اسم المستخدم / البريد', ph: 'account@email.com' },
                    { key: 'password', label: 'كلمة المرور / كود الدخول', ph: 'كلمة المرور' },
                    { key: 'licenseKey', label: 'كود التفعيل / License Key', ph: 'LNC-XXXX-XXXX' },
                    { key: 'loginUrl', label: 'رابط تسجيل الدخول', ph: 'https://...' },
                  ].map(f => (
                    <div key={f.key} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <label style={{ fontSize: '0.78rem', color: 'var(--fg-muted)', fontWeight: 600 }}>{f.label}</label>
                      <input
                        style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', padding: '0.5rem 0.75rem', color: 'white', fontSize: '0.875rem', width: '100%' }}
                        placeholder={f.ph}
                        value={deliveryForm[f.key]}
                        onChange={e => setDeliveryForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                      />
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.78rem', color: 'var(--fg-muted)', fontWeight: 600 }}>إرشادات الاستخدام للعميل</label>
                  <textarea
                    style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', padding: '0.5rem 0.75rem', color: 'white', fontSize: '0.875rem', minHeight: '70px', resize: 'vertical', fontFamily: 'inherit' }}
                    placeholder="اكتب هنا خطوات تفعيل الاشتراك للعميل..."
                    value={deliveryForm.notes}
                    onChange={e => setDeliveryForm(prev => ({ ...prev, notes: e.target.value }))}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                  <button type="button" className="btn btn-ghost" onClick={() => setViewOrder(null)}>إغلاق</button>
                  <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 1.75rem' }}>
                    <Save size={16} /> حفظ وإرسال للعميل
                  </button>
                </div>
              </form>
            )}

            {/* If payment not verified yet, show close button only */}
            {viewOrder.paymentStatus === 'pending_review' && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <button type="button" className="btn btn-ghost" onClick={() => setViewOrder(null)}>إغلاق</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Receipt zoom overlay */}
      {zoomReceipt && viewOrder?.paymentProof && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', cursor: 'zoom-out' }}
          onClick={() => setZoomReceipt(false)}
        >
          <img src={viewOrder.paymentProof} alt="إيصال مكبّر" style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: '1rem', boxShadow: '0 0 60px rgba(0,0,0,0.8)' }} />
          <button style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer' }} onClick={() => setZoomReceipt(false)}>
            <X size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
