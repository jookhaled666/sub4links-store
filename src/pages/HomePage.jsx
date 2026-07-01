import Navbar from '../components/layout/Navbar';
import HeroSlider from '../components/home/HeroSlider';
import Categories from '../components/home/Categories';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Testimonials from '../components/home/Testimonials';
import FeaturesStrip from '../components/home/FeaturesStrip';
import Newsletter from '../components/home/Newsletter';
import Footer from '../components/layout/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSlider />
        <Categories />
        <FeaturedProducts />
        <Testimonials />
        <FeaturesStrip />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
