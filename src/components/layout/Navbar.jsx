import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Search, ShoppingBag, User, Menu, X, Heart,
  ChevronDown, Globe, Zap, BookOpen, Home, Grid3X3
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import CartDrawer from '../cart/CartDrawer';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartCount, wishlist, cartOpen, setCartOpen } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="main-nav">
        <div className="navbar__inner container">
          {/* Logo */}
          <Link to="/" className="navbar__logo" aria-label="Sub4Links الرئيسية">
            <img
              src="https://res.cloudinary.com/dojt3kryr/image/upload/v1782920227/sub4links_logo_white_gvqpsu.png"
              alt="Sub4Links"
              className="navbar__logo-img"
              style={{ filter: 'none', height: '38px' }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="navbar__links">
            <Link to="/" className={`navbar__link ${isActive('/') ? 'navbar__link--active' : ''}`}>
              الرئيسية
            </Link>

            <div className="navbar__dropdown">
              <button className={`navbar__link ${location.pathname.startsWith('/services') || location.pathname.startsWith('/subscriptions') ? 'navbar__link--active' : ''}`}>
                الخدمات <ChevronDown size={14} />
              </button>
              <div className="navbar__dropdown-menu">
                <Link to="/subscriptions" className="navbar__dropdown-item">
                  <Globe size={15} /> الاشتراكات الرقمية
                </Link>
                <Link to="/services" className="navbar__dropdown-item">
                  <Zap size={15} /> تصميم المواقع
                </Link>
                <Link to="/services" className="navbar__dropdown-item">
                  <BookOpen size={15} /> تصميم اللوجوهات
                </Link>
                <Link to="/courses" className="navbar__dropdown-item">
                  <BookOpen size={15} /> الدورات التدريبية
                </Link>
                <Link to="/shop" className="navbar__dropdown-item navbar__dropdown-item--all">
                  عرض الكل ←
                </Link>
              </div>
            </div>

            <Link to="/subscriptions" className={`navbar__link ${isActive('/subscriptions') ? 'navbar__link--active' : ''}`}>
              الاشتراكات
            </Link>
            <Link to="/courses" className={`navbar__link ${isActive('/courses') ? 'navbar__link--active' : ''}`}>
              الدورات
            </Link>
            <Link to="/contact" className={`navbar__link ${isActive('/contact') ? 'navbar__link--active' : ''}`}>
              اتصل بنا
            </Link>
          </nav>

          {/* Actions */}
          <div className="navbar__actions">
            <button
              className="navbar__action-btn"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search products"
              id="search-toggle"
            >
              <Search size={18} />
            </button>

            <Link to="/wishlist" className="navbar__action-btn navbar__wishlist-btn" aria-label="Wishlist" id="wishlist-btn">
              <Heart size={18} />
              {wishlist.length > 0 && (
                <span className="navbar__cart-count">{wishlist.length}</span>
              )}
            </Link>

            <button
              className="navbar__action-btn navbar__cart-btn"
              aria-label="Shopping cart"
              id="cart-btn"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="navbar__cart-count" aria-label={`${cartCount} items in cart`}>
                  {cartCount}
                </span>
              )}
            </button>

            <Link to="/customer" className="navbar__action-btn navbar__user-btn" aria-label="حسابي" id="account-btn">
              <User size={18} />
            </Link>

            <button
              className="navbar__menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              id="mobile-menu-toggle"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="navbar__search animate-fade-in" id="search-bar">
            <div className="container">
              <div className="navbar__search-inner">
                <Search size={20} className="navbar__search-icon" />
                <input
                  type="search"
                  placeholder="ابحث عن المنتجات أو الخدمات..."
                  className="navbar__search-input"
                  autoFocus
                  id="search-input"
                  aria-label="Search products"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setSearchOpen(false);
                      navigate('/shop');
                    }
                  }}
                />
                <button
                  className="navbar__search-close"
                  onClick={() => setSearchOpen(false)}
                  aria-label="Close search"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="mobile-menu" id="mobile-menu">
          <div className="mobile-menu__overlay" onClick={() => setMenuOpen(false)} />
          <div className="mobile-menu__panel animate-slide-right">
            <div className="mobile-menu__header">
              <Link to="/" className="navbar__logo">
                <img
                  src="https://res.cloudinary.com/dojt3kryr/image/upload/v1782920227/sub4links_logo_white_gvqpsu.png"
                  alt="Sub4Links"
                  className="navbar__logo-img"
                  style={{ filter: 'none', height: '34px' }}
                />
              </Link>
              <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <X size={22} />
              </button>
            </div>
            <nav className="mobile-menu__nav">
              <Link to="/" className={`mobile-menu__link ${isActive('/') ? 'mobile-menu__link--active' : ''}`}>
                الرئيسية
              </Link>
              <Link to="/subscriptions" className={`mobile-menu__link ${isActive('/subscriptions') ? 'mobile-menu__link--active' : ''}`}>
                الاشتراكات الرقمية
              </Link>
              <Link to="/services" className={`mobile-menu__link ${isActive('/services') ? 'mobile-menu__link--active' : ''}`}>
                خدمات التصميم
              </Link>
              <Link to="/courses" className={`mobile-menu__link ${isActive('/courses') ? 'mobile-menu__link--active' : ''}`}>
                الدورات التدريبية
              </Link>
              <Link to="/shop" className={`mobile-menu__link ${isActive('/shop') ? 'mobile-menu__link--active' : ''}`}>
                جميع الخدمات
              </Link>
              <Link to="/contact" className={`mobile-menu__link ${isActive('/contact') ? 'mobile-menu__link--active' : ''}`}>
                اتصل بنا
              </Link>
            </nav>
            <div className="mobile-menu__footer">
              <Link
                to="/login"
                className="btn btn-primary btn-lg"
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <User size={18} /> تسجيل الدخول
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile Bottom Navigation Bar ── */}
      <div className="bottom-nav" id="bottom-nav">
        <Link to="/" className={`bottom-nav__item ${isActive('/') ? 'bottom-nav__item--active' : ''}`}>
          <span className="bottom-nav__icon"><Home size={20} /></span>
          <span className="bottom-nav__label">الرئيسية</span>
        </Link>

        <Link to="/shop" className={`bottom-nav__item ${isActive('/shop') || location.pathname.startsWith('/subscriptions') || location.pathname.startsWith('/services') || location.pathname.startsWith('/courses') ? 'bottom-nav__item--active' : ''}`}>
          <span className="bottom-nav__icon"><Grid3X3 size={20} /></span>
          <span className="bottom-nav__label">المنتجات</span>
        </Link>

        <button
          className="bottom-nav__item"
          onClick={() => setCartOpen(true)}
        >
          <span className="bottom-nav__icon">
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="bottom-nav__badge">{cartCount}</span>}
          </span>
          <span className="bottom-nav__label">السلة</span>
        </button>

        <button
          className="bottom-nav__item"
          onClick={() => setSearchOpen(!searchOpen)}
        >
          <span className="bottom-nav__icon"><Search size={20} /></span>
          <span className="bottom-nav__label">بحث</span>
        </button>

        <Link to="/customer" className={`bottom-nav__item ${location.pathname.startsWith('/customer') ? 'bottom-nav__item--active' : ''}`}>
          <span className="bottom-nav__icon"><User size={20} /></span>
          <span className="bottom-nav__label">حسابي</span>
        </Link>
      </div>

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  );
}
