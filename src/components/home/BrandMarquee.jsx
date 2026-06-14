import './BrandMarquee.css';

const brands = [
  {
    name: 'OpenAI',
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.322 9.872c.545-1.025.402-2.29-.351-3.17a2.986 2.986 0 0 0-1.393-.835c.069-1.075-.412-2.13-1.318-2.768a2.973 2.973 0 0 0-3.544.298c-.644-.344-1.4-.419-2.106-.188C11.89 2.053 10.515 1.396 9.172 1.62a2.95 2.95 0 0 0-2.68 2.113c-.795-.081-1.601.23-2.151.85a2.984 2.984 0 0 0 .002 4.21c-.545 1.025-.402 2.29.351 3.17a2.986 2.986 0 0 0 1.393.835c-.069 1.075.412 2.13 1.318 2.768a2.973 2.973 0 0 0 3.544-.298c.644.344 1.4.419 2.106.188c.72 1.156 2.095 1.813 3.438 1.588a2.95 2.95 0 0 0 2.68-2.113c.795.081 1.601-.23 2.151-.85a2.984 2.984 0 0 0-.002-4.21zm-8.826 8.528l-2.72-1.57a.382.382 0 0 1-.19-.33v-3.14l2.72 1.57c.1.058.19.19.19.33v3.14zm-4.148-2.4l-2.72-1.57a.382.382 0 0 1-.19-.33v-3.14l.808.466a.382.382 0 0 1 .19.33v3.14l1.912 1.104zm-.61-5.6l-.808-.466c-.1-.058-.19-.19-.19-.33V6.936l2.72 1.57c.1.058.19.19.19.33v3.14l-1.912-1.104zm7.986 6.84l-2.72-1.57c-.1-.058-.19-.19-.19-.33v-3.14l2.72 1.57c.1.058.19.19.19.33v3.14zm1.428-2.434l-.808-.466v-3.14l2.72 1.57c.1.058.19.19.19.33v3.14l-2.102-1.294zm-5.46-3.155l-2.72-1.57V8.506l2.72 1.57c.1.058.19.19.19.33v3.14l-.19-.19zm1.31-2.274l-2.72-1.57a.382.382 0 0 1-.19-.33V5.372l2.72 1.57c.1.058.19.19.19.33v3.14z" />
      </svg>
    ),
    color: '#10A37F'
  },
  {
    name: 'Microsoft',
    logo: (
      <svg width="24" height="24" viewBox="0 0 23 23">
        <path d="M0 0h11v11H0z" fill="#f25022"/>
        <path d="M12 0h11v11H12z" fill="#7fba00"/>
        <path d="M0 12h11v11H0z" fill="#00a4ef"/>
        <path d="M12 12h11v11H12z" fill="#ffb900"/>
      </svg>
    ),
    color: '#00A4EF'
  },
  {
    name: 'Google',
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
      </svg>
    ),
    color: '#4285F4'
  },
  {
    name: 'Figma',
    logo: (
      <svg width="16" height="24" viewBox="0 0 12 18" fill="none">
        <path d="M3 4.5a3 3 0 0 1 3-3h3v6h-3a3 3 0 0 1-3-3z" fill="#F24E1E"/>
        <path d="M3 10.5a3 3 0 0 1 3-3h3v6h-3a3 3 0 0 1-3-3z" fill="#A259FF"/>
        <path d="M3 16.5a3 3 0 0 1 3-3h3v3a3 3 0 0 1-3 3 3 3 0 0 1-3-3z" fill="#1ABC9C"/>
        <path d="M9 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" fill="#19B5FE"/>
        <path d="M9 4.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" fill="#FF7262"/>
      </svg>
    ),
    color: '#F24E1E'
  },
  {
    name: 'Adobe',
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.6 2h7.4v20l-7.4-20zm-5.2 0h-7.4v20l7.4-20zm2.6 7l5.2 13h-3.4l-1.8-4.6h-5.2l-1.8 4.6h-3.4l7.4-18z" fill="#FF0000"/>
      </svg>
    ),
    color: '#FF0000'
  },
  {
    name: 'Canva',
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="url(#canvaGrad)"/>
        <path d="M15.5 8.5c-.7-.7-1.8-1.2-3.1-1.2-2.8 0-4.9 2.1-4.9 4.7s2.1 4.7 4.9 4.7c1.3 0 2.4-.5 3.1-1.2l-.8-.8c-.6.6-1.5.9-2.3.9-2.2 0-3.8-1.6-3.8-3.6s1.6-3.6 3.8-3.6c.8 0 1.7.3 2.3.9l.7-.7z" fill="white"/>
        <defs>
          <linearGradient id="canvaGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00C4CC"/>
            <stop offset="1" stopColor="#7D2AE8"/>
          </linearGradient>
        </defs>
      </svg>
    ),
    color: '#00C4CC'
  },
  {
    name: 'Make',
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="8" cy="8" r="6" fill="#A855F7" fillOpacity="0.85"/>
        <circle cx="16" cy="16" r="6" fill="#EC4899" fillOpacity="0.85"/>
        <circle cx="16" cy="8" r="4" fill="#3B82F6" fillOpacity="0.85"/>
      </svg>
    ),
    color: '#A855F7'
  },
  {
    name: 'N8N',
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="6" cy="12" r="3" fill="#10B981" stroke="#10B981"/>
        <circle cx="18" cy="7" r="3" fill="#3B82F6" stroke="#3B82F6"/>
        <circle cx="18" cy="17" r="3" fill="#EC4899" stroke="#EC4899"/>
        <path d="M9 12h5m0 0l2.5-3.5M14 12l2.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    color: '#10B981'
  },
  {
    name: 'Replit',
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 6h16M4 12h10M4 18h16" stroke="#00F0FF" strokeWidth="3" strokeLinecap="round"/>
        <rect x="16" y="10" width="4" height="4" rx="1" fill="#FF007A"/>
      </svg>
    ),
    color: '#00F0FF'
  },
  {
    name: 'Envato',
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.8 3.3c-1.8.8-3.4 2.3-4.5 4.1-1.3 2.1-1.9 4.6-2.1 7.1-.1.7-.1 1.5 0 2.2.1.8.3 1.6.7 2.4.5.9 1.2 1.6 2.1 2 .9.4 1.9.5 2.9.2s1.8-1 2.3-1.9c.5-.9.7-2 .5-3.1-.2-1.3-.9-2.5-1.9-3.4-1.2-1.1-2.9-1.8-4.5-2-.6-.1-1.2-.1-1.8 0-.4.1-.7.2-1.1.4-.4.2-.7.6-1 1-.3.4-.5.9-.6 1.4 0 .4-.1.8-.1 1.2 0 .5.1 1 .3 1.5.2.5.5.9.8 1.3s.7.7 1.2.9c.9.4 2 .4 3 .1 1-.3 1.8-1.1 2.3-2 .5-1 .7-2.1.5-3.2-.2-1.1-.9-2.1-1.8-2.8-.7-.6-1.6-1-2.6-1.1z" fill="#81B441"/>
      </svg>
    ),
    color: '#81B441'
  }
];

export default function BrandMarquee() {
  // Triple the array to ensure perfect seamless transition on wide screens
  const marqueeBrands = [...brands, ...brands, ...brands];

  return (
    <section className="brand-marquee" id="brands-section">
      <div className="brand-marquee__container">
        <p className="brand-marquee__label">
          محل ثقة وموثوق من قبل الشركات الرائدة عالمياً
          <span>Trusted by leading brands worldwide</span>
        </p>
      </div>
      
      <div className="brand-marquee__track" aria-hidden="true">
        <div className="brand-marquee__scroll">
          {marqueeBrands.map((brand, i) => (
            <div key={i} className="brand-marquee__item" style={{ '--accent-glow': brand.color }}>
              <span className="brand-marquee__logo-wrapper">
                {brand.logo}
              </span>
              <span className="brand-marquee__name">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
