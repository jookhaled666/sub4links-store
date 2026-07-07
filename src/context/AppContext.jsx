import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { products as allProducts } from '../data/products';

// ─────────────── Storage Helpers ───────────────
const LS_PRODUCTS_KEY = 's4l_products_v2';
const LS_ORDERS_KEY   = 's4l_orders_v2';

function loadFromLS(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch (_) { /* ignore parse errors */ }
  return fallback;
}

function saveToLS(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) {}
}

// ─────────────── Contexts ───────────────
const CartContext    = createContext(null);
const AuthContext    = createContext(null);
const OrdersContext  = createContext(null);

// ─────────── Users DB ─────────────────
const USERS = [
  { id: 1, name: 'أدمن النظام',  email: 'admin@sup4links.com', password: 'admin123', role: 'admin',    phone: '01000000000', address: 'القاهرة، مصر',  field: 'إدارة الأعمال',      gender: 'boy' },
  { id: 2, name: 'أحمد محمود',   email: 'user@sup4links.com',  password: 'user123',  role: 'customer', phone: '01012345678', address: 'الجيزة، مصر',   field: 'تطوير البرمجيات',   gender: 'boy' },
];

// ─────────────── SEED ORDERS ───────────────
const SEED_ORDERS = [
  {
    id: 'ORD-001',
    userId: 2,
    date: '2026-06-10',
    items: [{ ...allProducts[7], qty: 1 }],
    total: allProducts[7].price,
    status: 'completed',
    buyerName: 'أحمد محمود',
    buyerEmail: 'user@sup4links.com',
    buyerPhone: '01012345678',
    payMethod: 'card',
    deliveryDetails: null,
  },
  {
    id: 'ORD-002',
    userId: 2,
    date: '2026-06-12',
    items: [{ ...allProducts[0], qty: 1 }, { ...allProducts[3], qty: 1 }],
    total: allProducts[0].price + allProducts[3].price,
    status: 'pending',
    buyerName: 'أحمد محمود',
    buyerEmail: 'user@sup4links.com',
    buyerPhone: '01012345678',
    payMethod: 'instapay',
    deliveryDetails: null,
  },
];

// ─────────────── PROVIDER ───────────────
export function AppProvider({ children }) {

  // ──── Auth ────
  const [currentUser, setCurrentUser] = useState(null);
  const [authError, setAuthError]     = useState('');

  const login = useCallback((email, password) => {
    const found = USERS.find(u => u.email === email && u.password === password);
    if (found) {
      setCurrentUser(found);
      setAuthError('');
      return { ok: true, role: found.role };
    }
    setAuthError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    return { ok: false };
  }, []);

  const logout        = useCallback(() => setCurrentUser(null), []);
  const updateProfile = useCallback((updates) => setCurrentUser(prev => ({ ...prev, ...updates })), []);

  // ──── Cart ────
  const [cart, setCart]         = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = useCallback((product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((id) => setCart(prev => prev.filter(i => i.id !== id)), []);

  const updateQty = useCallback((id, qty) => {
    if (qty < 1) { removeFromCart(id); return; }
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  }, [removeFromCart]);

  const clearCart = useCallback(() => setCart([]), []);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  // ──── Wishlist ────
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = useCallback((product) => {
    setWishlist(prev => {
      const exists = prev.find(i => i.id === product.id);
      return exists ? prev.filter(i => i.id !== product.id) : [...prev, product];
    });
  }, []);

  const isWishlisted = useCallback((id) => wishlist.some(i => i.id === id), [wishlist]);

  // ──────────────────────────────────────────────────
  //  PRODUCTS — persisted in localStorage
  // ──────────────────────────────────────────────────
  const [managedProducts, setManagedProducts] = useState(() =>
    loadFromLS(LS_PRODUCTS_KEY, allProducts)
  );

  // Keep localStorage in sync on every change
  useEffect(() => {
    saveToLS(LS_PRODUCTS_KEY, managedProducts);
  }, [managedProducts]);

  const addProduct = useCallback((product) => {
    const newP = { ...product, id: Date.now(), inStock: true, rating: 5.0, reviews: 0 };
    setManagedProducts(prev => {
      const next = [newP, ...prev];
      saveToLS(LS_PRODUCTS_KEY, next);
      return next;
    });
  }, []);

  const updateProduct = useCallback((id, updates) => {
    setManagedProducts(prev => {
      const next = prev.map(p => p.id === id ? { ...p, ...updates } : p);
      saveToLS(LS_PRODUCTS_KEY, next);
      return next;
    });
  }, []);

  const deleteProduct = useCallback((id) => {
    setManagedProducts(prev => {
      const next = prev.filter(p => p.id !== id);
      saveToLS(LS_PRODUCTS_KEY, next);
      return next;
    });
  }, []);

  const toggleStock = useCallback((id) => {
    setManagedProducts(prev => {
      const next = prev.map(p => p.id === id ? { ...p, inStock: !p.inStock } : p);
      saveToLS(LS_PRODUCTS_KEY, next);
      return next;
    });
  }, []);

  // Reset products to original data (useful for admin)
  const resetProducts = useCallback(() => {
    localStorage.removeItem(LS_PRODUCTS_KEY);
    setManagedProducts(allProducts);
  }, []);

  // ──────────────────────────────────────────────────
  //  ORDERS — persisted in localStorage
  // ──────────────────────────────────────────────────
  const [orders, setOrders] = useState(() =>
    loadFromLS(LS_ORDERS_KEY, SEED_ORDERS)
  );

  // Keep localStorage in sync on every change
  useEffect(() => {
    saveToLS(LS_ORDERS_KEY, orders);
  }, [orders]);

  const placeOrder = useCallback((cartItems, total, userId, buyerDetails = {}) => {
    const newOrder = {
      id: `ORD-${String(Date.now()).slice(-6)}`,
      userId: userId || 2,
      date: new Date().toISOString().split('T')[0],
      items: cartItems,
      total,
      status: 'pending',
      buyerName:      buyerDetails.name          || '',
      buyerEmail:     buyerDetails.email         || '',
      buyerPhone:     buyerDetails.phone         || '',
      payMethod:      buyerDetails.payMethod     || 'instapay',
      paymentProof:   buyerDetails.paymentProof  || null,   // صورة الإيصال base64
      paymentStatus:  buyerDetails.paymentStatus || 'pending_review', // pending_review | verified | rejected
      deliveryDetails: null,
    };
    setOrders(prev => {
      const next = [newOrder, ...prev];
      saveToLS(LS_ORDERS_KEY, next);
      return next;
    });
    return newOrder;
  }, []);

  const updateOrderStatus = useCallback((orderId, status) => {
    setOrders(prev => {
      const next = prev.map(o => o.id === orderId ? { ...o, status } : o);
      saveToLS(LS_ORDERS_KEY, next);
      return next;
    });
  }, []);

  const updatePaymentStatus = useCallback((orderId, paymentStatus) => {
    setOrders(prev => {
      const next = prev.map(o => o.id === orderId ? { ...o, paymentStatus } : o);
      saveToLS(LS_ORDERS_KEY, next);
      return next;
    });
  }, []);

  const updateOrderDelivery = useCallback((orderId, deliveryDetails) => {
    setOrders(prev => {
      const next = prev.map(o => o.id === orderId ? { ...o, deliveryDetails } : o);
      saveToLS(LS_ORDERS_KEY, next);
      return next;
    });
  }, []);

  const deleteOrder = useCallback((orderId) => {
    setOrders(prev => {
      const next = prev.filter(o => o.id !== orderId);
      saveToLS(LS_ORDERS_KEY, next);
      return next;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, updateProfile, authError, setAuthError, USERS }}>
      <CartContext.Provider value={{
        cart, cartOpen, setCartOpen, cartTotal, cartCount,
        addToCart, removeFromCart, updateQty, clearCart,
        wishlist, toggleWishlist, isWishlisted,
      }}>
        <OrdersContext.Provider value={{
          orders, placeOrder, updateOrderStatus, updatePaymentStatus, updateOrderDelivery, deleteOrder,
          managedProducts, addProduct, updateProduct, deleteProduct, toggleStock, resetProducts,
          allUsers: USERS,
        }}>
          {children}
        </OrdersContext.Provider>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}

// ─────────────── HOOKS ───────────────
export const useAuth   = () => useContext(AuthContext);
export const useCart   = () => useContext(CartContext);
export const useOrders = () => useContext(OrdersContext);
