import { createContext, useContext, useState, useCallback } from 'react';
import { products as allProducts } from '../data/products';

// ─────────────── Cart Context ───────────────
const CartContext = createContext(null);

// ─────────────── Auth Context ───────────────
const AuthContext = createContext(null);

// ─────────────── Orders Context ───────────────
const OrdersContext = createContext(null);

// ─────────── Fake users DB ───────────────
const USERS = [
  {
    id: 1,
    name: 'أدمن النظام',
    email: 'admin@sup4links.com',
    password: 'admin123',
    role: 'admin',
    phone: '01000000000',
    address: 'القاهرة، مصر',
    field: 'إدارة الأعمال',
    gender: 'boy',
  },
  {
    id: 2,
    name: 'أحمد محمود',
    email: 'user@sup4links.com',
    password: 'user123',
    role: 'customer',
    phone: '01012345678',
    address: 'الجيزة، مصر',
    field: 'تطوير البرمجيات',
    gender: 'boy',
  },
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
  },
  {
    id: 'ORD-002',
    userId: 2,
    date: '2026-06-12',
    items: [{ ...allProducts[0], qty: 1 }, { ...allProducts[3], qty: 1 }],
    total: allProducts[0].price + allProducts[3].price,
    status: 'pending',
  },
];

// ─────────────── PROVIDER ───────────────
export function AppProvider({ children }) {
  // ---------- Auth ----------
  const [currentUser, setCurrentUser] = useState(null);
  const [authError, setAuthError] = useState('');

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

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const updateProfile = useCallback((updates) => {
    setCurrentUser(prev => ({ ...prev, ...updates }));
  }, []);

  // ---------- Cart ----------
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = useCallback((product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateQty = useCallback((id, qty) => {
    if (qty < 1) { removeFromCart(id); return; }
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  }, [removeFromCart]);

  const clearCart = useCallback(() => setCart([]), []);

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  // ---------- Wishlist ----------
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = useCallback((product) => {
    setWishlist(prev => {
      const exists = prev.find(i => i.id === product.id);
      return exists ? prev.filter(i => i.id !== product.id) : [...prev, product];
    });
  }, []);

  const isWishlisted = useCallback((id) => wishlist.some(i => i.id === id), [wishlist]);

  // ---------- Orders ----------
  const [orders, setOrders] = useState(SEED_ORDERS);

  const placeOrder = useCallback((cartItems, total, userId, buyerDetails = {}) => {
    const newOrder = {
      id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
      userId: userId || 2,
      date: new Date().toISOString().split('T')[0],
      items: cartItems,
      total,
      status: 'pending',
      buyerName: buyerDetails.name || '',
      buyerEmail: buyerDetails.email || '',
      buyerPhone: buyerDetails.phone || '',
      payMethod: buyerDetails.payMethod || 'card',
      deliveryDetails: null, // details added by admin later (activation key, etc.)
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  }, [orders]);

  const updateOrderStatus = useCallback((orderId, status) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  }, []);

  const updateOrderDelivery = useCallback((orderId, deliveryDetails) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, deliveryDetails } : o));
  }, []);

  const deleteOrder = useCallback((orderId) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
  }, []);

  // ---------- Products management (Admin) ----------
  const [managedProducts, setManagedProducts] = useState(allProducts);

  const addProduct = useCallback((product) => {
    const newP = { ...product, id: Date.now(), inStock: true, rating: 5.0, reviews: 0 };
    setManagedProducts(prev => [newP, ...prev]);
  }, []);

  const updateProduct = useCallback((id, updates) => {
    setManagedProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  }, []);

  const deleteProduct = useCallback((id) => {
    setManagedProducts(prev => prev.filter(p => p.id !== id));
  }, []);

  const toggleStock = useCallback((id) => {
    setManagedProducts(prev => prev.map(p => p.id === id ? { ...p, inStock: !p.inStock } : p));
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, updateProfile, authError, setAuthError, USERS }}>
      <CartContext.Provider value={{
        cart, cartOpen, setCartOpen, cartTotal, cartCount,
        addToCart, removeFromCart, updateQty, clearCart,
        wishlist, toggleWishlist, isWishlisted,
      }}>
        <OrdersContext.Provider value={{
          orders, placeOrder, updateOrderStatus, updateOrderDelivery, deleteOrder,
          managedProducts, addProduct, updateProduct, deleteProduct, toggleStock,
          allUsers: USERS,
        }}>
          {children}
        </OrdersContext.Provider>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}

// ─────────────── HOOKS ───────────────
export const useAuth    = () => useContext(AuthContext);
export const useCart    = () => useContext(CartContext);
export const useOrders  = () => useContext(OrdersContext);
