import { useState } from 'react';
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
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 1500);
  };

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
            {/* Info Column */}
            <div className="contact-info">
              {/* Cards */}
              <div className="contact-info-card">
                <div className="contact-info-icon phone"><Phone size={22} /></div>
                <div>
                  <h4>رقم الهاتف</h4>
                  <p dir="ltr"><a href="tel:+201099599558">+20 1099599558</a></p>
                </div>
              </div>
              <div className="contact-info-card">
                <div className="contact-info-icon mail"><Mail size={22} /></div>
                <div>
                  <h4>البريد الإلكتروني</h4>
                  <p><a href="mailto:support@sub4links.com">support@sub4links.com</a></p>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/201099599558"
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-cta"
              >
                <WhatsAppIcon />
                تواصل عبر واتساب
              </a>


            </div>

            {/* Form Column */}
            <div className="contact-form-wrap">
              {sent ? (
                <div className="contact-success">
                  <CheckCircle size={56} className="success-icon" />
                  <h2>تم إرسال رسالتك بنجاح!</h2>
                  <p>سيتواصل معك فريقنا في أقرب وقت ممكن. شكراً لتواصلك معنا.</p>
                  <button className="btn btn-primary" onClick={() => setSent(false)}>إرسال رسالة أخرى</button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <h2 className="form-title">
                    <MessageCircle size={22} />
                    أرسل رسالتك
                  </h2>

                  <div className="form-row">
                    <div className="form-group">
                      <label>الاسم الكامل <span>*</span></label>
                      <input
                        type="text"
                        placeholder="اسمك الكريم"
                        value={form.name}
                        onChange={e => setForm({...form, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>البريد الإلكتروني <span>*</span></label>
                      <input
                        type="email"
                        placeholder="email@example.com"
                        value={form.email}
                        onChange={e => setForm({...form, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>رقم الهاتف</label>
                      <input
                        type="tel"
                        placeholder="01XXXXXXXXX"
                        value={form.phone}
                        onChange={e => setForm({...form, phone: e.target.value})}
                        dir="ltr"
                      />
                    </div>
                    <div className="form-group">
                      <label>الموضوع <span>*</span></label>
                      <select value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} required>
                        <option value="">اختر الموضوع</option>
                        <option value="subscription">استفسار عن اشتراك</option>
                        <option value="service">طلب خدمة</option>
                        <option value="course">الدورات التدريبية</option>
                        <option value="support">دعم فني</option>
                        <option value="other">أخرى</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>رسالتك <span>*</span></label>
                    <textarea
                      rows="5"
                      placeholder="اكتب رسالتك هنا..."
                      value={form.message}
                      onChange={e => setForm({...form, message: e.target.value})}
                      required
                    />
                  </div>

                  <button type="submit" className="contact-submit-btn" disabled={loading}>
                    {loading ? (
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
