import { Gift, ArrowLeft, Star } from 'lucide-react';
import './Newsletter.css';

export default function Newsletter() {
  return (
    <section className="newsletter section" id="newsletter-section">
      <div className="container">
        <div className="newsletter__inner">
          {/* Decorative */}
          <div className="newsletter__decor" aria-hidden="true">
            <div className="newsletter__circle" />
            <div className="newsletter__dots" />
          </div>

          <div className="newsletter__content">
            <div className="newsletter__icon">
              <Gift size={28} />
            </div>
            <h2 className="newsletter__title">
              احصل على خصم 15% على طلبك الأول
            </h2>
            <p className="newsletter__text">
              اشترك في نشرتنا الإخبارية وكن أول من يعلم بأحدث العروض والخدمات الجديدة والمكافآت الحصرية.
            </p>
            <form className="newsletter__form" onSubmit={(e) => e.preventDefault()}>
              <div className="newsletter__input-wrap">
                <input
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  className="newsletter__input"
                  id="newsletter-email"
                  aria-label="Email address for newsletter"
                  required
                />
                <button type="submit" className="btn btn-primary newsletter__submit" id="newsletter-submit">
                  اشترك الآن <ArrowLeft size={16} />
                </button>
              </div>
            </form>
            <div className="newsletter__trust">
              <Star size={14} fill="#EAB308" color="#EAB308" />
              <span>انضم لأكثر من 50,000 مشترك. لن نرسل لك رسائل مزعجة.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
