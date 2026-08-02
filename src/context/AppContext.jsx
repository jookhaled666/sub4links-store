import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { collection, doc, onSnapshot, setDoc, updateDoc, deleteDoc, query, orderBy, getDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../firebase';
import { products as allProducts } from '../data/products';

// ─────────────── Storage Helpers ───────────────
const LS_PRODUCTS_KEY  = 's4l_products_v2';
const LS_ORDERS_KEY    = 's4l_orders_v2';
const LS_CART_KEY      = 's4l_cart_v1';
const LS_WISHLIST_KEY  = 's4l_wishlist_v1';
const IMGBB_API_KEY    = 'c47dae7c9024befa73290c616fb3eefd';

// Upload receipt image to ImgBB (free hosting) → returns public URL
async function uploadReceiptToImgBB(base64DataUrl) {
  const base64 = base64DataUrl.replace(/^data:image\/\w+;base64,/, '');
  const form = new FormData();
  form.append('key', IMGBB_API_KEY);
  form.append('image', base64);
  const res = await fetch('https://api.imgbb.com/1/upload', { method: 'POST', body: form });
  if (!res.ok) throw new Error(`ImgBB upload failed: ${res.status}`);
  const json = await res.json();
  if (!json.success) throw new Error('ImgBB returned error');
  return json.data.url; // permanent public URL
}

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

export function getGuestId() {
  let gid = localStorage.getItem('guestId');
  if (!gid) {
    gid = `guest_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem('guestId', gid);
  }
  return gid;
}

// ─────────────── Contexts ───────────────
const CartContext    = createContext(null);
const AuthContext    = createContext(null);
const OrdersContext  = createContext(null);

// ─────────────── PROVIDER ───────────────
export function AppProvider({ children }) {

  // ──── Auth ────
  const [currentUser, setCurrentUser] = useState(null);
  const [authError, setAuthError]     = useState('');
  const [authLoading, setAuthLoading] = useState(true);

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const defaultRole = user.email === 'admin@sup4links.com' ? 'admin' : 'customer';
        try {
          // Fetch additional user data from Firestore
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setCurrentUser({ id: user.uid, ...data, role: data.role || defaultRole });
          } else {
            setCurrentUser({ id: user.uid, email: user.email, role: defaultRole });
          }
        } catch (e) {
          console.error("Error fetching user data from Firestore:", e);
          setCurrentUser({ id: user.uid, email: user.email, role: defaultRole });
        }
      } else {
        setCurrentUser(null);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      setAuthError('');
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const defaultRole = email === 'admin@sup4links.com' ? 'admin' : 'customer';
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      let role = defaultRole;
      if (docSnap.exists()) {
        role = docSnap.data().role || defaultRole;
      }
      return { ok: true, role };
    } catch (err) {
      setAuthError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      return { ok: false };
    }
  };

  const register = async (name, email, password) => {
    try {
      setAuthError('');
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const role = email === 'admin@sup4links.com' ? 'admin' : 'customer';

      // Save extra user details to Firestore
      const newUser = {
        name,
        email,
        role,
        createdAt: new Date().toISOString()
      };
      await setDoc(doc(db, 'users', user.uid), newUser);
      return { ok: true, role };
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setAuthError('البريد الإلكتروني مسجل مسبقاً');
      } else {
        setAuthError('حدث خطأ أثناء التسجيل');
      }
      return { ok: false };
    }
  };

  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
  };

  const updateProfile = useCallback(async (updates) => {
    if (!currentUser) return;
    const userRef = doc(db, 'users', currentUser.id);
    await updateDoc(userRef, updates);
    setCurrentUser(prev => ({ ...prev, ...updates }));
  }, [currentUser]);

  // ──── Cart — persisted ────
  const [cart, setCart]         = useState(() => loadFromLS(LS_CART_KEY, []));
  const [cartOpen, setCartOpen] = useState(false);

  // Save cart on every change
  useEffect(() => { saveToLS(LS_CART_KEY, cart); }, [cart]);

  const addToCart = useCallback((product) => {
    if (product && product.inStock === false) {
      console.warn('Cannot add out of stock product to cart:', product.name);
      return false;
    }
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
    return true;
  }, []);

  const removeFromCart = useCallback((id) => setCart(prev => prev.filter(i => i.id !== id)), []);

  const updateQty = useCallback((id, qty) => {
    if (qty < 1) { removeFromCart(id); return; }
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  }, [removeFromCart]);

  const clearCart = useCallback(() => setCart([]), []);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  // ──── Wishlist — persisted ────
  const [wishlist, setWishlist] = useState(() => loadFromLS(LS_WISHLIST_KEY, []));

  // Save wishlist on every change
  useEffect(() => { saveToLS(LS_WISHLIST_KEY, wishlist); }, [wishlist]);

  const toggleWishlist = useCallback((product) => {
    setWishlist(prev => {
      const exists = prev.find(i => i.id === product.id);
      return exists ? prev.filter(i => i.id !== product.id) : [...prev, product];
    });
  }, []);

  const isWishlisted = useCallback((id) => wishlist.some(i => i.id === id), [wishlist]);

  // ──────────────────────────────────────────────────
  //  PRODUCTS — persisted in LS & Firestore
  // ──────────────────────────────────────────────────
  const [managedProducts, setManagedProducts] = useState(() => loadFromLS(LS_PRODUCTS_KEY, allProducts));

  useEffect(() => {
    const q = query(collection(db, 'products'));
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      if (snapshot.empty) {
        // First time initialization: seed from allProducts
        for (const p of allProducts) {
          try {
            await setDoc(doc(db, 'products', p.id.toString()), p);
          } catch (e) {
            console.error('Error seeding product:', e);
          }
        }
        setManagedProducts(allProducts);
        saveToLS(LS_PRODUCTS_KEY, allProducts);
      } else {
        const prodData = [];
        snapshot.forEach((d) => {
          const data = d.data();
          prodData.push({ 
            ...data, 
            id: isNaN(Number(d.id)) ? d.id : Number(d.id),
            inStock: data.inStock !== false
          });
        });
        // Sort by ID to keep order stable
        prodData.sort((a, b) => {
          if (typeof a.id === 'number' && typeof b.id === 'number') return b.id - a.id;
          return String(b.id).localeCompare(String(a.id));
        });
        setManagedProducts(prodData);
        saveToLS(LS_PRODUCTS_KEY, prodData);
      }
    }, (err) => {
      console.warn("Firestore snapshot listener notice:", err);
    });
    return () => unsubscribe();
  }, []);

  const addProduct = useCallback(async (product) => {
    const newId = Date.now();
    const newP = { ...product, id: newId, inStock: true, rating: 5.0, reviews: 0 };
    setManagedProducts(prev => {
      const updated = [newP, ...prev];
      saveToLS(LS_PRODUCTS_KEY, updated);
      return updated;
    });
    try {
      await setDoc(doc(db, 'products', newId.toString()), newP);
    } catch (err) {
      console.error('Error saving new product to Firestore:', err);
    }
  }, []);

  const updateProduct = useCallback(async (id, updates) => {
    const cleanUpdates = { ...updates };
    setManagedProducts(prev => {
      const updated = prev.map(p => (String(p.id) === String(id) ? { ...p, ...cleanUpdates } : p));
      saveToLS(LS_PRODUCTS_KEY, updated);
      return updated;
    });

    try {
      const docRef = doc(db, 'products', id.toString());
      await setDoc(docRef, cleanUpdates, { merge: true });
    } catch (err) {
      console.error('Error updating product in Firestore:', err);
    }
  }, []);

  const deleteProduct = useCallback(async (id) => {
    setManagedProducts(prev => {
      const updated = prev.filter(p => String(p.id) !== String(id));
      saveToLS(LS_PRODUCTS_KEY, updated);
      return updated;
    });
    try {
      await deleteDoc(doc(db, 'products', id.toString()));
    } catch (err) {
      console.error('Error deleting product from Firestore:', err);
    }
  }, []);

  const toggleStock = useCallback(async (id) => {
    let targetProduct = managedProducts.find(x => String(x.id) === String(id));
    if (!targetProduct) {
      const lsProducts = loadFromLS(LS_PRODUCTS_KEY, []);
      targetProduct = lsProducts.find(x => String(x.id) === String(id));
    }
    if (!targetProduct) return false;

    const newStock = !(targetProduct.inStock !== false);

    setManagedProducts(prev => {
      const updated = prev.map(x => String(x.id) === String(id) ? { ...x, inStock: newStock } : x);
      saveToLS(LS_PRODUCTS_KEY, updated);
      return updated;
    });

    try {
      await setDoc(doc(db, 'products', id.toString()), { inStock: newStock }, { merge: true });
    } catch (err) {
      console.error('Error toggling stock in Firestore:', err);
    }
    return newStock;
  }, [managedProducts]);

  // Reset products to original data (useful for admin)
  const resetProducts = useCallback(async () => {
    setManagedProducts(allProducts);
    saveToLS(LS_PRODUCTS_KEY, allProducts);
    for (const p of managedProducts) {
      try {
        await deleteDoc(doc(db, 'products', p.id.toString()));
      } catch (_) {}
    }
  }, [managedProducts]);

  // ──────────────────────────────────────────────────
  //  ORDERS — persisted in Firestore
  // ──────────────────────────────────────────────────
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = [];
      snapshot.forEach((doc) => {
        ordersData.push({ id: doc.id, ...doc.data() });
      });
      setOrders(ordersData);
    });
    return () => unsubscribe();
  }, []);

  const placeOrder = useCallback(async (cartItems, total, userId, buyerDetails = {}, onProgress) => {
    const orderId = `ORD-${String(Date.now()).slice(-6)}`;
    const activeUserId = userId || getGuestId();

    // ── رفع الإيصال على ImgBB والحصول على URL فقط ──
    let paymentProofUrl = null;
    if (buyerDetails.paymentProof) {
      onProgress?.('جاري رفع صورة الإيصال...');
      try {
        paymentProofUrl = await uploadReceiptToImgBB(buyerDetails.paymentProof);
      } catch (err) {
        console.warn('ImgBB upload failed, saving without image:', err);
        // لا نوقف الطلب — نكمل بدون صورة
      }
    }

    onProgress?.('جاري حفظ الطلب...');
    const newOrder = {
      userId: activeUserId,
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      items: cartItems,
      total,
      status: 'pending',
      buyerName:      buyerDetails.name          || '',
      buyerEmail:     buyerDetails.email         || '',
      buyerPhone:     buyerDetails.phone         || '',
      payMethod:      buyerDetails.payMethod     || 'instapay',
      paymentProof:   paymentProofUrl,            // URL فقط — لا base64
      paymentStatus:  buyerDetails.paymentStatus || 'pending_review',
      deliveryDetails: null,
    };

    await setDoc(doc(db, 'orders', orderId), newOrder);
    return { id: orderId, ...newOrder };
  }, []);

  const updateOrderStatus = useCallback(async (orderId, status) => {
    await updateDoc(doc(db, 'orders', orderId), { status });
  }, []);

  const updatePaymentStatus = useCallback(async (orderId, paymentStatus) => {
    await updateDoc(doc(db, 'orders', orderId), { paymentStatus });
  }, []);

  const updateOrderDelivery = useCallback(async (orderId, deliveryDetails) => {
    await updateDoc(doc(db, 'orders', orderId), { deliveryDetails });
  }, []);

  const deleteOrder = useCallback(async (orderId) => {
    await deleteDoc(doc(db, 'orders', orderId));
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout, updateProfile, authError, setAuthError, authLoading }}>
      <CartContext.Provider value={{
        cart, cartOpen, setCartOpen, cartTotal, cartCount,
        addToCart, removeFromCart, updateQty, clearCart,
        wishlist, toggleWishlist, isWishlisted,
      }}>
        <OrdersContext.Provider value={{
          orders, placeOrder, updateOrderStatus, updatePaymentStatus, updateOrderDelivery, deleteOrder,
          managedProducts, addProduct, updateProduct, deleteProduct, toggleStock, resetProducts,
          allUsers: [],
          getGuestId,
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
