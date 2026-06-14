import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, Eye, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CartDrawer from '../components/cart/CartDrawer';
import { useCart } from '../context/AppContext';
import './WishlistPage.css';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useCart();
  const [addedIds, setAddedIds] = useState([]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedIds(prev => [...prev, product.id]);
    setTimeout(() => setAddedIds(prev => prev.filter(id => id !== product.id)), 1800);
  };

  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="wishlist-page section" style={{ paddingTop: '7rem', minHeight: '100vh' }}>
        <div className="container">
          {/* Header */}
          <div className="wishlist-header">
            <div>
              <span className="eyebrow">قائمتي</span>
              <h1 className="wishlist-title">
                <Heart size={28} style={{ color: '#ef4444', display: 'inline', verticalAlign: 'middle', marginLeft: '0.5rem' }} />
                المفضلة
              </h1>
              <p className="wishlist-sub">{wishlist.length} منتج في قائمة المفضلة</p>
            </div>
            <Link to="/shop" className="btn btn-ghost">
              <ArrowLeft size={16} /> تصفح المزيد
            </Link>
          </div>

          {wishlist.length === 0 ? (
            <div className="wishlist-empty">
              <div className="wishlist-empty__icon">
                <Heart size={72} />
              </div>
              <h2>قائمة المفضلة فارغة</h2>
              <p>أضف منتجاتك المفضلة للحفاظ عليها وشرائها لاحقاً</p>
              <Link to="/shop" className="btn btn-primary">
                <ShoppingCart size={18} />
                تصفح المنتجات
              </Link>
            </div>
          ) : (
            <>
              <div className="wishlist-grid">
                {wishlist.map(product => (
                  <div key={product.id} className="wishlist-card">
                    {/* Image */}
                    <div className="wishlist-card__img-wrap">
                      <img src={product.image} alt={product.name} className="wishlist-card__img" loading="lazy" />
                      {product.badge && <span className="wishlist-card__badge">{product.badge}</span>}
                      {product.discount > 0 && (
                        <span className="wishlist-card__discount">-{product.discount}%</span>
                      )}
                      <button
                        className="wishlist-card__remove"
                        onClick={() => toggleWishlist(product)}
                        aria-label="إزالة من المفضلة"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Info */}
                    <div className="wishlist-card__info">
                      <Link to={`/product/${product.id}`} className="wishlist-card__name-link">
                        <h3 className="wishlist-card__name">{product.name}</h3>
                      </Link>
                      <p className="wishlist-card__desc">{product.description?.slice(0, 80)}...</p>

                      <div className="wishlist-card__price-row">
                        <span className="wishlist-card__price">{product.price.toLocaleString('ar-EG')} ج.م</span>
                        {product.originalPrice && (
                          <span className="wishlist-card__old-price">{product.originalPrice.toLocaleString('ar-EG')} ج.م</span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="wishlist-card__actions">
                        <button
                          className={`btn btn-primary wishlist-cta ${addedIds.includes(product.id) ? 'added' : ''}`}
                          onClick={() => handleAddToCart(product)}
                        >
                          <ShoppingCart size={16} />
                          {addedIds.includes(product.id) ? '✓ أُضيف للسلة' : 'أضف للسلة'}
                        </button>
                        <Link to={`/product/${product.id}`} className="btn btn-secondary wishlist-view">
                          <Eye size={16} />
                          التفاصيل
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bulk actions */}
              <div className="wishlist-bulk">
                <button
                  className="btn btn-primary"
                  onClick={() => wishlist.forEach(p => addToCart(p))}
                >
                  <ShoppingCart size={18} />
                  إضافة الكل للسلة
                </button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
