import Navbar from '../components/layout/Navbar';
import HeroSlider from '../components/home/HeroSlider';
import FeaturesStrip from '../components/home/FeaturesStrip';
import Categories from '../components/home/Categories';
import FeaturedProducts from '../components/home/FeaturedProducts';
import DealBanner from '../components/home/DealBanner';
import BrandMarquee from '../components/home/BrandMarquee';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';
import Footer from '../components/layout/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSlider />
        <FeaturesStrip />
        <Categories />
        <FeaturedProducts />
        <DealBanner />
        <BrandMarquee />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
