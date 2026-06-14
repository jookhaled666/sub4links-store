import { Zap, Shield, Headphones, CreditCard } from 'lucide-react';
import { features } from '../../data/products';
import './FeaturesStrip.css';

const iconMap = { Zap, Shield, Headphones, CreditCard };

export default function FeaturesStrip() {
  return (
    <section className="features-strip" id="features-strip">
      <div className="container">
        <div className="features-strip__grid">
          {features.map((feat, i) => {
            const Icon = iconMap[feat.icon];
            return (
              <div key={i} className="feature-item" id={`feature-${i}`}>
                <div className="feature-item__icon">
                  {Icon && <Icon size={24} />}
                </div>
                <div className="feature-item__text">
                  <h4 className="feature-item__title">{feat.title}</h4>
                  <p className="feature-item__desc">{feat.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
