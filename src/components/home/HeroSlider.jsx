import { ArrowLeft, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import './HeroSlider.css';

const APP_ICONS = [
  { name: 'ChatGPT',        emoji: '🤖', color: '#10A37F', bg: '#ECFDF5' },
  { name: 'Gemini',         emoji: '✨', color: '#4285F4', bg: '#EFF6FF' },
  { name: 'Claude',         emoji: '🧠', color: '#CC6633', bg: '#FFF7ED' },
  { name: 'Canva',          emoji: '🎨', color: '#00C4CC', bg: '#ECFEFF' },
  { name: 'Adobe',          emoji: '🅰',  color: '#FF0000', bg: '#FEF2F2' },
  { name: 'LinkedIn',       emoji: '💼', color: '#0A66C2', bg: '#EFF6FF' },
  { name: 'Notion',         emoji: '📝', color: '#000000', bg: '#F8FAFC' },
  { name: 'Figma',          emoji: '🖌',  color: '#F24E1E', bg: '#FFF7ED' },
  { name: 'YouTube',        emoji: '▶',  color: '#FF0000', bg: '#FEF2F2' },
  { name: 'Microsoft',      emoji: '🪟', color: '#0078D4', bg: '#EFF6FF' },
  { name: 'Envato',         emoji: '🌿', color: '#82B541', bg: '#F0FDF4' },
  { name: 'Freepik',        emoji: '🖼',  color: '#1273EB', bg: '#EFF6FF' },
  { name: 'Gamma',          emoji: '⚡', color: '#7C3AED', bg: '#F5F3FF' },
  { name: 'ElevenLabs',     emoji: '🔊', color: '#111827', bg: '#F8FAFC' },
  { name: 'CapCut',         emoji: '🎬', color: '#000000', bg: '#F8FAFC' },
  { name: 'Midjourney',     emoji: '🎭', color: '#5865F2', bg: '#EEF2FF' },
];

export default function HeroSlider() {
  return (
    <section className="hero-light" id="hero-section">
      {/* Subtle gradient background */}
      <div className="hero-light__bg" aria-hidden="true">
        <div className="hero-light__blob hero-light__blob--1"></div>
        <div className="hero-light__blob hero-light__blob--2"></div>
      </div>

      <div className="hero-light__container container">
        {/* Left Content */}
        <div className="hero-light__content">
          <div className="hero-light__badge">
            <Sparkles size={14} />
            <span>منصة الخدمات الرقمية #1 في مصر</span>
          </div>

          <h1 className="hero-light__title">
            كل الاشتراكات الرقمية
            <span className="text-gradient-premium"> في مكان واحد</span>
          </h1>

          <p className="hero-light__desc">
            Sub4Links وجهتك الموثوقة للحصول على أفضل الاشتراكات الرقمية وخدمات التصميم الاحترافية بأسعار تنافسية وجودة مضمونة.
          </p>

          <div className="hero-light__actions">
            <Link to="/shop" className="btn btn-primary btn-lg">
              تصفح الخدمات
              <ArrowLeft size={18} />
            </Link>
            <a
              href="https://api.whatsapp.com/send/?phone=201055899599&text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D8%AA%D9%88%D8%A7%D8%B5%D9%84%20%D9%85%D8%B9%D9%83%D9%85%20%D9%85%D9%86%20%D8%A7%D9%84%D8%B5%D9%81%D8%AD%D8%A9%20%D8%A7%D9%84%D8%B1%D8%A6%D9%8A%D8%B3%D9%8A%D8%A9&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-lg"
            >
              تواصل معنا
            </a>
          </div>

          <div className="hero-light__stats">
            <div className="hero-stat">
              <span className="hero-stat__num">+500</span>
              <span className="hero-stat__label">عميل راضٍ</span>
            </div>
            <div className="hero-stat__divider"></div>
            <div className="hero-stat">
              <span className="hero-stat__num">+50</span>
              <span className="hero-stat__label">خدمة رقمية</span>
            </div>
            <div className="hero-stat__divider"></div>
            <div className="hero-stat">
              <span className="hero-stat__num">24/7</span>
              <span className="hero-stat__label">دعم فني</span>
            </div>
          </div>
        </div>

        {/* Right: App Icons Grid */}
        <div className="hero-light__icons" aria-label="الخدمات المتاحة">
          <div className="icons-grid">
            {APP_ICONS.map((app, i) => (
              <div
                key={app.name}
                className="icon-pill"
                style={{
                  '--icon-bg': app.bg,
                  '--icon-color': app.color,
                  animationDelay: `${i * 0.08}s`,
                }}
                title={app.name}
              >
                <span className="icon-pill__emoji" style={{ color: app.color }}>
                  {app.emoji}
                </span>
                <span className="icon-pill__name">{app.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
