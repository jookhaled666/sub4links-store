import { ArrowLeft, Clock, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import './DealBanner.css';

export default function DealBanner() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23, minutes: 45, seconds: 12
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <section className="deal-banner section" id="deals">
      <div className="container">
        <div className="deal-banner__inner">
          {/* Decorative */}
          <div className="deal-banner__decor" aria-hidden="true">
            <div className="deal-banner__circle deal-banner__circle--1" />
            <div className="deal-banner__circle deal-banner__circle--2" />
            <div className="deal-banner__glow" />
          </div>

          <div className="deal-banner__content">
            <div className="deal-banner__left">
              <span className="deal-banner__badge">
                <Zap size={14} fill="currentColor" /> عرض لفترة محدودة
              </span>
              <h2 className="deal-banner__title">
                عروض وخصومات<br />
                <span className="deal-banner__highlight">عام 2026</span>
              </h2>
              <p className="deal-banner__text">
                خصومات تصل إلى 30% على خدمات التصميم والاشتراكات الرقمية.
                لا تفوت الفرصة - لفترة محدودة فقط!
              </p>
              <button className="btn btn-lg deal-banner__cta" id="deal-cta">
                تصفح العروض <ArrowLeft size={18} />
              </button>
            </div>

            <div className="deal-banner__right">
              <div className="deal-banner__timer-label">
                <Clock size={16} /> ينتهي العرض خلال
              </div>
              <div className="deal-banner__timer">
                <div className="deal-banner__time-box">
                  <span className="deal-banner__time-value">{pad(timeLeft.hours)}</span>
                  <span className="deal-banner__time-label">ساعة</span>
                </div>
                <span className="deal-banner__time-sep">:</span>
                <div className="deal-banner__time-box">
                  <span className="deal-banner__time-value">{pad(timeLeft.minutes)}</span>
                  <span className="deal-banner__time-label">دقيقة</span>
                </div>
                <span className="deal-banner__time-sep">:</span>
                <div className="deal-banner__time-box">
                  <span className="deal-banner__time-value">{pad(timeLeft.seconds)}</span>
                  <span className="deal-banner__time-label">ثانية</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
