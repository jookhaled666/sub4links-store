import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle, ShoppingBag, ArrowLeft, Lock, Mail, Phone,
  ShieldCheck, Upload, Image, X, Smartphone, CreditCard, AlertCircle
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useCart, useOrders, useAuth } from '../context/AppContext';
import './CheckoutPage.css';

const PAYMENT_METHODS = [
  {
    id: 'instapay',
    label: 'InstaPay',
    desc: 'تحويل فوري على الرقم: +201055899599',
    icon: '⚡',
    info: 'حوّل المبلغ على InstaPay ثم ارفع صورة الإيصال',
    account: '+201055899599 (إنستاباي)',
    manual: true,
  },
  {
    id: 'vodafone',
    label: 'فودافون كاش',
    desc: 'تحويل على الرقم: +201055899599',
    icon: '📱',
    info: 'حوّل المبلغ على فودافون كاش ثم ارفع صورة الإيصال',
    account: '+201055899599 (فودافون كاش)',
    manual: true,
  },
  {
    id: 'whatsapp',
    label: 'إرسال الإيصال واتساب',
    desc: 'ارفع الإيصال هنا وسنتحقق عبر الواتساب',
    icon: '💬',
    info: 'ارفع الإيصال وسنتواصل معك على واتساب للتأكيد',
    account: '+201055899599 (واتساب)',
    manual: true,
  },
];

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    payMethod: 'instapay',
  });
  const [step, setStep] = useState(1); // 1=info, 2=payment, 3=done
  const [loading, setLoading] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);
  const [receiptImg, setReceiptImg] = useState(null);   // base64 image
  const [receiptError, setReceiptError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef();

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const selectedMethod = PAYMENT_METHODS.find(m => m.id === form.payMethod);

  // ── Handle image file ──
  const compressImage = (file, callback) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;
        
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.6);
        callback(dataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const processImageFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setReceiptError('يرجى رفع صورة فقط (JPG, PNG, WebP)');
      return;
    }
    setReceiptError('');
    compressImage(file, (dataUrl) => {
      setReceiptImg(dataUrl);
    });
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    processImageFile(e.dataTransfer.files[0]);
  };

  // ── Submit steps ──
  const handleInfoSubmit = (e) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handlePaySubmit = async (e) => {
    e.preventDefault();
    if (!receiptImg) {
      setReceiptError('يرجى رفع صورة إيصال الدفع للمتابعة');
      return;
    }
    setLoading(true);
    
    try {
      const order = await placeOrder(cart, cartTotal, currentUser?.id || 2, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        payMethod: form.payMethod,
        paymentProof: receiptImg,
        paymentStatus: 'pending_review',
      });
      setPlacedOrder(order);
      clearCart();
      setStep(3);
    } catch (err) {
      console.error(err);
      setReceiptError('حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
      window.scrollTo(0, 0);
    }
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <>
        <Navbar />
        <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', paddingTop: '5rem' }}>
          <ShoppingBag size={72} style={{ color: 'var(--fg-subtle)', opacity: 0.4 }} />
          <h2 style={{ color: 'var(--fg)', fontSize: '1.75rem' }}>السلة فارغة!</h2>
          <Link to="/shop" className="btn btn-primary">تصفح المنتجات</Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="checkout-page section" style={{ paddingTop: '7rem' }}>
        <div className="container">
          <h1 className="checkout-page-title">
            <Lock size={24} />
            إتمام الشراء الآمن
          </h1>

          {/* Steps */}
          <div className="checkout-steps">
            {['معلومات المشتري', 'الدفع ورفع الإيصال', 'تأكيد الطلب'].map((label, i) => (
              <div key={i} className={`checkout-step ${step > i ? 'done' : ''} ${step === i + 1 ? 'active' : ''}`}>
                <div className="checkout-step__num">
                  {step > i + 1 ? <CheckCircle size={18} /> : i + 1}
                </div>
                <span>{label}</span>
              </div>
            ))}
          </div>

          {step === 3 ? (
            // ── SUCCESS SCREEN ──
            <div className="checkout-success glass-panel">
              <div className="checkout-success__icon" style={{ color: 'var(--s4l-accent-cyan)' }}>
                <ShieldCheck size={64} />
              </div>
              <h2>تم استلام طلبك بنجاح! 🎉</h2>
              <p style={{ fontSize: '1.1rem', margin: '0.5rem 0' }}>
                رقم الطلب: <strong style={{ color: 'var(--s4l-accent-cyan)', fontFamily: 'monospace' }}>{placedOrder?.id}</strong>
              </p>
              <div style={{
                background: 'rgba(245,158,11,0.08)',
                border: '1px solid rgba(245,158,11,0.2)',
                borderRadius: '1rem',
                padding: '1rem 1.5rem',
                maxWidth: '520px',
                textAlign: 'right',
                lineHeight: 1.7,
                fontSize: '0.9rem',
                color: '#F59E0B',
                margin: '0.5rem 0 1rem',
              }}>
                ⏳ <strong>جاري التحقق من إيصال الدفع</strong><br/>
                سنراجع الإيصال المرفوع ونقوم بتفعيل خدمتك خلال دقائق. ستتلقى إشعاراً فور التفعيل على بريدك الإلكتروني <strong>{placedOrder?.buyerEmail}</strong> وعبر الواتساب.
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}>
                <Link to="/customer/orders" className="btn btn-primary">
                  تتبع حالة الطلب والتفعيل
                </Link>
                <Link to="/shop" className="btn btn-secondary">
                  الاستمرار في التسوق
                </Link>
              </div>
            </div>
          ) : (
            <div className="checkout-layout">
              {/* LEFT: Form */}
              <div className="checkout-form-col">
                {step === 1 ? (
                  // ── STEP 1: BUYER INFO ──
                  <form className="checkout-form glass-panel" onSubmit={handleInfoSubmit}>
                    <h2 className="checkout-form-title">
                      <Mail size={20} /> معلومات الحساب والتسليم الرقمي
                    </h2>
                    <p style={{ color: 'var(--fg-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                      يرجى إدخال بريدك الإلكتروني وهاتفك بدقة، حيث سيتم إرسال الحساب الرقمي أو كود التفعيل عليهما.
                    </p>
                    <div className="checkout-form-grid">
                      <div className="co-field co-field--full">
                        <label>الاسم الكامل *</label>
                        <input value={form.name} onChange={e => update('name', e.target.value)} required placeholder="أدخل اسمك الكامل" />
                      </div>
                      <div className="co-field co-field--full">
                        <label>البريد الإلكتروني للتسليم *</label>
                        <input type="email" value={form.email} onChange={e => update('email', e.target.value)} required placeholder="email@example.com" />
                        <span style={{ fontSize: '0.75rem', color: 'var(--fg-muted)', marginTop: '4px', display: 'block' }}>
                          البريد الذي ستتلقى عليه مفاتيح تفعيل البرامج أو بيانات تسجيل الدخول
                        </span>
                      </div>
                      <div className="co-field co-field--full">
                        <label>رقم الهاتف للواتساب *</label>
                        <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} required placeholder="01XXXXXXXXX" dir="ltr" />
                        <span style={{ fontSize: '0.75rem', color: 'var(--fg-muted)', marginTop: '4px', display: 'block' }}>
                          للتواصل السريع وتأكيد إرسال الحسابات الرقمية عبر الواتساب
                        </span>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary checkout-submit-btn" style={{ marginTop: '1.5rem' }}>
                      متابعة للدفع ورفع الإيصال ←
                    </button>
                  </form>
                ) : (
                  // ── STEP 2: PAYMENT + RECEIPT UPLOAD ──
                  <form className="checkout-form glass-panel" onSubmit={handlePaySubmit}>
                    <h2 className="checkout-form-title">
                      <CreditCard size={20} /> طريقة الدفع ورفع الإيصال
                    </h2>

                    {/* Payment Method Cards */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                      {PAYMENT_METHODS.map(m => (
                        <label
                          key={m.id}
                          className={`pay-method-card ${form.payMethod === m.id ? 'active' : ''}`}
                          style={{ cursor: 'pointer', alignItems: 'flex-start' }}
                        >
                          <input
                            type="radio"
                            name="payMethod"
                            value={m.id}
                            checked={form.payMethod === m.id}
                            onChange={e => update('payMethod', e.target.value)}
                          />
                          <div style={{ flex: 1 }}>
                            <div className="pay-method-name" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                              <span>{m.icon}</span> {m.label}
                            </div>
                            <div className="pay-method-desc">{m.desc}</div>
                          </div>
                        </label>
                      ))}
                    </div>

                    {/* Instructions Panel */}
                    {selectedMethod && (
                      <div style={{
                        background: 'linear-gradient(135deg, rgba(6,182,212,0.08), rgba(59,130,246,0.08))',
                        border: '1px solid rgba(6,182,212,0.2)',
                        borderRadius: '1rem',
                        padding: '1rem 1.25rem',
                        marginBottom: '1.5rem',
                      }}>
                        <div style={{ fontWeight: 700, color: 'var(--s4l-accent-cyan)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Smartphone size={16} /> تعليمات الدفع
                        </div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--fg)', lineHeight: 1.7 }}>
                          <div>1. حوّل مبلغ <strong style={{ color: 'var(--s4l-accent-cyan)' }}>{cartTotal.toLocaleString('ar-EG')} ج.م</strong> على:</div>
                          <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '0.5rem', padding: '0.5rem 0.75rem', margin: '0.5rem 0', fontFamily: 'monospace', fontWeight: 700, fontSize: '0.9rem', color: 'white' }}>
                            {selectedMethod.account}
                          </div>
                          <div>2. {selectedMethod.info}</div>
                        </div>
                      </div>
                    )}

                    {/* Receipt Upload Zone */}
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{ fontWeight: 700, display: 'block', marginBottom: '0.75rem', color: 'var(--fg)', fontSize: '0.95rem' }}>
                        📎 رفع صورة إيصال الدفع <span style={{ color: '#EF4444' }}>*</span>
                      </label>

                      {receiptImg ? (
                        // Preview uploaded image
                        <div style={{
                          position: 'relative',
                          border: '2px solid var(--s4l-accent-cyan)',
                          borderRadius: '1rem',
                          overflow: 'hidden',
                          background: 'rgba(0,0,0,0.2)',
                        }}>
                          <img
                            src={receiptImg}
                            alt="إيصال الدفع"
                            style={{ width: '100%', maxHeight: '280px', objectFit: 'contain', display: 'block' }}
                          />
                          <button
                            type="button"
                            onClick={() => setReceiptImg(null)}
                            style={{
                              position: 'absolute', top: '0.75rem', left: '0.75rem',
                              background: 'rgba(239,68,68,0.9)', border: 'none', borderRadius: '50%',
                              width: '32px', height: '32px', display: 'flex', alignItems: 'center',
                              justifyContent: 'center', cursor: 'pointer', color: 'white',
                            }}
                          >
                            <X size={16} />
                          </button>
                          <div style={{
                            position: 'absolute', bottom: 0, left: 0, right: 0,
                            background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                            padding: '1rem 0.75rem 0.75rem',
                            color: '#10B981', fontWeight: 700, fontSize: '0.85rem',
                            display: 'flex', alignItems: 'center', gap: '0.4rem',
                          }}>
                            <CheckCircle size={16} /> تم رفع الإيصال بنجاح
                          </div>
                        </div>
                      ) : (
                        // Drop zone
                        <div
                          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                          onDragLeave={() => setDragOver(false)}
                          onDrop={handleFileDrop}
                          onClick={() => fileInputRef.current.click()}
                          style={{
                            border: `2px dashed ${dragOver ? 'var(--s4l-accent-cyan)' : 'rgba(255,255,255,0.15)'}`,
                            borderRadius: '1rem',
                            padding: '2.5rem 1.5rem',
                            textAlign: 'center',
                            cursor: 'pointer',
                            background: dragOver ? 'rgba(6,182,212,0.05)' : 'rgba(0,0,0,0.1)',
                            transition: 'all 0.25s ease',
                          }}
                        >
                          <Upload size={40} style={{ color: dragOver ? 'var(--s4l-accent-cyan)' : 'var(--fg-muted)', marginBottom: '0.75rem' }} />
                          <div style={{ fontWeight: 700, color: 'var(--fg)', marginBottom: '0.35rem' }}>
                            اسحب الصورة هنا أو اضغط للرفع
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--fg-muted)' }}>
                            JPG، PNG، أو WebP — الحد الأقصى 5MB
                          </div>
                        </div>
                      )}

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={e => processImageFile(e.target.files[0])}
                      />

                      {receiptError && (
                        <div style={{ color: '#EF4444', fontSize: '0.8rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <AlertCircle size={14} /> {receiptError}
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                      <button type="button" className="btn btn-ghost" onClick={() => setStep(1)}>
                        <ArrowLeft size={16} /> السابق
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary checkout-submit-btn"
                        disabled={loading || !receiptImg}
                        style={{ flex: 1 }}
                      >
                        {loading
                          ? <span className="spinner" />
                          : `✅ إرسال الطلب مع الإيصال — ${cartTotal.toLocaleString('ar-EG')} ج.م`
                        }
                      </button>
                    </div>

                    {!receiptImg && (
                      <p style={{ fontSize: '0.78rem', color: 'var(--fg-muted)', marginTop: '0.75rem', textAlign: 'center' }}>
                        ⚠️ يجب رفع صورة الإيصال لإتمام الطلب
                      </p>
                    )}
                  </form>
                )}
              </div>

              {/* RIGHT: Order Summary */}
              <div className="checkout-summary glass-panel">
                <h3 className="checkout-summary-title">ملخص الطلب الرقمي</h3>
                <div className="checkout-items">
                  {cart.map(item => (
                    <div key={item.id} className="checkout-item">
                      <img src={item.image} alt={item.name} className="checkout-item__img" />
                      <div className="checkout-item__info">
                        <p className="checkout-item__name">{item.name}</p>
                        <p className="checkout-item__qty">الكمية: {item.qty}</p>
                      </div>
                      <span className="checkout-item__price">
                        {(item.price * item.qty).toLocaleString('ar-EG')} ج.م
                      </span>
                    </div>
                  ))}
                </div>
                <div className="checkout-totals">
                  <div className="checkout-total-row">
                    <span>المجموع الفرعي</span>
                    <span>{cartTotal.toLocaleString('ar-EG')} ج.م</span>
                  </div>
                  <div className="checkout-total-row">
                    <span>التسليم الرقمي</span>
                    <span style={{ color: 'var(--s4l-accent-cyan)', fontWeight: 700 }}>فوري بعد التحقق</span>
                  </div>
                  <div className="checkout-total-row checkout-total-row--grand">
                    <span>الإجمالي النهائي</span>
                    <span>{cartTotal.toLocaleString('ar-EG')} ج.م</span>
                  </div>
                </div>
                {step === 2 && (
                  <div style={{
                    marginTop: '1rem',
                    background: 'rgba(245,158,11,0.06)',
                    border: '1px solid rgba(245,158,11,0.15)',
                    borderRadius: '0.75rem',
                    padding: '0.75rem',
                    fontSize: '0.8rem',
                    color: '#F59E0B',
                    lineHeight: 1.6,
                  }}>
                    📋 بعد إرسال الطلب، سنراجع إيصالك ونُفعّل خدمتك خلال دقائق.
                  </div>
                )}
                <div className="checkout-secure">
                  <Lock size={14} />
                  <span>تشفير 256-بت — بيانات آمنة ومحمية</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
