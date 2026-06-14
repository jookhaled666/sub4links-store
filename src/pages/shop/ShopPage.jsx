import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Eye, Zap, Globe, Clock } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import CartDrawer from '../../components/cart/CartDrawer';
import { products } from '../../data/products';
import { useOrders } from '../../context/AppContext';
import { useCart } from '../../context/CartContext';
import './ShopPage.css';

const categoryMeta = {
  subscriptions: {
    title: 'الاشتراكات الرقمية',
    subtitle: 'أقوى أدوات الذكاء الاصطناعي والإنتاجية بأسعار حصرية',
    icon: <Globe size={28} />,
    gradient: 'linear-gradient(135deg, rgba(6,182,212,0.2), rgba(59,130,246,0.1))',
    color: '#06B6D4',
  },
  services: {
    title: 'خدمات Sub4Links',
    subtitle: 'خدمات تصميم احترافية تبني هويتك الرقمية',
    icon: <Zap size={28} />,
    gradient: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(99,102,241,0.1))',
    color: '#8B5CF6',
  },
  courses: {
    title: 'الدورات التدريبية',
    subtitle: 'ارتقِ بمهاراتك مع نخبة من خبراء الصناعة',
    icon: <Clock size={28} />,
    gradient: 'linear-gradient(135deg, rgba(234,179,8,0.2), rgba(245,158,11,0.1))',
    color: '#EAB308',
  },
};

function ProductGrid({ items }) {
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const [addedId, setAddedId] = useState(null);

  const handleAdd = (product) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <div className="shop-grid">
      {items.map(product => (
        <div key={product.id} className="shop-card">
          {/* Image */}
          <div className="shop-card__img-wrap">
            <img src={product.image} alt={product.name} className="shop-card__img" loading="lazy" />
            {product.badge && <span className="shop-card__badge">{product.badge}</span>}
            {product.discount > 0 && <span className="shop-card__discount">-{product.discount}%</span>}

            {/* Hover Actions */}
            <div className="shop-card__hover-actions">
              <button
                className={`shop-card__action ${isWishlisted(product.id) ? 'active-wish' : ''}`}
                onClick={() => toggleWishlist(product)}
                aria-label="إضافة للمفضلة"
              >
                <Heart size={18} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
              </button>
              <Link to={`/product/${product.id}`} className="shop-card__action" aria-label="عرض التفاصيل">
                <Eye size={18} />
              </Link>
            </div>
          </div>

          {/* Info */}
          <div className="shop-card__info">
            <Link to={`/product/${product.id}`} className="shop-card__name-link">
              <h3 className="shop-card__name">{product.name}</h3>
            </Link>
            <p className="shop-card__desc">{product.description.slice(0, 80)}...</p>

            {/* Stars */}
            <div className="shop-card__rating">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} fill={i < Math.floor(product.rating) ? '#EAB308' : 'none'} color={i < Math.floor(product.rating) ? '#EAB308' : '#4B5563'} />
              ))}
              <span>({product.reviews})</span>
            </div>

            {/* Price */}
            <div className="shop-card__price-row">
              <span className="shop-card__price">{product.price.toLocaleString('ar-EG')} ج.م</span>
              {product.originalPrice && (
                <span className="shop-card__old-price">{product.originalPrice.toLocaleString('ar-EG')} ج.م</span>
              )}
            </div>

            {/* CTA */}
            <button
              className={`shop-card__cta ${addedId === product.id ? 'added' : ''}`}
              onClick={() => handleAdd(product)}
            >
              <ShoppingCart size={17} />
              {addedId === product.id ? '✓ تمت الإضافة' : 'أضف للسلة'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ShopPage({ categoryId }) {
  const [activeCategory, setActiveCategory] = useState(categoryId || 'all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');

  useEffect(() => {
    setActiveCategory(categoryId || 'all');
  }, [categoryId]);

  const cats = ['all', 'subscriptions', 'services', 'courses'];

  const { managedProducts } = useOrders();
  const currentProducts = managedProducts || products;

  let filtered = currentProducts.filter(p => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  if (sort === 'price-asc')  filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === 'rating')     filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  const meta = categoryMeta[activeCategory];

  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="shop-page section" style={{ paddingTop: '6rem' }}>
        <div className="container">

          {/* Hero Banner */}
          {meta && (
            <div className="shop-hero" style={{ background: meta.gradient }}>
              <div className="shop-hero__icon" style={{ color: meta.color }}>{meta.icon}</div>
              <div>
                <h1 className="shop-hero__title" style={{ color: meta.color }}>{meta.title}</h1>
                <p className="shop-hero__sub">{meta.subtitle}</p>
              </div>
            </div>
          )}

          {/* Controls Row */}
          <div className="shop-controls">
            {/* Category Tabs */}
            <div className="shop-tabs">
              {cats.map(c => (
                <button
                  key={c}
                  className={`shop-tab ${activeCategory === c ? 'active' : ''}`}
                  onClick={() => setActiveCategory(c)}
                >
                  {c === 'all' && 'الكل'}
                  {c === 'subscriptions' && 'الاشتراكات'}
                  {c === 'services' && 'الخدمات'}
                  {c === 'courses' && 'الدورات'}
                </button>
              ))}
            </div>

            {/* Search + Sort */}
            <div className="shop-filters">
              <input
                type="search"
                className="shop-search"
                placeholder="ابحث عن منتج..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <select className="shop-sort" value={sort} onChange={e => setSort(e.target.value)}>
                <option value="default">الترتيب الافتراضي</option>
                <option value="price-asc">السعر: من الأقل</option>
                <option value="price-desc">السعر: من الأعلى</option>
                <option value="rating">الأعلى تقييماً</option>
              </select>
            </div>
          </div>

          {/* Count */}
          <p className="shop-count">
            عرض <strong>{filtered.length}</strong> منتج / خدمة
          </p>

          {/* Grid */}
          {filtered.length > 0 ? (
            <ProductGrid items={filtered} />
          ) : (
            <div className="shop-empty">
              <p>لا توجد نتائج مطابقة للبحث</p>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
