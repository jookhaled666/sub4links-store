import { useForm, ValidationError } from '@formspree/react';
import { Send, Phone, Mail, MessageCircle, CheckCircle } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import './ContactPage.css';

const WhatsAppIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export default function ContactPage() {
  // ── Formspree React hook — form ID: mkolarad → info@sub4links.com ──
  const [state, handleSubmit] = useForm('mkolarad');

  return (
    <>
      <Navbar />
      <main className="contact-page section" style={{ paddingTop: '7rem' }}>
        <div className="container">

          {/* Header */}
          <div className="contact-header">
            <span className="eyebrow">تواصل معنا</span>
            <h1 className="contact-title">نحن هنا لمساعدتك</h1>
            <p className="contact-sub">فريق Sub4Links جاهز للرد عليك في أسرع وقت ممكن. لا تتردد في التواصل!</p>
          </div>

          <div className="contact-layout">
            {/* ── Info Column ── */}
            <div className="contact-info">
              <div className="contact-info-card">
                <div className="contact-info-icon phone"><Phone size={22} /></div>
                <div>
                  <h4>رقم الهاتف</h4>
                  <p dir="ltr"><a href="tel:+201055899599">+20 1055899599</a></p>
                </div>
              </div>
              <div className="contact-info-card">
                <div className="contact-info-icon mail"><Mail size={22} /></div>
                <div>
                  <h4>البريد الإلكتروني</h4>
                  <p><a href="mailto:info@sub4links.com">info@sub4links.com</a></p>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/201055899599"
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-cta"
              >
                <WhatsAppIcon />
                تواصل عبر واتساب
              </a>
            </div>

            {/* ── Form Column ── */}
            <div className="contact-form-wrap">
              {state.succeeded ? (
                /* ── SUCCESS STATE ── */
                <div className="contact-success">
                  <CheckCircle size={56} className="success-icon" />
                  <h2>تم إرسال رسالتك بنجاح! 🎉</h2>
                  <p>سيتواصل معك فريقنا في أقرب وقت ممكن على بريدك الإلكتروني أو عبر الواتساب.</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--fg-muted)', marginTop: '0.5rem' }}>
                    شكراً لتواصلك مع Sub4Links ❤️
                  </p>
                </div>
              ) : (
                /* ── FORM ── */
                <form className="contact-form" onSubmit={handleSubmit}>
                  <h2 className="form-title">
                    <MessageCircle size={22} />
                    أرسل رسالتك
                  </h2>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">الاسم الكامل <span>*</span></label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="اسمك الكريم"
                        required
                      />
                      <ValidationError field="name" prefix="الاسم" errors={state.errors} className="field-error" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">البريد الإلكتروني <span>*</span></label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="email@example.com"
                        required
                      />
                      <ValidationError field="email" prefix="البريد الإلكتروني" errors={state.errors} className="field-error" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">رقم الهاتف / واتساب</label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        placeholder="01XXXXXXXXX"
                        dir="ltr"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="subject">الموضوع <span>*</span></label>
                      <select id="subject" name="subject" required>
                        <option value="">اختر الموضوع</option>
                        <option value="subscription">استفسار عن اشتراك</option>
                        <option value="service">طلب خدمة</option>
                        <option value="course">الدورات التدريبية</option>
                        <option value="support">دعم فني</option>
                        <option value="other">أخرى</option>
                      </select>
                      <ValidationError field="subject" prefix="الموضوع" errors={state.errors} className="field-error" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">رسالتك <span>*</span></label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      placeholder="اكتب رسالتك هنا..."
                      required
                    />
                    <ValidationError field="message" prefix="الرسالة" errors={state.errors} className="field-error" />
                  </div>

                  {/* General form-level errors */}
                  {state.errors && state.errors.length > 0 && !state.errors.some(e => e.field) && (
                    <div style={{
                      background: 'rgba(239,68,68,0.08)',
                      border: '1px solid rgba(239,68,68,0.2)',
                      borderRadius: '0.75rem',
                      padding: '0.75rem 1rem',
                      color: '#ef4444',
                      fontSize: '0.875rem',
                      marginBottom: '1rem',
                    }}>
                      حدث خطأ أثناء الإرسال. حاول مرة أخرى أو تواصل معنا عبر الواتساب.
                    </div>
                  )}

                  <button
                    type="submit"
                    className="contact-submit-btn"
                    disabled={state.submitting}
                  >
                    {state.submitting ? (
                      <span className="spinner" />
                    ) : (
                      <>
                        <Send size={18} />
                        إرسال الرسالة
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
