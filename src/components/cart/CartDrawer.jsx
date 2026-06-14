import { X, ShoppingBag, Plus, Minus, Trash2, CreditCard } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import './CartDrawer.css';

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, removeFromCart, updateQty, cartTotal, cartCount } = useCart();

  if (!cartOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={() => setCartOpen(false)} />
      <div className="cart-drawer">
        {/* Header */}
        <div className="cart-drawer__header">
          <div className="cart-drawer__title">
            <ShoppingBag size={22} />
            <span>سلة المشتريات</span>
            {cartCount > 0 && <span className="cart-drawer__count">{cartCount}</span>}
          </div>
          <button className="cart-drawer__close" onClick={() => setCartOpen(false)} aria-label="إغلاق السلة">
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        <div className="cart-drawer__body">
          {cart.length === 0 ? (
            <div className="cart-drawer__empty">
              <ShoppingBag size={56} className="cart-empty-icon" />
              <h3>السلة فارغة</h3>
              <p>أضف بعض المنتجات الرائعة إلى سلتك</p>
              <button className="btn btn-primary" onClick={() => setCartOpen(false)}>
                تصفح المنتجات
              </button>
            </div>
          ) : (
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item__img" />
                  <div className="cart-item__info">
                    <h4 className="cart-item__name">{item.name}</h4>
                    <p className="cart-item__price">{(item.price * item.qty).toLocaleString('ar-EG')} ج.م</p>
                    <div className="cart-item__qty">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} aria-label="تقليل الكمية">
                        <Minus size={14} />
                      </button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} aria-label="زيادة الكمية">
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <button className="cart-item__remove" onClick={() => removeFromCart(item.id)} aria-label="حذف من السلة">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-total-row">
              <span>الإجمالي</span>
              <span className="cart-total-amount">{cartTotal.toLocaleString('ar-EG')} ج.م</span>
            </div>
            <Link to="/checkout" className="btn btn-primary checkout-btn" onClick={() => setCartOpen(false)}>
              <CreditCard size={18} />
              إتمام الشراء
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
