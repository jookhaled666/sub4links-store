import { ArrowLeft, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import './HeroSlider.css';

export default function HeroSlider() {
  return (
    <section className="hero-pro-max" id="hero-section">
      {/* Dynamic Background Effects */}
      <div className="hero-pro-max__bg">
        <div className="hero-pro-max__orb hero-pro-max__orb--1"></div>
        <div className="hero-pro-max__orb hero-pro-max__orb--2"></div>
        <div className="hero-pro-max__orb hero-pro-max__orb--3"></div>
        <div className="hero-pro-max__grid"></div>
      </div>

      <div className="hero-pro-max__container container">
        {/* Main Content */}
        <div className="hero-pro-max__content">
          <div className="hero-pro-max__badge">
            <Sparkles size={16} className="hero-pro-max__badge-icon" />
            <span>مستقبل الخدمات الرقمية</span>
          </div>
          
          <h1 className="hero-pro-max__title">
            ارتقِ بعملك إلى <br />
            <span className="text-gradient-premium">المستوى التالي</span>
          </h1>
          
          <p className="hero-pro-max__description">
            منصة <strong>Sub4Links</strong> توفر لك أفضل الاشتراكات الرقمية، خدمات التصميم الاحترافية، والدورات التدريبية المتقدمة لتعزيز نجاحك بأعلى معايير الجودة.
          </p>
          
          <div className="hero-pro-max__actions">
            <Link to="/shop" className="btn btn-primary btn-lg hero-pro-max__cta">
              استكشف الخدمات
              <ArrowLeft size={20} />
            </Link>
            <Link to="/contact" className="btn btn-secondary btn-lg hero-pro-max__cta-secondary">
              تواصل معنا
            </Link>
          </div>
        </div>

        {/* Floating Glassmorphism Elements (Desktop primarily, scales down for mobile) */}
        <div className="hero-pro-max__visuals">
          <div className="hero-pro-max__card hero-pro-max__card--1">
            <div className="card-icon" style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#3B82F6' }}>
              <Zap size={24} />
            </div>
            <div className="card-info">
              <h4>تسليم فوري</h4>
              <p>لجميع الاشتراكات الرقمية</p>
            </div>
          </div>
          
          <div className="hero-pro-max__card hero-pro-max__card--2">
            <div className="card-icon" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10B981' }}>
              <ShieldCheck size={24} />
            </div>
            <div className="card-info">
              <h4>ضمان الجودة</h4>
              <p>خدمات موثوقة وآمنة 100%</p>
            </div>
          </div>

          <div className="hero-pro-max__main-image">
            {/* Using a futuristic glowing gradient element as a central visual if no image is available */}
            <div className="hero-pro-max__main-glow"></div>
            <div className="hero-pro-max__main-glow-inner"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
