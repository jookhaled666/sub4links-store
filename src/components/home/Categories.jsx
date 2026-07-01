import { useState } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/products';
import './Categories.css';

const categoryPaths = {
  subscriptions: '/subscriptions',
  services: '/services',
  courses: '/courses',
};

export default function Categories() {
  const [active, setActive] = useState('all');

  const allTab = { id: 'all', name: 'الكل', count: categories.reduce((s, c) => s + c.count, 0) };
  const tabs = [allTab, ...categories];

  return (
    <section className="cats-pills section" id="categories-section">
      <div className="container">
        <div className="cats-pills__header">
          <span className="eyebrow">تصفح الخدمات</span>
          <h2 className="cats-pills__title">ماذا تبحث عن؟</h2>
        </div>

        <div className="cats-pills__tabs" role="tablist" aria-label="أقسام الخدمات">
          {tabs.map(tab => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={active === tab.id}
              className={`cats-pill ${active === tab.id ? 'cats-pill--active' : ''}`}
              onClick={() => setActive(tab.id)}
              id={`cat-tab-${tab.id}`}
            >
              {tab.name}
              <span className="cats-pill__count">{tab.count}</span>
            </button>
          ))}
        </div>

        <div className="cats-pills__links">
          {(active === 'all' ? categories : categories.filter(c => c.id === active)).map(cat => {
            const path = categoryPaths[cat.id] || '/shop';
            return (
              <Link
                key={cat.id}
                to={path}
                className="cat-link-card"
                id={`category-card-${cat.id}`}
              >
                <div className="cat-link-card__inner">
                  <span className="cat-link-card__name">{cat.name}</span>
                  <span className="cat-link-card__count">{cat.count} خدمة</span>
                </div>
                <span className="cat-link-card__arrow">←</span>
              </Link>
            );
          })}
          <Link to="/shop" className="cat-link-card cat-link-card--all">
            <span className="cat-link-card__name">جميع الخدمات</span>
            <span className="cat-link-card__arrow">←</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
