import { Star, Quote } from 'lucide-react';
import { testimonials } from '../../data/products';
import './Testimonials.css';

export default function Testimonials() {
  // Duplicate for seamless loop
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="testimonials-h section" id="testimonials-section">
      <div className="container">
        <div className="testimonials-h__header">
          <span className="eyebrow">عملاؤنا السعداء</span>
          <h2 className="testimonials-h__title">ماذا يقول عملاؤنا</h2>
          <p className="lead testimonials-h__sub">
            انضم إلى المئات من العملاء الراضين الذين يثقون في خدماتنا يومياً.
          </p>
        </div>
      </div>

      {/* Full-width scroll strip — no container constraint */}
      <div className="testimonials-h__track-wrap" aria-hidden="false">
        <div className="testimonials-h__track">
          {doubled.map((t, i) => (
            <div
              key={`${t.id}-${i}`}
              className="t-card"
              id={i < testimonials.length ? `testimonial-${t.id}` : undefined}
            >
              <div className="t-card__top">
                <Quote size={20} className="t-card__quote" aria-hidden="true" />
                <div className="t-card__stars" aria-label={`تقييم ${t.rating} من 5`}>
                  {Array.from({ length: t.rating }, (_, idx) => (
                    <Star key={idx} size={13} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
              </div>
              <p className="t-card__text">{t.text}</p>
              <div className="t-card__footer">
                <div className="t-card__avatar" aria-hidden="true">{t.avatar}</div>
                <div>
                  <div className="t-card__name">{t.name}</div>
                  <div className="t-card__role">{t.role}</div>
                </div>
              </div>
              <div className="t-card__product">الخدمة: {t.product}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
