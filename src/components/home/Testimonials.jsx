import { Star, Quote } from 'lucide-react';
import { testimonials } from '../../data/products';
import './Testimonials.css';

export default function Testimonials() {
  return (
    <section className="testimonials section" id="testimonials-section">
      <div className="container">
        <div className="testimonials__header">
          <span className="eyebrow">آراء العملاء</span>
          <h2 className="testimonials__title">ماذا يقول عملاؤنا</h2>
          <p className="lead testimonials__subtitle">
            انضم إلى المئات من العملاء السعداء الذين يثقون في خدماتنا.
          </p>
        </div>

        <div className="testimonials__grid stagger">
          {testimonials.map(t => (
            <div key={t.id} className="testimonial-card animate-fade-in-up" id={`testimonial-${t.id}`}>
              <div className="testimonial-card__quote" aria-hidden="true">
                <Quote size={24} />
              </div>
              <div className="testimonial-card__stars">
                {Array.from({ length: t.rating }, (_, i) => (
                  <Star key={i} size={16} fill="#EAB308" color="#EAB308" />
                ))}
              </div>
              <p className="testimonial-card__text">{t.text}</p>
              <div className="testimonial-card__footer">
                <div className="testimonial-card__avatar">
                  {t.avatar}
                </div>
                <div>
                  <div className="testimonial-card__name">{t.name}</div>
                  <div className="testimonial-card__role">{t.role}</div>
                </div>
              </div>
              <div className="testimonial-card__product">
                الخدمة: {t.product}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
