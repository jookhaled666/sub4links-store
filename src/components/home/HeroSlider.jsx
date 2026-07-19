import { ArrowLeft, Sparkles, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './HeroSlider.css';

const APP_ICONS = [
  { name: 'ChatGPT',        src: '/images/programs/icons_0009_chay-GPT.png', color: '#10A37F' },
  { name: 'Gemini',         src: '/images/programs/icons_0011_giminai.png', color: '#4285F4' },
  { name: 'Adobe',          src: '/images/programs/icons_0006_adobe.png', color: '#FF0000' },
  { name: 'LinkedIn',       src: '/images/programs/icons_0001_Linkedin-Premium-.png', color: '#0A66C2' },
  { name: 'Zoom',           src: '/images/programs/icons_0010_zoom.png', color: '#2D8CFF' },
  { name: 'Microsoft 365',  src: '/images/programs/icons_0013_microsoft-365.png', color: '#0078D4' },
  { name: 'Grammarly',      src: '/images/programs/icons_0002_Grammarly.png', color: '#11A683' },
  { name: 'edX',            src: '/images/programs/icons_0003_edx.png', color: '#B32631' },
  { name: 'Duolingo',       src: '/images/programs/icons_0004_doulengo.png', color: '#58CC02' },
  { name: 'n8n',            src: '/images/programs/icons_0005_n8n.png', color: '#EA4C89' },
  { name: 'Kaspersky',      src: '/images/programs/icons_0007_Kaspersky.png', color: '#00A88E' },
  { name: 'Autodesk',       src: '/images/programs/icons_0008_autodisk.png', color: '#0696D7' },
  { name: 'Telegram',       src: '/images/programs/icons_0012_telegram.png', color: '#24A1DE' },
  { name: 'Coursera',       src: '/images/programs/icons_0000_coursera.png', color: '#0056D2' },
];

export default function HeroSlider() {
  return (
    <section className="hero-premium" id="hero-section">
      {/* Cinematic Background */}
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-blob hero-blob--1"></div>
        <div className="hero-blob hero-blob--2"></div>
        <div className="hero-blob hero-blob--3"></div>
        <div className="hero-grid-pattern"></div>
      </div>

      <div className="hero-container container">
        {/* Left Content */}
        <div className="hero-content">
          <div className="hero-badge fade-in-up">
            <span className="hero-badge__glow"></span>
            <Sparkles size={16} className="hero-badge__icon" />
            <span className="hero-badge__text">منصة الخدمات الرقمية #1 في مصر</span>
          </div>

          <h1 className="hero-title fade-in-up delay-1">
            <span className="hero-title__main">كل ما تحتاجه من</span>
            <br />
            <span className="text-gradient-gold">الاشتراكات والبرمجيات</span>
            <br />
            <span className="hero-title__sub">في مكان واحد وبأفضل سعر</span>
          </h1>

          <p className="hero-desc fade-in-up delay-2">
            اكتشف عالمًا من الأدوات الاحترافية وبرامج الذكاء الاصطناعي مع <strong>Sub4Links</strong>. 
            نوفر لك خدمات موثوقة، تسليم فوري، ودعم فني على مدار الساعة لضمان نجاح أعمالك.
          </p>

          <div className="hero-actions fade-in-up delay-3">
            <Link to="/shop" className="btn-hero btn-hero--primary">
              <span>تصفح الخدمات</span>
              <ArrowLeft size={20} />
              <div className="btn-hero__glow"></div>
            </Link>
            <a
              href="https://api.whatsapp.com/send/?phone=201055899599&text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D8%AA%D9%88%D8%A7%D8%B5%D9%84%20%D9%85%D8%B9%D9%83%D9%85%20%D9%85%D9%86%20%D8%A7%D9%84%D8%B5%D9%81%D8%AD%D8%A9%20%D8%A7%D9%84%D8%B1%D8%A6%D9%8A%D8%B3%D9%8A%D8%A9&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero btn-hero--secondary"
            >
              <span>تواصل معنا</span>
              <ChevronRight size={20} />
            </a>
          </div>

          <div className="hero-stats fade-in-up delay-4">
            <div className="stat-item">
              <span className="stat-num">+500</span>
              <span className="stat-label">عميل سعيد</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-num">+50</span>
              <span className="stat-label">برنامج واشتراك</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-num">24/7</span>
              <span className="stat-label">دعم فني</span>
            </div>
          </div>
        </div>

        {/* Right Content: 3D Icons Floating Grid */}
        <div className="hero-showcase fade-in-up delay-5" aria-label="أبرز البرامج والاشتراكات">
          <div className="icons-float-grid">
            {APP_ICONS.map((app, i) => (
              <div 
                key={app.name} 
                className="icon-3d-wrapper"
                style={{
                  '--anim-delay': `${(i * 0.1) + Math.random() * 0.5}s`,
                  '--brand': app.color
                }}
                title={app.name}
              >
                <div className="icon-3d-card">
                  <div className="icon-3d-glow"></div>
                  <img src={app.src} alt={app.name} className="icon-3d-img" loading="lazy" />
                </div>
                <span className="icon-3d-name">{app.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
