import { useState } from 'react';
import { ArrowLeft, Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/AppContext';
import './FeaturedProducts.css';
import '../product/ProductCard.css';

const tabs = [
  { id: 'all', label: 'الكل' },
  { id: 'subscriptions', label: 'اشتراكات رقمية' },
  { id: 'services', label: 'تصميم وخدمات' },
  { id: 'courses', label: 'دورات تدريبية' },
];

function MiniCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="product-card card" id={`product-${product.id}`}>
      {/* Image */}
      <div className="product-card__image-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-card__image"
          loading="lazy"
        />
        {product.badge && (
          <span className={`product-card__badge badge ${
            product.badge === 'الأكثر مبيعاً' ? 'badge-brand' :
            product.badge === 'جديد' || product.badge === 'New' ? 'badge-success' :
            product.badge === 'عرض خاص' ? 'badge-danger' :
            product.badge === 'الأعلى تقييماً' || product.badge === 'Top Rated' ? 'badge-gold' :
            'badge-brand'
          }`}>
            {product.badge}
          </span>
        )}
        {product.discount > 0 && (
          <span className="product-card__discount">-{product.discount}%</span>
        )}

        {/* Quick Actions */}
        <div className="product-card__actions">
          <button
            className={`product-card__action ${isWishlisted(product.id) ? 'product-card__action--wished' : ''}`}
            aria-label="Add to wishlist"
            onClick={() => toggleWishlist(product)}
          >
            <Heart size={18} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
          </button>
          <Link to={`/product/${product.id}`} className="product-card__action" aria-label="Quick view">
            <Eye size={18} />
          </Link>
          <button
            className={`product-card__action product-card__action--primary ${added ? 'added' : ''}`}
            aria-label="Add to cart"
            onClick={handleAdd}
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="product-card__info">
        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
          <h3 className="product-card__name">{product.name}</h3>
        </Link>

        {/* Rating */}
        <div className="product-card__rating">
          <div className="product-card__stars">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < Math.floor(product.rating) ? '#EAB308' : 'none'}
                color={i < Math.floor(product.rating) ? '#EAB308' : '#D4D8E4'}
                strokeWidth={1.5}
              />
            ))}
          </div>
          <span className="product-card__rating-text">
            {product.rating} ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="product-card__price-row">
          <span className="product-card__price">{product.price.toLocaleString('ar-EG')} ج.م.</span>
          {product.originalPrice && (
            <span className="product-card__original-price">
              {product.originalPrice.toLocaleString('ar-EG')} ج.م.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState('all');
  const { managedProducts } = useOrders();

  const currentProducts = managedProducts || products;

  const filtered = activeTab === 'all'
    ? currentProducts
    : currentProducts.filter(p => p.category === activeTab);

  return (
    <section className="featured section" id="featured-section">
      <div className="container">
        <div className="featured__header">
          <div>
            <span className="eyebrow">اخترنا لك بعناية</span>
            <h2 className="featured__title">خدمات ومنتجات مميزة</h2>
          </div>
          <Link to="/shop" className="btn btn-ghost featured__view-all">
            عرض كل الخدمات <ArrowLeft size={16} />
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="featured__tabs" role="tablist" aria-label="Product categories">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`featured__tab ${activeTab === tab.id ? 'featured__tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
              id={`tab-${tab.id}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="featured__grid stagger" key={activeTab}>
          {filtered.slice(0, 8).map(product => (
            <div className="animate-scale-in" key={product.id}>
              <MiniCard product={product} />
            </div>
          ))}
        </div>

        {filtered.length > 8 && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/shop" className="btn btn-secondary">
              عرض المزيد ({filtered.length - 8} منتج آخر)
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
