import { Link } from 'react-router-dom';
import {
  Globe, Zap, BookOpen, ArrowLeft
} from 'lucide-react';
import { categories } from '../../data/products';
import './Categories.css';

const iconMap = { Globe, Zap, BookOpen };

const categoryPaths = {
  subscriptions: '/subscriptions',
  services: '/services',
  courses: '/courses',
};

export default function Categories() {
  return (
    <section className="categories section" id="categories-section">
      <div className="container">
        <div className="categories__header">
          <div>
            <span className="eyebrow">تصفح حسب القسم</span>
            <h2 className="categories__title">أقسام الخدمات</h2>
          </div>
          <Link to="/shop" className="btn btn-ghost categories__view-all">
            عرض الكل <ArrowLeft size={16} />
          </Link>
        </div>
        <div className="categories__grid stagger">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || Globe;
            const path = categoryPaths[cat.id] || '/shop';
            return (
              <Link
                key={cat.id}
                to={path}
                className="category-card animate-fade-in-up"
                id={`category-${cat.id}`}
              >
                <div className="category-card__icon">
                  {Icon && <Icon size={28} />}
                </div>
                <h3 className="category-card__name">{cat.name}</h3>
                <span className="category-card__count">{cat.count} خدمات</span>
                <div className="category-card__arrow">
                  <ArrowLeft size={16} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
