import { useState } from 'react';
import { Eye, Package, CheckCircle, Clock, X, ShoppingBag, Copy, Check, ExternalLink } from 'lucide-react';
import { useOrders, useAuth, getGuestId } from '../../context/AppContext';
import { Link } from 'react-router-dom';

const statusLabel = { completed: 'مكتمل ومفعّل', pending: 'قيد التفعيل', cancelled: 'ملغي' };
const statusIcon  = { completed: CheckCircle, pending: Clock, cancelled: X };

const steps = [
  { label: 'تم استلام الطلب', desc: 'تم إرسال طلبك بنجاح وجاري مراجعته' },
  { label: 'مراجعة إيصال الدفع', desc: 'التحقق من صورة الإيصال المرفوعة' },
  { label: 'تجهيز وتفعيل الاشتراك', desc: 'توليد بيانات الحساب أو مفاتيح الترخيص' },
  { label: 'نشط - جاهز للاستخدام', desc: 'تم التفعيل وتوفير تفاصيل الدخول أدناه' }
];

export default function CustomerOrders() {
  const { orders } = useOrders();
  const { currentUser } = useAuth();
  const [viewOrder, setViewOrder] = useState(null);
  const [copiedField, setCopiedField] = useState(null); // 'key', 'user', 'pass'

  const activeUserId = currentUser?.id || getGuestId();
  const myOrders = orders.filter(o => o.userId === activeUserId);

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (myOrders.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 2rem' }}>
        <ShoppingBag size={72} style={{ color: 'var(--fg-subtle)', opacity: 0.3, marginBottom: '1.5rem' }} />
        <h2 style={{ color: 'var(--fg)', marginBottom: '0.75rem' }}>لا توجد طلبات بعد</h2>
        <p style={{ color: 'var(--fg-muted)', marginBottom: '1.5rem' }}>تصفح متجرنا وابدأ تسوقك الآن</p>
        <Link to="/shop" className="btn btn-primary">تصفح المتجر</Link>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--fg)', marginBottom: '0.4rem' }}>طلباتي والاشتراكات النشطة</h2>
        <p style={{ color: 'var(--fg-muted)', fontSize: '0.9rem' }}>{myOrders.length} طلب إجمالي</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {myOrders.map(order => {
          const Icon = statusIcon[order.status] || Clock;
          return (
            <div key={order.id} style={{
              background: 'var(--s4l-bg-glass)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '1.25rem',
              padding: '1.5rem',
              backdropFilter: 'blur(10px)',
            }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontWeight: 700, fontFamily: 'monospace', color: 'var(--s4l-accent-cyan)', fontSize: '1rem' }}>#{order.id}</span>
                  <span style={{ color: 'var(--fg-muted)', fontSize: '0.875rem' }}>{order.date}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    background: order.status === 'completed' ? 'rgba(16,185,129,0.15)' : order.status === 'pending' ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)',
                    color: order.status === 'completed' ? '#10B981' : order.status === 'pending' ? '#F59E0B' : '#EF4444',
                  }}>
                    <Icon size={12} /> {statusLabel[order.status]}
                  </span>
                  <button
                    className="btn btn-ghost"
                    style={{ padding: '0.35rem 0.875rem', fontSize: '0.8125rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                    onClick={() => setViewOrder(order)}
                  >
                    <Eye size={14} /> التفاصيل ومتابعة الطلب
                  </button>
                </div>
              </div>

              {/* Items preview */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                {order.items.slice(0, 3).map((item, i) => (
                  <img key={i} src={item.image} alt={item.name}
                    style={{ width: '48px', height: '48px', borderRadius: '0.5rem', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }}
                    title={item.name}
                  />
                ))}
                {order.items.length > 3 && (
                  <div style={{ width: '48px', height: '48px', borderRadius: '0.5rem', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--fg-muted)', fontSize: '0.75rem', fontWeight: 700 }}>
                    +{order.items.length - 3}
                  </div>
                )}
              </div>

              {/* Total */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem' }}>
                <span style={{ color: 'var(--fg-muted)', fontSize: '0.9rem' }}>{order.items.length} منتج / خدمة</span>
                <span style={{ fontWeight: 800, fontSize: '1.125rem', color: 'var(--s4l-accent-cyan)' }}>{order.total.toLocaleString('ar-EG')} ج.م</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Order Detail Modal */}
      {viewOrder && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setViewOrder(null)}>
          <div style={{
            background: 'var(--s4l-bg-elevated)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '1.5rem', padding: '2rem',
            width: '100%', maxWidth: '560px',
            maxHeight: '90vh', overflowY: 'auto',
            animation: 'fadeIn 0.3s ease',
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700 }}>تفاصيل الطلب ومتابعة التفعيل #{viewOrder.id}</h3>
              <button style={{ background: 'none', border: 'none', color: 'var(--fg-muted)', cursor: 'pointer' }} onClick={() => setViewOrder(null)}>
                <X size={20} />
              </button>
            </div>

            {/* Stepper Timeline */}
            {viewOrder.status !== 'cancelled' ? (
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.25rem', borderRadius: '1rem', marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--fg-muted)' }}>مرحلة التوصيل الرقمي للخدمة</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {steps.map((st, idx) => {
                    const isCompleted = viewOrder.status === 'completed' || idx < 2;
                    const isInProgress = viewOrder.status === 'pending' && idx === 2;
                    
                    return (
                      <div key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', position: 'relative' }}>
                        {idx < 3 && (
                          <div style={{
                            position: 'absolute',
                            right: '9px',
                            top: '24px',
                            width: '2px',
                            height: 'calc(100% - 8px)',
                            background: isCompleted && (viewOrder.status === 'completed' || idx < 1) ? 'var(--s4l-accent-cyan)' : 'rgba(255,255,255,0.1)'
                          }} />
                        )}
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: 2,
                          background: isCompleted ? 'var(--s4l-accent-cyan)' : isInProgress ? 'var(--s4l-accent-orange)' : '#1E293B',
                          color: '#000',
                          fontSize: '0.65rem',
                          fontWeight: 900,
                          boxShadow: isInProgress ? '0 0 10px var(--s4l-accent-orange)' : 'none',
                          animation: isInProgress ? 'pulse 2s infinite' : 'none'
                        }}>
                          {isCompleted ? '✓' : idx + 1}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{
                            fontWeight: 700,
                            fontSize: '0.875rem',
                            color: isCompleted ? 'var(--fg)' : isInProgress ? 'var(--s4l-accent-orange)' : 'var(--fg-muted)'
                          }}>{st.label}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--fg-muted)' }}>{st.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', padding: '1rem', borderRadius: '1rem', color: '#EF4444', marginBottom: '1.5rem', fontWeight: 700, textAlign: 'center' }}>
                تم إلغاء هذا الطلب
              </div>
            )}

            {/* Digital Credentials display */}
            {viewOrder.status === 'completed' && viewOrder.deliveryDetails && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(6,182,212,0.1) 0%, rgba(59,130,246,0.1) 100%)',
                border: '1px solid rgba(6,182,212,0.2)',
                borderRadius: '1rem',
                padding: '1.25rem',
                marginBottom: '1.5rem',
              }}>
                <h4 style={{ color: 'var(--s4l-accent-cyan)', fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  🔑 تفاصيل وبيانات التفعيل للاشتراك الرقمي
                </h4>
                
                {viewOrder.deliveryDetails.licenseKey && (
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '0.75rem' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--fg-muted)', marginBottom: '3px' }}>كود الترخيص / التفعيل</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'white', letterSpacing: '0.5px' }}>
                        {viewOrder.deliveryDetails.licenseKey}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(viewOrder.deliveryDetails.licenseKey, 'key')}
                        style={{ background: 'none', border: 'none', color: 'var(--s4l-accent-cyan)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}
                      >
                        {copiedField === 'key' ? <Check size={14} /> : <Copy size={14} />}
                        {copiedField === 'key' ? 'تم النسخ' : 'نسخ'}
                      </button>
                    </div>
                  </div>
                )}

                {(viewOrder.deliveryDetails.username || viewOrder.deliveryDetails.password) && (
                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '0.75rem' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--fg-muted)', marginBottom: '6px' }}>بيانات الحساب المشترك / المفعّل</div>
                    
                    {viewOrder.deliveryDetails.username && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.4rem' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--fg-subtle)' }}>المستخدم: <strong style={{ color: 'white', fontFamily: 'monospace' }}>{viewOrder.deliveryDetails.username}</strong></span>
                        <button
                          type="button"
                          onClick={() => handleCopy(viewOrder.deliveryDetails.username, 'user')}
                          style={{ background: 'none', border: 'none', color: 'var(--s4l-accent-cyan)', cursor: 'pointer', fontSize: '0.75rem' }}
                        >
                          {copiedField === 'user' ? 'تم نسخ البريد' : 'نسخ'}
                        </button>
                      </div>
                    )}

                    {viewOrder.deliveryDetails.password && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--fg-subtle)' }}>كلمة المرور: <strong style={{ color: 'white', fontFamily: 'monospace' }}>{viewOrder.deliveryDetails.password}</strong></span>
                        <button
                          type="button"
                          onClick={() => handleCopy(viewOrder.deliveryDetails.password, 'pass')}
                          style={{ background: 'none', border: 'none', color: 'var(--s4l-accent-cyan)', cursor: 'pointer', fontSize: '0.75rem' }}
                        >
                          {copiedField === 'pass' ? 'تم نسخ المرور' : 'نسخ'}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {viewOrder.deliveryDetails.loginUrl && (
                  <a
                    href={viewOrder.deliveryDetails.loginUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.5rem', borderRadius: '0.5rem', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.75rem' }}
                  >
                    رابط تسجيل الدخول والتفعيل <ExternalLink size={14} />
                  </a>
                )}

                {viewOrder.deliveryDetails.notes && (
                  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '0.5rem', fontSize: '0.8rem', color: 'var(--fg-subtle)', lineHeight: 1.5 }}>
                    <strong>💡 إرشادات الاستخدام:</strong>
                    <div style={{ marginTop: '0.25rem', whiteSpace: 'pre-wrap' }}>{viewOrder.deliveryDetails.notes}</div>
                  </div>
                )}
              </div>
            )}

            {viewOrder.status === 'pending' && (
              <div style={{
                background: viewOrder.paymentStatus === 'pending_review'
                  ? 'rgba(245,158,11,0.06)'
                  : 'rgba(6,182,212,0.06)',
                border: `1px solid ${viewOrder.paymentStatus === 'pending_review' ? 'rgba(245,158,11,0.15)' : 'rgba(6,182,212,0.15)'}`,
                borderRadius: '1rem',
                padding: '1rem',
                fontSize: '0.875rem',
                marginBottom: '1.5rem',
                lineHeight: 1.7,
              }}>
                {viewOrder.paymentStatus === 'pending_review' ? (
                  <span style={{ color: '#F59E0B' }}>
                    📋 <strong>تم استلام إيصالك بنجاح!</strong><br />
                    جاري مراجعة صورة الإيصال المرفوعة. سيتم تفعيل خدمتك بمجرد التحقق من الدفع خلال دقائق وسنُبلغك عبر البريد الإلكتروني والواتساب.
                  </span>
                ) : viewOrder.paymentStatus === 'verified' ? (
                  <span style={{ color: 'var(--s4l-accent-cyan)' }}>
                    ✅ <strong>تم التحقق من دفعك!</strong><br />
                    نقوم الآن بتجهيز وتفعيل اشتراكك الرقمي. ستتلقى بيانات التفعيل خلال لحظات.
                  </span>
                ) : (
                  <span style={{ color: '#F59E0B' }}>
                    ⏳ <strong>جاري تفعيل اشتراكك رقمياً...</strong><br />
                    سنراجع طلبك وسنوفر بيانات التفعيل عبر بريدك الإلكتروني والواتساب.
                  </span>
                )}
              </div>
            )}

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontWeight: 700, marginBottom: '0.75rem', color: 'var(--fg)' }}>الخدمات / الاشتراكات المطلوبة</div>
              {viewOrder.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem', background: 'rgba(0,0,0,0.2)', borderRadius: '0.875rem', marginBottom: '0.5rem' }}>
                  <img src={item.image} alt={item.name} style={{ width: '52px', height: '52px', borderRadius: '0.5rem', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.name}</div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--fg-muted)' }}>الكمية: {item.qty}</div>
                  </div>
                  <div style={{ color: 'var(--s4l-accent-cyan)', fontWeight: 700, fontSize: '0.9rem' }}>
                    {(item.price * item.qty).toLocaleString('ar-EG')} ج.م
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.125rem', marginBottom: '1.5rem' }}>
              <span>الإجمالي المدفوع</span>
              <span style={{ color: 'var(--s4l-accent-cyan)' }}>{viewOrder.total.toLocaleString('ar-EG')} ج.م</span>
            </div>

            <button className="btn btn-ghost" style={{ width: '100%' }} onClick={() => setViewOrder(null)}>
              إغلاق النافذة
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
