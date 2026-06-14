import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, CreditCard, ChevronRight, CheckCircle, Info, MessageSquare, Heart } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/AppContext';
import './ProductDetails.css';

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [submittedReviews, setSubmittedReviews] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const { managedProducts } = useOrders();

  useEffect(() => {
    window.scrollTo(0, 0);
    const currentProducts = managedProducts || products;
    const foundProduct = currentProducts.find(p => p.id.toString() === id || p.slug === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setSubmittedReviews(foundProduct.reviewsList || []);
    }
    setTimeout(() => setIsLoaded(true), 100);
  }, [id, managedProducts]);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="product-not-found">
          <div className="card-glass p-8 text-center" style={{ padding: '3rem', maxWidth: '500px', margin: '150px auto' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--fg)' }}>المنتج غير موجود</h2>
            <Link to="/" className="btn btn-primary">العودة للرئيسية</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (reviewText.trim()) {
      const newReview = {
        id: Date.now(),
        user: "زائر كريم",
        rating: reviewRating,
        text: reviewText,
        date: new Date().toLocaleDateString('ar-EG')
      };
      setSubmittedReviews([newReview, ...submittedReviews]);
      setReviewText('');
      setReviewRating(5);
    }
  };

  return (
    <>
      <Navbar />
      <main className={`product-details-main ${isLoaded ? 'loaded' : ''}`}>
        <div className="container">
          
          {/* Breadcrumbs */}
          <div className="breadcrumbs">
            <Link to="/" className="breadcrumbs-link">الرئيسية</Link>
            <ChevronRight className="breadcrumbs-icon" />
            <span className="breadcrumbs-link cursor-default">{product.category}</span>
            <ChevronRight className="breadcrumbs-icon" />
            <span className="breadcrumbs-current">{product.name}</span>
          </div>

          {/* Product Hero */}
          <div className="product-hero">
            
            {/* Image Gallery */}
            <div className="product-image-container card-glass">
              <div className="product-image-glow"></div>
              <img 
                src={product.image} 
                alt={product.name} 
                className="product-main-image"
              />
              {product.badge && (
                <span className="product-badge badge badge-brand">
                  {product.badge}
                </span>
              )}
              {product.discount > 0 && (
                <span className="product-discount">
                  -{product.discount}%
                </span>
              )}
            </div>

            {/* Product Info */}
            <div className="product-info">
              <h1 className="product-title">{product.name}</h1>
              
              <div className="product-rating-row">
                <div className="product-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="star-icon" 
                      fill={i < Math.floor(product.rating) ? '#EAB308' : 'none'} 
                      color={i < Math.floor(product.rating) ? '#EAB308' : '#4B5563'} 
                    />
                  ))}
                </div>
                <span className="product-reviews-count">({product.reviews} تقييم)</span>
              </div>

              <div className="product-price-row">
                <span className="product-price">{product.price.toLocaleString('ar-EG')} ج.م</span>
                {product.originalPrice && (
                  <span className="product-original-price">{product.originalPrice.toLocaleString('ar-EG')} ج.م</span>
                )}
              </div>

              <p className="product-short-desc">
                {product.description}
              </p>

              {/* Action Buttons */}
              <div className="product-actions">
                <button
                  className={`btn action-btn ${addedToCart ? 'btn-success' : 'btn-primary'}`}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={20} />
                  {addedToCart ? '✓ تمت الإضافة للسلة' : 'أضف إلى السلة'}
                </button>
                <button
                  className={`btn action-btn ${isWishlisted(product?.id) ? 'btn-wish-active' : 'btn-secondary'}`}
                  onClick={() => toggleWishlist(product)}
                >
                  <Heart size={20} fill={isWishlisted(product?.id) ? 'currentColor' : 'none'} />
                  {isWishlisted(product?.id) ? 'في المفضلة' : 'أضف للمفضلة'}
                </button>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="product-tabs-section card-glass">
            <div className="tabs-header">
              {['description', 'features', 'usage', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                >
                  {tab === 'description' && 'الوصف'}
                  {tab === 'features' && 'المميزات'}
                  {tab === 'usage' && 'الاستخدامات'}
                  {tab === 'reviews' && 'التقييمات'}
                </button>
              ))}
            </div>

            <div className="tabs-content">
              {activeTab === 'description' && (
                <div className="tab-pane animate-fade-in">
                  <h3 className="pane-title">
                    <Info className="pane-icon" />
                    وصف المنتج
                  </h3>
                  <p className="pane-text">{product.description}</p>
                </div>
              )}

              {activeTab === 'features' && (
                <div className="tab-pane animate-fade-in">
                  <h3 className="pane-title">
                    <CheckCircle className="pane-icon" />
                    المميزات الرئيسية
                  </h3>
                  <div className="features-grid">
                    {product.features?.map((feature, index) => (
                      <div key={index} className="feature-item">
                        <CheckCircle className="feature-icon" size={20} />
                        <span className="feature-text">{feature}</span>
                      </div>
                    ))}
                    {(!product.features || product.features.length === 0) && (
                      <p className="pane-text">لا توجد مميزات مضافة حالياً.</p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'usage' && (
                <div className="tab-pane animate-fade-in">
                  <h3 className="pane-title">
                    <Info className="pane-icon" />
                    طرق الاستخدام
                  </h3>
                  <div className="features-grid">
                    {Array.isArray(product.usage) ? (
                      product.usage.map((use, index) => (
                        <div key={index} className="feature-item">
                          <div className="bullet-point"></div>
                          <span className="feature-text">{use}</span>
                        </div>
                      ))
                    ) : (
                      typeof product.usage === 'string' && product.usage.trim() ? (
                        <div className="feature-item">
                          <div className="bullet-point"></div>
                          <span className="feature-text">{product.usage}</span>
                        </div>
                      ) : null
                    )}
                    {(!product.usage || (Array.isArray(product.usage) && product.usage.length === 0) || (typeof product.usage === 'string' && !product.usage.trim())) && (
                      <p className="pane-text">لا توجد استخدامات مضافة حالياً.</p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="tab-pane animate-fade-in">
                  <h3 className="pane-title">
                    <MessageSquare className="pane-icon" />
                    تقييمات العملاء
                  </h3>
                  
                  <div className="reviews-layout">
                    {/* Add Review Form */}
                    <div className="review-form-container">
                      <h4 className="form-title">أضف تقييمك</h4>
                      <form onSubmit={handleReviewSubmit} className="review-form">
                        <div className="form-group">
                          <label className="form-label">التقييم</label>
                          <div className="stars-input">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setReviewRating(star)}
                                className="star-btn"
                              >
                                <Star 
                                  className="star-icon" 
                                  size={28}
                                  fill={star <= reviewRating ? '#EAB308' : 'none'} 
                                  color={star <= reviewRating ? '#EAB308' : '#4B5563'} 
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="form-label">تعليقك</label>
                          <textarea
                            rows="4"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            className="form-textarea"
                            placeholder="ما رأيك في هذا المنتج؟..."
                            required
                          ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary submit-btn">
                          إرسال التقييم
                        </button>
                      </form>
                    </div>

                    {/* Reviews List */}
                    <div className="reviews-list">
                      {submittedReviews.length > 0 ? (
                        submittedReviews.map((review) => (
                          <div key={review.id} className="review-card">
                            <div className="review-header">
                              <div>
                                <h5 className="review-user">{review.user}</h5>
                                <span className="review-date">{review.date}</span>
                              </div>
                              <div className="review-stars">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    size={16}
                                    fill={i < review.rating ? '#EAB308' : 'none'} 
                                    color={i < review.rating ? '#EAB308' : '#4B5563'} 
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="review-text">{review.text}</p>
                          </div>
                        ))
                      ) : (
                        <div className="empty-reviews">
                          <MessageSquare className="empty-icon" size={48} />
                          <p>كن أول من يقيم هذا المنتج!</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
