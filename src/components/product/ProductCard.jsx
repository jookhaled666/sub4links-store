import { Star, Heart, ShoppingBag, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const {
    name, price, originalPrice, discount, rating,
    reviews, image, badge, inStock
  } = product;

  return (
    <div className="product-card card" id={`product-${product.id}`}>
      {/* Image */}
      <div className="product-card__image-wrap">
        <img
          src={image}
          alt={name}
          className="product-card__image"
          loading="lazy"
        />
        {badge && (
          <span className={`product-card__badge badge ${
            badge === 'الأكثر مبيعاً' ? 'badge-brand' :
            badge === 'جديد' ? 'badge-success' :
            badge === 'عرض خاص' ? 'badge-danger' :
            badge === 'الأعلى تقييماً' ? 'badge-gold' :
            'badge-brand'
          }`}>
            {badge}
          </span>
        )}
        {discount > 0 && (
          <span className="product-card__discount">-{discount}%</span>
        )}

        {/* Quick Actions */}
        <div className="product-card__actions">
          <button className="product-card__action" aria-label="Add to wishlist">
            <Heart size={18} />
          </button>
          <Link to={`/product/${product.id}`} className="product-card__action" aria-label="Quick view">
            <Eye size={18} />
          </Link>
          <button className="product-card__action product-card__action--primary" aria-label="Add to cart">
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="product-card__info">
        <Link to={`/product/${product.id}`}>
          <h3 className="product-card__name hover:text-[#06b6d4] transition-colors">{name}</h3>
        </Link>

        {/* Rating */}
        <div className="product-card__rating">
          <div className="product-card__stars">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < Math.floor(rating) ? '#EAB308' : 'none'}
                color={i < Math.floor(rating) ? '#EAB308' : '#D4D8E4'}
                strokeWidth={1.5}
              />
            ))}
          </div>
          <span className="product-card__rating-text">
            {rating} ({reviews.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="product-card__price-row">
          <span className="product-card__price">{price.toFixed(2)} ج.م.</span>
          {originalPrice && (
            <span className="product-card__original-price">
              {originalPrice.toFixed(2)} ج.م.
            </span>
          )}
        </div>

        {/* Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="product-card__colors">
            {product.colors.map((color, i) => (
              <span
                key={i}
                className="product-card__color-dot"
                style={{ background: color }}
                aria-label={`Color option ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
