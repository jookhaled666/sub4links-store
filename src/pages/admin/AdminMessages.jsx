import { useState } from 'react';
import { MessageSquare, User, Calendar, Trash2, CheckCircle2 } from 'lucide-react';

const SEED_MESSAGES = [
  { id: 1, name: 'أحمد علي', email: 'ahmed@example.com', subject: 'استفسار عن اشتراك Canva', message: 'مرحبا، هل اشتراك Canva Pro يدعم العمل على الفرق؟ وكيف يتم تفعيل الحساب؟ شكراً لكم.', date: '2026-06-13', read: false },
  { id: 2, name: 'سارة خالد', email: 'sara@example.com', subject: 'طلب خدمة تصميم هوية بصرية', message: 'أريد معرفة التكلفة التقريبية ومدة التسليم لتصميم لوغو وهوية بصرية كاملة لشركة عقارات ناشئة.', date: '2026-06-12', read: true },
  { id: 3, name: 'محمد حسن', email: 'm.hassan@example.com', subject: 'مشكلة في كورس React', message: 'لدي مشكلة في الوصول لمحاضرات الأسبوع الثالث، يرجى تفعيل الحساب في المنصة التعليمية.', date: '2026-06-10', read: true },
];

export default function AdminMessages() {
  const [messages, setMessages] = useState(SEED_MESSAGES);
  const [activeMsg, setActiveMsg] = useState(messages[0]);

  const toggleRead = (id) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
    setActiveMsg(prev => prev.id === id ? { ...prev, read: true } : prev);
  };

  const deleteMsg = (id) => {
    const next = messages.filter(m => m.id !== id);
    setMessages(next);
    setActiveMsg(next[0] || null);
  };

  return (
    <div>
      <h1 className="admin-section-title">رسائل الزوار والاستفسارات</h1>
      <p style={{ color: 'var(--fg-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>إدارة الرسائل الواردة من صفحة اتصل بنا</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem', minHeight: '500px' }}>
        {/* Sidebar messages list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '600px', overflowY: 'auto' }}>
          {messages.map(m => (
            <div
              key={m.id}
              onClick={() => { setActiveMsg(m); toggleRead(m.id); }}
              style={{
                background: activeMsg?.id === m.id ? 'rgba(6,182,212,0.1)' : 'var(--s4l-bg-glass)',
                border: activeMsg?.id === m.id ? '1px solid var(--s4l-accent-cyan)' : '1px solid rgba(255,255,255,0.07)',
                padding: '1rem', borderRadius: '0.875rem', cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: m.read ? 'var(--fg-muted)' : 'var(--fg)' }}>
                  {m.name}
                  {!m.read && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--s4l-accent-cyan)', display: 'inline-block', marginRight: '6px' }} />}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--fg-muted)' }}>{m.date}</span>
              </div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--fg)', marginBottom: '0.25rem' }}>{m.subject}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--fg-muted)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{m.message}</div>
            </div>
          ))}
          {messages.length === 0 && (
            <div style={{ textAlign: 'center', color: 'var(--fg-muted)', padding: '2rem' }}>لا توجد رسائل واردة</div>
          )}
        </div>

        {/* Message Content Pane */}
        {activeMsg ? (
          <div style={{ background: 'var(--s4l-bg-glass)', border: '1px solid rgba(255,255,255,0.07)', padding: '2rem', borderRadius: '1.25rem', backdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--fg)', marginBottom: '0.5rem' }}>{activeMsg.subject}</h3>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.8125rem', color: 'var(--fg-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><User size={14} /> {activeMsg.name} ({activeMsg.email})</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Calendar size={14} /> {activeMsg.date}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-ghost" style={{ padding: '0.5rem', color: '#ef4444' }} onClick={() => deleteMsg(activeMsg.id)} title="حذف الرسالة">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div style={{ flex: 1, color: 'var(--fg)', lineHeight: '1.8', fontSize: '0.9375rem', whiteSpace: 'pre-line' }}>
              {activeMsg.message}
            </div>

            <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem' }}>
              <a href={`mailto:${activeMsg.email}`} className="btn btn-primary" style={{ textDecoration: 'none' }}>رد عبر البريد الإلكتروني</a>
              <button className="btn btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={16} /> تعليم كمقروء
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--s4l-bg-glass)', borderRadius: '1.25rem', border: '1px solid rgba(255,255,255,0.07)', color: 'var(--fg-muted)' }}>
            حدد رسالة لقراءتها
          </div>
        )}
      </div>
    </div>
  );
}
