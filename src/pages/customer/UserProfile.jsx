import { useState, useEffect } from 'react';
import { Save, User, Phone, MapPin, Briefcase, Mail, Lock, Check } from 'lucide-react';
import { useAuth } from '../../context/AppContext';

const MALE_AVATARS = [
  { id: 'Felix', label: 'كاجوال', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4' },
  { id: 'Jude', label: 'عصري', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jude&backgroundColor=c0aede' },
  { id: 'Oliver', label: 'تقني', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver&backgroundColor=d1e4e6' },
  { id: 'AIMale', label: 'ذكاء اصطناعي', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=AI-Male&backgroundColor=1e293b' }
];

const FEMALE_AVATARS = [
  { id: 'Aneka', label: 'كاجوال', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka&backgroundColor=ffdfbf' },
  { id: 'Samantha', label: 'مبدعة', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Samantha&backgroundColor=ffd5ec' },
  { id: 'Vivian', label: 'فنّانة', url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vivian&backgroundColor=ffebd3' },
  { id: 'AIFemale', label: 'ذكاء اصطناعي', url: 'https://api.dicebear.com/7.x/bottts/svg?seed=AI-Female&backgroundColor=1e293b' }
];

export default function UserProfile() {
  const { currentUser, updateProfile } = useAuth();
  
  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    address: '',
    field: '',
    gender: 'boy',
    email: '',
    password: '',
    avatar: ''
  });

  const [isSaved, setIsSaved] = useState(false);

  // Sync state with current user session
  useEffect(() => {
    if (currentUser) {
      setProfile({
        name: currentUser.name || '',
        phone: currentUser.phone || '',
        address: currentUser.address || '',
        field: currentUser.field || '',
        gender: currentUser.gender || 'boy',
        email: currentUser.email || '',
        password: currentUser.password || '',
        avatar: currentUser.avatar || ''
      });
    }
  }, [currentUser]);

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(profile);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const currentAvatars = profile.gender === 'girl' ? FEMALE_AVATARS : MALE_AVATARS;
  const currentAvatarUrl = profile.avatar || (profile.gender === 'girl' ? FEMALE_AVATARS[0].url : MALE_AVATARS[0].url);

  return (
    <div className="animate-fade-in" style={{ animation: 'fadeIn 0.5s ease-out forwards' }}>
      <div className="dashboard-header" style={{ marginBottom: '2rem' }}>
        <h1 className="dashboard-title" style={{ fontSize: '2rem', fontWeight: 'bold' }}>الملف الشخصي</h1>
        <p className="dashboard-subtitle" style={{ color: 'var(--fg-muted)', marginTop: '0.5rem' }}>إدارة بياناتك الشخصية وتفضيلات الحساب</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {/* Avatar Section */}
        <div>
          <div className="card-glass" style={{ padding: '2rem', borderRadius: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: '100%' }}>
            <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
              <div style={{ width: '160px', height: '160px', borderRadius: '50%', overflow: 'hidden', border: '4px solid rgba(6,182,212,0.3)', boxShadow: '0 0 25px rgba(6,182,212,0.25)', backgroundColor: 'rgba(255,255,255,0.03)' }}>
                <img src={currentAvatarUrl} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
            
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>{profile.name || 'مستخدم جديد'}</h3>
            <p style={{ color: 'var(--s4l-accent-cyan)', marginBottom: '1.5rem', fontWeight: 500 }}>{profile.field || 'تخصصك المهني'}</p>

            {/* Gender Selection */}
            <div style={{ width: '100%', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '1.5rem' }}>
              <span style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'var(--fg-muted)', marginBottom: '0.75rem' }}>النوع الاجتماعي</span>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button 
                  type="button"
                  onClick={() => {
                    const defaultMaleAvatar = MALE_AVATARS[0].url;
                    setProfile({ ...profile, gender: 'boy', avatar: defaultMaleAvatar });
                  }}
                  style={{ 
                    flex: 1,
                    padding: '0.6rem 1rem', 
                    borderRadius: '0.75rem', 
                    fontWeight: '700', 
                    transition: 'all 0.3s', 
                    cursor: 'pointer', 
                    border: '1px solid rgba(255,255,255,0.08)',
                    backgroundColor: profile.gender === 'boy' ? 'var(--s4l-accent-cyan)' : 'rgba(255,255,255,0.03)', 
                    color: profile.gender === 'boy' ? 'white' : 'var(--fg-muted)',
                    boxShadow: profile.gender === 'boy' ? '0 4px 15px rgba(6,182,212,0.3)' : 'none'
                  }}
                >
                  ذكر
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    const defaultFemaleAvatar = FEMALE_AVATARS[0].url;
                    setProfile({ ...profile, gender: 'girl', avatar: defaultFemaleAvatar });
                  }}
                  style={{ 
                    flex: 1,
                    padding: '0.6rem 1rem', 
                    borderRadius: '0.75rem', 
                    fontWeight: '700', 
                    transition: 'all 0.3s', 
                    cursor: 'pointer', 
                    border: '1px solid rgba(255,255,255,0.08)',
                    backgroundColor: profile.gender === 'girl' ? '#ec4899' : 'rgba(255,255,255,0.03)', 
                    color: profile.gender === 'girl' ? 'white' : 'var(--fg-muted)',
                    boxShadow: profile.gender === 'girl' ? '0 4px 15px rgba(236,72,153,0.3)' : 'none'
                  }}
                >
                  أنثى
                </button>
              </div>
            </div>

            {/* Avatar List Gallery */}
            <div style={{ width: '100%' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'var(--fg-muted)', marginBottom: '1rem' }}>اختر مظهر الأفتار (Avatar)</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
                {currentAvatars.map((av) => {
                  const isSelected = currentAvatarUrl === av.url;
                  return (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => setProfile({ ...profile, avatar: av.url })}
                      style={{
                        padding: '4px',
                        borderRadius: '0.75rem',
                        border: isSelected ? `2px solid ${profile.gender === 'girl' ? '#ec4899' : 'var(--s4l-accent-cyan)'}` : '2px solid transparent',
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <img src={av.url} alt={av.label} style={{ width: '100%', height: 'auto', borderRadius: '0.5rem' }} />
                      {isSelected && (
                        <div style={{
                          position: 'absolute',
                          top: '-4px',
                          left: '-4px',
                          background: profile.gender === 'girl' ? '#ec4899' : 'var(--s4l-accent-cyan)',
                          color: 'white',
                          borderRadius: '50%',
                          width: '16px',
                          height: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Check size={10} strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Info Form Section */}
        <div style={{ gridColumn: 'span 2' }}>
          <form onSubmit={handleSave} className="card-glass" style={{ padding: '2.5rem', borderRadius: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>بيانات الحساب والاتصال</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--fg-muted)' }}>الاسم الكامل</label>
                <div style={{ position: 'relative' }}>
                  <User style={{ position: 'absolute', right: '12px', top: '12px', color: '#6b7280' }} size={20} />
                  <input 
                    type="text" 
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    required
                    style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.75rem', padding: '12px 40px 12px 16px', color: 'white', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--fg-muted)' }}>رقم الهاتف (واتساب)</label>
                <div style={{ position: 'relative' }}>
                  <Phone style={{ position: 'absolute', right: '12px', top: '12px', color: '#6b7280' }} size={20} />
                  <input 
                    type="tel" 
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    dir="ltr"
                    style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.75rem', padding: '12px 40px 12px 16px', color: 'white', outline: 'none', textAlign: 'left' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--fg-muted)' }}>البريد الإلكتروني</label>
                <div style={{ position: 'relative' }}>
                  <Mail style={{ position: 'absolute', right: '12px', top: '12px', color: '#6b7280' }} size={20} />
                  <input 
                    type="email" 
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    required
                    dir="ltr"
                    style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.75rem', padding: '12px 40px 12px 16px', color: 'white', outline: 'none', textAlign: 'left' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--fg-muted)' }}>كلمة المرور</label>
                <div style={{ position: 'relative' }}>
                  <Lock style={{ position: 'absolute', right: '12px', top: '12px', color: '#6b7280' }} size={20} />
                  <input 
                    type="password" 
                    value={profile.password}
                    onChange={(e) => setProfile({...profile, password: e.target.value})}
                    required
                    style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.75rem', padding: '12px 40px 12px 16px', color: 'white', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--fg-muted)' }}>العنوان الحالي</label>
                <div style={{ position: 'relative' }}>
                  <MapPin style={{ position: 'absolute', right: '12px', top: '12px', color: '#6b7280' }} size={20} />
                  <input 
                    type="text" 
                    value={profile.address}
                    onChange={(e) => setProfile({...profile, address: e.target.value})}
                    style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.75rem', padding: '12px 40px 12px 16px', color: 'white', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--fg-muted)' }}>مجال العمل / التخصص</label>
                <div style={{ position: 'relative' }}>
                  <Briefcase style={{ position: 'absolute', right: '12px', top: '12px', color: '#6b7280' }} size={20} />
                  <input 
                    type="text" 
                    value={profile.field}
                    onChange={(e) => setProfile({...profile, field: e.target.value})}
                    placeholder="مثال: مطور ويب، مسوق إلكتروني، رائد أعمال"
                    style={{ width: '100%', backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.75rem', padding: '12px 40px 12px 16px', color: 'white', outline: 'none' }}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.5rem' }}>
              {isSaved && (
                <span style={{ color: '#4ade80', fontWeight: '700', fontSize: '0.9rem' }}>تم حفظ التغييرات بنجاح!</span>
              )}
              <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '12px 32px', fontSize: '1rem', border: 'none', cursor: 'pointer', borderRadius: '0.75rem' }}>
                <Save size={20} />
                حفظ التعديلات
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
