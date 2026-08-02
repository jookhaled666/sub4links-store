import { Link } from 'react-router-dom';
import { categories } from '../../data/products';
import './Categories.css';

const categoryPaths = {
  all: '/shop',
  subscriptions: '/subscriptions',
  services: '/services',
  courses: '/courses',
};

export default function Categories() {
  const allTab = { id: 'all', name: 'الكل', count: categories.reduce((s, c) => s + c.count, 0) };
  const tabs = [allTab, ...categories];

  return (
    <section className="cats-pills section" id="categories-section">
      <div className="container">
        <div className="cats-pills__header">
          <span className="eyebrow">تصفح الخدمات</span>
          <h2 className="cats-pills__title">ماذا تبحث عن؟</h2>
        </div>

        <div className="cats-pills__tabs" aria-label="أقسام الخدمات">
          {tabs.map(tab => {
            const path = categoryPaths[tab.id] || '/shop';
            const isAll = tab.id === 'all';
            return (
              <Link
                key={tab.id}
                to={path}
                className={`cats-pill ${isAll ? 'cats-pill--active' : ''}`}
                id={`cat-tab-${tab.id}`}
              >
                {tab.name}
                <span className="cats-pill__count">{tab.count}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
