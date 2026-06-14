import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { heroSlides, stats } from '../../data/products';
import './HeroSlider.css';

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback((index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % heroSlides.length);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slide = heroSlides[currentSlide];

  return (
    <section className="hero" id="hero-section">
      {/* Background Images */}
      {heroSlides.map((s, i) => (
        <div
          key={s.id}
          className={`hero__bg ${i === currentSlide ? 'hero__bg--active' : ''}`}
          style={{ backgroundImage: `url(${s.image})` }}
          aria-hidden="true"
        />
      ))}

      {/* Gradient Overlay */}
      <div
        className="hero__overlay"
        style={{ background: slide.gradient }}
      />

      {/* Decorative Elements */}
      <div className="hero__decor" aria-hidden="true">
        <div className="hero__circle hero__circle--1" />
        <div className="hero__circle hero__circle--2" />
        <div className="hero__grid-pattern" />
      </div>

      {/* Content */}
      <div className="hero__content container">
        <div className="hero__text" key={currentSlide}>
          <span className="hero__badge badge badge-gold animate-fade-in-up">
            {slide.subtitle}
          </span>
          <h1 className="hero__title animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            {slide.title}
          </h1>
          <p className="hero__description animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            {slide.description}
          </p>
          <div className="hero__actions animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <button className="btn btn-primary btn-lg hero__cta" id="hero-cta">
              {slide.cta}
              <ArrowLeft size={18} />
            </button>
            <button className="btn btn-secondary btn-lg hero__cta-secondary">
              تصفح الخدمات
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="hero__stats animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          {stats.map((stat, index) => (
            <div key={index} className="hero__stat-wrapper" style={{ display: 'flex', alignItems: 'center' }}>
              <div className="hero__stat">
                <span className="hero__stat-value">{stat.value}</span>
                <span className="hero__stat-label">{stat.label}</span>
              </div>
              {index < stats.length - 1 && <div className="hero__stat-divider" />}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="hero__nav">
        <button
          className="hero__nav-btn"
          onClick={nextSlide}
          aria-label="Previous slide"
          disabled={isTransitioning}
        >
          <ChevronRight size={20} />
        </button>
        <div className="hero__dots">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              className={`hero__dot ${i === currentSlide ? 'hero__dot--active' : ''}`}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <button
          className="hero__nav-btn"
          onClick={prevSlide}
          aria-label="Next slide"
          disabled={isTransitioning}
        >
          <ChevronLeft size={20} />
        </button>
      </div>
    </section>
  );
}
