import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle, ShoppingBag, ArrowLeft, Lock, Mail, Phone, Send, ShieldCheck } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useCart } from '../context/AppContext';
import { useOrders } from '../context/AppContext';
import './CheckoutPage.css';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    payMethod: 'card',
    cardNum: '', cardExp: '', cardCvv: '',
  });
  const [step, setStep] = useState(1); // 1=info, 2=payment, 3=done
  const [loading, setLoading] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleInfoSubmit = (e) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handlePaySubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const order = placeOrder(cart, cartTotal, 2, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        payMethod: form.payMethod
      });
      setPlacedOrder(order);
      clearCart();
      setStep(3);
      setLoading(false);
      window.scrollTo(0, 0);
    }, 2000);
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
            {['معلومات المشتري', 'الدفع وتأكيد الهوية', 'تأكيد الطلب'].map((label, i) => (
              <div key={i} className={`checkout-step ${step > i ? 'done' : ''} ${step === i + 1 ? 'active' : ''}`}>
                <div className="checkout-step__num">
                  {step > i + 1 ? <CheckCircle size={18} /> : i + 1}
                </div>
                <span>{label}</span>
              </div>
            ))}
          </div>

          {step === 3 ? (
            // ── SUCCESS ──
            <div className="checkout-success glass-panel">
              <div className="checkout-success__icon" style={{ color: 'var(--s4l-accent-cyan)' }}>
                <ShieldCheck size={64} />
              </div>
              <h2>تم تأكيد طلبك بنجاح! 🎉</h2>
              <p style={{ fontSize: '1.1rem', margin: '0.5rem 0' }}>رقم الطلب: <strong style={{ color: 'var(--s4l-accent-cyan)', fontFamily: 'monospace' }}>{placedOrder?.id}</strong></p>
              <p style={{ color: 'var(--fg-muted)', maxWidth: '500px', textAlign: 'center', lineHeight: '1.6', fontSize: '0.95rem' }}>
                شكراً لشرائك من Sub4Links. طلبك قيد المراجعة والتفعيل الآن. سيتم إرسال بيانات ومفاتيح التفعيل أو تفاصيل الحساب الرقمي مباشرة عبر بريدك الإلكتروني <strong>({placedOrder?.buyerEmail})</strong> وخلال دقائق عبر الواتساب.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1rem' }}>
                <Link to="/customer/orders" className="btn btn-primary">
                  تتبع حالة التفعيل الرقمي
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
                      متابعة للدفع وتأكيد الهوية ←
                    </button>
                  </form>
                ) : (
                  <form className="checkout-form glass-panel" onSubmit={handlePaySubmit}>
                    <h2 className="checkout-form-title">
                      <CreditCard size={20} /> طريقة الدفع الإلكتروني
                    </h2>

                    {/* Payment Method Selector */}
                    <div className="pay-methods">
                      {[
                        { id: 'card', label: 'بطاقة بنكية إلكترونية', desc: 'Visa / MasterCard' },
                        { id: 'instapay', label: 'InstaPay', desc: 'تحويل فوري ومباشر' },
                        { id: 'vodafone', label: 'فودافون كاش', desc: 'محفظة إلكترونية رقمية' },
                        { id: 'fawry', label: 'فوري المباشر', desc: 'كود دفع ماكينات فوري' },
                      ].map(m => (
                        <label key={m.id} className={`pay-method-card ${form.payMethod === m.id ? 'active' : ''}`}>
                          <input type="radio" name="payMethod" value={m.id} checked={form.payMethod === m.id} onChange={e => update('payMethod', e.target.value)} />
                          <div>
                            <div className="pay-method-name">{m.label}</div>
                            <div className="pay-method-desc">{m.desc}</div>
                          </div>
                        </label>
                      ))}
                    </div>

                    {/* Card Fields */}
                    {form.payMethod === 'card' && (
                      <div className="checkout-form-grid" style={{ marginTop: '1.5rem' }}>
                        <div className="co-field co-field--full">
                          <label>رقم البطاقة</label>
                          <input value={form.cardNum} onChange={e => update('cardNum', e.target.value)} required placeholder="XXXX XXXX XXXX XXXX" dir="ltr" maxLength={19} />
                        </div>
                        <div className="co-field">
                          <label>تاريخ الانتهاء</label>
                          <input value={form.cardExp} onChange={e => update('cardExp', e.target.value)} required placeholder="MM/YY" dir="ltr" maxLength={5} />
                        </div>
                        <div className="co-field">
                          <label>CVV</label>
                          <input value={form.cardCvv} onChange={e => update('cardCvv', e.target.value)} required placeholder="XXX" dir="ltr" maxLength={4} type="password" />
                        </div>
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                      <button type="button" className="btn btn-ghost" onClick={() => setStep(1)}>
                        <ArrowLeft size={16} /> السابق
                      </button>
                      <button type="submit" className="btn btn-primary checkout-submit-btn" disabled={loading}>
                        {loading ? <span className="spinner" /> : `إتمام الدفع الآمن بقيمة ${cartTotal.toLocaleString('ar-EG')} ج.م`}
                      </button>
                    </div>
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
                    <span style={{ color: 'var(--s4l-accent-cyan)', fontWeight: 700 }}>فوري (بريد / واتساب)</span>
                  </div>
                  <div className="checkout-total-row checkout-total-row--grand">
                    <span>الإجمالي النهائي</span>
                    <span>{cartTotal.toLocaleString('ar-EG')} ج.م</span>
                  </div>
                </div>
                <div className="checkout-secure">
                  <Lock size={14} />
                  <span>تشفير 256-بت آمن وموثق بالكامل</span>
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
