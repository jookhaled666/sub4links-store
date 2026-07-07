import { Link } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';
import './Footer.css';

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);
const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo" aria-label="Sub4Links الرئيسية">
              <img
                src="https://res.cloudinary.com/dojt3kryr/image/upload/v1782920227/sub4links_logo_white_gvqpsu.png"
                alt="Sub4Links"
                className="footer__logo-img"
              />
            </Link>
            <p className="footer__desc">
              وجهتك الموثوقة للاشتراكات الرقمية وخدمات التصميم الاحترافية. جودة مضمونة مع دعم فني مستمر.
            </p>
            <div className="footer__socials">
              <a href="https://www.instagram.com/sub4links/" target="_blank" rel="noreferrer" className="footer__social" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="https://wa.me/201055899599" target="_blank" rel="noreferrer" className="footer__social" aria-label="WhatsApp">
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          {/* حسابي */}
          <div className="footer__col">
            <h4 className="footer__heading">حسابي</h4>
            <ul className="footer__links">
              <li><Link to="/customer">لوحة التحكم</Link></li>
              <li><Link to="/customer/orders">تتبع الطلبات</Link></li>
              <li><Link to="/wishlist">المفضلة ❤️</Link></li>
              <li><Link to="/checkout">إتمام الشراء</Link></li>
              <li><Link to="/login">تسجيل الدخول</Link></li>
            </ul>
          </div>

          {/* الدعم */}
          <div className="footer__col">
            <h4 className="footer__heading">الدعم</h4>
            <ul className="footer__links">
              <li><Link to="/contact">مركز المساعدة</Link></li>
              <li><Link to="/contact">الأسئلة الشائعة</Link></li>
              <li><Link to="/refund">سياسة الاسترجاع</Link></li>
              <li>
                <a href="https://wa.me/201055899599" target="_blank" rel="noreferrer">
                  واتساب مباشر
                </a>
              </li>
            </ul>
          </div>

          {/* تواصل معنا — فقط هاتف + ايميل */}
          <div className="footer__col" id="contact">
            <h4 className="footer__heading">تواصل معنا</h4>
            <ul className="footer__contact-list">
              <li>
                <Phone size={16} />
                <a href="tel:+201099599558" dir="ltr">+20 1099599558</a>
              </li>
              <li>
                <Mail size={16} />
                <a href="mailto:info@sub4links.com">info@sub4links.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {new Date().getFullYear()} Sub4Links. جميع الحقوق محفوظة.
          </p>
          <div className="footer__legal">
            <Link to="/privacy">سياسة الخصوصية</Link>
            <Link to="/terms">شروط الخدمة</Link>
          </div>
          <div className="footer__payment">
            <span className="footer__payment-label">دفع آمن مع</span>
            <div className="footer__payment-icons">
              <span className="footer__payment-icon">Visa</span>
              <span className="footer__payment-icon">MC</span>
              <span className="footer__payment-icon">Paymob</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
