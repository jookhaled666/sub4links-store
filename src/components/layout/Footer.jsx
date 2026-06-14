import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import './Footer.css';

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
);
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);
const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
);

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <img src="/company-icon.png" alt="Sub4Links Icon" className="footer__logo-icon-img" />
              <img src="/company-logo.png" alt="Sub4Links Logo" className="footer__logo-text-img" />
            </Link>
            <p className="footer__desc">
              وجهتك الموثوقة للاشتراكات الرقمية وخدمات التصميم الاحترافية. جودة مضمونة مع دعم فني مستمر.
            </p>
            <div className="footer__socials">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer__social" aria-label="Facebook"><FacebookIcon /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="footer__social" aria-label="Twitter"><TwitterIcon /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer__social" aria-label="Instagram"><InstagramIcon /></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="footer__social" aria-label="YouTube"><YoutubeIcon /></a>
            </div>
          </div>

          {/* Columns */}
          <div className="footer__col">
            <h4 className="footer__heading">الخدمات</h4>
            <ul className="footer__links">
              <li><Link to="/subscriptions">الاشتراكات الرقمية</Link></li>
              <li><Link to="/services">تصميم المواقع</Link></li>
              <li><Link to="/services">تصميم اللوجوهات</Link></li>
              <li><Link to="/courses">الدورات التدريبية</Link></li>
              <li><Link to="/shop">جميع الخدمات</Link></li>
            </ul>
          </div>

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

          <div className="footer__col">
            <h4 className="footer__heading">الدعم</h4>
            <ul className="footer__links">
              <li><Link to="/contact">مركز المساعدة</Link></li>
              <li><Link to="/contact">الأسئلة الشائعة</Link></li>
              <li><Link to="/refund">سياسة الاسترجاع</Link></li>
              <li><Link to="/contact">اتصل بنا</Link></li>
              <li><a href="https://wa.me/201234567890" target="_blank" rel="noreferrer">واتساب مباشر</a></li>
            </ul>
          </div>

          <div className="footer__col" id="contact">
            <h4 className="footer__heading">تواصل معنا</h4>
            <ul className="footer__contact-list">
              <li><MapPin size={16} /><span>المعادي الجديدة، القاهرة، مصر</span></li>
              <li><Phone size={16} /><a href="tel:+201234567890">+20 123 456 7890</a></li>
              <li><Mail size={16} /><a href="mailto:support@sup4links.com">support@sup4links.com</a></li>
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
