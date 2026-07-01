import { useState } from 'react';
import { Plus, Edit2, Trash2, ToggleLeft, ToggleRight, X, Save, Search, ImageIcon, RefreshCcw } from 'lucide-react';
import { useOrders } from '../../context/AppContext';

const catOptions = ['subscriptions', 'services', 'courses'];
const catLabel   = { subscriptions: 'اشتراكات', services: 'خدمات', courses: 'دورات' };

const EMPTY_FORM = {
  name: '', slug: '', category: 'subscriptions',
  price: '', originalPrice: '', discount: 0,
  description: '', badge: '', image: '',
  features: '', usage: '',
};

/* ── tiny inline notification ── */
let _notify = null;
function Notify({ msg, type }) {
  if (!msg) return null;
  const bg = type === 'success' ? '#10B981' : '#EF4444';
  return (
    <div style={{
      position: 'fixed', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
      background: bg, color: '#fff', padding: '0.75rem 1.75rem',
      borderRadius: '999px', fontWeight: 700, fontSize: '0.9rem',
      boxShadow: '0 4px 24px rgba(0,0,0,0.25)', zIndex: 9999,
      animation: 'fadeIn 0.3s ease',
    }}>
      {msg}
    </div>
  );
}

export default function AdminProducts() {
  const {
    managedProducts, addProduct, updateProduct,
    deleteProduct, toggleStock, resetProducts,
  } = useOrders();

  const [search, setSearch]           = useState('');
  const [catFilter, setCatFilter]     = useState('all');
  const [modal, setModal]             = useState(null);   // null | 'edit'
  const [editingId, setEditingId]     = useState(null);
  const [form, setForm]               = useState(EMPTY_FORM);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [notify, setNotify]           = useState({ msg: '', type: 'success' });

  const showNotify = (msg, type = 'success') => {
    setNotify({ msg, type });
    setTimeout(() => setNotify({ msg: '', type: 'success' }), 2500);
  };

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const filtered = managedProducts.filter(p => {
    const matchCat    = catFilter === 'all' || p.category === catFilter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setModal('edit');
  };

  const openEdit = (product) => {
    setForm({
      name:          product.name,
      slug:          product.slug          || '',
      category:      product.category,
      price:         product.price,
      originalPrice: product.originalPrice || '',
      discount:      product.discount      || 0,
      description:   product.description   || '',
      badge:         product.badge         || '',
      image:         product.image         || '',
      features:      (product.features || []).join('\n'),
      usage:         Array.isArray(product.usage)
                       ? product.usage.join('\n')
                       : (product.usage || ''),
    });
    setEditingId(product.id);
    setModal('edit');
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.price) {
      showNotify('يرجى ملء اسم المنتج والسعر على الأقل', 'error');
      return;
    }
    const imageUrl = form.image.trim();
    const productData = {
      ...form,
      price:         Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : null,
      discount:      Number(form.discount),
      features:      form.features ? form.features.split('\n').filter(Boolean) : [],
      usage:         form.usage    ? form.usage.split('\n').filter(Boolean)    : [],
      slug:          form.slug || form.name.toLowerCase().replace(/\s+/g, '-'),
      // Always sync image and images[] so product cards + detail pages show the same picture
      image:         imageUrl,
      images:        imageUrl ? [imageUrl] : [],
    };

    if (editingId) {
      updateProduct(editingId, productData);
      showNotify('✅ تم تحديث المنتج فوراً في الموقع!');
    } else {
      addProduct(productData);
      showNotify('✅ تمت إضافة المنتج بنجاح!');
    }
    setModal(null);
  };

  const handleDelete = (id) => {
    deleteProduct(id);
    setConfirmDelete(null);
    showNotify('🗑️ تم حذف المنتج', 'error');
  };

  const handleReset = () => {
    if (window.confirm('هل تريد إعادة تعيين جميع المنتجات للبيانات الأصلية؟ سيتم فقدان التعديلات.')) {
      resetProducts();
      showNotify('♻️ تمت إعادة تعيين المنتجات للبيانات الأصلية');
    }
  };

  return (
    <div>
      <Notify msg={notify.msg} type={notify.type} />

      {/* ── Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="admin-section-title">الخدمات والاشتراكات</h1>
          <p style={{ color: 'var(--fg-muted)', fontSize: '0.875rem' }}>
            {managedProducts.length} منتج / خدمة
            <span style={{ marginRight: '0.5rem', fontSize: '0.75rem', color: '#10B981', fontWeight: 700 }}>
              ● يُحفظ تلقائياً ويظهر فوراً في الموقع
            </span>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-ghost" onClick={handleReset} title="إعادة تعيين للبيانات الأصلية">
            <RefreshCcw size={16} /> إعادة تعيين
          </button>
          <button className="btn btn-primary" onClick={openAdd}>
            <Plus size={18} /> إضافة منتج جديد
          </button>
        </div>
      </div>

      {/* ── Filters ── */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <Search size={16} style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--fg-muted)' }} />
          <input
            className="admin-search-input"
            style={{ paddingRight: '2.5rem', width: '100%' }}
            placeholder="ابحث عن منتج..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['all', ...catOptions].map(c => (
            <button
              key={c}
              className={`shop-tab ${catFilter === c ? 'active' : ''}`}
              onClick={() => setCatFilter(c)}
            >
              {c === 'all' ? 'الكل' : catLabel[c]}
            </button>
          ))}
        </div>
      </div>

      {/* ── Table ── */}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>المنتج</th>
              <th>القسم</th>
              <th>السعر</th>
              <th>الخصم</th>
              <th>الحالة</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(product => (
              <tr key={product.id}>
                <td>
                  <div className="admin-product-cell">
                    <img
                      src={product.image || '/images/products/placeholder.jpg'}
                      alt={product.name}
                      className="admin-product-thumb"
                      onError={e => { e.target.src = '/images/products/placeholder.jpg'; }}
                    />
                    <div>
                      <div className="admin-product-cell-name">{product.name}</div>
                      <div className="admin-product-cell-cat">{catLabel[product.category] || product.category}</div>
                    </div>
                  </div>
                </td>
                <td><span className="status-badge instock" style={{ fontSize: '0.75rem' }}>{catLabel[product.category]}</span></td>
                <td><strong style={{ color: 'var(--s4l-accent-cyan)' }}>{product.price.toLocaleString('ar-EG')} ج.م</strong></td>
                <td>
                  {product.discount > 0
                    ? <span style={{ color: '#EF4444', fontWeight: 700 }}>-{product.discount}%</span>
                    : <span style={{ color: 'var(--fg-subtle)' }}>—</span>
                  }
                </td>
                <td>
                  <button
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    onClick={() => toggleStock(product.id)}
                    title="تغيير حالة التوفر"
                  >
                    {product.inStock
                      ? <span className="status-badge instock">متاح <ToggleRight size={14} /></span>
                      : <span className="status-badge outstock">غير متاح <ToggleLeft size={14} /></span>
                    }
                  </button>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button className="admin-btn-icon success" onClick={() => openEdit(product)} title="تعديل">
                      <Edit2 size={15} />
                    </button>
                    <button className="admin-btn-icon danger" onClick={() => setConfirmDelete(product.id)} title="حذف">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="admin-empty"><p>لا توجد نتائج مطابقة</p></div>
        )}
      </div>

      {/* ── Add / Edit Modal ── */}
      {modal === 'edit' && (
        <div className="admin-modal-overlay" onClick={() => setModal(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '680px' }}>
            <div className="admin-modal__title">
              {editingId ? <><Edit2 size={20} /> تعديل المنتج</> : <><Plus size={20} /> إضافة منتج جديد</>}
              <button style={{ marginRight: 'auto', background: 'none', border: 'none', color: 'var(--fg-muted)', cursor: 'pointer' }} onClick={() => setModal(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="admin-modal__fields">
              {/* Row 1 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="admin-modal__field">
                  <label>اسم المنتج *</label>
                  <input value={form.name} onChange={e => upd('name', e.target.value)} placeholder="اسم المنتج" />
                </div>
                <div className="admin-modal__field">
                  <label>القسم</label>
                  <select value={form.category} onChange={e => upd('category', e.target.value)}>
                    {catOptions.map(c => <option key={c} value={c}>{catLabel[c]}</option>)}
                  </select>
                </div>
                <div className="admin-modal__field">
                  <label>السعر (ج.م) *</label>
                  <input type="number" value={form.price} onChange={e => upd('price', e.target.value)} placeholder="0" />
                </div>
                <div className="admin-modal__field">
                  <label>السعر الأصلي (ج.م)</label>
                  <input type="number" value={form.originalPrice} onChange={e => upd('originalPrice', e.target.value)} placeholder="اختياري" />
                </div>
                <div className="admin-modal__field">
                  <label>الخصم (%)</label>
                  <input type="number" value={form.discount} onChange={e => upd('discount', e.target.value)} placeholder="0" min="0" max="100" />
                </div>
                <div className="admin-modal__field">
                  <label>البادج (Badge)</label>
                  <input value={form.badge} onChange={e => upd('badge', e.target.value)} placeholder="مثال: Premium, New..." />
                </div>
              </div>

              {/* Image URL + Live Preview */}
              <div className="admin-modal__field">
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ImageIcon size={14} /> رابط صورة المنتج
                </label>
                <input
                  value={form.image}
                  onChange={e => upd('image', e.target.value)}
                  placeholder="https://... أو /images/products/..."
                />
                {form.image && (
                  <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img
                      src={form.image}
                      alt="preview"
                      style={{ width: '72px', height: '72px', objectFit: 'cover', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.1)' }}
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                    <span style={{ fontSize: '0.75rem', color: '#10B981' }}>✓ معاينة الصورة</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="admin-modal__field">
                <label>الوصف</label>
                <textarea rows="3" value={form.description} onChange={e => upd('description', e.target.value)} placeholder="وصف المنتج..." />
              </div>

              {/* Features */}
              <div className="admin-modal__field">
                <label>المميزات (كل ميزة في سطر)</label>
                <textarea rows="4" value={form.features} onChange={e => upd('features', e.target.value)} placeholder={`ميزة 1\nميزة 2\nميزة 3`} />
              </div>

              {/* Usage */}
              <div className="admin-modal__field">
                <label>الاستخدامات (كل استخدام في سطر)</label>
                <textarea rows="4" value={form.usage} onChange={e => upd('usage', e.target.value)} placeholder={`استخدام 1\nاستخدام 2\nاستخدام 3`} />
              </div>
            </div>

            <div className="admin-modal__actions">
              <button className="btn btn-ghost" onClick={() => setModal(null)}>إلغاء</button>
              <button className="btn btn-primary" onClick={handleSave} disabled={!form.name || !form.price}>
                <Save size={16} /> {editingId ? 'حفظ وتحديث فوراً' : 'إضافة المنتج'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Confirm Delete ── */}
      {confirmDelete && (
        <div className="admin-modal-overlay" onClick={() => setConfirmDelete(null)}>
          <div className="admin-modal" style={{ maxWidth: '400px' }} onClick={e => e.stopPropagation()}>
            <div className="admin-modal__title" style={{ color: '#ef4444' }}>
              <Trash2 size={20} /> تأكيد الحذف
            </div>
            <p style={{ color: 'var(--fg-muted)', marginBottom: '1.5rem' }}>
              هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء.
            </p>
            <div className="admin-modal__actions">
              <button className="btn btn-ghost" onClick={() => setConfirmDelete(null)}>إلغاء</button>
              <button
                className="btn btn-primary"
                style={{ background: 'linear-gradient(135deg,#ef4444,#dc2626)' }}
                onClick={() => handleDelete(confirmDelete)}
              >
                <Trash2 size={16} /> حذف نهائياً
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
